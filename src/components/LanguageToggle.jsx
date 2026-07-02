import { useLang } from '../i18n/LanguageContext.jsx';
import { Globe } from 'lucide-react';

export default function LanguageToggle({ className = '' }) {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-sm font-semibold text-slate-200 transition hover:border-brand-cyan hover:text-brand-cyan ${className}`}
      aria-label="Switch language"
      title={lang === 'en' ? 'Passer en français' : 'Switch to English'}
    >
      <Globe size={15} />
      {lang === 'en' ? 'FR' : 'EN'}
    </button>
  );
}
