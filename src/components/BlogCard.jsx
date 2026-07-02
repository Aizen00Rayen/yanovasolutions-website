import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';

// Picks the right localized field (e.g. title_en / title_fr).
export function localized(blog, field, lang) {
  return blog[`${field}_${lang}`] || blog[`${field}_en`] || '';
}

export function formatDate(iso, lang) {
  if (!iso) return '';
  const d = new Date(iso.replace(' ', 'T') + 'Z');
  return d.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogCard({ blog }) {
  const { t, lang } = useLang();
  const title = localized(blog, 'title', lang);
  const excerpt = localized(blog, 'excerpt', lang);
  const tags = (blog.tags || '').split(',').map((s) => s.trim()).filter(Boolean).slice(0, 2);

  return (
    <Link
      to={`/blog/${blog.slug}`}
      className="card group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:border-brand-cyan/40"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-brand/30 to-brand-deep">
        {blog.cover_image ? (
          <img
            src={blog.cover_image}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="cyber-grid flex h-full w-full items-center justify-center opacity-90">
            <img src="/logo.png" alt="" className="h-16 w-16 object-contain opacity-80" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={12} /> {formatDate(blog.created_at, lang)}
          </span>
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-brand-cyan/10 px-2 py-0.5 text-brand-cyan">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg font-bold text-white transition group-hover:text-brand-cyan">
          {title}
        </h3>
        {excerpt && <p className="mt-2 flex-1 text-sm text-slate-300 line-clamp-3">{excerpt}</p>}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan">
          {t('blog.read')} <ArrowRight size={15} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
