import { Cpu, MonitorCog, Radar, Server, Check, Star } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext.jsx';
import Reveal from '../Reveal.jsx';

const projects = [
  {
    key: 'cerberus',
    icon: Cpu,
    flagship: true,
    features: ['proj.cerberus.f1', 'proj.cerberus.f2', 'proj.cerberus.f3', 'proj.cerberus.f4'],
  },
  {
    key: 'yanovaos',
    icon: MonitorCog,
    features: ['proj.yanovaos.f1', 'proj.yanovaos.f2', 'proj.yanovaos.f3', 'proj.yanovaos.f4'],
  },
  {
    key: 'reconone',
    icon: Radar,
    features: ['proj.reconone.f1', 'proj.reconone.f2', 'proj.reconone.f3', 'proj.reconone.f4'],
  },
  {
    key: 'nas',
    icon: Server,
    features: ['proj.nas.f1', 'proj.nas.f2', 'proj.nas.f3', 'proj.nas.f4'],
  },
];

export default function Projects() {
  const { t } = useLang();
  const flagship = projects.find((p) => p.flagship);
  const others = projects.filter((p) => !p.flagship);

  return (
    <section id="projects" className="relative scroll-mt-20 py-20 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">{t('projects.eyebrow')}</span>
          <h2 className="h-section mt-3">{t('projects.title')}</h2>
          <p className="lead mt-4">{t('projects.subtitle')}</p>
        </Reveal>

        {/* Flagship — Cerberus Pi */}
        <Reveal>
          <FlagshipCard project={flagship} />
        </Reveal>

        {/* Other three products */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {others.map((p, i) => (
            <Reveal key={p.key} delay={i * 100} className="h-full">
              <ProductCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlagshipCard({ project }) {
  const { t } = useLang();
  const Icon = project.icon;
  return (
    <div className="card group relative mt-14 overflow-hidden p-8 lg:p-10">
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-cyan/10 blur-3xl" />
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white">
              <Icon size={28} />
            </span>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-cyan/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-cyan">
                <Star size={12} /> {t('projects.flagship')}
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold text-white">
                {t('proj.cerberus.name')}
              </h3>
            </div>
          </div>
          <p className="mt-2 text-sm font-medium uppercase tracking-wide text-brand-cyan">
            {t('proj.cerberus.tag')}
          </p>
          <p className="mt-4 text-slate-300">{t('proj.cerberus.desc')}</p>

          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {project.features.map((f) => (
              <Feature key={f} label={t(f)} />
            ))}
          </div>
        </div>

        {/* Device visual */}
        <div className="relative flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-xs rounded-3xl border border-white/10 bg-gradient-to-br from-brand/20 to-brand-deep p-8">
            <div className="cyber-grid absolute inset-0 rounded-3xl opacity-40" />
            <div className="relative flex h-full flex-col items-center justify-center gap-4">
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-brand-cyan/30 bg-brand-deep/60 shadow-lg shadow-brand/30">
                <Icon size={52} className="animate-glow text-brand-cyan" />
              </div>
              <div className="text-center">
                <p className="font-mono text-xs text-slate-400">STATUS</p>
                <p className="font-display text-lg font-bold text-green-400">● PROTECTED</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ project }) {
  const { t } = useLang();
  const Icon = project.icon;
  return (
    <div className="card group relative flex h-full flex-col overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/40 hover:shadow-glow">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand/10 blur-2xl transition group-hover:bg-brand-cyan/20" />
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/20 text-brand-cyan">
        <Icon size={24} />
      </span>
      <h3 className="mt-5 font-display text-xl font-bold text-white">{t(`proj.${project.key}.name`)}</h3>
      <p className="mt-1 text-sm font-medium uppercase tracking-wide text-brand-cyan/90">
        {t(`proj.${project.key}.tag`)}
      </p>
      <p className="mt-3 flex-1 text-sm text-slate-300">{t(`proj.${project.key}.desc`)}</p>
      <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
        {project.features.map((f) => (
          <Feature key={f} label={t(f)} small />
        ))}
      </div>
    </div>
  );
}

function Feature({ label, small }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-cyan/15 text-brand-cyan">
        <Check size={12} />
      </span>
      <span className={small ? 'text-sm text-slate-300' : 'text-slate-200'}>{label}</span>
    </div>
  );
}
