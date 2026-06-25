'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import ProjectEditor from '@/components/admin/ProjectEditor';
import { use } from 'react';

export default function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const supabase = createClient();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    supabase.from('portfolio_projects').select('*').eq('id', id).single().then(({ data }) => setProject(data));
  }, [id]);

  if (!project) return <div style={{ padding: 40, color: '#64748b' }}>A carregar...</div>;
  return <ProjectEditor project={project} />;
}
