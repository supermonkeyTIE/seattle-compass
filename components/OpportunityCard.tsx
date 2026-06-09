'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { VolunteerOpportunity, SignupRecord } from '@/lib/types';
import SignupModal from './SignupModal';

const CATEGORY_STYLES: Record<string, string> = {
  Food:       'bg-terra-100 text-terra-700 border-terra-300',
  Shelter:    'bg-sky-100 text-sky-800 border-sky-300',
  Education:  'bg-amber-100 text-amber-800 border-amber-300',
  Jobs:       'bg-forest-100 text-forest-700 border-green-300',
  Healthcare: 'bg-rose-100 text-rose-800 border-rose-300',
};

const ACCENT_BORDERS: Record<string, string> = {
  Food:       'border-l-terra-500',
  Shelter:    'border-l-sky-500',
  Education:  'border-l-amber-500',
  Jobs:       'border-l-forest-600',
  Healthcare: 'border-l-rose-500',
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
  const catStyle = CATEGORY_STYLES[opportunity.category] ?? 'bg-warm-100 text-warm-700 border-warm-300';
  const accentBorder = ACCENT_BORDERS[opportunity.category] ?? 'border-l-warm-500';

  return (
    <>
      <article className={`bg-white rounded-2xl shadow-sm border border-warm-200 border-l-4 ${accentBorder} overflow-hidden hover:shadow-md transition-shadow flex flex-col`}>
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="font-heading text-xl font-bold text-warm-900 leading-tight">{title}</h3>
            <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${catStyle}`}>
              {opportunity.category}
            </span>
          </div>
          <p className="text-warm-600 text-sm font-semibold">{opportunity.organization}</p>
        </div>

        <div className="px-5 pb-5 flex flex-col flex-1 space-y-4">
          <p className="text-warm-700 text-base leading-relaxed">{desc}</p>

          {/* Details */}
          <dl className="space-y-2 text-base">
            <div className="flex items-start gap-2">
              <span className="text-base mt-0.5" aria-hidden="true">📅</span>
              <dd className="text-warm-800">{schedule}</dd>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-base mt-0.5" aria-hidden="true">⏱</span>
              <dd className="text-warm-800">{commitment}</dd>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-base mt-0.5" aria-hidden="true">📍</span>
              <dd className="text-warm-800">{opportunity.location}</dd>
            </div>
          </dl>

          {skills.length > 0 && (
            <div>
              <p className="font-semibold text-warm-500 text-sm mb-1.5">Helpful to have</p>
              <ul className="flex flex-wrap gap-1.5">
                {skills.map(s => (
                  <li key={s} className="text-sm bg-cream-100 border border-cream-200 text-warm-700 px-2.5 py-0.5 rounded-full">{s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 pt-2 mt-auto">
            <div className="flex flex-col gap-1">
              <span className={`text-sm font-bold ${opportunity.spotsAvailable <= 3 ? 'text-terra-600' : 'text-forest-600'}`}>
                {opportunity.spotsAvailable === 1 ? '1 spot left' : `${opportunity.spotsAvailable} spots open`}
              </span>
              {opportunity.goodForHighSchool && (
                <span className="text-xs text-amber-700 font-semibold">🎓 Great for HS credit</span>
              )}
            </div>

            <button
              onClick={() => setShowModal(true)}
              disabled={signedUp}
              className={`px-5 py-2.5 rounded-xl font-bold text-base transition-colors ${
                signedUp
                  ? 'bg-forest-100 text-forest-700 cursor-default border border-forest-400'
                  : 'bg-forest-700 hover:bg-forest-800 text-white'
              }`}
            >
              {signedUp ? '✓ You\'re signed up!' : tr.opportunities.signUp}
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
