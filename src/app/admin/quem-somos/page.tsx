'use client';
import { useEffect, useRef, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { createClient } from '@/lib/supabase/client';
import LangTabs from '@/components/admin/LangTabs';

type Lang = 'pt' | 'en' | 'fr';
const BASE_PAGE = 'quem-somos';

type ImageItem = { src: string; label: string };

const DEFAULT_TEXTS = [
  'Somos um grupo empresarial angolano com presença em sectores estratégicos da economia, comprometido com a criação de valor, o desenvolvimento sustentável e o progresso de Angola.',
  'Fundado em 2003, o Grupo Omatapalo tem vindo a consolidar uma trajectória de crescimento assente na excelência, na inovação e no impacto positivo.',
  'Mais do que construir infra-estruturas, construímos confiança, oportunidades e futuro.',
];

const DEFAULT_IMAGES: ImageItem[] = [
  { src: '/EN-230-omatapalo-2.jpg', label: 'Estrada Nacional 230 - Saurimo' },
  { src: '/Salao-Protocolar-1-1.jpg', label: 'Salão Protocolar - Luanda' },
  { src: '/HOSPITAL MILITAR_1306202.JPG', label: 'Hospital Militar' },
  { src: '/omatapalo-construcao-do-monumento-do-soldado-desconhecido.jpg', label: 'Monumento ao Soldado Desconhecido - Luanda' },
  { src: '/DSC_0030.jpg', label: 'Missão Fazer Sorrir' },
  { src: '/Academia-barra.jpg', label: 'Academia Omatapalo' },
];

const btn = (color = '#1a396e'): React.CSSProperties => ({
  padding: '8px 16px', background: color, color: '#fff', border: 'none',
  borderRadius: 4, cursor: 'pointer', fontSize: 13, fontWeight: 600,
});

export default function AdminQuemSomos() {
  const [lang, setLang] = useState<Lang>('pt');
  const [texts, setTexts] = useState<string[]>(DEFAULT_TEXTS);
  const [images, setImages] = useState<ImageItem[]>(DEFAULT_IMAGES);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState<number | null>(null);
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  const PAGE = lang === 'pt' ? BASE_PAGE : `${BASE_PAGE}-${lang}`;

  useEffect(() => {
    const db = createClient();
    db.from('site_content').select('field,value').eq('page', PAGE).then(({ data }) => {
      if (!data || data.length === 0) { setTexts(DEFAULT_TEXTS); setImages(DEFAULT_IMAGES); return; }
      const map: Record<string, string> = {};
      for (const row of data) map[row.field] = row.value;
      if (map['texts']) setTexts(JSON.parse(map['texts'])); else setTexts(DEFAULT_TEXTS);
      if (map['images']) setImages(JSON.parse(map['images'])); else setImages(DEFAULT_IMAGES);
    });
  }, [PAGE]);

  async function save() {
    setSaving(true); setMsg('');
    const db = createClient();
    const rows = [
      { page: PAGE, field: 'texts', value: JSON.stringify(texts) },
      { page: PAGE, field: 'images', value: JSON.stringify(images) },
    ];
    const { error } = await db.from('site_content').upsert(rows, { onConflict: 'page,field' });
    setSaving(false);
    setMsg(error ? `❌ Erro: ${error.message}` : '✅ Guardado com sucesso!');
  }

  async function uploadImage(index: number, file: File) {
    setUploading(index);
    const db = createClient();
    const ext = file.name.split('.').pop();
    const path = `quem-somos/${Date.now()}-${index}.${ext}`;
    const { error: upErr } = await db.storage.from('media').upload(path, file, { upsert: true });
    if (upErr) { setMsg(`❌ Erro upload: ${upErr.message}`); setUploading(null); return; }
    const { data: { publicUrl } } = db.storage.from('media').getPublicUrl(path);
    const updated = [...images];
    updated[index] = { ...updated[index], src: publicUrl };
    setImages(updated);
    setUploading(null);
  }

  const label: React.CSSProperties = { fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#64748b', display: 'block', marginBottom: 6 };
  const input: React.CSSProperties = { width: '100%', padding: '8px 10px', border: '1px solid #dde3ed', borderRadius: 4, fontSize: 13, boxSizing: 'border-box' as const };

  return (
    <AdminShell>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.6rem', color: '#0f172a', marginBottom: 8 }}>Quem Somos</h1>
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>Edita os textos e as fotos da secção "Quem Somos" na homepage.</p>
        <LangTabs lang={lang} onChange={setLang} />

        {/* TEXTOS */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1a396e', marginBottom: 20 }}>Parágrafos</div>
          {texts.map((t, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <label style={label}>Parágrafo {i + 1}</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <textarea
                  value={t}
                  onChange={e => { const u = [...texts]; u[i] = e.target.value; setTexts(u); }}
                  rows={3}
                  style={{ ...input, resize: 'vertical' }}
                />
                <button onClick={() => setTexts(texts.filter((_, j) => j !== i))} style={{ ...btn('#ef4444'), padding: '6px 10px', alignSelf: 'flex-start' }}>✕</button>
              </div>
            </div>
          ))}
          <button onClick={() => setTexts([...texts, ''])} style={{ ...btn('#64748b'), fontSize: 12, marginTop: 4 }}>+ Adicionar parágrafo</button>
        </div>

        {/* IMAGENS */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1a396e', marginBottom: 20 }}>Fotos</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {images.map((img, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: 14, background: '#f8fafc' }}>
                {img.src && (
                  <img src={img.src} alt={img.label} style={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 4, marginBottom: 10, display: 'block' }} />
                )}
                <label style={label}>Legenda</label>
                <input
                  value={img.label}
                  onChange={e => { const u = [...images]; u[i] = { ...u[i], label: e.target.value }; setImages(u); }}
                  style={{ ...input, marginBottom: 10 }}
                />
                <label style={label}>URL da foto</label>
                <input
                  value={img.src}
                  onChange={e => { const u = [...images]; u[i] = { ...u[i], src: e.target.value }; setImages(u); }}
                  style={{ ...input, marginBottom: 10 }}
                />
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => fileRefs.current[i]?.click()} style={{ ...btn('#0f766e'), fontSize: 11, flex: 1 }}>
                    {uploading === i ? 'A carregar…' : '⬆ Carregar foto'}
                  </button>
                  <button onClick={() => setImages(images.filter((_, j) => j !== i))} style={{ ...btn('#ef4444'), fontSize: 11 }}>🗑</button>
                </div>
                <input
                  ref={el => { fileRefs.current[i] = el; }}
                  type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(i, f); }}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => setImages([...images, { src: '', label: '' }])}
            style={{ ...btn('#64748b'), fontSize: 12, marginTop: 16 }}
          >+ Adicionar foto</button>
        </div>

        {msg && <div style={{ padding: '10px 14px', background: msg.startsWith('✅') ? '#f0fdf4' : '#fef2f2', border: `1px solid ${msg.startsWith('✅') ? '#bbf7d0' : '#fecaca'}`, borderRadius: 6, fontSize: 13, marginBottom: 16 }}>{msg}</div>}
        <button onClick={save} disabled={saving} style={{ ...btn(), padding: '12px 32px', fontSize: 14 }}>
          {saving ? 'A guardar…' : 'Guardar alterações'}
        </button>
      </div>
    </AdminShell>
  );
}
