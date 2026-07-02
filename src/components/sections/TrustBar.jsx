import { Award, BadgeCheck, Rocket, Stethoscope, Handshake } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext.jsx';

const items = [
  { icon: Award, key: 'trust.startup' },
  { icon: Rocket, key: 'trust.innovative' },
  { icon: BadgeCheck, key: 'trust.incubated' },
  { icon: Stethoscope, key: 'trust.hospital' },
  { icon: Handshake, key: 'trust.galattica' },
];

function Item({ icon: Icon, label }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 px-8">
      <Icon size={18} className="text-brand-cyan" />
      <span className="whitespace-nowrap text-sm font-medium text-slate-400">{label}</span>
    </div>
  );
}

export default function TrustBar() {
  const { t } = useLang();
  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.015] py-7">
      <div className="container-x">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
          {t('trust.label')}
        </p>
        <div className="marquee-mask relative overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((dup) => (
              <div className="flex items-center" key={dup} aria-hidden={dup === 1}>
                {items.map((it) => (
                  <Item key={`${dup}-${it.key}`} icon={it.icon} label={t(it.key)} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
