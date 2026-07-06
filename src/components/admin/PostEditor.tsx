'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import MediaPicker from './MediaPicker';

type Post = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  cover_image?: string;
  category?: string;
  published?: boolean;
};

type TranslationStatus = 'none' | 'done' | 'translating' | 'error';

const CATEGORIES = ['Geral', 'Construção', 'Energia', 'Mineração', 'Responsabilidade Social', 'Sustentabilidade', 'Comunidade'];

function slugify(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

export default function PostEditor({ post }: { post?: Post }) {
  const router = useRouter();
  const supabase = createClient();
  const [form, setForm] = useState({
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    excerpt: post?.excerpt ?? '',
    content: post?.content ?? '',
    cover_image: post?.cover_image ?? '',
    category: post?.category ?? 'Geral',
    published: post?.published ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [mediaPicker, setMediaPicker] = useState(false);
  const [txStatus, setTxStatus] = useState<TranslationStatus>('none');
  const [txSlugs, setTxSlugs] = useState<{ en?: string; fr?: string }>({});

  // Load existing translation status
  useEffect(() => {
    if (!post?.id) return;
    supabase.from('post_translations').select('lang, slug').eq('post_id', post.id).then(({ data }) => {
      if (!data || data.length === 0) return;
      const en = data.find(d => d.lang === 'en');
      const fr = data.find(d => d.lang === 'fr');
      if (en && fr) {
        setTxStatus('done');
        setTxSlugs({ en: en.slug, fr: fr.slug });
      }
    });
  }, [post?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  function set(field: string, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }));
    if (field === 'title' && !post?.id) {
      setForm(f => ({ ...f, title: value as string, slug: slugify(value as string) }));
    }
  }

  async function uploadCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `posts/${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage.from('cms-media').upload(path, file, { upsert: true });
    if (!error && data) {
      const { data: { publicUrl } } = supabase.storage.from('cms-media').getPublicUrl(data.path);
      set('cover_image', publicUrl);
      await supabase.from('media').insert({ name: file.name, url: publicUrl, mime_type: file.type, size: file.size });
    }
    setUploading(false);
  }

  async function translate(id: string) {
    setTxStatus('translating');
    try {
      const res = await fetch('/api/translate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: id }),
      });
      const json = await res.json();
      if (!res.ok) { setTxStatus('error'); setMsg('Erro na tradução: ' + json.error); return; }
      setTxStatus('done');
      setTxSlugs({ en: json.en.slug, fr: json.fr.slug });
      setMsg('Traduzido com sucesso!');
    } catch {
      setTxStatus('error');
      setMsg('Erro na tradução automática.');
    }
  }

  async function save(publish?: boolean) {
    setSaving(true);
    setMsg('');
    const payload = { ...form, published: publish !== undefined ? publish : form.published };
    let savedId = post?.id;
    let error;
    if (post?.id) {
      ({ error } = await supabase.from('posts').update(payload).eq('id', post.id));
    } else {
      const { data, error: e } = await supabase.from('posts').insert(payload).select('id').single();
      error = e;
      savedId = data?.id;
    }
    setSaving(false);
    if (error) { setMsg('Erro: ' + error.message); return; }

    // Auto-translate when publishing for the first time
    if (publish && savedId && txStatus === 'none') {
      await translate(savedId);
    } else {
      setMsg('Guardado!');
      setTimeout(() => router.push('/admin/posts'), 800);
    }
    if (publish && savedId) {
      setTimeout(() => router.push('/admin/posts'), 1200);
    }
  }

  async function deletePost() {
    if (!post?.id || !confirm('Apagar esta notícia?')) return;
    await supabase.from('posts').delete().eq('id', post.id);
    router.push('/admin/posts');
  }

  const inp: React.CSSProperties = { width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' };

  const txBadge = {
    none:        { label: '⏳ Sem tradução', bg: '#f8fafc', color: '#94a3b8', border: '#e2e8f0' },
    done:        { label: '✓ EN + FR',       bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
    translating: { label: '🔄 A traduzir…',  bg: '#eff6ff', color: '#3b82f6', border: '#bfdbfe' },
    error:       { label: '✗ Erro',           bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
  }[txStatus];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {mediaPicker && <MediaPicker onSelect={url => set('cover_image', url)} onClose={() => setMediaPicker(false)} />}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <a href="/admin/posts" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>← Notícias</a>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: '4px 0 0' }}>{post?.id ? 'Editar Notícia' : 'Nova Notícia'}</h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {post?.id && <button onClick={deletePost} style={{ padding: '9px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, color: '#dc2626', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Apagar</button>}
          <button onClick={() => save(false)} disabled={saving} style={{ padding: '9px 18px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, color: '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Guardar rascunho</button>
          <button onClick={() => save(true)} disabled={saving} style={{ padding: '9px 18px', background: '#1a396e', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            {saving ? 'A guardar...' : 'Publicar'}
          </button>
        </div>
      </div>

      {msg && <div style={{ marginBottom: 20, padding: '10px 16px', background: msg.startsWith('Erro') ? '#fef2f2' : '#f0fdf4', border: `1px solid ${msg.startsWith('Erro') ? '#fecaca' : '#bbf7d0'}`, borderRadius: 8, fontSize: 13, color: msg.startsWith('Erro') ? '#dc2626' : '#16a34a' }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0' }}>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b', display: 'block', marginBottom: 8 }}>Título</label>
            <input style={{ ...inp, fontSize: 18, fontWeight: 700 }} value={form.title} onChange={e => set('title', e.target.value)} placeholder="Título da notícia" />
          </div>

          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0' }}>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b', display: 'block', marginBottom: 8 }}>Resumo</label>
            <textarea style={{ ...inp, minHeight: 80, resize: 'vertical' }} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} placeholder="Breve descrição da notícia..." />
          </div>

          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0' }}>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b', display: 'block', marginBottom: 8 }}>Conteúdo</label>
            <textarea style={{ ...inp, minHeight: 380, resize: 'vertical', lineHeight: 1.7 }} value={form.content} onChange={e => set('content', e.target.value)} placeholder="Conteúdo completo da notícia..." />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b', display: 'block', marginBottom: 12 }}>Estado</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14 }}>
              <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} style={{ width: 16, height: 16 }} />
              Publicado
            </label>
          </div>

          {/* Translation panel */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b', display: 'block', marginBottom: 12 }}>Tradução automática</label>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 6, border: `1px solid ${txBadge.border}`, background: txBadge.bg, fontSize: 12, fontWeight: 600, color: txBadge.color, marginBottom: 12 }}>
              {txBadge.label}
            </div>
            {txStatus === 'done' && txSlugs.en && (
              <div style={{ fontSize: 11, color: '#64748b', marginBottom: 12, lineHeight: 1.6 }}>
                EN: <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>/en/articles/{txSlugs.en}</code><br />
                FR: <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>/fr/articles/{txSlugs.fr}</code>
              </div>
            )}
            {post?.id && (
              <button
                onClick={() => translate(post.id!)}
                disabled={txStatus === 'translating'}
                style={{ width: '100%', padding: '9px', background: txStatus === 'translating' ? '#f1f5f9' : '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, fontSize: 13, fontWeight: 600, color: txStatus === 'translating' ? '#94a3b8' : '#0369a1', cursor: txStatus === 'translating' ? 'default' : 'pointer' }}
              >
                {txStatus === 'translating' ? '🔄 A traduzir…' : txStatus === 'done' ? '↺ Re-traduzir' : '🌐 Traduzir EN + FR'}
              </button>
            )}
            {!post?.id && (
              <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>Guarda o artigo primeiro para poder traduzir.</p>
            )}
          </div>

          <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b', display: 'block', marginBottom: 8 }}>Slug (URL)</label>
            <input style={inp} value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="slug-da-noticia" />
          </div>

          <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b', display: 'block', marginBottom: 8 }}>Categoria</label>
            <select style={inp} value={form.category} onChange={e => set('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b', display: 'block', marginBottom: 12 }}>Imagem de capa</label>
            {form.cover_image
              ? <div style={{ position: 'relative', marginBottom: 10 }}>
                  <img src={form.cover_image} alt="" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 6 }} />
                  <button onClick={() => set('cover_image', '')} style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.55)', border: 'none', borderRadius: '50%', width: 26, height: 26, color: '#fff', cursor: 'pointer', fontSize: 14, lineHeight: 1 }}>✕</button>
                </div>
              : <div onClick={() => setMediaPicker(true)} style={{ width: '100%', aspectRatio: '16/9', background: '#f1f5f9', borderRadius: 6, marginBottom: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px dashed #cbd5e1', gap: 8 }}>
                  <span style={{ fontSize: 28 }}>🖼</span>
                  <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Escolher imagem</span>
                </div>
            }
            <button onClick={() => setMediaPicker(true)} style={{ width: '100%', padding: '9px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#1a396e', cursor: 'pointer', marginBottom: 8 }}>
              📁 {form.cover_image ? 'Alterar imagem' : 'Seleccionar da biblioteca'}
            </button>
            {uploading && <div style={{ fontSize: 12, color: '#1a396e', marginBottom: 6 }}>A fazer upload...</div>}
            <input style={{ ...inp, fontSize: 12 }} value={form.cover_image} onChange={e => set('cover_image', e.target.value)} placeholder="ou colar URL directo" />
          </div>
        </div>
      </div>
    </div>
  );
}
