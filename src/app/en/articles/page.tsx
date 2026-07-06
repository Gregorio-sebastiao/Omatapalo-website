'use client';

import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { createClient } from '@/lib/supabase/client';

type Item = {
  title: string;
  slug: string;
  excerpt: string;
  translated_at: string;
  posts: { cover_image: string; category: string; created_at: string };
};

const PER_PAGE = 9;

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function EnArticlesPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const from = (page - 1) * PER_PAGE;
    const to = from + PER_PAGE - 1;
    createClient()
      .from('post_translations')
      .select('title, slug, excerpt, translated_at, posts!inner(cover_image, category, created_at)', { count: 'exact' })
      .eq('lang', 'en')
      .order('translated_at', { ascending: false })
      .range(from, to)
      .then(({ data, count }) => {
        setItems((data ?? []) as unknown as Item[]);
        setTotal(count ?? 0);
        setLoading(false);
      });
  }, [page]);

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <>
      <Nav />
      <main>
        <PageHero
          title="News"
          eyebrow="Omatapalo Group · News"
          outlineWord="News"
          imgSrc="/EN-230-omatapalo-2.jpg"
          imgOpacity={0.35}
          position="center"
        />
        <section style={{ background: '#fff', paddingTop: 'clamp(48px,7vh,80px)', paddingBottom: 'clamp(64px,9vh,100px)' }}>
          <div className="wrap">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8', fontSize: 14 }}>Loading...</div>
            ) : items.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8', fontSize: 14 }}>No articles published yet.</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px 28px' }} className="media-grid">
                {items.map((item) => (
                  <article key={item.slug} style={{ background: '#fff', border: '1px solid #e8edf5', borderRadius: 4, overflow: 'hidden', display: 'flex', flexDirection: 'column' }} className="media-card">
                    <a href={`/en/articles/${item.slug}`} style={{ display: 'block', position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#f1f5f9', textDecoration: 'none' }}>
                      {item.posts?.cover_image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.posts.cover_image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s ease' }} className="media-card-img" />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: '#dde3ed' }} />
                      )}
                    </a>
                    <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h3 style={{ margin: '0 0 10px', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.97rem', color: '#0f1a2e', letterSpacing: '-0.01em', lineHeight: 1.3, textTransform: 'uppercase' }}>
                        {item.title}
                      </h3>
                      <time style={{ fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: '0.1em', color: '#64748b', marginBottom: 14, display: 'block' }}>
                        {fmtDate(item.posts?.created_at ?? item.translated_at)}
                      </time>
                      {item.excerpt && (
                        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#475569', lineHeight: 1.6, flex: 1 }}>
                          {item.excerpt.length > 131 ? item.excerpt.slice(0, 131).trimEnd() + '…' : item.excerpt}
                        </p>
                      )}
                      <a href={`/en/articles/${item.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1a396e', textDecoration: 'none', fontWeight: 700, marginTop: 'auto' }}>
                        Read More »
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, marginTop: 56, flexWrap: 'wrap' }}>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  style={{ padding: '6px 14px', border: '1px solid #dde3ed', borderRadius: 3, background: '#fff', color: page === 1 ? '#c0cad8' : '#1a396e', cursor: page === 1 ? 'default' : 'pointer', fontSize: 13, fontWeight: 600 }}>
                  « Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => setPage(n)}
                    style={{ width: 32, height: 32, border: `1px solid ${n === page ? '#1a396e' : '#dde3ed'}`, borderRadius: 3, background: n === page ? '#1a396e' : '#fff', color: n === page ? '#fff' : '#374151', cursor: 'pointer', fontSize: 13, fontWeight: n === page ? 700 : 400 }}>
                    {n}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  style={{ padding: '6px 14px', border: '1px solid #dde3ed', borderRadius: 3, background: '#fff', color: page === totalPages ? '#c0cad8' : '#1a396e', cursor: page === totalPages ? 'default' : 'pointer', fontSize: 13, fontWeight: 600 }}>
                  Next »
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        .media-card:hover .media-card-img { transform: scale(1.05); }
        @media (max-width: 860px) { .media-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 540px) { .media-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
