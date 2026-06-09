'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { VolunteerOpportunity, SignupRecord } from '@/lib/types';

interface Props {
  opportunity: VolunteerOpportunity;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SignupModal({ opportunity, onClose, onSuccess }: Props) {
  const { lang, tr } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const title = lang === 'es' ? opportunity.title_es : opportunity.title;

  function validate() {
    const e: typeof errors = {};
    if (!name.trim()) e.name = tr.signup.required;
    if (!email.trim() || !email.includes('@')) e.email = tr.signup.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const record: SignupRecord = {
      opportunityId: opportunity.id,
      opportunityTitle: opportunity.title,
      organization: opportunity.organization,
      volunteerName: name.trim(),
      volunteerEmail: email.trim(),
      volunteerPhone: phone.trim() || undefined,
      message: message.trim() || undefined,
      signedUpAt: new Date().toISOString(),
    };

    const existing: SignupRecord[] = JSON.parse(localStorage.getItem('sc-signups') ?? '[]');
    existing.push(record);
    localStorage.setItem('sc-signups', JSON.stringify(existing));

    setSubmitted(true);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 2000);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-950 text-white px-6 py-4 rounded-t-2xl flex items-start justify-between gap-4">
          <div>
            <h2 id="signup-title" className="text-xl font-bold">{tr.signup.title}</h2>
            <p className="text-blue-300 text-sm mt-0.5">{title} · {opportunity.organization}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-blue-300 hover:text-white text-2xl leading-none mt-0.5"
          >
            ×
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-xl font-bold text-green-700">{tr.signup.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
            <p className="text-slate-600">{tr.signup.subtitle}</p>

            <div>
              <label htmlFor="signup-name" className="block text-base font-semibold text-slate-700 mb-1">
                {tr.signup.name} <span className="text-red-600">*</span>
              </label>
              <input
                id="signup-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={tr.signup.namePlaceholder}
                className={`w-full border-2 rounded-xl px-4 py-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
                autoComplete="name"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-base font-semibold text-slate-700 mb-1">
                {tr.signup.email} <span className="text-red-600">*</span>
              </label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={tr.signup.emailPlaceholder}
                className={`w-full border-2 rounded-xl px-4 py-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                autoComplete="email"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="signup-phone" className="block text-base font-semibold text-slate-700 mb-1">
                {tr.signup.phone}
              </label>
              <input
                id="signup-phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder={tr.signup.phonePlaceholder}
                className="w-full border-2 border-slate-300 rounded-xl px-4 py-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="tel"
              />
            </div>

            <div>
              <label htmlFor="signup-message" className="block text-base font-semibold text-slate-700 mb-1">
                {tr.signup.message}
              </label>
              <textarea
                id="signup-message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder={tr.signup.messagePlaceholder}
                rows={3}
                className="w-full border-2 border-slate-300 rounded-xl px-4 py-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-colors"
              >
                {tr.signup.submit}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-6 rounded-xl text-lg transition-colors border border-slate-300"
              >
                {tr.signup.cancel}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
