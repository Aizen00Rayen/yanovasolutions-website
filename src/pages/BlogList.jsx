import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { useLang } from '../i18n/LanguageContext.jsx';
import BlogCard from '../components/BlogCard.jsx';

export default function BlogList() {
  const { t } = useLang();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/blogs')
      .then((d) => setBlogs(d.blogs || []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-[70px]">
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="absolute inset-0 cyber-grid opacity-40" />
        <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
        <div className="container-x relative text-center">
          <span className="section-eyebrow">{t('blog.eyebrow')}</span>
          <h1 className="heading mt-3 text-4xl sm:text-5xl">{t('blog.title')}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">{t('blog.subtitle')}</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-cyan border-t-transparent" />
            </div>
          ) : blogs.length === 0 ? (
            <p className="py-20 text-center text-slate-400">{t('blog.empty')}</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((b) => (
                <BlogCard key={b.id} blog={b} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
