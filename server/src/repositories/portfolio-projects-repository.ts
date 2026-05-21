import type { PortfolioProject } from '../../../src/app/data/portfolioProjects'

export interface PortfolioProjectsRepository {
  getProjects(): Promise<PortfolioProject[]>
  saveProjects(projects: PortfolioProject[]): Promise<PortfolioProject[]>
}
