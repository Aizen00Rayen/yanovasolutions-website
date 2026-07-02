import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { api, getToken, setToken } from '../lib/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(() => !!getToken());
  const [checking, setChecking] = useState(!!getToken());

  // On mount, verify a stored token is still valid.
  useEffect(() => {
    let cancelled = false;
    if (!getToken()) {
      setChecking(false);
      return;
    }
    api
      .get('/auth/me', true)
      .then(() => !cancelled && setAuthed(true))
      .catch(() => {
        if (!cancelled) {
          setToken(null);
          setAuthed(false);
        }
      })
      .finally(() => !cancelled && setChecking(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (username, password) => {
    const data = await api.post('/auth/login', { username, password });
    setToken(data.token);
    setAuthed(true);
    return data;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setAuthed(false);
  }, []);

  return (
    <AuthContext.Provider value={{ authed, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
