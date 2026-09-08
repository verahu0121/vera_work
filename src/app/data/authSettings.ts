export type AuthSettings = {
  platformWelcomeText: string;
  adminWelcomeText: string;
  updatedAt?: string;
};

export const DEFAULT_AUTH_SETTINGS: AuthSettings = {
  platformWelcomeText: "Welcome to Vera’s Libertisle ！",
  adminWelcomeText: "Welcome to Vera’s Libertisle ！",
};
