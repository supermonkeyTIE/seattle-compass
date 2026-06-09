'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { VolunteerOpportunity, SignupRecord } from '@/lib/types';
import SignupModal from './SignupModal';

const CATEGORY_COLORS: Record<string, string> = {
  Food: 'bg-orange-100 text-orange-800',
  Shelter: 'bg-blue-100 text-blue-800',
  Education: 'bg-violet-100 text-violet-800',
  Jobs: 'bg-emerald-100 text-emerald-800',
  Healthcare: 'bg-rose-100 text-rose-800',
};

interface Props {
  opportunity: VolunteerOpportunity;
}

export default function OpportunityCard({ opportunity }: Props) {
  const { lang, tr } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  useEffect(() => {
    const signups: SignupRecord[] = JSON.parse(localStorage.getItem('sc-signups') ?? '[]');
    setSignedUp(signups.some(s => s.opportunityId === opportunity.id));
  }, [opportunity.id]);

  const title = lang === 'es' ? opportunity.title_es : opportunity.title;
  const desc = lang === 'es' ? opportunity.description_es : opportunity.description;
  const schedule = lang === 'es' ? opportunity.schedule_es : opportunity.schedule;
  const commitment = lang === 'es' ? opportunity.commitment_es : opportunity.commitment;
  const skills = lang === 'es' ? opportunity.skillsNeeded_es : opportunity.skillsNeeded;
  const catColor = CATEGORY_COLORS[opportunity.category] ?? 'bg-slate-100 text-slate-700';

  return (
    <>
      <article className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
        {/* Header */}
        <div className="bg-green-900 px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-white text-xl font-bold leading-tight">{title}</h3>
            <span className={`shrink-0 text-sm font-semibold px-2.5 py-1 rounded-full ${catColor}`}>
              {opportunity.category}
            </span>
          </div>
          <p className="text-green-300 text-sm mt-1 font-medium">{opportunity.organization}</p>
        </div>

        <div className="p-5 flex flex-col flex-1 space-y-4">
          <p className="text-slate-700 text-base leading-relaxed">{desc}</p>

          {/* Details grid */}
          <dl className="space-y-2 text-base">
            <div className="flex items-start gap-2">
              <dt className="font-semibold text-slate-500 w-24 shrink-0">📅 {tr.opportunities.schedule}</dt>
              <dd className="text-slate-800">{schedule}</dd>
            </div>
            <div className="flex items-start gap-2">
              <dt className="font-semibold text-slate-500 w-24 shrink-0">⏱ {tr.opportunities.commitment}</dt>
              <dd className="text-slate-800">{commitment}</dd>
            </div>
            <div className="flex items-start gap-2">
              <dt className="font-semibold text-slate-500 w-24 shrink-0">📍 {tr.opportunities.location}</dt>
              <dd className="text-slate-800">{opportunity.location}</dd>
            </div>
          </dl>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <p className="font-semibold text-slate-600 text-sm mb-1.5">✅ {tr.opportunities.skills}</p>
              <ul className="flex flex-wrap gap-1.5">
                {skills.map(s => (
                  <li key={s} className="text-sm bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">{s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 pt-2 mt-auto">
            <div className="flex flex-col gap-0.5">
              <span className={`text-sm font-semibold ${opportunity.spotsAvailable <= 3 ? 'text-red-600' : 'text-green-700'}`}>
                {opportunity.spotsAvailable === 1 ? tr.opportunities.oneSpot : `${opportunity.spotsAvailable} ${tr.opportunities.spotsLeft}`}
              </span>
              {opportunity.goodForHighSchool && (
                <span className="text-xs text-indigo-700 font-semibold">🎓 {tr.opportunities.goodForHS}</span>
              )}
            </div>

            <button
              onClick={() => setShowModal(true)}
              disabled={signedUp}
              className={`px-5 py-2.5 rounded-xl font-bold text-base transition-colors ${
                signedUp
                  ? 'bg-green-100 text-green-700 cursor-default border border-green-300'
                  : 'bg-green-700 hover:bg-green-800 text-white'
              }`}
            >
              {signedUp ? tr.opportunities.alreadySignedUp : tr.opportunities.signUp}
            </button>
          </div>
        </div>
      </article>

      {showModal && (
        <SignupModal
          opportunity={opportunity}
          onClose={() => setShowModal(false)}
          onSuccess={() => setSignedUp(true)}
        />
      )}
    </>
  );
}
