export type PublicAuthSettings = {
  platformWelcomeText: string
  adminWelcomeText: string
}

export type AuthSettingsRecord = PublicAuthSettings & {
  platformPasswordHash: string
  adminPasswordHash: string
  updatedAt: string
}

export type ResumeContentRecord = {
  id: string
  content: unknown
  updatedAt: string
}
