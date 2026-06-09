'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import HoursLogger from '@/components/HoursLogger';

export default function HoursPage() {
  const { tr } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-2">
        <Link href="/volunteer" className="text-green-700 hover:underline text-base font-medium">
          ← {tr.volunteer.title}
        </Link>
      </div>

      <div className="mb-8 mt-4">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3">{tr.hours.title}</h1>
        <p className="text-xl text-slate-600 max-w-2xl">{tr.hours.subtitle}</p>
      </div>

      <HoursLogger />
    </div>
  );
}
