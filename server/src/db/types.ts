export type PublicAuthSettings = {
  platformWelcomeText: string
  adminWelcomeText: string
  updatedAt: string
}

export type AuthSettingsRecord = PublicAuthSettings & {
  platformPasswordHash: string
  adminPasswordHash: string
}

export type ResumeContentRecord = {
  id: string
  content: unknown
  updatedAt: string
}
