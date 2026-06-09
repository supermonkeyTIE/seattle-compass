'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import hotlines from '@/data/hotlines.json';

export default function HomePage() {
  const { lang, tr } = useLanguage();

  const categories = [
    { key: 'food', href: '/find-help/food', color: 'from-orange-500 to-red-600' },
    { key: 'shelter', href: '/find-help/shelter', color: 'from-blue-600 to-blue-800' },
    { key: 'education', href: '/find-help/education', color: 'from-violet-600 to-purple-800' },
    { key: 'jobs', href: '/find-help/jobs', color: 'from-emerald-600 to-green-800' },
    { key: 'healthcare', href: '/find-help/healthcare', color: 'from-rose-500 to-pink-700' },
  ] as const;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-7xl mb-4" aria-hidden="true">🧭</div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            {tr.home.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            {tr.home.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Two main section cards */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Find Help */}
          <Link
            href="/find-help"
            className="group block bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
          >
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-8 text-white">
              <div className="text-5xl mb-3" aria-hidden="true">🤝</div>
              <h2 className="text-3xl font-extrabold mb-2">{tr.home.findHelpTitle}</h2>
              <p className="text-blue-200 text-lg leading-snug">{tr.home.findHelpDesc}</p>
            </div>
            <div className="p-5 flex items-center justify-between">
              <span className="text-blue-700 font-bold text-lg">{tr.home.findHelpCta}</span>
              <span className="text-blue-400 text-2xl group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Volunteer */}
          <Link
            href="/volunteer"
            className="group block bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
          >
            <div className="bg-gradient-to-br from-green-700 to-green-900 p-8 text-white">
              <div className="text-5xl mb-3" aria-hidden="true">🌱</div>
              <h2 className="text-3xl font-extrabold mb-2">{tr.home.volunteerTitle}</h2>
              <p className="text-green-200 text-lg leading-snug">{tr.home.volunteerDesc}</p>
            </div>
            <div className="p-5 flex items-center justify-between">
              <span className="text-green-700 font-bold text-lg">{tr.home.volunteerCta}</span>
              <span className="text-green-400 text-2xl group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Quick category grid */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">{tr.home.categoriesTitle}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map(cat => {
            const info = tr.findHelp.categories[cat.key];
            return (
              <Link
                key={cat.key}
                href={cat.href}
                className={`bg-gradient-to-br ${cat.color} text-white rounded-2xl p-4 text-center hover:opacity-90 hover:-translate-y-0.5 transition-all shadow`}
              >
                <div className="text-3xl mb-2" aria-hidden="true">{info.emoji}</div>
                <div className="font-bold text-sm leading-tight">{info.title}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Emergency Hotlines section */}
      <section className="bg-red-950 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            🆘 {lang === 'es' ? 'Líneas de Emergencia' : 'Emergency Hotlines'} — 24/7
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotlines.map(h => (
              <a
                key={h.id}
                href={`tel:${h.phone.replace(/[^0-9+]/g, '')}`}
                className="block bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition-colors border border-white/20"
              >
                <div className="text-xl font-extrabold text-yellow-300">{h.phone}</div>
                <div className="font-bold text-white text-base mt-0.5">
                  {lang === 'es' ? h.name_es : h.name}
                </div>
                <div className="text-red-200 text-sm mt-1 leading-snug">
                  {lang === 'es' ? h.description_es : h.description}
                </div>
                <div className="text-yellow-400 text-xs mt-2 font-semibold">{h.available}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
