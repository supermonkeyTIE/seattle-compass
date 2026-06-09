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
    setTimeout(() => { onSuccess(); onClose(); }, 2200);
  }

  const inputClass = (field: string) =>
    `w-full border-2 rounded-xl px-4 py-3 text-base text-warm-900 bg-white focus:outline-none focus:ring-2 focus:ring-terra-400 transition-colors ${
      errors[field as keyof typeof errors] ? 'border-red-400' : 'border-warm-300 focus:border-terra-400'
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-900/70"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-title"
    >
      <div className="bg-cream-50 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-warm-200">
        <div className="bg-forest-700 text-white px-6 py-5 rounded-t-2xl flex items-start justify-between gap-4">
          <div>
            <h2 id="signup-title" className="font-heading text-xl font-bold">{tr.signup.title}</h2>
            <p className="text-forest-200 text-sm mt-0.5">{title} · {opportunity.organization}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-forest-300 hover:text-white text-3xl leading-none mt-0.5 font-light"
          >
            ×
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <p className="font-heading text-xl font-bold text-forest-700">{tr.signup.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
            <p className="text-warm-600 text-base">{tr.signup.subtitle}</p>

            <div>
              <label htmlFor="signup-name" className="block text-base font-bold text-warm-800 mb-1.5">
                {tr.signup.name} <span className="text-terra-500">*</span>
              </label>
              <input id="signup-name" type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder={tr.signup.namePlaceholder} className={inputClass('name')} autoComplete="name" />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-base font-bold text-warm-800 mb-1.5">
                {tr.signup.email} <span className="text-terra-500">*</span>
              </label>
              <input id="signup-email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder={tr.signup.emailPlaceholder} className={inputClass('email')} autoComplete="email" />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="signup-phone" className="block text-base font-bold text-warm-800 mb-1.5">
                {tr.signup.phone}
              </label>
              <input id="signup-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                placeholder={tr.signup.phonePlaceholder} className={inputClass('phone')} autoComplete="tel" />
            </div>

            <div>
              <label htmlFor="signup-message" className="block text-base font-bold text-warm-800 mb-1.5">
                {tr.signup.message}
              </label>
              <textarea id="signup-message" value={message} onChange={e => setMessage(e.target.value)}
                placeholder={tr.signup.messagePlaceholder} rows={3}
                className={`${inputClass('message')} resize-none`} />
            </div>

            <div className="flex gap-3 pt-1">
              <button type="submit"
                className="flex-1 bg-forest-700 hover:bg-forest-800 text-white font-bold py-3 px-6 rounded-xl text-lg transition-colors">
                {tr.signup.submit}
              </button>
              <button type="button" onClick={onClose}
                className="flex-1 bg-warm-100 hover:bg-warm-200 text-warm-800 font-semibold py-3 px-6 rounded-xl text-lg transition-colors border border-warm-300">
                {tr.signup.cancel}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
