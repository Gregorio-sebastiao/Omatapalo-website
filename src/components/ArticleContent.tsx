'use client';

import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/client';

type Translation = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  translated_at: string;
  posts: {
    id: string;
    cover_image: string;
    category: string;
    created_at: string;
  };
};

type SideCard = { title: string; slug: string; cover_image: string; translated_at: string };

function formatContent(html: string) {
  if (!/<(p|h[1-6]|ul|ol|blockquote|div)[^>]*>/i.test(html)) {
    return html.split(/\n{2,}/).map(p => p.trim()).filter(Boolean).map(p => `<p>${p.replace(/\n/g, '<br />')}</p>`).join('');
  }
  return html;
}

function fmtDate(iso: string, lang: string) {
  const loc = lang === 'fr' ? 'fr-FR' : 'en-GB';
  return new Date(iso).toLocaleDateString(loc, { day: '2-digit', month: 'long', year: 'numeric' });
}

const STRINGS = {
  en: { back: '← Back to news', latest: 'Latest News', prev: '‹ Previous', next: 'Next ›', nav: 'Navigation', share: 'Share', notFound: 'Article not found', loading: 'Loading...', listHref: '/en/articles' },
  fr: { back: '← Retour aux actualités', latest: 'Dernières Actualités', prev: '‹ Précédent', next: 'Suivant ›', nav: 'Navigation', share: 'Partager', notFound: 'Article non trouvé', loading: 'Chargement...', listHref: '/fr/articles' },
};

export default function ArticleContent({ slug, lang }: { slug: string; lang: 'en' | 'fr' }) {
  const s = STRINGS[lang];
  const [item, setItem] = useState<Translation | null>(null);
  const [prev, setPrev] = useState<{ title: string; slug: string } | null>(null);
  const [next, setNext] = useState<{ title: string; slug: string } | null>(null);
  const [latest, setLatest] = useState<SideCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    const db = createClient();
    db.from('post_translations')
      .select('title, slug, excerpt, content, translated_at, posts!inner(id, cover_image, category, created_at)')
      .eq('lang', lang)
      .eq('slug', slug)
      .single()
      .then(async ({ data }) => {
        if (!data) { setNotFound(true); setLoading(false); return; }
        const t = data as unknown as Translation;
        setItem(t);

        // prev/next by translated_at order
        const [{ data: p }, { data: n }] = await Promise.all([
          db.from('post_translations').select('title, slug').eq('lang', lang).lt('translated_at', t.translated_at).order('translated_at', { ascending: false }).limit(1).single(),
          db.from('post_translations').select('title, slug').eq('lang', lang).gt('translated_at', t.translated_at).order('translated_at', { ascending: true }).limit(1).single(),
        ]);
        setPrev(p ?? null);
        setNext(n ?? null);

        // latest sidebar
        const { data: lat } = await db.from('post_translations')
          .select('title, slug, translated_at, posts!inner(cover_image)')
          .eq('lang', lang)
          .neq('slug', slug)
          .order('translated_at', { ascending: false })
          .limit(4);
        setLatest((lat ?? []) as unknown as SideCard[]);
        setLoading(false);
      });
  }, [slug, lang]);

  if (loading) return (
    <><Nav /><main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#94a3b8', fontSize: 14 }}>{s.loading}</span></main><Footer /></>
  );

  if (notFound || !item) return (
    <><Nav />
    <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', color: '#0f1a2e' }}>{s.notFound}</h1>
      <a href={s.listHref} style={{ color: '#1a396e', fontSize: 14, fontWeight: 600 }}>{s.back}</a>
    </main><Footer /></>
  );

  const coverImage = item.posts?.cover_image;
  const createdAt = item.posts?.created_at ?? item.translated_at;

  return (
    <>
      <Nav />
      <main style={{ background: '#fff' }}>
        {coverImage && (
          <div style={{ position: 'relative', height: 'clamp(280px,42vh,520px)', overflow: 'hidden', background: '#0d1622' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverImage} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,16,31,0.6) 0%, transparent 60%)' }} />
          </div>
        )}
        <section style={{ paddingTop: 'clamp(48px,7vh,80px)', paddingBottom: 'clamp(64px,9vh,100px)' }}>
          <div className="wrap">
            <div style={{ marginBottom: 32, paddingBottom: 28, borderBottom: '1px solid #e8edf5' }}>
              <span style={{ fontFamily: 'var(--font-label)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1a396e' }}>
                <time>{fmtDate(createdAt, lang)}</time>
              </span>
              <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.6rem,3.5vw,3rem)', color: '#0f1a2e', letterSpacing: '-0.02em', lineHeight: 1.1, textTransform: 'uppercase' }}>
                {item.title}
              </h1>
            </div>

            <div className="post-grid" style={{ display: 'grid', gridTemplateColumns: '220px 1fr 180px', gap: 'clamp(24px,3vw,48px)', alignItems: 'start' }}>
              <aside style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 100 }}>
                {coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={coverImage} alt={item.title} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 4, display: 'block' }} />
                )}
                <div style={{ padding: 16, background: '#f6f8fb', borderRadius: 4 }}>
                  <div style={{ fontFamily: 'var(--font-label)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#64748b', marginBottom: 10 }}>{s.share}</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[
                      { label: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                      { label: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                      { label: 'WhatsApp', url: `https://wa.me/?text=${encodeURIComponent(item.title + ' ' + shareUrl)}`, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg> },
                    ].map(({ label, url, icon }) => (
                      <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}
                        style={{ width: 32, height: 32, borderRadius: 3, background: '#1a396e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                      >{icon}</a>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16, background: '#f6f8fb', borderRadius: 4 }}>
                  <div style={{ fontFamily: 'var(--font-label)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#64748b', marginBottom: 2 }}>{s.nav}</div>
                  {prev ? <a href={`${s.listHref}/${prev.slug}`} style={{ fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a396e', textDecoration: 'none', fontWeight: 700 }}>{s.prev}</a>
                        : <span style={{ fontFamily: 'var(--font-label)', fontSize: 10, textTransform: 'uppercase', color: '#c0cad8' }}>{s.prev}</span>}
                  {next ? <a href={`${s.listHref}/${next.slug}`} style={{ fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a396e', textDecoration: 'none', fontWeight: 700 }}>{s.next}</a>
                        : <span style={{ fontFamily: 'var(--font-label)', fontSize: 10, textTransform: 'uppercase', color: '#c0cad8' }}>{s.next}</span>}
                </div>
                <a href={s.listHref} style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-label)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1a396e', border: '1.5px solid #1a396e', padding: '9px 12px', borderRadius: 3, textDecoration: 'none', fontWeight: 700 }}>
                  {s.back}
                </a>
              </aside>

              <div>
                {item.content && <div className="post-content" dangerouslySetInnerHTML={{ __html: formatContent(item.content) }} />}
              </div>

              <aside style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'sticky', top: 100 }}>
                <div style={{ fontFamily: 'var(--font-label)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#64748b', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #e8edf5' }}>
                  {s.latest}
                </div>
                {latest.map((n, i) => (
                  <a key={n.slug} href={`${s.listHref}/${n.slug}`} style={{ display: 'flex', gap: 10, textDecoration: 'none', paddingBottom: 14, marginBottom: 14, borderBottom: i < latest.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    {(n as any).posts?.cover_image && <img src={(n as any).posts.cover_image} alt={n.title} style={{ width: 60, height: 50, objectFit: 'cover', borderRadius: 3, flexShrink: 0 }} />}
                    <div>
                      <div style={{ fontFamily: 'var(--font-label)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 4 }}>{fmtDate(n.translated_at, lang)}</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.72rem', color: '#0f1a2e', lineHeight: 1.3, textTransform: 'uppercase' }}>{n.title}</div>
                    </div>
                  </a>
                ))}
                {latest.length === 0 && <span style={{ fontSize: 12, color: '#94a3b8' }}>—</span>}
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        .post-grid { grid-template-columns: 220px 1fr 180px; }
        @media (max-width: 1100px) { .post-grid { grid-template-columns: 200px 1fr !important; } }
        @media (max-width: 760px)  { .post-grid { grid-template-columns: 1fr !important; } .post-grid aside { position: static !important; } }
        .post-content { font-size: clamp(15px,1.15vw,17px); color: #374151; line-height: 2; }
        .post-content h2, .post-content h3, .post-content h4 { font-family: var(--font-display); font-weight: 900; color: #0f1a2e; text-transform: uppercase; letter-spacing: -0.02em; margin: 2.5em 0 0.8em; }
        .post-content p { margin: 0 0 2em; }
        .post-content ul, .post-content ol { margin: 0 0 2em; padding-left: 1.5em; }
        .post-content li { margin-bottom: 0.75em; }
        .post-content a { color: #1a396e; text-decoration: underline; }
        .post-content img { max-width: 100%; height: auto; border-radius: 4px; margin: 1.5em 0; }
        .post-content strong { color: #0f1a2e; font-weight: 700; }
        .post-content blockquote { border-left: 3px solid #1a396e; padding-left: 20px; margin: 1.5em 0; color: #475569; font-style: italic; }
      `}</style>
    </>
  );
}
