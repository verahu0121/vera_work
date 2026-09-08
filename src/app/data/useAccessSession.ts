import { useCallback, useEffect, useRef, useState } from 'react';
import { apiJson, SESSION_INVALID_EVENT } from './api';
import type { SessionState, SiteSession } from './guestAccess';

export function announceSessionChange() {
  try { localStorage.setItem('vera:session-change', `${Date.now()}:${Math.random()}`); } catch { /* Storage may be disabled; periodic checks still run. */ }
  window.dispatchEvent(new Event('vera:session-change'));
}

export function useAccessSession(scope: 'platform' | 'admin') {
  const [session, setSession] = useState<SiteSession | null>(null);
  const [checked, setChecked] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [ended, setEnded] = useState(false);
  const current = useRef<SiteSession | null>(null);
  const base = useRef({server: Date.now(), local: performance.now()});
  const generation = useRef(0);
  const inFlight = useRef(false);
  const accept = useCallback((next: SiteSession | null, serverNow = new Date().toISOString()) => {
    generation.current++;
    if (!next && current.current) setEnded(true);
    if (next) setEnded(false);
    current.current = next;
    base.current = {server: Date.parse(serverNow), local: performance.now()};
    setSession(next); setChecked(true);
    setRemaining(next ? Math.max(0, Date.parse(next.expiresAt) - Date.parse(serverNow)) : 0);
  }, []);
  const refresh = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    const version = generation.current;
    try {
      const data = await apiJson<SessionState>('/api/admin/session');
      if (version === generation.current) accept(scope === 'platform' ? data.platformSession : data.adminSession, data.serverNow);
    } catch { setChecked(true); }
    finally {inFlight.current = false;}
  }, [scope, accept]);
  useEffect(() => {
    void refresh();
    const tick = () => {
      if (!current.current) return;
      const now = base.current.server + performance.now() - base.current.local;
      const left = Math.max(0, Date.parse(current.current.expiresAt) - now);
      setRemaining(left);
      if (left === 0) accept(null);
    };
    const timer = window.setInterval(tick, 1000);
    const poll = window.setInterval(() => {if (!document.hidden) void refresh();}, 30000);
    const focus = () => {tick(); if (!document.hidden) void refresh();};
    const invalid = (event: Event) => {
      const code = (event as CustomEvent<string>).detail;
      if ((scope === 'admin' && code === 'ADMIN_REQUIRED') || (scope === 'platform' && code === 'SESSION_ENDED')) accept(null);
      else void refresh();
    };
    const storage = (event: StorageEvent) => {if (event.key === 'vera:session-change') void refresh();};
    window.addEventListener('focus', focus);
    window.addEventListener('pageshow', focus);
    window.addEventListener('storage', storage);
    window.addEventListener('vera:session-change', focus);
    window.addEventListener(SESSION_INVALID_EVENT, invalid);
    document.addEventListener('visibilitychange', focus);
    return () => {generation.current++; clearInterval(timer); clearInterval(poll); window.removeEventListener('focus', focus); window.removeEventListener('pageshow', focus); window.removeEventListener('storage', storage); window.removeEventListener('vera:session-change', focus); window.removeEventListener(SESSION_INVALID_EVENT, invalid); document.removeEventListener('visibilitychange', focus);};
  }, [refresh, accept, scope]);
  return {session, checked, remaining, ended, accept, refresh};
}
