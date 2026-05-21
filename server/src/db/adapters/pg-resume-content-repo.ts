import type { Pool } from 'pg'
import {
  DEFAULT_RESUME_CONTENT,
  type ResumeContentData,
} from '../../../../src/app/data/resumeContent'
import type { ResumeContentRepository } from '../../repositories/resume-content-repository'

type ResumeContentRow = {
  id: string
  content: ResumeContentData
}

const DEFAULT_ROW_ID = 'default'

export class PgResumeContentRepository implements ResumeContentRepository {
  constructor(private readonly pool: Pool) {}

  async isEmpty(): Promise<boolean> {
    const result = await this.pool.query<{ count: string }>(
      'SELECT COUNT(*)::text AS count FROM resume_content',
    )
    return result.rows[0]?.count === '0'
  }

  async getContent(): Promise<ResumeContentData> {
    const result = await this.pool.query<ResumeContentRow>(
      `SELECT id, content
       FROM resume_content
       WHERE id = $1
       LIMIT 1`,
      [DEFAULT_ROW_ID],
    )

    return result.rows[0]?.content ?? DEFAULT_RESUME_CONTENT
  }

  async saveContent(content: ResumeContentData): Promise<ResumeContentData> {
    await this.pool.query(
      `INSERT INTO resume_content (id, content, updated_at)
       VALUES ($1, $2::jsonb, NOW())
       ON CONFLICT (id)
       DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()`,
      [DEFAULT_ROW_ID, JSON.stringify(content)],
    )

    return content
  }
}
