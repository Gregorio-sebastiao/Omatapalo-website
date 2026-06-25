'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import PostEditor from '@/components/admin/PostEditor';
import { use } from 'react';

export default function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const supabase = createClient();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    supabase.from('posts').select('*').eq('id', id).single().then(({ data }) => setPost(data));
  }, [id]);

  if (!post) return <div style={{ padding: 40, color: '#64748b' }}>A carregar...</div>;
  return <PostEditor post={post} />;
}
