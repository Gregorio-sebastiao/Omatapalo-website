'use client';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export function useContent(page: string, defaults: Record<string, string>): Record<string, string> {
  const [content, setContent] = useState<Record<string, string>>(defaults);

  useEffect(() => {
    createClient()
      .from('site_content')
      .select('field,value')
      .eq('page', page)
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        const map = { ...defaults };
        for (const row of data) {
          if (row.value !== null) map[row.field] = row.value;
        }
        setContent(map);
      });
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  return content;
}
