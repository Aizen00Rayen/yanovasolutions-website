import { ArrowRight } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext.jsx';
import Reveal from '../Reveal.jsx';

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function CTA() {
  const { t } = useLang();
  return (
    <section className="relative py-16 lg:py-20">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-brand-cyan/20 bg-gradient-to-br from-brand-dark/40 via-brand-navy/60 to-brand-deep px-6 py-14 text-center shadow-glow-lg sm:px-12">
            <div className="cyber-grid absolute inset-0 opacity-40" />
            <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-brand/30 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-brand-cyan/20 blur-[90px]" />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="heading text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                {t('cta.title')}
              </h2>
              <p className="lead mx-auto mt-4 max-w-xl text-slate-300">{t('cta.subtitle')}</p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <button onClick={() => scrollTo('contact')} className="btn-primary">
                  {t('cta.primary')} <ArrowRight size={18} />
                </button>
                <button onClick={() => scrollTo('projects')} className="btn-ghost">
                  {t('cta.secondary')}
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
