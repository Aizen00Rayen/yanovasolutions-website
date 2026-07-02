import { Target, Eye, Users } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext.jsx';
import Reveal from '../Reveal.jsx';

const team = ['HOUARI Abdellah Rayen', 'BELLADGHAM Aya'];

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="relative scroll-mt-20 py-20 lg:py-28">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="section-eyebrow">{t('about.eyebrow')}</span>
            <h2 className="h-section mt-3">{t('about.title')}</h2>
            <p className="lead mt-6">{t('about.body')}</p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="flex items-center gap-2 font-semibold text-white">
                <Users size={18} className="text-brand-cyan" /> {t('about.team.t')}
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {team.map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-4"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                      {name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                    </span>
                    <span className="text-sm text-slate-200">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="grid gap-6">
            <InfoCard
              icon={<Target size={22} />}
              title={t('about.mission.t')}
              body={t('about.mission.b')}
            />
            <InfoCard
              icon={<Eye size={22} />}
              title={t('about.vision.t')}
              body={t('about.vision.b')}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, body }) {
  return (
    <div className="card group relative overflow-hidden p-7 transition hover:border-brand-cyan/40">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-cyan/10 blur-2xl transition group-hover:bg-brand-cyan/20" />
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/20 text-brand-cyan">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-slate-300">{body}</p>
    </div>
  );
}
