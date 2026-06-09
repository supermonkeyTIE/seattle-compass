'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { t, Translations } from '@/lib/translations';
import type { Lang } from '@/lib/types';

interface LanguageContextValue {
  lang: Lang;
  toggleLanguage: () => void;
  tr: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  toggleLanguage: () => {},
  tr: t.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('sc-lang') as Lang | null;
    if (saved === 'en' || saved === 'es') setLang(saved);
  }, []);

  function toggleLanguage() {
    const next: Lang = lang === 'en' ? 'es' : 'en';
    setLang(next);
    localStorage.setItem('sc-lang', next);
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, tr: t[lang] as Translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
