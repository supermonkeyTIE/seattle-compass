'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import OrganizationCard from '@/components/OrganizationCard';
import orgs from '@/data/partner-organizations.json';
import type { PartnerOrg } from '@/lib/types';

const data = orgs as PartnerOrg[];

export default function OrganizationsPage() {
  const { tr } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-2">
        <Link href="/volunteer" className="text-green-700 hover:underline text-base font-medium">
          ← {tr.volunteer.title}
        </Link>
      </div>

      <div className="mb-8 mt-4">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3">{tr.organizations.title}</h1>
        <p className="text-xl text-slate-600 max-w-2xl">{tr.organizations.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map(org => <OrganizationCard key={org.id} org={org} />)}
      </div>
    </div>
  );
}
