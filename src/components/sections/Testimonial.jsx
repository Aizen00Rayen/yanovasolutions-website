import { Quote, MapPin, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext.jsx';
import Reveal from '../Reveal.jsx';

const facts = [
  { icon: MapPin, key: 'testi.fact1' },
  { icon: Users, key: 'testi.fact2' },
  { icon: ShieldCheck, key: 'testi.fact3' },
];

export default function Testimonial() {
  const { t } = useLang();
  return (
    <section className="relative scroll-mt-20 py-20 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[140px]" />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">{t('testi.eyebrow')}</span>
          <h2 className="h-section mt-3">{t('testi.title')}</h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Quote card */}
          <Reveal>
            <figure className="glass relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-8 shadow-card lg:p-10">
              <Quote className="absolute -right-2 -top-2 text-white/[0.04]" size={130} />
              <blockquote className="relative font-display text-xl leading-relaxed text-slate-100 sm:text-2xl">
                {t('testi.quote')}
              </blockquote>
              <figcaption className="relative mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient font-display text-lg font-bold text-white">
                  G
                </div>
                <div>
                  <div className="font-semibold text-white">{t('testi.author')}</div>
                  <div className="text-sm text-slate-400">{t('testi.role')}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          {/* Field validation facts */}
          <Reveal delay={120}>
            <div className="card h-full p-8">
              <h3 className="flex items-center gap-2 font-semibold text-white">
                <CheckCircle2 size={18} className="text-brand-cyan" /> {t('testi.factsT')}
              </h3>
              <ul className="mt-6 space-y-5">
                {facts.map(({ icon: Icon, key }) => (
                  <li key={key} className="flex gap-3.5">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand-cyan ring-1 ring-inset ring-brand-cyan/20">
                      <Icon size={17} />
                    </span>
                    <p className="text-sm leading-relaxed text-slate-300">{t(key)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
