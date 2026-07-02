import { Compass, Globe2, GraduationCap, PackageOpen, Activity, Wrench } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext.jsx';
import Reveal from '../Reveal.jsx';

const services = [
  { icon: Compass, t: 'svc.consulting.t', b: 'svc.consulting.b' },
  { icon: Globe2, t: 'svc.web.t', b: 'svc.web.b' },
  { icon: GraduationCap, t: 'svc.training.t', b: 'svc.training.b' },
  { icon: PackageOpen, t: 'svc.equipment.t', b: 'svc.equipment.b' },
  { icon: Activity, t: 'svc.soc.t', b: 'svc.soc.b' },
  { icon: Wrench, t: 'svc.custom.t', b: 'svc.custom.b' },
];

export default function Services() {
  const { t } = useLang();
  return (
    <section id="services" className="relative scroll-mt-20 py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">{t('services.eyebrow')}</span>
          <h2 className="h-section mt-3">{t('services.title')}</h2>
          <p className="lead mt-4">{t('services.subtitle')}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, t: tt, b }, i) => (
            <Reveal key={tt} delay={(i % 3) * 90} className="h-full">
              <div className="card group relative h-full overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/40 hover:shadow-glow">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand-cyan ring-1 ring-inset ring-brand-cyan/20 transition group-hover:bg-brand group-hover:text-white">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white">{t(tt)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{t(b)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
