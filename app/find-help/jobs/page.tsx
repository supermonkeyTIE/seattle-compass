'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import ResourceCard from '@/components/ResourceCard';
import jobs from '@/data/jobs.json';
import type { Resource } from '@/lib/types';

const data = jobs as Resource[];
const neighborhoods = ['All', ...Array.from(new Set(data.map(r => r.neighborhood))).sort()];

export default function JobsPage() {
  const { tr } = useLanguage();
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? data : data.filter(r => r.neighborhood === filter);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/find-help" className="text-terra-600 hover:underline text-base font-semibold mb-6 inline-block">
        {tr.findHelp.backToHelp}
      </Link>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl" aria-hidden="true">💼</span>
          <h1 className="font-heading text-4xl font-bold text-warm-900">{tr.jobs.title}</h1>
        </div>
        <p className="text-lg text-warm-600 max-w-2xl leading-relaxed">{tr.jobs.subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="font-semibold text-warm-700 text-base">{tr.resource.filterBy}</span>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="border-2 border-warm-300 rounded-xl px-4 py-2 text-base text-warm-900 bg-white focus:outline-none focus:ring-2 focus:ring-terra-400">
          {neighborhoods.map(n => <option key={n} value={n}>{n === 'All' ? tr.resource.allNeighborhoods : n}</option>)}
        </select>
        <span className="text-warm-500 text-base">{tr.resource.showing} <strong>{filtered.length}</strong> {tr.resource.resources}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(r => <ResourceCard key={r.id} resource={r} accentColor="border-l-forest-600" />)}
      </div>
    </div>
  );
}
