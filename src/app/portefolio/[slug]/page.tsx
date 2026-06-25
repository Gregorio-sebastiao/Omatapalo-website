import { createClient } from '@supabase/supabase-js';
import PortefolioContent from './PortefolioContent';

export async function generateStaticParams() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase.from('portfolio_projects').select('slug').eq('published', true);
    return (data ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  return <PortefolioContent slug={params.slug} />;
}
