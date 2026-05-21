import type { FastifyInstance } from 'fastify'
import type { PortfolioProject } from '../../../src/app/data/portfolioProjects'
import { PortfolioProjectsService } from '../services/portfolio-projects-service'

export async function registerPortfolioProjectRoutes(
  app: FastifyInstance,
  portfolioProjectsService: PortfolioProjectsService,
) {
  app.get('/api/admin/projects', async (_request, reply) => {
    const projects = await portfolioProjectsService.getProjects()
    return reply.send(
      projects.map((project) => ({
        ...project,
        sections: project.sections.map((section) => ({
          ...section,
          stableId: section.stableId ?? section.id,
        })),
      })),
    )
  })

  app.put('/api/admin/projects', async (request, reply) => {
    const body = (request.body ?? {}) as { projects?: unknown }

    if (!Array.isArray(body.projects)) {
      return reply.status(400).send({ error: 'Projects array is required.' })
    }

    const projects = await portfolioProjectsService.saveProjects(body.projects as PortfolioProject[])
    return reply.send(
      projects.map((project) => ({
        ...project,
        sections: project.sections.map((section) => ({
          ...section,
          stableId: section.stableId ?? section.id,
        })),
      })),
    )
  })
}
