'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import OpportunityCard from '@/components/OpportunityCard';
import opportunities from '@/data/volunteer-opportunities.json';
import type { VolunteerOpportunity } from '@/lib/types';

const data = opportunities as VolunteerOpportunity[];

const CATEGORIES = ['All', 'Food', 'Shelter', 'Education', 'Jobs', 'Healthcare'];

export default function OpportunitiesPage() {
  const { tr } = useLanguage();
  const [catFilter, setCatFilter] = useState('All');
  const [hsOnly, setHsOnly] = useState(false);

  const filtered = data.filter(o => {
    if (catFilter !== 'All' && o.category !== catFilter) return false;
    if (hsOnly && !o.goodForHighSchool) return false;
    return true;
  });

  const catLabels: Record<string, string> = {
    All: tr.opportunities.filterAll,
    Food: tr.opportunities.filterFood,
    Shelter: tr.opportunities.filterShelter,
    Education: tr.opportunities.filterEducation,
    Jobs: tr.opportunities.filterJobs,
    Healthcare: tr.opportunities.filterHealth,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <Link href="/volunteer" className="text-green-700 hover:underline text-base font-medium">
          ← {tr.volunteer.title}
        </Link>
      </div>

      <div className="mb-8 mt-4">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3">{tr.opportunities.title}</h1>
        <p className="text-xl text-slate-600 max-w-2xl">{tr.opportunities.subtitle}</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8 flex flex-wrap items-center gap-3">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-base font-semibold transition-colors ${
                catFilter === cat
                  ? 'bg-green-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {catLabels[cat]}
            </button>
          ))}
        </div>

        {/* HS credit toggle */}
        <label className="flex items-center gap-2 ml-auto cursor-pointer">
          <input
            type="checkbox"
            checked={hsOnly}
            onChange={e => setHsOnly(e.target.checked)}
            className="w-5 h-5 text-indigo-600 rounded"
          />
          <span className="text-base font-medium text-slate-700">🎓 {tr.opportunities.goodForHS}</span>
        </label>
      </div>

      <p className="text-slate-500 text-base mb-6">
        {tr.resource.showing} <strong>{filtered.length}</strong> {tr.resource.resources}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(o => <OpportunityCard key={o.id} opportunity={o} />)}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500 text-lg">
          No opportunities match your filters. Try a different category.
        </div>
      )}
    </div>
  );
}
