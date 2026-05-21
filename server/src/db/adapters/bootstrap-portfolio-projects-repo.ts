import fs from 'node:fs/promises'
import path from 'node:path'
import type { PortfolioProject } from '../../../../src/app/data/portfolioProjects'
import { SEED_PORTFOLIO_PROJECTS, sortPortfolioProjects } from '../../../../src/app/data/portfolioProjects'
import type { PortfolioProjectsRepository } from '../../repositories/portfolio-projects-repository'

const DATA_DIR = path.resolve(process.cwd(), '.data')
const PORTFOLIO_PROJECTS_PATH = path.join(DATA_DIR, 'portfolio-projects.json')

function isPortfolioProject(value: unknown): value is PortfolioProject {
  if (!value || typeof value !== 'object') return false
  const target = value as Record<string, unknown>

  return (
    typeof target.id === 'string' &&
    typeof target.category === 'string' &&
    typeof target.status === 'string' &&
    typeof target.order === 'number' &&
    typeof target.title === 'string' &&
    typeof target.englishTitle === 'string' &&
    typeof target.date === 'string' &&
    typeof target.description === 'string' &&
    typeof target.coverImage === 'string' &&
    Array.isArray(target.images) &&
    Array.isArray(target.tags) &&
    Array.isArray(target.sections) &&
    typeof target.createdAt === 'string' &&
    typeof target.updatedAt === 'string'
  )
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

export class BootstrapPortfolioProjectsRepository implements PortfolioProjectsRepository {
  async getProjects(): Promise<PortfolioProject[]> {
    await ensureDataDir()

    try {
      const file = await fs.readFile(PORTFOLIO_PROJECTS_PATH, 'utf8')
      const parsed = JSON.parse(file)
      if (Array.isArray(parsed) && parsed.every(isPortfolioProject)) {
        return sortPortfolioProjects(parsed)
      }
    } catch {
      // Seed below.
    }

    const seed = sortPortfolioProjects(SEED_PORTFOLIO_PROJECTS)
    await this.saveProjects(seed)
    return seed
  }

  async saveProjects(projects: PortfolioProject[]): Promise<PortfolioProject[]> {
    await ensureDataDir()
    const sorted = sortPortfolioProjects(projects)
    await fs.writeFile(PORTFOLIO_PROJECTS_PATH, JSON.stringify(sorted, null, 2), 'utf8')
    return sorted
  }
}
