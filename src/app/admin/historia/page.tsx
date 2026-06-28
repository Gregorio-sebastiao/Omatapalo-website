'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type Evento = { year: string; title: string; desc: string };

const DEFAULT_EVENTOS: Evento[] = [
  { year: '2003', title: 'Fundação OMATAPALO', desc: 'A OMATAPALO - Engenharia e Construção, SA é fundada na cidade de Lubango, província do Huíla, fruto de uma união de esforços e vontade entre a empresa portuguesa de construção civil Carlos José Fernandes e Cª., com mais de 70 anos de experiência, e a CNS Norte.' },
  { year: '2004', title: 'Início de Actividade', desc: 'Ano em que a OMATAPALO inicia efectivamente a sua actividade em Angola, a partir da qual conheceu um forte crescimento e expansão nas suas áreas de actuação no sector de obras públicas e privadas.' },
  { year: '2005', title: 'Expansão para o Namibe', desc: 'O forte crescimento nas suas áreas de actuação levou à expansão para o Namibe, onde a OMATAPALO possui reservas permanentes de materiais, maquinaria, peças, combustível e outros elementos integrantes do processo de produção.' },
  { year: '2008', title: 'Construção da Sede', desc: 'Início da construção da Sede da OMATAPALO, no Lubango, com estaleiros, parques de máquinas e condomínio vocacionado para a habitação dos colaboradores.' },
  { year: '2009', title: 'OMATAPALO + SOCOLIL', desc: 'A OMATAPALO associou-se ao Grupo SOCOLIL, projectando a empresa para outro patamar de relacionamento e partilhando sinergias de um grupo empresarial consolidado.' },
  { year: '2010', title: 'Internacionalização', desc: 'Criação da OMATAPALO Namíbia — primeiro passo para a internacionalização — e fundação da EMADEL Carpintaria. Abertura da Delegação do Huambo.' },
  { year: '2011–12', title: 'Novas Delegações', desc: 'Abertura das delegações de Benguela, Bié, Cuando Cubango, Cuanza Sul e Malanje, consolidando a presença em todo o território nacional.' },
  { year: '2013', title: 'Grandes Obras Públicas', desc: 'Construção do Aeroporto do Namibe e três pavilhões multidesportivos em Luanda, Namibe e Malanje.' },
  { year: '2014', title: 'Diversificação do Grupo', desc: 'Entrada no imobiliário com a INVESTIMO e na energia com a ENERLINE. Expansão para a Lunda Norte e criação do Departamento Internacional.' },
  { year: '2015–16', title: 'Expansão Internacional', desc: 'Construção de grandes infraestruturas comerciais em Luanda, novo estaleiro na capital e Centralidade Nosso Zimbo no Lubango e Namibe.' },
  { year: '2017', title: 'Consolidação', desc: 'Infraestruturas integradas no Lubango, Monumento do Soldado Desconhecido em Luanda e Centralidade Nosso Zimbo de Benguela.' },
  { year: '2018', title: 'Obras Públicas', desc: 'Nova Circular do Lubango, Hospital Militar Principal em Luanda, Nova Sede do Lubango, Hospital Central e subestações do Projecto de Laúca.' },
  { year: '2019', title: 'Novos Projectos', desc: 'Construção da subestação da Bita, Barragem Calucuve no Cunene e Topside Namibe.' },
  { year: '2020', title: 'Grandes Obras', desc: 'Estrada Nacional 230 — EN230 (Malanje/Saurimo), Cefojor Huambo fase 2 e Reabilitação da Maternidade Irene Neto no Lubango.' },
  { year: '2021', title: 'Infraestruturas e Cultura', desc: 'EMADEL e METALOSUL em Luanda, Cash-Center BNA, Centro Cultural do Huambo e Novo Hospital dos Queimados no Kilamba.' },
  { year: '2022', title: 'Energias Renováveis', desc: 'Hospital Pediátrico do Huambo, Nova Sede da Africell e Aproveitamento Hidroeléctrico Caculo Cabaça.' },
  { year: '2023', title: '20.º Aniversário', desc: 'Electrificação Rural do Sul de Angola, Parques Solares e Infraestruturas de acesso ao novo Aeroporto Internacional de Luanda.' },
  { year: '2024', title: 'Expansão e Sustentabilidade', desc: 'Adesão ao Pacto Global das Nações Unidas, inauguração do Flow Hotel em Benguela e Prémio FIB 2024 pelo segundo ano consecutivo.' },
  { year: '2025', title: 'Reconhecimento', desc: 'Inauguração da Casa do Kwanza pelo Presidente da República, abertura do Mumba Lodge e inauguração da Segunda Circular A3 que liga o novo Aeroporto ao Zango 8000.' },
];

const inp = { padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', width: '100%', boxSizing: 'border-box' as const };

export default function HistoriaAdminPage() {
  const [eventos, setEventos] = useState<Evento[]>(DEFAULT_EVENTOS);
  const [palavra1, setPalavra1] = useState('Marcos');
  const [palavra2, setPalavra2] = useState('Históricos');
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState('');

  useEffect(() => {
    const db = createClient();
    db.from('site_settings').select('value').eq('key', 'historia_eventos').single().then(({ data }) => {
      if (data?.value) { try { setEventos(JSON.parse(data.value)); } catch {} }
    });
    db.from('site_settings').select('value').eq('key', 'historia_titulo').single().then(({ data }) => {
      if (data?.value) { try { const t = JSON.parse(data.value); if (t.p1) setPalavra1(t.p1); if (t.p2) setPalavra2(t.p2); } catch {} }
    });
  }, []);

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000); }

  async function save() {
    setSaving(true);
    const db = createClient();
    const [r1, r2] = await Promise.all([
      db.from('site_settings').upsert({ key: 'historia_eventos', value: JSON.stringify(eventos) }),
      db.from('site_settings').upsert({ key: 'historia_titulo', value: JSON.stringify({ p1: palavra1, p2: palavra2 }) }),
    ]);
    setSaving(false);
    flash(r1.error || r2.error ? '❌ Erro ao guardar' : '✅ História guardada!');
  }

  function update(i: number, field: keyof Evento, val: string) {
    setEventos(prev => prev.map((e, idx) => idx === i ? { ...e, [field]: val } : e));
  }

  function move(i: number, dir: -1 | 1) {
    setEventos(prev => {
      const arr = [...prev];
      const j = i + dir;
      if (j < 0 || j >= arr.length) return arr;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return arr;
    });
  }

  function remove(i: number) {
    setEventos(prev => prev.filter((_, idx) => idx !== i));
  }

  function add() {
    setEventos(prev => [...prev, { year: String(new Date().getFullYear()), title: '', desc: '' }]);
  }

  return (
    <div style={{ padding: 'clamp(24px,3vw,40px)', maxWidth: 860, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: '#0f172a' }}>História</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>{eventos.length} marcos históricos</p>
        </div>
        <button onClick={save} disabled={saving} style={{ padding: '10px 24px', background: '#1a396e', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: saving ? 0.6 : 1 }}>
          {saving ? 'A guardar…' : 'Guardar'}
        </button>
      </div>

      {msg && (
        <div style={{ background: msg.startsWith('✅') ? '#dcfce7' : '#fee2e2', border: `1px solid ${msg.startsWith('✅') ? '#bbf7d0' : '#fca5a5'}`, borderRadius: 4, padding: '10px 16px', marginBottom: 20, fontSize: 13, color: msg.startsWith('✅') ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
          {msg}
        </div>
      )}

      {/* Título da secção */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20, marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 14 }}>Título da secção</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Palavra 1 (ex: Marcos)</label>
            <input value={palavra1} onChange={e => setPalavra1(e.target.value)} style={inp} placeholder="Marcos" />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Palavra 2 — contorno (ex: Históricos)</label>
            <input value={palavra2} onChange={e => setPalavra2(e.target.value)} style={inp} placeholder="Históricos" />
          </div>
        </div>
        <p style={{ margin: '10px 0 0', fontSize: 12, color: '#94a3b8' }}>O número é automático ({eventos.length} marcos). Aparece como: <strong>{eventos.length} {palavra1} / {palavra2}</strong></p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
        {eventos.map((e, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto auto auto', gap: 8, alignItems: 'flex-start', marginBottom: 10 }}>
              <input value={e.year} onChange={ev => update(i, 'year', ev.target.value)} placeholder="Ano" style={{ ...inp, fontWeight: 700 }} />
              <input value={e.title} onChange={ev => update(i, 'title', ev.target.value)} placeholder="Título" style={inp} />
              <button onClick={() => move(i, -1)} style={{ padding: '8px 10px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>↑</button>
              <button onClick={() => move(i, 1)}  style={{ padding: '8px 10px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>↓</button>
              <button onClick={() => remove(i)}   style={{ padding: '8px 10px', background: 'none', border: 'none', color: '#dc2626', fontSize: 18, cursor: 'pointer', lineHeight: 1 }}>×</button>
            </div>
            <textarea value={e.desc} onChange={ev => update(i, 'desc', ev.target.value)} placeholder="Descrição" rows={3} style={{ ...inp, resize: 'vertical', lineHeight: 1.6 }} />
          </div>
        ))}
      </div>

      <button onClick={add} style={{ width: '100%', padding: '12px', background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: 8, fontSize: 14, color: '#475569', cursor: 'pointer', fontWeight: 600 }}>
        + Adicionar marco histórico
      </button>
    </div>
  );
}
