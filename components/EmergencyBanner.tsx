'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function EmergencyBanner() {
  const { tr } = useLanguage();

  return (
    <div className="bg-terra-700 text-white py-2.5 px-4 text-center" role="banner" aria-label="Emergency resources">
      <p className="text-base font-body leading-tight">
        {tr.emergency.prefix}{' '}
        <a
          href="tel:211"
          className="font-bold text-yellow-200 hover:text-yellow-100 underline underline-offset-2 text-xl mx-1"
          aria-label="Call 211 for help"
        >
          {tr.emergency.phone}
        </a>
        {' '}<span className="text-terra-200">{tr.emergency.suffix}</span>
      </p>
    </div>
  );
}
