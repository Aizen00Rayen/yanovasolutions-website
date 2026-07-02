import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar } from 'lucide-react';
import { api } from '../lib/api.js';
import { useLang } from '../i18n/LanguageContext.jsx';
import { localized, formatDate } from '../components/BlogCard.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const [blog, setBlog] = useState(null);
  const [state, setState] = useState('loading'); // loading | ok | notfound

  useEffect(() => {
    setState('loading');
    api
      .get(`/blogs/${slug}`)
      .then((d) => {
        setBlog(d.blog);
        setState('ok');
      })
      .catch(() => setState('notfound'));
  }, [slug]);

  if (state === 'loading') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-[70px]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-cyan border-t-transparent" />
      </div>
    );
  }

  if (state === 'notfound') {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-[70px] text-center">
        <p className="text-2xl font-semibold text-white">{t('blog.notfound')}</p>
        <Link to="/blog" className="btn-ghost mt-6">
          <ArrowLeft size={16} /> {t('blog.back')}
        </Link>
      </div>
    );
  }

  const title = localized(blog, 'title', lang);
  const content = localized(blog, 'content', lang);
  const tags = (blog.tags || '').split(',').map((s) => s.trim()).filter(Boolean);

  return (
    <article className="pt-[70px]">
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="pointer-events-none absolute -top-20 right-10 h-72 w-72 rounded-full bg-brand/20 blur-[110px]" />
        <div className="container-x relative py-14">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-brand-cyan">
            <ArrowLeft size={16} /> {t('blog.back')}
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} /> {t('blog.published')} {formatDate(blog.created_at, lang)}
            </span>
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-brand-cyan/10 px-3 py-1 text-brand-cyan">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="heading mt-4 max-w-3xl text-3xl sm:text-4xl lg:text-5xl">{title}</h1>
        </div>
      </div>

      {blog.cover_image && (
        <div className="container-x">
          <img
            src={blog.cover_image}
            alt={title}
            className="mt-8 max-h-[420px] w-full rounded-2xl object-cover"
          />
        </div>
      )}

      <div className="container-x py-12">
        <div className="prose-yanova mx-auto max-w-3xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
