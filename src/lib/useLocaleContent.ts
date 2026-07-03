'use client';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Loads site_content for a page, with locale suffix (e.g. 'home-en') falling back to 'home'
export function useLocaleContent(page: string, defaults: Record<string, string>): Record<string, string> {
  const { locale } = useLanguage();
  const [content, setContent] = useState<Record<string, string>>(defaults);

  useEffect(() => {
    const db = createClient();
    const localePage = locale !== 'pt' ? `${page}-${locale}` : page;

    async function load() {
      // Try locale-specific content first
      if (locale !== 'pt') {
        const { data: localeData } = await db.from('site_content').select('field,value').eq('page', localePage);
        if (localeData && localeData.length > 0) {
          const map = { ...defaults };
          for (const row of localeData) { if (row.value !== null) map[row.field] = row.value; }
          setContent(map);
          return;
        }
      }
      // Fallback to PT content
      const { data } = await db.from('site_content').select('field,value').eq('page', page);
      if (!data || data.length === 0) return;
      const map = { ...defaults };
      for (const row of data) { if (row.value !== null) map[row.field] = row.value; }
      setContent(map);
    }

    load();
  }, [page, locale]); // eslint-disable-line react-hooks/exhaustive-deps

  return content;
}

// Loads a single site_settings key, with locale suffix falling back to base key
export function useLocaleSetting<T>(key: string, defaultValue: T): T {
  const { locale } = useLanguage();
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    const db = createClient();
    const localeKey = locale !== 'pt' ? `${key}_${locale}` : key;

    async function load() {
      if (locale !== 'pt') {
        const { data } = await db.from('site_settings').select('value').eq('key', localeKey).single();
        if (data?.value) {
          try { setValue(typeof defaultValue === 'string' ? data.value : JSON.parse(data.value)); } catch (_e) { setValue(data.value as T); }
          return;
        }
      }
      const { data } = await db.from('site_settings').select('value').eq('key', key).single();
      if (data?.value) {
        try { setValue(typeof defaultValue === 'string' ? data.value : JSON.parse(data.value)); } catch (_e) { setValue(data.value as T); }
      }
    }

    load();
  }, [key, locale]); // eslint-disable-line react-hooks/exhaustive-deps

  return value;
}
