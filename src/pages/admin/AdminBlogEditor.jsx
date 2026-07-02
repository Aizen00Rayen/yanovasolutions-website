import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { api } from '../../lib/api.js';
import { useLang } from '../../i18n/LanguageContext.jsx';

const emptyForm = {
  title_en: '', title_fr: '',
  excerpt_en: '', excerpt_fr: '',
  content_en: '', content_fr: '',
  cover_image: '', tags: '',
  published: true,
};

export default function AdminBlogEditor() {
  const { t } = useLang();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    api
      .get(`/blogs/id/${id}`, true)
      .then((d) => {
        const b = d.blog;
        setForm({
          title_en: b.title_en || '', title_fr: b.title_fr || '',
          excerpt_en: b.excerpt_en || '', excerpt_fr: b.excerpt_fr || '',
          content_en: b.content_en || '', content_fr: b.content_fr || '',
          cover_image: b.cover_image || '', tags: b.tags || '',
          published: b.published === 1,
        });
      })
      .catch(() => setError('Could not load the post.'))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const set = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title_en || !form.title_fr || !form.content_en || !form.content_fr) {
      setError(t('admin.editor.required'));
      return;
    }
    setSaving(true);
    try {
      if (isEdit) await api.put(`/blogs/${id}`, form, true);
      else await api.post('/blogs', form, true);
      navigate('/admin/blogs');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-cyan border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link to="/admin/blogs" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-brand-cyan">
        <ArrowLeft size={16} /> {t('admin.nav.blogs')}
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">
        {isEdit ? t('admin.editor.edittitle') : t('admin.editor.newtitle')}
      </h1>

      <form onSubmit={submit} className="mt-8 space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label={t('admin.editor.titleen')}>
            <input className="input" value={form.title_en} onChange={set('title_en')} required />
          </Field>
          <Field label={t('admin.editor.titlefr')}>
            <input className="input" value={form.title_fr} onChange={set('title_fr')} required />
          </Field>
          <Field label={t('admin.editor.excerpten')}>
            <textarea className="input resize-none" rows={2} value={form.excerpt_en} onChange={set('excerpt_en')} />
          </Field>
          <Field label={t('admin.editor.excerptfr')}>
            <textarea className="input resize-none" rows={2} value={form.excerpt_fr} onChange={set('excerpt_fr')} />
          </Field>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Field label={t('admin.editor.contenten')}>
            <textarea className="input resize-y font-mono text-sm" rows={12} value={form.content_en} onChange={set('content_en')} required />
          </Field>
          <Field label={t('admin.editor.contentfr')}>
            <textarea className="input resize-y font-mono text-sm" rows={12} value={form.content_fr} onChange={set('content_fr')} required />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label={t('admin.editor.cover')}>
            <input className="input" value={form.cover_image} onChange={set('cover_image')} placeholder="https://…" />
          </Field>
          <Field label={t('admin.editor.tags')}>
            <input className="input" value={form.tags} onChange={set('tags')} placeholder="IDS, Network Security" />
          </Field>
        </div>

        <label className="flex items-center gap-3 text-slate-200">
          <input
            type="checkbox"
            checked={form.published}
            onChange={set('published')}
            className="h-5 w-5 rounded border-white/20 bg-white/5 accent-brand"
          />
          {t('admin.editor.published')}
        </label>

        {error && (
          <p className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            <AlertCircle size={16} /> {error}
          </p>
        )}

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? t('admin.editor.saving') : (<>{t('admin.editor.save')} <Save size={16} /></>)}
          </button>
          <Link to="/admin/blogs" className="btn-ghost">{t('admin.editor.cancel')}</Link>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}
