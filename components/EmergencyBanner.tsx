'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function EmergencyBanner() {
  const { tr } = useLanguage();

  return (
    <div className="bg-red-700 text-white py-3 px-4 text-center" role="banner" aria-label="Emergency resources">
      <p className="text-lg font-bold leading-tight">
        {tr.emergency.prefix}{' '}
        <a
          href="tel:211"
          className="underline text-yellow-200 hover:text-yellow-100 text-2xl font-extrabold mx-1"
          aria-label="Call 211 for help"
        >
          {tr.emergency.phone}
        </a>
        {' '}{tr.emergency.suffix}
      </p>
    </div>
  );
}
