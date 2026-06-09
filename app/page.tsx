'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import hotlines from '@/data/hotlines.json';

export default function HomePage() {
  const { lang, tr } = useLanguage();

  const categories = [
    { key: 'food'       as const, href: '/find-help/food',       color: 'food'       },
    { key: 'shelter'    as const, href: '/find-help/shelter',    color: 'shelter'    },
    { key: 'education'  as const, href: '/find-help/education',  color: 'education'  },
    { key: 'jobs'       as const, href: '/find-help/jobs',       color: 'jobs'       },
    { key: 'healthcare' as const, href: '/find-help/healthcare', color: 'healthcare' },
  ];

  const categoryBg: Record<string, string> = {
    food:       'bg-terra-100 border-terra-400 text-terra-900 hover:bg-terra-200',
    shelter:    'bg-sky-100 border-sky-400 text-sky-900 hover:bg-sky-200',
    education:  'bg-amber-100 border-amber-400 text-amber-900 hover:bg-amber-200',
    jobs:       'bg-forest-100 border-forest-400 text-forest-900 hover:bg-green-100',
    healthcare: 'bg-rose-100 border-rose-400 text-rose-900 hover:bg-rose-200',
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-warm-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-terra-200 font-body font-semibold text-base uppercase tracking-widest mb-3">Seattle Compass</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-5 leading-tight text-white">
            {lang === 'es'
              ? 'Tu vecindario está aquí para ti.'
              : 'Your neighbors are\nhere for you.'}
          </h1>
          <p className="text-warm-200 text-xl max-w-xl leading-relaxed font-body">
            {lang === 'es'
              ? 'Una guía gratuita para encontrar comida, refugio, atención médica, trabajo y voluntariado en Seattle.'
              : 'A free guide to food, shelter, healthcare, jobs, and volunteering in Seattle — no sign-up, no catch.'}
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href="/find-help"
              className="inline-block bg-terra-500 hover:bg-terra-600 text-white font-bold text-lg px-7 py-3.5 rounded-xl transition-colors shadow-sm"
            >
              {tr.home.findHelpCta} →
            </Link>
            <Link
              href="/volunteer"
              className="inline-block bg-white/10 hover:bg-white/20 text-white font-bold text-lg px-7 py-3.5 rounded-xl transition-colors border border-white/20"
            >
              {tr.home.volunteerCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Two main sections */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Find Help */}
          <div className="bg-white border-2 border-warm-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-terra-600 px-7 py-6">
              <div className="text-4xl mb-2" aria-hidden="true">🤝</div>
              <h2 className="font-heading text-2xl font-bold text-white mb-2">{tr.home.findHelpTitle}</h2>
              <p className="text-terra-100 text-base leading-relaxed">{tr.home.findHelpDesc}</p>
            </div>
            <div className="px-7 py-5">
              <p className="text-warm-600 text-sm mb-4">
                {lang === 'es'
                  ? 'Sin preguntas, sin papeleo, sin juicios. Solo ayuda real cerca de usted.'
                  : 'No judgment, no paperwork. Just real help, right here in Seattle.'}
              </p>
              <Link
                href="/find-help"
                className="inline-block bg-terra-600 hover:bg-terra-700 text-white font-bold px-5 py-2.5 rounded-xl text-base transition-colors"
              >
                {tr.home.findHelpCta} →
              </Link>
            </div>
          </div>

          {/* Volunteer */}
          <div className="bg-white border-2 border-warm-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-forest-700 px-7 py-6">
              <div className="text-4xl mb-2" aria-hidden="true">🌱</div>
              <h2 className="font-heading text-2xl font-bold text-white mb-2">{tr.home.volunteerTitle}</h2>
              <p className="text-forest-100 text-base leading-relaxed">{tr.home.volunteerDesc}</p>
            </div>
            <div className="px-7 py-5">
              <p className="text-warm-600 text-sm mb-4">
                {lang === 'es'
                  ? 'Unas pocas horas pueden cambiar la semana de alguien. Aquí se explica cómo.'
                  : 'A few hours can change someone\'s week. Here\'s how to get started.'}
              </p>
              <Link
                href="/volunteer"
                className="inline-block bg-forest-700 hover:bg-forest-800 text-white font-bold px-5 py-2.5 rounded-xl text-base transition-colors"
              >
                {tr.home.volunteerCta} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick category grid */}
      <section className="bg-cream-100 border-y border-cream-200 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-warm-800 mb-2">{tr.home.categoriesTitle}</h2>
          <p className="text-warm-600 text-base mb-7">
            {lang === 'es'
              ? 'Elige una categoría para encontrar recursos en tu zona.'
              : 'Pick a category and find free resources near you.'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {categories.map(cat => {
              const info = tr.findHelp.categories[cat.key];
              return (
                <Link
                  key={cat.key}
                  href={cat.href}
                  className={`border-2 rounded-2xl p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-sm ${categoryBg[cat.color]}`}
                >
                  <div className="text-3xl mb-2" aria-hidden="true">{info.emoji}</div>
                  <div className="font-heading font-bold text-sm leading-tight">{info.title}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Hotlines */}
      <section className="bg-warm-900 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-7">
            <h2 className="font-heading text-2xl font-bold text-white mb-1">
              {lang === 'es' ? 'Líneas de Emergencia' : 'Emergency Hotlines'}
            </h2>
            <p className="text-warm-300 text-base">
              {lang === 'es'
                ? 'Todas gratuitas. Todas confidenciales. Disponibles las 24 horas.'
                : 'All free. All confidential. Real people answer, any time of day or night.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotlines.map(h => (
              <a
                key={h.id}
                href={`tel:${h.phone.replace(/[^0-9+]/g, '')}`}
                className="block bg-warm-800 hover:bg-warm-700 rounded-2xl p-5 transition-colors border border-warm-700 group"
              >
                <div className="font-heading text-2xl font-bold text-yellow-300 mb-1 group-hover:text-yellow-200">
                  {h.phone}
                </div>
                <div className="font-semibold text-white text-base leading-tight mb-2">
                  {lang === 'es' ? h.name_es : h.name}
                </div>
                <div className="text-warm-300 text-sm leading-snug">
                  {lang === 'es' ? h.description_es : h.description}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
