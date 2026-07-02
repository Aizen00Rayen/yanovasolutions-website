import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Handshake, Save, X, ExternalLink, AlertCircle } from 'lucide-react';
import { api } from '../../lib/api.js';
import { useLang } from '../../i18n/LanguageContext.jsx';

const emptyForm = { name: '', logo_url: '', website_url: '', sort_order: 0 };

export default function AdminPartners() {
  const { t } = useLang();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | 'new' | id
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    api
      .get('/partners')
      .then((d) => setPartners(d.partners || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openNew = () => {
    setForm({ ...emptyForm, sort_order: partners.length });
    setError('');
    setEditing('new');
  };
  const openEdit = (p) => {
    setForm({
      name: p.name || '',
      logo_url: p.logo_url || '',
      website_url: p.website_url || '',
      sort_order: p.sort_order || 0,
    });
    setError('');
    setEditing(p.id);
  };
  const close = () => {
    setEditing(null);
    setForm(emptyForm);
    setError('');
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError(t('admin.partners.namereq'));
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = { ...form, sort_order: Number(form.sort_order) || 0 };
      if (editing === 'new') await api.post('/partners', payload, true);
      else await api.put(`/partners/${editing}`, payload, true);
      close();
      setLoading(true);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p) => {
    if (!window.confirm(t('admin.confirmdelete'))) return;
    await api.del(`/partners/${p.id}`, true);
    load();
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">{t('admin.partners.title')}</h1>
          <p className="mt-1 text-sm text-slate-400">{t('admin.partners.subtitle')}</p>
        </div>
        {!editing && (
          <button onClick={openNew} className="btn-primary !px-5 !py-2.5 text-sm">
            <Plus size={16} /> {t('admin.partners.new')}
          </button>
        )}
      </div>

      {/* Editor form */}
      {editing && (
        <form onSubmit={save} className="card mb-6 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label">{t('admin.partners.name')}</label>
              <input className="input" value={form.name} onChange={set('name')} autoFocus required />
            </div>
            <div>
              <label className="label">{t('admin.partners.logo')}</label>
              <input className="input" value={form.logo_url} onChange={set('logo_url')} placeholder="https://…/logo.png" />
            </div>
            <div>
              <label className="label">{t('admin.partners.website')}</label>
              <input className="input" value={form.website_url} onChange={set('website_url')} placeholder="https://…" />
            </div>
            <div>
              <label className="label">{t('admin.partners.order')}</label>
              <input type="number" className="input" value={form.sort_order} onChange={set('sort_order')} />
            </div>
          </div>

          {form.logo_url && (
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3">
              <span className="text-xs text-slate-500">Preview:</span>
              <img src={form.logo_url} alt="preview" className="h-8 max-w-[140px] object-contain" />
            </div>
          )}

          {error && (
            <p className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              <AlertCircle size={16} /> {error}
            </p>
          )}

          <div className="mt-5 flex gap-3">
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? t('admin.partners.saving') : (<>{t('admin.partners.save')} <Save size={16} /></>)}
            </button>
            <button type="button" onClick={close} className="btn-ghost">
              <X size={16} /> {t('admin.partners.cancel')}
            </button>
          </div>
        </form>
      )}

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-cyan border-t-transparent" />
        </div>
      ) : partners.length === 0 && !editing ? (
        <div className="card flex flex-col items-center justify-center py-20 text-slate-400">
          <Handshake size={40} className="mb-3 opacity-50" />
          {t('admin.partners.empty')}
        </div>
      ) : (
        <div className="space-y-3">
          {partners.map((p) => (
            <div key={p.id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="flex h-12 w-24 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02]">
                  {p.logo_url ? (
                    <img src={p.logo_url} alt={p.name} className="h-8 max-w-[80px] object-contain" />
                  ) : (
                    <span className="text-xs text-slate-500">{t('admin.partners.nologo')}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white">{p.name}</p>
                  {p.website_url && (
                    <a href={p.website_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-brand-cyan hover:underline">
                      <ExternalLink size={12} /> {p.website_url.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => openEdit(p)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:border-brand-cyan hover:text-brand-cyan"
                >
                  <Pencil size={15} /> {t('admin.partners.edit')}
                </button>
                <button
                  onClick={() => remove(p)}
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
