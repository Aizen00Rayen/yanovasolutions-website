import { ShieldCheck, ArrowRight, Terminal, Lock, Activity } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext.jsx';

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden pt-[70px]">
      {/* Background layers */}
      <div className="absolute inset-0 cyber-grid opacity-70" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-brand/25 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 top-52 h-[28rem] w-[28rem] rounded-full bg-brand-cyan/15 blur-[130px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-deep/30 to-brand-deep" />

      <div className="container-x relative grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        {/* Copy */}
        <div>
          <span className="section-eyebrow animate-fade-up">
            <span className="eyebrow-dot" />
            <span>{t('hero.badge')}</span>
          </span>

          <h1 className="heading mt-5 animate-fade-up text-[2.1rem] leading-[1.08] [animation-delay:60ms] sm:text-5xl sm:leading-[1.05] lg:text-[4rem]">
            {t('hero.title').split(' ').slice(0, -2).join(' ')}{' '}
            <span className="gradient-text">
              {t('hero.title').split(' ').slice(-2).join(' ')}
            </span>
          </h1>

          <p className="lead mt-6 max-w-xl animate-fade-up [animation-delay:120ms]">
            {t('hero.subtitle')}
          </p>

          <div className="mt-9 flex flex-wrap gap-4 animate-fade-up [animation-delay:180ms]">
            <button onClick={() => scrollTo('projects')} className="btn-primary">
              {t('hero.cta1')} <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollTo('contact')} className="btn-ghost">
              {t('hero.cta2')}
            </button>
          </div>

          <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 animate-fade-up [animation-delay:240ms] sm:gap-6">
            <Stat value="4" label={t('hero.stat1')} />
            <Stat value="2025" label={t('hero.stat2')} />
            <Stat value={t('hero.stat3v')} label={t('hero.stat3')} />
          </div>
        </div>

        {/* Visual — layered security console */}
        <div className="relative animate-fade-up [animation-delay:200ms]">
          <div className="absolute inset-0 -z-10 animate-float rounded-[2rem] bg-gradient-to-tr from-brand/40 to-brand-cyan/25 blur-2xl" />

          {/* Shield emblem */}
          <div className="pointer-events-none absolute -left-6 -top-6 z-20 hidden sm:block">
            <div className="glass flex h-16 w-16 items-center justify-center rounded-2xl shadow-glow">
              <ShieldCheck className="text-brand-cyan" size={30} />
            </div>
          </div>

          {/* Terminal card */}
          <div className="glass relative overflow-hidden rounded-2xl shadow-card">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
              <span className="ml-2 inline-flex items-center gap-1.5 text-xs text-slate-400">
                <Terminal size={12} /> cerberus-pi — live monitor
              </span>
            </div>
            {/* scan line */}
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-x-0 h-16 animate-scan bg-gradient-to-b from-brand-cyan/10 to-transparent" />
              <div className="space-y-2 overflow-x-auto p-4 font-mono text-[11px] leading-relaxed sm:p-5 sm:text-[13px] [&_p]:whitespace-nowrap">
                <p className="text-slate-500"># initializing intrusion engine…</p>
                <p className="text-brand-cyan">[IDS] engine ready · rules loaded: 1,284</p>
                <p className="text-green-400">[OK] interface eth0 · promiscuous mode</p>
                <p className="text-yellow-400">[WARN] port scan detected · 10.0.0.42</p>
                <p className="text-red-400">[IPS] blocked · 203.0.113.7 → :22</p>
                <p className="text-slate-400">[LOG] daily log pinned to IPFS ✓</p>
                <p className="flex items-center gap-1 text-brand-light">
                  <span className="text-green-400">yanova@cerberus</span>:~$
                  <span className="inline-block h-4 w-2 animate-glow bg-brand-cyan" />
                </p>
              </div>
            </div>
            {/* status strip */}
            <div className="grid grid-cols-3 gap-px border-t border-white/10 bg-white/[0.02] text-center">
              <MiniStat icon={<Activity size={14} />} label="Threats blocked" value="128" />
              <MiniStat icon={<Lock size={14} />} label="Uptime" value="99.9%" />
              <MiniStat icon={<ShieldCheck size={14} />} label="Status" value="Protected" green />
            </div>
          </div>
        </div>
      </div>

      {/* trust footnote */}
      <div className="container-x relative pb-10">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-600">
          {t('hero.trust')}
        </p>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold text-white sm:text-3xl">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">{label}</div>
    </div>
  );
}

function MiniStat({ icon, label, value, green }) {
  return (
    <div className="px-3 py-4">
      <div className="mb-1 flex items-center justify-center gap-1.5 text-brand-cyan">{icon}</div>
      <div className={`font-display text-sm font-bold ${green ? 'text-green-400' : 'text-white'}`}>
        {value}
      </div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wide text-slate-500">{label}</div>
    </div>
  );
}
