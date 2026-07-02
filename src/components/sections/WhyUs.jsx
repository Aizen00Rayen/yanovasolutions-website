import { Cpu, ShieldCheck, Gauge, Layers } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext.jsx';
import Reveal from '../Reveal.jsx';

const points = [
  { icon: Cpu, t: 'why.1.t', b: 'why.1.b' },
  { icon: ShieldCheck, t: 'why.2.t', b: 'why.2.b' },
  { icon: Gauge, t: 'why.3.t', b: 'why.3.b' },
  { icon: Layers, t: 'why.4.t', b: 'why.4.b' },
];

export default function WhyUs() {
  const { t } = useLang();
  return (
    <section className="relative scroll-mt-20 py-20 lg:py-28">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Left: intro + metrics */}
          <Reveal>
            <span className="section-eyebrow">{t('why.eyebrow')}</span>
            <h2 className="h-section mt-3">{t('why.title')}</h2>
            <p className="lead mt-5 max-w-lg">{t('why.subtitle')}</p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              <Metric big="4" sub={t('why.metric1')} />
              <Metric big={t('why.metric2')} sub={t('why.metric2s')} />
              <Metric big={t('why.metric3')} sub={t('why.metric3s')} />
            </div>
          </Reveal>

          {/* Right: differentiator cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {points.map(({ icon: Icon, t: tt, b }, i) => (
              <Reveal key={tt} delay={i * 90}>
                <div className="card group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/40 hover:shadow-glow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand-cyan ring-1 ring-inset ring-brand-cyan/20 transition group-hover:bg-brand group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{t(tt)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{t(b)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ big, sub }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
      <div className="font-display text-xl font-bold text-brand-cyan sm:text-2xl">{big}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wide text-slate-500">{sub}</div>
    </div>
  );
}
