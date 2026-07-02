import { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { Mail, FileText, Handshake, LogOut, ExternalLink, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLang } from '../../i18n/LanguageContext.jsx';
import LanguageToggle from '../../components/LanguageToggle.jsx';

export default function AdminLayout() {
  const { t } = useLang();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const doLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
      isActive ? 'bg-brand text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
    }`;

  const nav = (
    <>
      <NavLink to="/admin/messages" className={linkClass} onClick={() => setOpen(false)}>
        <Mail size={18} /> {t('admin.nav.messages')}
      </NavLink>
      <NavLink to="/admin/blogs" className={linkClass} onClick={() => setOpen(false)}>
        <FileText size={18} /> {t('admin.nav.blogs')}
      </NavLink>
      <NavLink to="/admin/partners" className={linkClass} onClick={() => setOpen(false)}>
        <Handshake size={18} /> {t('admin.nav.partners')}
      </NavLink>
    </>
  );

  return (
    <div className="min-h-screen bg-brand-deep lg:flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-brand-deep p-5 lg:flex">
        <Link to="/" className="mb-8 flex items-center gap-2.5">
          <img src="/logo.png" alt="Yanova" className="h-10 w-10 object-contain" />
          <span className="font-display font-bold text-white">
            YANOVA <span className="text-brand-cyan">Admin</span>
          </span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1.5">{nav}</nav>
        <div className="mt-auto space-y-1.5 border-t border-white/10 pt-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <ExternalLink size={18} /> {t('admin.viewsite')}
          </a>
          <button
            onClick={doLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-500/10"
          >
            <LogOut size={18} /> {t('admin.logout')}
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="flex items-center justify-between border-b border-white/10 bg-brand-deep p-4 lg:hidden">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Yanova" className="h-9 w-9 object-contain" />
          <span className="font-display font-bold text-white">Admin</span>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button onClick={() => setOpen((o) => !o)} className="rounded-lg p-2 text-white hover:bg-white/10">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {open && (
        <div className="border-b border-white/10 bg-brand-deep p-4 lg:hidden">
          <nav className="flex flex-col gap-1.5">{nav}</nav>
          <div className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
            <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5">
              <ExternalLink size={18} /> {t('admin.viewsite')}
            </a>
            <button onClick={doLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-red-300 hover:bg-red-500/10">
              <LogOut size={18} /> {t('admin.logout')}
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        <div className="hidden items-center justify-end gap-3 border-b border-white/10 px-8 py-4 lg:flex">
          <LanguageToggle />
        </div>
        <main className="p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
