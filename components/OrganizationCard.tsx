'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import type { PartnerOrg } from '@/lib/types';

interface Props {
  org: PartnerOrg;
}

export default function OrganizationCard({ org }: Props) {
  const { lang, tr } = useLanguage();
  const desc = lang === 'es' ? org.description_es : org.description;
  const focus = lang === 'es' ? org.focusArea_es : org.focusArea;

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-warm-200 border-l-4 border-l-forest-600 overflow-hidden hover:shadow-md transition-shadow">
      <div className="px-5 pt-5 pb-3">
        <h3 className="font-heading text-xl font-bold text-warm-900 leading-tight mb-0.5">{org.name}</h3>
        <p className="text-warm-500 text-sm">Since {org.founded}</p>
      </div>

      <div className="px-5 pb-5 space-y-4">
        <span className="inline-block bg-forest-100 text-forest-700 border border-forest-400 text-sm font-bold px-3 py-1 rounded-full">
          {focus}
        </span>

        <p className="text-warm-700 text-base leading-relaxed">{desc}</p>

        <dl className="space-y-2 text-base">
          <div className="flex items-start gap-2">
            <span className="text-base mt-0.5" aria-hidden="true">📍</span>
            <dd className="text-warm-800">{org.address}</dd>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-base mt-0.5" aria-hidden="true">📞</span>
            <dd>
              <a href={`tel:${org.phone.replace(/[^0-9+]/g, '')}`} className="text-terra-600 hover:underline font-semibold">
                {org.phone}
              </a>
            </dd>
          </div>
        </dl>

        <a
          href={`https://${org.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-warm-100 hover:bg-warm-200 text-warm-800 font-bold py-2.5 px-4 rounded-xl transition-colors text-base border border-warm-300"
        >
          Visit {org.name} ↗
        </a>
      </div>
    </article>
  );
}
