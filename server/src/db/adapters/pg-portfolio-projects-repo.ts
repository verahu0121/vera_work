import type { Pool } from 'pg'
import type {
  PortfolioProject,
  ProjectDetailHero,
  ProjectSection,
  ProjectSectionImage,
} from '../../../../src/app/data/portfolioProjects'
import {
  getProjectDetailHero,
  sortPortfolioProjects,
} from '../../../../src/app/data/portfolioProjects'
import type { PortfolioProjectsRepository } from '../../repositories/portfolio-projects-repository'

type ProjectRow = {
  id: string
  category: PortfolioProject['category']
  status: PortfolioProject['status']
  sort_order: number
  title: string
  english_title: string
  date_range: string
  description: string
  cover_image: string
  gallery_images: string[] | null
  tags: string[] | null
  hero_eyebrow_text: string | null
  hero_background_color: string | null
  hero_eyebrow_color: string | null
  hero_title_text: string | null
  hero_title_color: string | null
  hero_subtitle_text: string | null
  hero_subtitle_color: string | null
  created_at: string | Date
  updated_at: string | Date
}

type SectionRow = {
  id: number
  project_id: string
  stable_id: string | null
  section_key: string
  title: string
  subtitle: string
  sort_order: number
}

type SectionImageRow = {
  id: string
  section_id: number
  object_key: string | null
  src: string
  alt: string | null
  sort_order: number
}

export class PgPortfolioProjectsRepository implements PortfolioProjectsRepository {
  constructor(private readonly pool: Pool) {}

  private createValuePlaceholders(rowCount: number, columnCount: number, offset = 0) {
    return Array.from({ length: rowCount }, (_, rowIndex) => {
      const base = offset + rowIndex * columnCount
      const placeholders = Array.from({ length: columnCount }, (_, columnIndex) => `$${base + columnIndex + 1}`)
      return `(${placeholders.join(', ')})`
    }).join(', ')
  }

  async isEmpty() {
    const result = await this.pool.query<{ count: number }>(
      'SELECT COUNT(*)::int AS count FROM portfolio_projects',
    )
    return (result.rows[0]?.count ?? 0) === 0
  }

  async getProjects(): Promise<PortfolioProject[]> {
    const projectResult = await this.pool.query<ProjectRow>(
      `
        SELECT
          id,
          category,
          status,
          sort_order,
          title,
          english_title,
          date_range,
          description,
          cover_image,
          gallery_images,
          tags,
          hero_eyebrow_text,
          hero_background_color,
          hero_eyebrow_color,
          hero_title_text,
          hero_title_color,
          hero_subtitle_text,
          hero_subtitle_color,
          created_at,
          updated_at
        FROM portfolio_projects
        ORDER BY category ASC, sort_order ASC, created_at ASC
      `,
    )

    const sectionResult = await this.pool.query<SectionRow>(
      `
        SELECT
          id,
          project_id,
          stable_id,
          section_key,
          title,
          subtitle,
          sort_order
        FROM portfolio_project_sections
        ORDER BY project_id ASC, sort_order ASC, id ASC
      `,
    )

    const sectionImageResult = await this.pool.query<SectionImageRow>(
      `
        SELECT
          id,
          section_id,
          object_key,
          src,
          alt,
          sort_order
        FROM portfolio_section_images
        ORDER BY section_id ASC, sort_order ASC, id ASC
      `,
    )

    const imagesBySectionId = new Map<number, ProjectSectionImage[]>()
    for (const row of sectionImageResult.rows) {
      const current = imagesBySectionId.get(row.section_id) ?? []
      current.push({
        id: row.id,
        key: row.object_key ?? undefined,
        src: row.src,
        alt: row.alt ?? undefined,
      })
      imagesBySectionId.set(row.section_id, current)
    }

    const sectionsByProjectId = new Map<string, ProjectSection[]>()
    for (const row of sectionResult.rows) {
      const current = sectionsByProjectId.get(row.project_id) ?? []
      current.push({
        id: row.section_key,
        stableId: row.stable_id ?? row.section_key,
        title: row.title,
        subtitle: row.subtitle,
        images: imagesBySectionId.get(row.id) ?? [],
      })
      sectionsByProjectId.set(row.project_id, current)
    }

    const projects = projectResult.rows.map<PortfolioProject>((row) => {
      const detailHero: ProjectDetailHero = {
        eyebrowText: row.hero_eyebrow_text ?? `GALLERY / ${row.id.toUpperCase()}`,
        backgroundColor: row.hero_background_color ?? '#070621',
        eyebrowColor: row.hero_eyebrow_color ?? '#e0e0e0',
        titleText: row.hero_title_text ?? row.title,
        titleColor: row.hero_title_color ?? '#fd6d59',
        subtitleText: row.hero_subtitle_text ?? row.english_title,
        subtitleColor: row.hero_subtitle_color ?? '#adadad',
      }

      return {
        id: row.id,
        category: row.category,
        status: row.status,
        order: row.sort_order,
        title: row.title,
        englishTitle: row.english_title,
        date: row.date_range,
        description: row.description,
        coverImage: row.cover_image,
        images: Array.isArray(row.gallery_images) ? row.gallery_images : [],
        tags: Array.isArray(row.tags) ? row.tags : [],
        sections: sectionsByProjectId.get(row.id) ?? [],
        detailHero,
        createdAt: new Date(row.created_at).toISOString(),
        updatedAt: new Date(row.updated_at).toISOString(),
      }
    })

    return sortPortfolioProjects(projects)
  }

  async migrateLegacyGalleryImagesToSections() {
    const client = await this.pool.connect()

    try {
      await client.query('BEGIN')

      const projectRows = await client.query<{
        id: string
        title: string
        gallery_images: string[] | null
      }>(
        `
          SELECT id, title, gallery_images
          FROM portfolio_projects
          WHERE jsonb_array_length(gallery_images) > 0
        `,
      )

      for (const project of projectRows.rows) {
        const countResult = await client.query<{ count: number }>(
          `
            SELECT COUNT(images.id)::int AS count
            FROM portfolio_project_sections sections
            LEFT JOIN portfolio_section_images images ON images.section_id = sections.id
            WHERE sections.project_id = $1
          `,
          [project.id],
        )

        const existingImageCount = countResult.rows[0]?.count ?? 0
        if (existingImageCount > 0) {
          continue
        }

        const firstSectionResult = await client.query<{ id: number }>(
          `
            SELECT id
            FROM portfolio_project_sections
            WHERE project_id = $1
            ORDER BY sort_order ASC, id ASC
            LIMIT 1
          `,
          [project.id],
        )

        const firstSectionId = firstSectionResult.rows[0]?.id
        const galleryImages = Array.isArray(project.gallery_images) ? project.gallery_images : []

        if (!firstSectionId || galleryImages.length === 0) {
          continue
        }

        for (const [imageIndex, src] of galleryImages.entries()) {
          await client.query(
            `
              INSERT INTO portfolio_section_images (
                id,
                section_id,
                object_key,
                src,
                alt,
                sort_order,
                created_at,
                updated_at
              )
              VALUES ($1, $2, NULL, $3, $4, $5, NOW(), NOW())
              ON CONFLICT (id) DO NOTHING
            `,
            [
              `legacy-${project.id}-${imageIndex + 1}`,
              firstSectionId,
              src,
              `${project.title} ${imageIndex + 1}`,
              imageIndex + 1,
            ],
          )
        }
      }

      await client.query('COMMIT')
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  }

  async saveProjects(projects: PortfolioProject[]): Promise<PortfolioProject[]> {
    const sorted = sortPortfolioProjects(projects)
    const client = await this.pool.connect()

    try {
      await client.query('BEGIN')
      await client.query('TRUNCATE TABLE portfolio_projects RESTART IDENTITY CASCADE')

      if (sorted.length > 0) {
        const projectValues = sorted.flatMap((project) => {
          const detailHero = getProjectDetailHero(project)

          return [
            project.id,
            project.category,
            project.status,
            project.order,
            project.title,
            project.englishTitle,
            project.date,
            project.description,
            project.coverImage,
            JSON.stringify(project.images),
            JSON.stringify(project.tags),
            detailHero.eyebrowText,
            detailHero.backgroundColor,
            detailHero.eyebrowColor,
            detailHero.titleText,
            detailHero.titleColor,
            detailHero.subtitleText,
            detailHero.subtitleColor,
            project.createdAt,
            project.updatedAt,
          ]
        })

        await client.query(
          `
            INSERT INTO portfolio_projects (
              id,
              category,
              status,
              sort_order,
              title,
              english_title,
              date_range,
              description,
              cover_image,
              gallery_images,
              tags,
              hero_eyebrow_text,
              hero_background_color,
              hero_eyebrow_color,
              hero_title_text,
              hero_title_color,
              hero_subtitle_text,
              hero_subtitle_color,
              created_at,
              updated_at
            )
            VALUES ${this.createValuePlaceholders(sorted.length, 20)}
          `,
          projectValues,
        )
      }

      const sectionRecords = sorted.flatMap((project) =>
        project.sections.map((section, sectionIndex) => ({
          projectId: project.id,
          stableId: section.stableId ?? section.id,
          sectionKey: String(sectionIndex + 1).padStart(2, '0'),
          title: section.title,
          subtitle: section.subtitle,
          sortOrder: sectionIndex + 1,
          images: section.images ?? [],
        })),
      )

      const insertedSectionIds = new Map<string, number>()
      if (sectionRecords.length > 0) {
        const sectionValues = sectionRecords.flatMap((section) => [
          section.projectId,
          section.stableId,
          section.sectionKey,
          section.title,
          section.subtitle,
          section.sortOrder,
        ])

        const insertedSections = await client.query<{
          id: number
          project_id: string
          stable_id: string
          section_key: string
        }>(
          `
            INSERT INTO portfolio_project_sections (
              project_id,
              stable_id,
              section_key,
              title,
              subtitle,
              sort_order
            )
            VALUES ${this.createValuePlaceholders(sectionRecords.length, 6)}
            RETURNING id, project_id, stable_id, section_key
          `,
          sectionValues,
        )

        for (const row of insertedSections.rows) {
          insertedSectionIds.set(`${row.project_id}::${row.stable_id}`, row.id)
        }
      }

      const imageRecords = sectionRecords.flatMap((section) => {
        const sectionId = insertedSectionIds.get(`${section.projectId}::${section.stableId}`)
        if (!sectionId) return []

        return section.images.map((image, imageIndex) => ({
          id: image.id,
          sectionId,
          objectKey: image.key ?? null,
          src: image.src,
          alt: image.alt ?? '',
          sortOrder: imageIndex + 1,
        }))
      })

      if (imageRecords.length > 0) {
        const imageValues = imageRecords.flatMap((image) => [
          image.id,
          image.sectionId,
          image.objectKey,
          image.src,
          image.alt,
          image.sortOrder,
        ])

        await client.query(
          `
            INSERT INTO portfolio_section_images (
              id,
              section_id,
              object_key,
              src,
              alt,
              sort_order
            )
            VALUES ${this.createValuePlaceholders(imageRecords.length, 6)}
          `,
          imageValues,
        )
      }

      await client.query('COMMIT')
      return sorted
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  }
}
