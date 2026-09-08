import type { GuestCode } from '../../../src/app/data/guestAccess';

export type AccessCodeRecord = Omit<GuestCode, 'status' | 'activeSessions'> & {
  passwordHash: string;
  passwordLookup: string;
};

export type AccessSessionRecord = {
  id: string;
  tokenHash: string;
  attemptKey: string;
  credentialKey: string;
  kind: 'platform' | 'admin' | 'guest';
  codeId: string | null;
  createdAt: string;
  expiresAt: string;
  revokedAt: string | null;
  browser: string;
};

export interface AccessRecords {
  codes(): Promise<AccessCodeRecord[]>;
  code(id: string): Promise<AccessCodeRecord | null>;
  codeByPassword(lookup: string): Promise<AccessCodeRecord | null>;
  saveCode(code: AccessCodeRecord): Promise<void>;
  session(tokenHash: string): Promise<AccessSessionRecord | null>;
  attempt(key: string): Promise<AccessSessionRecord | null>;
  sessions(codeId?: string): Promise<AccessSessionRecord[]>;
  saveSession(session: AccessSessionRecord): Promise<void>;
}

export interface AccessRepository {
  read<T>(fn: (records: AccessRecords) => Promise<T>): Promise<T>;
  transaction<T>(fn: (records: AccessRecords) => Promise<T>): Promise<T>;
}
