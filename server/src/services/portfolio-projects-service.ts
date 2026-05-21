import type { PortfolioProject } from '../../../src/app/data/portfolioProjects'
import { sortPortfolioProjects } from '../../../src/app/data/portfolioProjects'
import type { PortfolioProjectsRepository } from '../repositories/portfolio-projects-repository'

export class PortfolioProjectsService {
  constructor(private readonly repository: PortfolioProjectsRepository) {}

  async getProjects(): Promise<PortfolioProject[]> {
    const projects = await this.repository.getProjects()
    return sortPortfolioProjects(projects)
  }

  async saveProjects(projects: PortfolioProject[]): Promise<PortfolioProject[]> {
    return this.repository.saveProjects(sortPortfolioProjects(projects))
  }
}
