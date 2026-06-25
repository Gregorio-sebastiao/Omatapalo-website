'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import PageEditor from '@/components/admin/PageEditor';
import { use } from 'react';

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const supabase = createClient();
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    supabase.from('pages').select('*').eq('id', id).single().then(({ data }) => setPage(data));
  }, [id]);

  if (!page) return <div style={{ padding: 40, color: '#64748b' }}>A carregar...</div>;
  return <PageEditor page={page} />;
}
