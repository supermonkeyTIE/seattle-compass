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
    <article className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-teal-900 px-5 py-4">
        <h3 className="text-white text-xl font-bold leading-tight">{org.name}</h3>
        <p className="text-teal-300 text-sm mt-0.5">{tr.organizations.since} {org.founded}</p>
      </div>

      <div className="p-5 space-y-4">
        <span className="inline-block bg-teal-100 text-teal-800 text-sm font-semibold px-3 py-1 rounded-full">
          {focus}
        </span>

        <p className="text-slate-700 text-base leading-relaxed">{desc}</p>

        <dl className="space-y-2 text-base">
          <div className="flex items-start gap-2">
            <dt className="font-semibold text-slate-500 w-20 shrink-0">Address</dt>
            <dd className="text-slate-800">{org.address}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="font-semibold text-slate-500 w-20 shrink-0">{tr.organizations.phone}</dt>
            <dd>
              <a href={`tel:${org.phone.replace(/[^0-9+]/g, '')}`} className="text-blue-700 hover:underline font-semibold">
                {org.phone}
              </a>
            </dd>
          </div>
        </dl>

        <a
          href={`https://${org.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-teal-700 hover:bg-teal-800 text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-base"
        >
          🌐 {tr.organizations.visitWebsite} ↗
        </a>
      </div>
    </article>
  );
}
