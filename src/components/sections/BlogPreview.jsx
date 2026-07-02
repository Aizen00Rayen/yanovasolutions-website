import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { api } from '../../lib/api.js';
import { useLang } from '../../i18n/LanguageContext.jsx';
import BlogCard from '../BlogCard.jsx';

export default function BlogPreview() {
  const { t } = useLang();
  const [blogs, setBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api
      .get('/blogs')
      .then((d) => setBlogs((d.blogs || []).slice(0, 3)))
      .catch(() => setBlogs([]))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <section id="blog" className="relative scroll-mt-20 py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">{t('blog.eyebrow')}</span>
            <h2 className="h-section mt-3">{t('blog.title')}</h2>
            <p className="lead mt-4">{t('blog.subtitle')}</p>
          </div>
          <Link to="/blog" className="btn-ghost shrink-0">
            {t('blog.readall')} <ArrowRight size={16} />
          </Link>
        </div>

        {loaded && blogs.length === 0 ? (
          <p className="mt-12 text-slate-400">{t('blog.empty')}</p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b) => (
              <BlogCard key={b.id} blog={b} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
