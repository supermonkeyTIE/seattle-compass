'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import CategoryCard from '@/components/CategoryCard';

export default function FindHelpPage() {
  const { lang, tr } = useLanguage();

  const categories = [
    { key: 'food'       as const, href: '/find-help/food',       color: 'food'       },
    { key: 'shelter'    as const, href: '/find-help/shelter',    color: 'shelter'    },
    { key: 'education'  as const, href: '/find-help/education',  color: 'education'  },
    { key: 'jobs'       as const, href: '/find-help/jobs',       color: 'jobs'       },
    { key: 'healthcare' as const, href: '/find-help/healthcare', color: 'healthcare' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-heading text-4xl font-bold text-warm-900 mb-3">{tr.findHelp.title}</h1>
      <p className="text-xl text-warm-600 max-w-2xl leading-relaxed mb-2">{tr.findHelp.subtitle}</p>
      <p className="text-base text-warm-500 mb-10">
        {lang === 'es'
          ? 'Todos los recursos son gratuitos. La mayoría no requieren identificación.'
          : 'Everything listed here is free. Most places don\'t ask for ID.'}
      </p>

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

      <div className="mt-10 bg-white border-2 border-terra-200 rounded-2xl p-6">
        <p className="text-warm-800 text-base leading-relaxed">
          <strong className="font-heading text-terra-700">Not sure where to start?</strong>{' '}
          {lang === 'es'
            ? 'Llame o envíe un texto al '
            : 'Call or text '}
          <a href="tel:211" className="font-extrabold text-terra-600 hover:underline">211</a>
          {lang === 'es'
            ? ' — gratis, confidencial, disponible las 24 horas en cualquier idioma. Ellos pueden ayudarle a encontrar lo que necesita.'
            : ' — free, confidential, 24/7, in any language. They\'ll help figure out exactly what you need.'}
        </p>
      </div>
    </div>
  );
}
