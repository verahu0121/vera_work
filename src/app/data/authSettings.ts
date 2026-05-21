export type AuthSettings = {
  platformWelcomeText: string;
  adminWelcomeText: string;
};

export type AuthSettingsSeed = AuthSettings & {
  platformPassword: string;
  adminPassword: string;
};

export const DEFAULT_AUTH_SETTINGS: AuthSettings = {
  platformWelcomeText: "Welcome to Vera’s Libertisle ！",
  adminWelcomeText: "Welcome to Vera’s Libertisle ！",
};

export const DEFAULT_AUTH_SETTINGS_SEED: AuthSettingsSeed = {
  ...DEFAULT_AUTH_SETTINGS,
  platformPassword: "710418",
  adminPassword: "hyq980121",
};
