import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function NotFound() {
  const { t } = useLang();
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center pt-[70px] text-center">
      <div className="cyber-grid absolute inset-0 -z-10 opacity-30" />
      <p className="font-display text-7xl font-bold text-brand-cyan">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-white">{t('nf.title')}</h1>
      <Link to="/" className="btn-primary mt-8">
        <Home size={18} /> {t('nf.back')}
      </Link>
    </div>
  );
}
