export const SESSION_INVALID_EVENT = 'vera:session-invalid';
export const ADMIN_CHANGED_EVENT = 'vera:admin-changed';
export async function apiFetch(input: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  if (init.method && !['GET', 'HEAD'].includes(init.method.toUpperCase())) headers.set('X-Site-Request', '1');
  const response = await fetch(input, {...init, headers, credentials: 'same-origin', cache: 'no-store'});
  if (response.status === 401 && !input.includes('/verify-login')) {
    const body = await response.clone().json().catch(() => ({}));
    if (['SESSION_ENDED', 'ADMIN_REQUIRED'].includes(body.code)) window.dispatchEvent(new CustomEvent(SESSION_INVALID_EVENT, {detail: body.code}));
  }
  return response;
}

export async function apiJson<T>(url: string, init: RequestInit = {}): Promise<T> {
  const response = await apiFetch(url, init);
  const body = await response.json();
  if (!response.ok) throw new Error(typeof body.error === 'string' ? body.error : '请求失败，请稍后重试');
  return body as T;
}
