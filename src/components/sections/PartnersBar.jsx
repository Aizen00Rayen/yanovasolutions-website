import { useEffect, useState } from 'react';
import { useLang } from '../../i18n/LanguageContext.jsx';
import { api } from '../../lib/api.js';

// Single partner chip: logo image if provided, otherwise the styled name.
function PartnerItem({ partner }) {
  const inner = partner.logo_url ? (
    <img
      src={partner.logo_url}
      alt={partner.name}
      className="h-9 max-w-[150px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
      loading="lazy"
    />
  ) : (
    <span className="whitespace-nowrap font-display text-lg font-semibold text-slate-400 transition hover:text-white">
      {partner.name}
    </span>
  );

  return (
    <div className="flex shrink-0 items-center px-10">
      {partner.website_url ? (
        <a href={partner.website_url} target="_blank" rel="noreferrer" className="flex items-center">
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  );
}

export default function PartnersBar() {
  const { t } = useLang();
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    api
      .get('/partners')
      .then((d) => setPartners(d.partners || []))
      .catch(() => setPartners([]));
  }, []);

  // Hide the belt entirely when there are no partners.
  if (partners.length === 0) return null;

  // Duplicate the list so the marquee scrolls seamlessly. If only a few
  // partners, center them without animation.
  const enoughToScroll = partners.length >= 5;

  return (
    <section className="relative border-b border-white/[0.06] bg-white/[0.01] py-8">
      <div className="container-x">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
          {t('partners.label')}
        </p>

        {enoughToScroll ? (
          <div className="marquee-mask relative overflow-hidden">
            <div className="flex w-max animate-marquee">
              {[0, 1].map((dup) => (
                <div className="flex items-center" key={dup} aria-hidden={dup === 1}>
                  {partners.map((p) => (
                    <PartnerItem key={`${dup}-${p.id}`} partner={p} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6">
            {partners.map((p) => (
              <PartnerItem key={p.id} partner={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
