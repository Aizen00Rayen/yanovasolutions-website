import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, FileText, Eye, EyeOff } from 'lucide-react';
import { api } from '../../lib/api.js';
import { useLang } from '../../i18n/LanguageContext.jsx';
import { localized, formatDate } from '../../components/BlogCard.jsx';

export default function AdminBlogs() {
  const { t, lang } = useLang();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    api
      .get('/blogs/all', true)
      .then((d) => setBlogs(d.blogs || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (b) => {
    if (!window.confirm(t('admin.confirmdelete'))) return;
    await api.del(`/blogs/${b.id}`, true);
    load();
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-bold text-white">{t('admin.blogs.title')}</h1>
        <Link to="/admin/blogs/new" className="btn-primary !px-5 !py-2.5 text-sm">
          <Plus size={16} /> {t('admin.blogs.new')}
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-cyan border-t-transparent" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-20 text-slate-400">
          <FileText size={40} className="mb-3 opacity-50" />
          {t('admin.blogs.empty')}
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map((b) => (
            <div key={b.id} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-white">{localized(b, 'title', lang)}</h3>
                  {b.published ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2.5 py-0.5 text-xs font-medium text-green-400">
                      <Eye size={11} /> {t('admin.blogs.published')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/15 px-2.5 py-0.5 text-xs font-medium text-yellow-400">
                      <EyeOff size={11} /> {t('admin.blogs.draft')}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-400">
                  /{b.slug} · {formatDate(b.created_at, lang)}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Link
                  to={`/admin/blogs/${b.id}/edit`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:border-brand-cyan hover:text-brand-cyan"
                >
                  <Pencil size={15} /> {t('admin.blogs.edit')}
                </Link>
                <button
                  onClick={() => remove(b)}
                  className="rounded-lg border border-white/10 p-2 text-red-300 transition hover:border-red-400 hover:bg-red-500/10"
                  title={t('admin.delete')}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
