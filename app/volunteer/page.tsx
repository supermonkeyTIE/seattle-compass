'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function VolunteerHubPage() {
  const { tr } = useLanguage();

  const sections = [
    {
      href: '/volunteer/opportunities',
      emoji: '📋',
      title: tr.volunteer.hubOpportunitiesTitle,
      desc: tr.volunteer.hubOpportunitiesDesc,
      cta: tr.volunteer.hubOpportunitiesCta,
      gradient: 'from-green-700 to-green-900',
      textColor: 'text-green-700',
    },
    {
      href: '/volunteer/hours',
      emoji: '⏱',
      title: tr.volunteer.hubHoursTitle,
      desc: tr.volunteer.hubHoursDesc,
      cta: tr.volunteer.hubHoursCta,
      gradient: 'from-indigo-700 to-indigo-900',
      textColor: 'text-indigo-700',
    },
    {
      href: '/volunteer/organizations',
      emoji: '🏛️',
      title: tr.volunteer.hubOrgsTitle,
      desc: tr.volunteer.hubOrgsDesc,
      cta: tr.volunteer.hubOrgsCta,
      gradient: 'from-teal-700 to-teal-900',
      textColor: 'text-teal-700',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4" aria-hidden="true">🌱</div>
          <h1 className="text-5xl font-extrabold mb-3">{tr.volunteer.title}</h1>
          <p className="text-xl text-green-200 max-w-xl mx-auto">{tr.volunteer.subtitle}</p>
        </div>
      </section>

      {/* Nav cards */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map(s => (
            <Link
              key={s.href}
              href={s.href}
              className="group block bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <div className={`bg-gradient-to-br ${s.gradient} p-8 text-white`}>
                <div className="text-5xl mb-3" aria-hidden="true">{s.emoji}</div>
                <h2 className="text-2xl font-extrabold mb-2">{s.title}</h2>
                <p className="text-white/80 text-base leading-snug">{s.desc}</p>
              </div>
              <div className="p-5 flex items-center justify-between">
                <span className={`${s.textColor} font-bold text-lg`}>{s.cta}</span>
                <span className={`${s.textColor} text-2xl opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all`}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why volunteer */}
      <section className="bg-white border-t border-slate-200 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Why Volunteer with Seattle Compass?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              { icon: '🎓', title: 'High School Credit', desc: 'Log hours for official high school community service credit with supervisor verification.' },
              { icon: '🌍', title: 'Real Impact', desc: 'Work directly with organizations feeding families, sheltering neighbors, and building futures.' },
              { icon: '🤝', title: 'Build Community', desc: 'Connect with neighbors, build skills, and become part of Seattle\'s network of care.' },
            ].map(item => (
              <div key={item.title} className="bg-slate-50 rounded-2xl p-5">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-slate-600 text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
