'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import CategoryCard from '@/components/CategoryCard';

export default function FindHelpPage() {
  const { tr } = useLanguage();

  const categories = [
    { key: 'food' as const, href: '/find-help/food', color: 'food' },
    { key: 'shelter' as const, href: '/find-help/shelter', color: 'shelter' },
    { key: 'education' as const, href: '/find-help/education', color: 'education' },
    { key: 'jobs' as const, href: '/find-help/jobs', color: 'jobs' },
    { key: 'healthcare' as const, href: '/find-help/healthcare', color: 'healthcare' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3">{tr.findHelp.title}</h1>
        <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">{tr.findHelp.subtitle}</p>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map(cat => {
          const info = tr.findHelp.categories[cat.key];
          return (
            <CategoryCard
              key={cat.key}
              href={cat.href}
              emoji={info.emoji}
              title={info.title}
              desc={info.desc}
              color={cat.color}
            />
          );
        })}
      </div>

      {/* Note */}
      <div className="mt-10 bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <p className="text-blue-900 text-base leading-relaxed">
          <strong>Need immediate help?</strong> Call or text <a href="tel:211" className="font-extrabold text-red-700 hover:underline">211</a> —
          free, confidential, 24/7. They can connect you to food, shelter, healthcare, and more in your language.
        </p>
      </div>
    </div>
  );
}
