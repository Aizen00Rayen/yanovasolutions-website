import { useEffect, useState, useCallback } from 'react';
import { Mail, MailOpen, Trash2, User, Clock, AtSign } from 'lucide-react';
import { api } from '../../lib/api.js';
import { useLang } from '../../i18n/LanguageContext.jsx';
import { formatDate } from '../../components/BlogCard.jsx';

export default function AdminMessages() {
  const { t, lang } = useLang();
  const [messages, setMessages] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    api
      .get('/contact', true)
      .then((d) => {
        setMessages(d.messages || []);
        setUnread(d.unread || 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleRead = async (m) => {
    await api.patch(`/contact/${m.id}/read`, { is_read: m.is_read ? 0 : 1 }, true);
    load();
  };

  const remove = async (m) => {
    if (!window.confirm(t('admin.confirmdelete'))) return;
    await api.del(`/contact/${m.id}`, true);
    load();
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">{t('admin.messages.title')}</h1>
          <p className="mt-1 text-sm text-slate-400">
            {messages.length} · <span className="text-brand-cyan">{unread} {t('admin.messages.unread')}</span>
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-cyan border-t-transparent" />
        </div>
      ) : messages.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-20 text-slate-400">
          <Mail size={40} className="mb-3 opacity-50" />
          {t('admin.messages.empty')}
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`card p-5 transition ${m.is_read ? 'opacity-80' : 'border-brand-cyan/40'}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                      {m.is_read ? <MailOpen size={15} className="text-slate-400" /> : <Mail size={15} className="text-brand-cyan" />}
                      <User size={14} className="text-slate-400" /> {m.name}
                    </span>
                    <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 text-brand-cyan hover:underline">
                      <AtSign size={13} /> {m.email}
                    </a>
                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      <Clock size={13} /> {formatDate(m.created_at, lang)}
                    </span>
                  </div>
                  {m.subject && <p className="mt-3 font-medium text-slate-200">{m.subject}</p>}
                  <p className="mt-1.5 whitespace-pre-wrap text-slate-300">{m.message}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => toggleRead(m)}
                    className="rounded-lg border border-white/10 p-2 text-slate-300 transition hover:border-brand-cyan hover:text-brand-cyan"
                    title={m.is_read ? t('admin.markunread') : t('admin.markread')}
                  >
                    {m.is_read ? <Mail size={16} /> : <MailOpen size={16} />}
                  </button>
                  <button
                    onClick={() => remove(m)}
                    className="rounded-lg border border-white/10 p-2 text-red-300 transition hover:border-red-400 hover:bg-red-500/10"
                    title={t('admin.delete')}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
