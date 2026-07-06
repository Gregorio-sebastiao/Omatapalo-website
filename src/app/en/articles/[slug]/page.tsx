import { createClient } from '@supabase/supabase-js';
import ArticleContent from '@/components/ArticleContent';

export async function generateStaticParams() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase.from('post_translations').select('slug').eq('lang', 'en');
    return (data ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function EnArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticleContent slug={slug} lang="en" />;
}
