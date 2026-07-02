import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { translations } from './translations.js';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const stored = typeof localStorage !== 'undefined' && localStorage.getItem('yanova_lang');
    return stored === 'fr' || stored === 'en' ? stored : 'en';
  });

  useEffect(() => {
    localStorage.setItem('yanova_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang] ?? entry.en ?? key;
    },
    [lang]
  );

  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'fr' : 'en')), []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
