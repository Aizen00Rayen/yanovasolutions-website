import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';
import LanguageToggle from './LanguageToggle.jsx';

const sections = [
  { id: 'about', key: 'nav.about' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'services', key: 'nav.services' },
  { id: 'blog', key: 'nav.blog' },
  { id: 'contact', key: 'nav.contact' },
];

export default function Navbar() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Navigate to a homepage section from any page.
  const goToSection = (id) => {
    setOpen(false);
    if (location.pathname !== '/') {
      navigate('/#' + id);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // If we arrive at "/#section", scroll to it.
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [location]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-brand-deep/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-[70px] items-center justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="Yanova Solutions" className="h-9 w-9 shrink-0 object-contain sm:h-11 sm:w-11" />
          <span className="font-display text-base font-bold tracking-tight text-white sm:text-lg">
            YANOVA <span className="hidden text-brand-cyan min-[360px]:inline">Solutions</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => goToSection(s.id)}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              {t(s.key)}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <button onClick={() => goToSection('contact')} className="btn-primary !px-5 !py-2.5 text-sm">
            {t('nav.cta')}
          </button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-lg p-2 text-white hover:bg-white/10"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-brand-deep/95 backdrop-blur-md lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => goToSection(s.id)}
                className="rounded-lg px-4 py-3 text-left text-base font-medium text-slate-200 hover:bg-white/5"
              >
                {t(s.key)}
              </button>
            ))}
            <button onClick={() => goToSection('contact')} className="btn-primary mt-2">
              {t('nav.cta')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
