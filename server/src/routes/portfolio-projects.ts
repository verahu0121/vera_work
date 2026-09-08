import type { FastifyInstance } from 'fastify'
import type { PortfolioProject } from '../../../src/app/data/portfolioProjects'
import { PortfolioProjectsService } from '../services/portfolio-projects-service'
import type { AccessService } from '../services/access-service'
import { SESSION_COOKIES } from '../auth-http'

export async function registerPortfolioProjectRoutes(
  app: FastifyInstance,
  portfolioProjectsService: PortfolioProjectsService,
  accessService: AccessService,
) {
  app.get('/api/admin/projects', async (request, reply) => {
    const allProjects = await portfolioProjectsService.getProjects()
    const admin = await accessService.session(request.cookies[SESSION_COOKIES.admin], 'admin')
    const projects = admin ? allProjects : allProjects.filter(project => project.status === 'published')
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
