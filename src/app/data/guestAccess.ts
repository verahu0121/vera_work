export type GuestStatus = 'active' | 'exhausted' | 'expired' | 'ended' | 'revoked';

export type GuestCode = {
  id: string;
  label: string;
  durationHours: number;
  maxLogins: number;
  usedLogins: number;
  loginDeadline: string;
  hardDeadline: string | null;
  revokedAt: string | null;
  createdAt: string;
  updatedAt: string;
  lastUsedAt: string | null;
  version: number;
  status: GuestStatus;
  activeSessions: number;
};

export type GuestSession = {
  id: string;
  createdAt: string;
  expiresAt: string;
  revokedAt: string | null;
  browser: string;
};

export type SiteSession = { kind: 'platform' | 'guest' | 'admin'; expiresAt: string };
export type SessionState = {
  platformAuthenticated: boolean;
  adminAuthenticated: boolean;
  platformSession: SiteSession | null;
  adminSession: SiteSession | null;
  serverNow: string;
};

export const GUEST_STATUS_LABELS: Record<GuestStatus, string> = {
  active: '可使用', exhausted: '次数已用完', expired: '登录期限已过',
  ended: '全部访问已结束', revoked: '已撤销',
};

export function normalizeAccessPassword(value: string) {
  return value.trim().replace(/[！-～]/g, char => String.fromCharCode(char.charCodeAt(0) - 0xfee0)).replace(/\u3000/g, ' ');
}

export function guestStatus(code: Pick<GuestCode, 'revokedAt' | 'hardDeadline' | 'loginDeadline' | 'usedLogins' | 'maxLogins'>, now = Date.now()): GuestStatus {
  if (code.revokedAt) return 'revoked';
  if (code.hardDeadline && Date.parse(code.hardDeadline) <= now) return 'ended';
  if (Date.parse(code.loginDeadline) <= now) return 'expired';
  if (code.usedLogins >= code.maxLogins) return 'exhausted';
  return 'active';
}
