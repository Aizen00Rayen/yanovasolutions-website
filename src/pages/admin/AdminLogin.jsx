import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLang } from '../../i18n/LanguageContext.jsx';
import LanguageToggle from '../../components/LanguageToggle.jsx';

export default function AdminLogin() {
  const { t } = useLang();
  const { login, authed } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authed) navigate('/admin', { replace: true });
  }, [authed, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.status === 401 ? t('admin.badcreds') : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-brand-deep p-5">
      <div className="absolute inset-0 cyber-grid opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />

      <div className="absolute right-5 top-5">
        <LanguageToggle />
      </div>

      <div className="relative w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <img src="/logo.png" alt="Yanova Solutions" className="h-12 w-12 object-contain" />
          <span className="font-display text-xl font-bold text-white">
            YANOVA <span className="text-brand-cyan">Solutions</span>
          </span>
        </Link>

        <div className="card p-8">
          <h1 className="text-center font-display text-2xl font-bold text-white">
            {t('admin.login.title')}
          </h1>
          <p className="mt-1 text-center text-sm text-slate-400">{t('admin.login.subtitle')}</p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div>
              <label className="label" htmlFor="username">{t('admin.username')}</label>
              <div className="relative">
                <User size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="username" name="username" required autoFocus
                  value={form.username}
                  onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                  className="input pl-11" placeholder="admin@yanovasolutions.tech"
                />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="password">{t('admin.password')}</label>
              <div className="relative">
                <Lock size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="password" name="password" type="password" required
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="input pl-11" placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <AlertCircle size={16} /> {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? t('admin.signingin') : (<>{t('admin.signin')} <LogIn size={16} /></>)}
            </button>
          </form>
        </div>

        <Link to="/" className="mt-6 block text-center text-sm text-slate-400 transition hover:text-brand-cyan">
          ← {t('nf.back')}
        </Link>
      </div>
    </div>
  );
}
