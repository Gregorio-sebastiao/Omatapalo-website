'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type Cert = { id: number; label: string; sub: string; src: string; link: string; sort_order: number };

const EMPTY: Omit<Cert, 'id'> = { label: '', sub: '', src: '', link: '', sort_order: 0 };

export default function CertificacoesAdmin() {
  const supabase = createClient();
  const [certs, setCerts] = useState<Cert[]>([]);
  const [saving, setSaving] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [newCert, setNewCert] = useState({ ...EMPTY });
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    supabase.from('certifications').select('*').order('sort_order').then(({ data }) => setCerts(data ?? []));
  }, []);

  function update(id: number, field: keyof Cert, value: string) {
    setCerts(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  }

  async function save(cert: Cert) {
    setSaving(cert.id); setMsg('');
    const { error } = await supabase.from('certifications').update({ link: cert.link, label: cert.label, sub: cert.sub }).eq('id', cert.id);
    setSaving(null);
    setMsg(error ? 'Erro: ' + error.message : 'Guardado!');
    setTimeout(() => setMsg(''), 2500);
  }

  async function deleteCert(id: number) {
    if (!confirm('Apagar esta certificação?')) return;
    await supabase.from('certifications').delete().eq('id', id);
    setCerts(prev => prev.filter(c => c.id !== id));
  }

  async function uploadLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const path = `certifications/${Date.now()}-${file.name}`;
    const { data } = await supabase.storage.from('cms-media').upload(path, file, { upsert: true });
    if (data) {
      const { data: { publicUrl } } = supabase.storage.from('cms-media').getPublicUrl(data.path);
      setNewCert(c => ({ ...c, src: publicUrl }));
    }
    setUploading(false);
  }

  async function createCert() {
    if (!newCert.label) return;
    setSaving(-1); setMsg('');
    const sort = certs.length > 0 ? Math.max(...certs.map(c => c.sort_order)) + 1 : 1;
    const { data, error } = await supabase.from('certifications').insert({ ...newCert, sort_order: sort }).select().single();
    setSaving(null);
    if (error) { setMsg('Erro: ' + error.message); }
    else { setCerts(prev => [...prev, data]); setNewCert({ ...EMPTY }); setAdding(false); setMsg('Certificação criada!'); }
    setTimeout(() => setMsg(''), 2500);
  }

  const inp: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: 14, boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none' };
  const label = (txt: string) => <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#64748b', display: 'block', marginBottom: 6 }}>{txt}</label>;

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', margin: 0 }}>Certificações</h1>
          <p style={{ color: '#64748b', margin: '6px 0 0', fontSize: 14 }}>Edita os títulos, descrições e links de cada certificação.</p>
        </div>
        <button
          onClick={() => { setAdding(true); setNewCert({ ...EMPTY }); }}
          style={{ padding: '10px 20px', background: '#1a396e', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
        >
          + Nova certificação
        </button>
      </div>

      {msg && (
        <div style={{ marginBottom: 20, padding: '10px 16px', background: msg.startsWith('Erro') ? '#fef2f2' : '#f0fdf4', border: `1px solid ${msg.startsWith('Erro') ? '#fecaca' : '#bbf7d0'}`, borderRadius: 8, fontSize: 13, color: msg.startsWith('Erro') ? '#dc2626' : '#16a34a' }}>
          {msg}
        </div>
      )}

      {/* Formulário nova certificação */}
      {adding && (
        <div style={{ background: '#fff', borderRadius: 12, border: '2px solid #1a396e', marginBottom: 24, overflow: 'hidden' }}>
          <div style={{ background: '#1a396e', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Nova Certificação</span>
            <button onClick={() => setAdding(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 18, cursor: 'pointer', lineHeight: 1 }}>✕</button>
          </div>
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              {label('Título')}
              <input style={inp} value={newCert.label} onChange={e => setNewCert(c => ({ ...c, label: e.target.value }))} placeholder="ex: ISO 9001" />
            </div>
            <div>
              {label('Descrição')}
              <input style={inp} value={newCert.sub} onChange={e => setNewCert(c => ({ ...c, sub: e.target.value }))} placeholder="ex: Sistemas de Gestão da Qualidade" />
            </div>
            <div>
              {label('Link do Certificado')}
              <input style={{ ...inp, fontFamily: 'monospace', fontSize: 13 }} value={newCert.link} onChange={e => setNewCert(c => ({ ...c, link: e.target.value }))} placeholder="https://..." />
            </div>
            <div>
              {label('Logo / Selo')}
              <input type="file" accept="image/*" onChange={uploadLogo} style={{ fontSize: 13, color: '#64748b', marginBottom: 8, display: 'block' }} />
              {uploading && <div style={{ fontSize: 12, color: '#1a396e' }}>A fazer upload...</div>}
              {newCert.src && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={newCert.src} alt="" style={{ height: 56, width: 56, objectFit: 'contain', background: '#07101f', borderRadius: 6, padding: 6 }} />
                  <input style={{ ...inp, fontFamily: 'monospace', fontSize: 12 }} value={newCert.src} onChange={e => setNewCert(c => ({ ...c, src: e.target.value }))} placeholder="ou URL directo" />
                </div>
              )}
              {!newCert.src && (
                <input style={{ ...inp, fontFamily: 'monospace', fontSize: 12, marginTop: 4 }} value={newCert.src} onChange={e => setNewCert(c => ({ ...c, src: e.target.value }))} placeholder="ou URL directo da imagem" />
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 4 }}>
              <button onClick={() => setAdding(false)} style={{ padding: '9px 18px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, color: '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
              <button onClick={createCert} disabled={saving === -1 || !newCert.label} style={{ padding: '9px 22px', background: '#1a396e', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: (!newCert.label || saving === -1) ? 0.6 : 1 }}>
                {saving === -1 ? 'A criar...' : 'Criar certificação'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista existente */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {certs.map(cert => (
          <div key={cert.id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ background: '#07101f', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {cert.src && <img src={cert.src} alt={cert.label} style={{ height: 48, width: 48, objectFit: 'contain', filter: 'brightness(1.2)' }} />}
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{cert.label}</div>
              </div>
              <button onClick={() => deleteCert(cert.id)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 12, padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}>Apagar</button>
            </div>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                {label('Título')}
                <input style={inp} value={cert.label} onChange={e => update(cert.id, 'label', e.target.value)} />
              </div>
              <div>
                {label('Descrição')}
                <input style={inp} value={cert.sub} onChange={e => update(cert.id, 'sub', e.target.value)} />
              </div>
              <div>
                {label('Link do Certificado')}
                <input style={{ ...inp, fontFamily: 'monospace', fontSize: 13 }} value={cert.link} onChange={e => update(cert.id, 'link', e.target.value)} placeholder="https://..." />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => save(cert)} disabled={saving === cert.id} style={{ padding: '9px 22px', background: '#1a396e', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: saving === cert.id ? 0.6 : 1 }}>
                  {saving === cert.id ? 'A guardar...' : 'Guardar'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
