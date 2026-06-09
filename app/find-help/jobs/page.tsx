'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import ResourceCard from '@/components/ResourceCard';
import jobs from '@/data/jobs.json';
import type { Resource } from '@/lib/types';

const data = jobs as Resource[];
const neighborhoods = ['All Neighborhoods', ...Array.from(new Set(data.map(r => r.neighborhood))).sort()];

export default function JobsPage() {
  const { tr } = useLanguage();
  const [filter, setFilter] = useState('All Neighborhoods');

  const filtered = filter === 'All Neighborhoods' ? data : data.filter(r => r.neighborhood === filter);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/find-help" className="text-blue-600 hover:underline text-base font-medium mb-6 inline-block">
        {tr.findHelp.backToHelp}
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl" aria-hidden="true">💼</span>
          <h1 className="text-4xl font-extrabold text-slate-900">{tr.jobs.title}</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">{tr.jobs.subtitle}</p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <label htmlFor="neighborhood-filter" className="font-semibold text-slate-700">
          {tr.resource.filterBy}
        </label>
        <select
          id="neighborhood-filter"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border-2 border-slate-300 rounded-xl px-4 py-2 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {neighborhoods.map(n => (
            <option key={n} value={n}>{n === 'All Neighborhoods' ? tr.resource.allNeighborhoods : n}</option>
          ))}
        </select>
        <span className="text-slate-500 text-base">
          {tr.resource.showing} <strong>{filtered.length}</strong> {tr.resource.resources}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(r => <ResourceCard key={r.id} resource={r} />)}
      </div>
    </div>
  );
}
