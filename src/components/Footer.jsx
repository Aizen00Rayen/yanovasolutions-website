import { Link } from 'react-router-dom';
import { Mail, Shield, MapPin } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-brand-deep">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Yanova Solutions" className="h-12 w-12 object-contain" />
              <span className="font-display text-xl font-bold text-white">
                YANOVA <span className="text-brand-cyan">Solutions</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-slate-400">{t('footer.tagline')}</p>
            <a
              href="mailto:yanovasolutions@gmail.com"
              className="mt-4 inline-flex items-center gap-2 text-slate-300 transition hover:text-brand-cyan"
            >
              <Mail size={16} /> yanovasolutions@gmail.com
            </a>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-slate-500">
              <MapPin size={15} /> Algeria
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">{t('footer.company')}</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li><a href="/#about" className="transition hover:text-brand-cyan">{t('nav.about')}</a></li>
              <li><a href="/#services" className="transition hover:text-brand-cyan">{t('nav.services')}</a></li>
              <li><Link to="/blog" className="transition hover:text-brand-cyan">{t('nav.blog')}</Link></li>
              <li><a href="/#contact" className="transition hover:text-brand-cyan">{t('nav.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">{t('footer.products')}</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li><a href="/#projects" className="transition hover:text-brand-cyan">Cerberus Pi</a></li>
              <li><a href="/#projects" className="transition hover:text-brand-cyan">Yanova OS</a></li>
              <li><a href="/#projects" className="transition hover:text-brand-cyan">ReconOne</a></li>
              <li><a href="/#projects" className="transition hover:text-brand-cyan">{t('proj.nas.name')}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row">
          <p className="inline-flex items-center gap-2">
            <Shield size={14} /> © {year} Yanova Solutions. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
