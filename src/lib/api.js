// Thin fetch wrapper. In production the API is same-origin (/api/...).
// In dev, Vite proxies /api to the Express server.
const TOKEN_KEY = 'yanova_admin_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(method, path, body, auth = false) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text };
    }
  }

  if (!res.ok) {
    const err = new Error((data && data.error) || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  get: (path, auth = false) => request('GET', path, undefined, auth),
  post: (path, body, auth = false) => request('POST', path, body, auth),
  put: (path, body, auth = false) => request('PUT', path, body, auth),
  patch: (path, body, auth = false) => request('PATCH', path, body, auth),
  del: (path, auth = false) => request('DELETE', path, undefined, auth),
};
