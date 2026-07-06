import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function gt(text: string, lang: string): Promise<string> {
  if (!text?.trim()) return text ?? '';
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=pt&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const data = await fetch(url).then(r => r.json());
    return data[0]?.map((c: [string]) => c[0]).join('') ?? text;
  } catch {
    return text;
  }
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function uniqueSlug(base: string, lang: string, excludePostId?: string): Promise<string> {
  let candidate = base;
  let n = 0;
  while (true) {
    const q = supabase
      .from('post_translations')
      .select('post_id')
      .eq('lang', lang)
      .eq('slug', candidate);
    if (excludePostId) q.neq('post_id', excludePostId);
    const { data } = await q;
    if (!data || data.length === 0) return candidate;
    n++;
    candidate = `${base}-${n}`;
  }
}

export async function POST(req: NextRequest) {
  const { postId } = await req.json().catch(() => ({}));
  if (!postId) return NextResponse.json({ error: 'postId required' }, { status: 400 });

  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, content')
    .eq('id', postId)
    .single();

  if (error || !post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  const [enTitle, enExcerpt, enContent, frTitle, frExcerpt, frContent] = await Promise.all([
    gt(post.title, 'en'),
    gt(post.excerpt ?? '', 'en'),
    gt(post.content ?? '', 'en'),
    gt(post.title, 'fr'),
    gt(post.excerpt ?? '', 'fr'),
    gt(post.content ?? '', 'fr'),
  ]);

  const enSlugBase = slugify(enTitle) || `${post.slug}-en`;
  const frSlugBase = slugify(frTitle) || `${post.slug}-fr`;

  const [enSlug, frSlug] = await Promise.all([
    uniqueSlug(enSlugBase, 'en', postId),
    uniqueSlug(frSlugBase, 'fr', postId),
  ]);

  const { error: upsertErr } = await supabase.from('post_translations').upsert(
    [
      { post_id: postId, lang: 'en', title: enTitle, slug: enSlug, excerpt: enExcerpt, content: enContent, translated_at: new Date().toISOString() },
      { post_id: postId, lang: 'fr', title: frTitle, slug: frSlug, excerpt: frExcerpt, content: frContent, translated_at: new Date().toISOString() },
    ],
    { onConflict: 'post_id,lang' }
  );

  if (upsertErr) return NextResponse.json({ error: upsertErr.message }, { status: 500 });

  return NextResponse.json({ ok: true, en: { title: enTitle, slug: enSlug }, fr: { title: frTitle, slug: frSlug } });
}
