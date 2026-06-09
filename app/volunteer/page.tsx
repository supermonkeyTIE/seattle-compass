'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function VolunteerHubPage() {
  const { lang, tr } = useLanguage();

  const sections = [
    {
      href:    '/volunteer/opportunities',
      emoji:   '📋',
      title:   tr.volunteer.hubOpportunitiesTitle,
      desc:    tr.volunteer.hubOpportunitiesDesc,
      cta:     tr.volunteer.hubOpportunitiesCta,
      headerBg: 'bg-forest-700',
      ctaStyle: 'bg-forest-700 hover:bg-forest-800 text-white',
      textMuted: 'text-forest-100',
    },
    {
      href:    '/volunteer/hours',
      emoji:   '⏱',
      title:   tr.volunteer.hubHoursTitle,
      desc:    tr.volunteer.hubHoursDesc,
      cta:     tr.volunteer.hubHoursCta,
      headerBg: 'bg-amber-700',
      ctaStyle: 'bg-amber-700 hover:bg-amber-800 text-white',
      textMuted: 'text-amber-100',
    },
    {
      href:    '/volunteer/organizations',
      emoji:   '🏛️',
      title:   tr.volunteer.hubOrgsTitle,
      desc:    tr.volunteer.hubOrgsDesc,
      cta:     tr.volunteer.hubOrgsCta,
      headerBg: 'bg-terra-600',
      ctaStyle: 'bg-terra-600 hover:bg-terra-700 text-white',
      textMuted: 'text-terra-100',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-forest-800 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-forest-300 font-body font-semibold text-base uppercase tracking-widest mb-3">Seattle Compass</p>
          <h1 className="font-heading text-5xl font-bold mb-4 text-white">
            {lang === 'es' ? 'Haz la diferencia.' : 'Show up. Make a difference.'}
          </h1>
          <p className="text-forest-200 text-xl max-w-xl leading-relaxed">
            {lang === 'es'
              ? 'Seattle está lleno de vecinos que quieren ayudar. Únete a ellos.'
              : 'Seattle is full of neighbors who want to help. Here\'s how to join them.'}
          </p>
        </div>
      </section>

      {/* Nav cards */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map(s => (
            <div
              key={s.href}
              className="bg-white border-2 border-warm-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`${s.headerBg} px-6 py-6`}>
                <div className="text-4xl mb-2" aria-hidden="true">{s.emoji}</div>
                <h2 className="font-heading text-xl font-bold text-white mb-2">{s.title}</h2>
                <p className={`${s.textMuted} text-sm leading-snug`}>{s.desc}</p>
              </div>
              <div className="px-6 py-4">
                <Link href={s.href} className={`inline-block font-bold px-5 py-2.5 rounded-xl text-base transition-colors ${s.ctaStyle}`}>
                  {s.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why volunteer */}
      <section className="bg-cream-100 border-y border-cream-200 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-warm-900 mb-8 text-center">
            {lang === 'es' ? '¿Por qué hacer voluntariado aquí?' : 'Why volunteer through Seattle Compass?'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: '🎓',
                title: lang === 'es' ? 'Crédito para preparatoria' : 'High school credit',
                desc: lang === 'es'
                  ? 'Registra horas con verificación del supervisor para el crédito oficial de servicio comunitario.'
                  : 'Log hours with supervisor verification for official community service credit. Print a report anytime.',
              },
              {
                icon: '🌍',
                title: lang === 'es' ? 'Impacto real' : 'Real, tangible impact',
                desc: lang === 'es'
                  ? 'Trabaja directamente con organizaciones que alimentan familias, dan refugio a vecinos y construyen futuros.'
                  : 'Work directly with the orgs feeding families, housing neighbors, and teaching skills. You\'ll see it firsthand.',
              },
              {
                icon: '🤝',
                title: lang === 'es' ? 'Comunidad genuina' : 'Genuine community',
                desc: lang === 'es'
                  ? 'Conoce vecinos, construye habilidades y forma parte de la red de cuidado de Seattle.'
                  : 'Meet your neighbors, build skills, and become part of the web of care that holds Seattle together.',
              },
            ].map(item => (
              <div key={item.title} className="bg-white border border-warm-200 rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-heading text-lg font-bold text-warm-900 mb-2">{item.title}</h3>
                <p className="text-warm-600 text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
