import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/api.js';
import { useLang } from '../../i18n/LanguageContext.jsx';

const empty = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await api.post('/contact', form);
      setStatus('success');
      setForm(empty);
    } catch (err) {
      setError(err.message || t('contact.error'));
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-20 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-brand/10 to-transparent" />
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: intro + info */}
          <div>
            <span className="section-eyebrow">{t('contact.eyebrow')}</span>
            <h2 className="h-section mt-3">{t('contact.title')}</h2>
            <p className="lead mt-4 max-w-md">{t('contact.subtitle')}</p>

            <div className="mt-10 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                {t('contact.reachus')}
              </h3>
              <a
                href="mailto:yanovasolutions@gmail.com"
                className="card flex items-center gap-4 p-4 transition hover:border-brand-cyan/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/20 text-brand-cyan">
                  <Mail size={20} />
                </span>
                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="font-medium text-white">yanovasolutions@gmail.com</p>
                </div>
              </a>
              <div className="card flex items-center gap-4 p-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/20 text-brand-cyan">
                  <MapPin size={20} />
                </span>
                <div>
                  <p className="text-xs text-slate-400">Location</p>
                  <p className="font-medium text-white">Algeria</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="card p-7 sm:p-9">
            {status === 'success' ? (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                <CheckCircle2 size={56} className="text-green-400" />
                <h3 className="mt-5 font-display text-2xl font-bold text-white">
                  {t('contact.success')}
                </h3>
                <button onClick={() => setStatus('idle')} className="btn-ghost mt-6">
                  ↺
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="name">{t('contact.name')}</label>
                    <input
                      id="name" name="name" required value={form.name} onChange={update}
                      className="input" placeholder="Ahmed…"
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="email">{t('contact.email')}</label>
                    <input
                      id="email" name="email" type="email" required value={form.email}
                      onChange={update} className="input" placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="subject">{t('contact.subject')}</label>
                  <input
                    id="subject" name="subject" value={form.subject} onChange={update}
                    className="input" placeholder="…"
                  />
                </div>
                <div>
                  <label className="label" htmlFor="message">{t('contact.message')}</label>
                  <textarea
                    id="message" name="message" required rows={5} value={form.message}
                    onChange={update} className="input resize-none" placeholder="…"
                  />
                </div>

                {status === 'error' && (
                  <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={status === 'sending'} className="btn-primary w-full">
                  {status === 'sending' ? t('contact.sending') : (
                    <>{t('contact.send')} <Send size={16} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
