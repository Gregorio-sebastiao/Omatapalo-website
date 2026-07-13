'use client';

import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import { createClient } from '@/lib/supabase/client';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const DEFAULT_CERT_LOGOS = [
  { src: '/ISO-9001-2.png',          alt: 'ISO 9001',         label: 'Qualidade',        href: '#' },
  { src: '/ISO-14001-2.png',         alt: 'ISO 14001',        label: 'Gestão Ambiental', href: '#' },
  { src: '/ISO-45001-2.png',         alt: 'ISO 45001',        label: 'Segurança e Saúde',href: '#' },
  { src: '/UN-GLOBAL-COMPACT-2.png', alt: 'UN Global Compact',label: 'Pacto Global ONU', href: '#' },
];

const ODS = [
  { src: '/responsabilidade-1.png', alt: 'ODS 8' },
  { src: '/responsabilidade-2.png', alt: 'ODS 9' },
  { src: '/responsabilidade-3.png', alt: 'ODS 11' },
  { src: '/responsabilidade-4.png', alt: 'ODS 13' },
];

const DEFAULT_ESG = [
  { n: '01', t: 'Ambiental',  d: 'Energias renováveis, gestão de resíduos e compensação de carbono em todos os projectos.', img: '/Environmental.png' },
  { n: '02', t: 'Social',     d: 'Contribuição para a melhoria da qualidade de vida dos colaboradores, das pessoas e das comunidades.', img: '/social.jpg' },
  { n: '03', t: 'Governança', d: 'Transparência e responsabilidade em todas as operações, alinhadas com o Pacto Global das Nações Unidas.', img: 'https://omatapalo.com/wp-content/uploads/imagem-home.jpg' },
];

const gridTexture: React.CSSProperties = {
  backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
  backgroundSize: '60px 60px',
};

import { gtx } from '@/lib/i18n/gtx';

export default function Sustentabilidade() {
  const { t, locale } = useLanguage();

  const s1Ref = useRef<HTMLElement>(null);
  const s2Ref = useRef<HTMLElement>(null);
  const s3Ref = useRef<HTMLElement>(null);
  const s4Ref = useRef<HTMLElement>(null);
  const s5Ref = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const [introP1, setIntroP1]       = useState('O Grupo Omatapalo caminha rumo a um futuro que redefine os limites da Engenharia e Construção, com um claro foco no investimento em energias renováveis e inovação.');
  const [introP2, setIntroP2]       = useState('O contributo para a melhoria da qualidade de vida das pessoas e comunidades é desenvolvido através da promoção e apoio de iniciativas de natureza social e ambiental.');
  const [esg, setEsg]               = useState(DEFAULT_ESG);
  const [certLogos, setCertLogos]   = useState(DEFAULT_CERT_LOGOS);
  const [relTitulo, setRelTitulo]   = useState('Relatório de Sustentabilidade 2024');
  const [relDesc, setRelDesc]       = useState('Consulte o nosso Relatório e Contas consolidadas e acompanhe os compromissos e resultados em matéria de sustentabilidade, governação e impacto social.');
  const [relPdf, setRelPdf]         = useState('#');
  const [heroImg, setHeroImg]       = useState('https://omatapalo.com/wp-content/uploads/HABITACAO-CAMBAMBE_08042025-5.jpg');

  const [displayP1, setDisplayP1]           = useState(introP1);
  const [displayP2, setDisplayP2]           = useState(introP2);
  const [displayEsg, setDisplayEsg]         = useState(esg);
  const [displayCertLogos, setDisplayCertLogos] = useState(certLogos);
  const [displayRelTitulo, setDisplayRelTitulo] = useState(relTitulo);
  const [displayRelDesc, setDisplayRelDesc] = useState(relDesc);

  const CERT_LABELS: Record<string, Record<string, string>> = {
    en: { 'Qualidade': 'Quality', 'Gestão Ambiental': 'Environmental Management', 'Segurança e Saúde': 'Health & Safety', 'Pacto Global ONU': 'UN Global Compact' },
    fr: { 'Qualidade': 'Qualité', 'Gestão Ambiental': 'Gestion Environnementale', 'Segurança e Saúde': 'Santé et Sécurité', 'Pacto Global ONU': 'Pacte Mondial ONU' },
  };

  const displayODS = locale === 'en'
    ? [
        { src: '/SGD 1.png', alt: 'SDG 1' },
        { src: '/SGD 2.png', alt: 'SDG 2' },
        { src: '/SGD 3.png', alt: 'SDG 3' },
        { src: '/SGD 4.png', alt: 'SDG 4' },
      ]
    : ODS;

  const certsTitle = { pt: 'Certificações', en: 'Certifications', fr: 'Certifications' }[locale] ?? 'Certificações';
  const certsOutline = { pt: '& Normas', en: '& Standards', fr: '& Normes' }[locale] ?? '& Normas';
  const certsDesc = {
    pt: 'Em 2024 a Omatapalo tornou-se a primeira empresa angolana de construção civil signatária do Pacto Global das Nações Unidas, alinhando a estratégia com os 17 ODS.',
    en: 'In 2024, Omatapalo became the first Angolan civil construction company to sign the UN Global Compact, aligning its strategy with the 17 SDGs.',
    fr: "En 2024, Omatapalo est devenue la première entreprise angolaise de construction civile signataire du Pacte Mondial des Nations Unies, alignant sa stratégie sur les 17 ODD.",
  }[locale] ?? '';
  const relTitle1 = { pt: 'Relatório de', en: 'Sustainability', fr: 'Rapport de' }[locale] ?? 'Relatório de';
  const relTitle2 = { pt: 'Sustentabilidade', en: 'Report', fr: 'Durabilité' }[locale] ?? 'Sustentabilidade';
  const docLabel = { pt: 'Documento PDF', en: 'PDF Document', fr: 'Document PDF' }[locale] ?? 'Documento PDF';

  useEffect(() => {
    createClient().from('site_settings').select('value').eq('key', 'sustentabilidade_cfg').single().then(({ data }) => {
      if (!data?.value) return;
      try {
        const cfg = JSON.parse(data.value);
        if (cfg.intro_p1) setIntroP1(cfg.intro_p1);
        if (cfg.intro_p2) setIntroP2(cfg.intro_p2);
        if (cfg.esg)      setEsg(cfg.esg);
        if (cfg.certs)    setCertLogos(cfg.certs);
        if (cfg.relatorio_titulo) setRelTitulo(cfg.relatorio_titulo);
        if (cfg.relatorio_desc)   setRelDesc(cfg.relatorio_desc);
        if (cfg.relatorio_pdf)    setRelPdf(cfg.relatorio_pdf);
        if (cfg.hero_img)         setHeroImg(cfg.hero_img);
      } catch {}
    });
  }, []);

  useEffect(() => {
    if (locale === 'pt') {
      setDisplayP1(introP1); setDisplayP2(introP2);
      setDisplayEsg(esg); setDisplayRelTitulo(relTitulo); setDisplayRelDesc(relDesc);
      setDisplayCertLogos(certLogos);
      return;
    }
    const labelMap = CERT_LABELS[locale] ?? {};
    setDisplayCertLogos(certLogos.map(c => ({ ...c, label: labelMap[c.label] ?? c.label })));
    if (locale === 'en') {
      setDisplayP1('The Omatapalo Group is moving towards a future that redefines the boundaries of engineering and construction, with a clear focus on investment in renewable energy and innovation.');
      setDisplayP2('It contributes to improving the quality of life of people and communities by promoting and supporting social and environmental initiatives.');
    } else {
      gtx(introP1, locale).then(setDisplayP1);
      gtx(introP2, locale).then(setDisplayP2);
    }
    if (locale === 'en') setDisplayRelTitulo('2024 Sustainability Report');
    else gtx(relTitulo, locale).then(setDisplayRelTitulo);
    gtx(relDesc, locale).then(setDisplayRelDesc);
    Promise.all(esg.map(async p => ({
      ...p,
      t: t.sustentabilidadePage.esgTitles[['Ambiental', 'Social', 'Governança'].indexOf(p.t)] ?? await gtx(p.t, locale),
      d: await gtx(p.d, locale),
    }))).then(setDisplayEsg);
  }, [locale, introP1, introP2, esg, certLogos, relTitulo, relDesc]);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        if (s1Ref.current) {
          gsap.fromTo('.sus-s1-left',  { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: s1Ref.current, start: 'top 80%', once: true } });
          gsap.fromTo('.sus-s1-right', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: s1Ref.current, start: 'top 78%', once: true } });
        }
        if (s2Ref.current) {
          gsap.fromTo('.sus-s2-hdr',   { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: s2Ref.current, start: 'top 80%', once: true } });
          gsap.fromTo('.sus-esg-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: s2Ref.current, start: 'top 75%', once: true } });
          gsap.to(bgRef.current, { y: -60, ease: 'none', scrollTrigger: { trigger: s2Ref.current, start: 'top bottom', end: 'bottom top', scrub: true } });
        }
        if (s3Ref.current) {
          gsap.fromTo('.sus-s3-left',  { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: s3Ref.current, start: 'top 80%', once: true } });
          gsap.fromTo('.sus-s3-right', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: s3Ref.current, start: 'top 78%', once: true } });
          gsap.fromTo('.sus-ods-icon', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: '.sus-ods-row', start: 'top 85%', once: true } });
        }
        if (s4Ref.current) {
          gsap.fromTo('.sus-s4-hdr', { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: s4Ref.current, start: 'top 80%', once: true } });
          gsap.fromTo('.sus-cert',   { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: s4Ref.current, start: 'top 75%', once: true } });
        }
        if (s5Ref.current) {
          gsap.fromTo('.sus-s5-inner', { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: s5Ref.current, start: 'top 80%', once: true } });
        }
      });
    });
  }, []);

  return (
    <div id="sustentabilidade" style={{ overflow: 'hidden' }}>

      {/* ── 1. INTRO ── */}
      <section ref={s1Ref} style={{ background: '#F6F8FB', paddingTop: 'clamp(72px,10vh,120px)', paddingBottom: 'clamp(72px,10vh,120px)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }} className="sus-s1-grid">
            <div className="sus-s1-left" style={{ opacity: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect width="10" height="10" fill="#1a396e" /></svg>
                <span style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a396e' }}>{t.sustentabilidadePage.eyebrow}</span>
              </div>
              <h2 style={{ margin: '0 0 clamp(20px,2.5vw,32px)', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem,4vw,4.5rem)', color: '#0F1A2E', letterSpacing: '-0.035em', lineHeight: 0.92, textTransform: 'uppercase' }}>
                {t.sustentabilidadePage.title1}<br />{t.sustentabilidadePage.title2}<br />
                <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(26,57,110,0.22)' }}>{t.sustentabilidadePage.title3}</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px,1.2vw,17px)', color: '#475569', lineHeight: 1.8, margin: '0 0 clamp(16px,2vw,24px)', maxWidth: 480 }}>
                {displayP1}
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px,1.2vw,17px)', color: '#475569', lineHeight: 1.8, margin: 0, maxWidth: 480 }}>
                {displayP2}
              </p>
            </div>

            <div className="sus-s1-right" style={{ opacity: 0, position: 'relative' }}>
              <div aria-hidden style={{ position: 'absolute', top: -20, right: -12, zIndex: 0, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(80px,12vw,160px)', lineHeight: 1, color: 'rgba(26,57,110,0.05)', letterSpacing: '-0.05em', pointerEvents: 'none', userSelect: 'none' }}>ESG</div>
              <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 4, overflow: 'hidden', background: '#0d1d35', zIndex: 1 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heroImg} alt="Sustentabilidade Omatapalo" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(7,16,31,0.65) 100%)' }} />
                <div style={{ position: 'absolute', bottom: 24, left: 24, background: '#1a396e', padding: '6px 14px', fontFamily: 'var(--font-label)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)' }}>
                  {{ pt: 'Grupo Omatapalo · ESG', en: 'Omatapalo Group · ESG', fr: 'Groupe Omatapalo · ESG' }[locale] ?? 'Grupo Omatapalo · ESG'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ESG PILLARS ── */}
      <section ref={s2Ref} style={{ background: '#1a396e', position: 'relative', overflow: 'hidden', paddingTop: 'clamp(72px,10vh,120px)', paddingBottom: 'clamp(72px,10vh,120px)' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...gridTexture }} />
        <div ref={bgRef} aria-hidden style={{ position: 'absolute', bottom: -40, right: -20, zIndex: 0, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(120px,18vw,260px)', lineHeight: 1, color: 'rgba(255,255,255,0.03)', letterSpacing: '-0.05em', pointerEvents: 'none', userSelect: 'none' }}>03</div>

        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="sus-s2-hdr" style={{ opacity: 0, marginBottom: 'clamp(40px,6vw,64px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect width="10" height="10" fill="rgba(255,255,255,0.4)" /></svg>
              <span style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>{t.sustentabilidadePage.esgEyebrow}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px,4vw,64px)', alignItems: 'flex-end' }} className="sus-s2-hdr-grid">
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem,4vw,4.5rem)', color: '#fff', letterSpacing: '-0.035em', lineHeight: 0.92, textTransform: 'uppercase' }}>
                {t.sustentabilidadePage.esgTitle1}<br />
                <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>{t.sustentabilidadePage.esgTitle2}</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1.1vw,16px)', color: '#fff', lineHeight: 1.8, margin: 0 }}>
                {t.sustentabilidadePage.esgDesc}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(12px,1.5vw,20px)' }} className="sus-esg-grid">
            {displayEsg.map(p => (
              <div key={p.n} className="sus-esg-card" style={{ opacity: 0 }}>
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 3, height: 'clamp(280px,28vw,380px)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.t} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 35%, rgba(7,16,31,0.85) 100%)' }} />
                  <div style={{ position: 'absolute', top: 16, left: 16, background: '#1a396e', padding: '4px 10px', fontFamily: 'var(--font-label)', fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>{p.n}</div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 24px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1rem,1.4vw,1.3rem)', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 8 }}>{p.t}</div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(11px,0.85vw,13px)', color: '#fff', lineHeight: 1.7, margin: 0 }}>{p.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. ODS ── */}
      <section ref={s3Ref} style={{ background: '#F6F8FB', paddingTop: 'clamp(72px,10vh,120px)', paddingBottom: 'clamp(72px,10vh,120px)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }} className="sus-s3-grid">
            <div className="sus-s3-left" style={{ opacity: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect width="10" height="10" fill="#1a396e" /></svg>
                <span style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a396e' }}>{t.sustentabilidadePage.odsEyebrow}</span>
              </div>
              <h2 style={{ margin: '0 0 clamp(20px,2.5vw,32px)', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem,3.5vw,4rem)', color: '#0F1A2E', letterSpacing: '-0.035em', lineHeight: 0.92, textTransform: 'uppercase' }}>
                {t.sustentabilidadePage.odsTitle1}<br />{t.sustentabilidadePage.odsTitle2}<br />
                <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(26,57,110,0.22)' }}>{t.sustentabilidadePage.odsTitle3}</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px,1.2vw,16px)', color: '#475569', lineHeight: 1.8, margin: '0 0 clamp(24px,3vw,36px)' }}>
                {(() => {
                  const boldMap: Record<string, string> = { pt: 'Pacto Global das Nações Unidas', en: 'UN Global Compact', fr: 'Pacte Mondial des Nations Unies' };
                  const bold = boldMap[locale] ?? 'UN Global Compact';
                  const desc = t.sustentabilidadePage.odsDesc;
                  const idx = desc.indexOf(bold);
                  if (idx === -1) return desc;
                  return <>{desc.slice(0, idx)}<strong style={{ color: '#0F1A2E' }}>{bold}</strong>{desc.slice(idx + bold.length)}</>;
                })()}
              </p>

              {/* Goals list */}
              <div style={{ borderTop: '1px solid #DDE3ED', marginBottom: 'clamp(24px,3vw,36px)' }}>
                {t.sustentabilidadePage.odsGoals.map((g, i) => (
                  <div key={g} className="sus-ods-icon" style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: 14, padding: 'clamp(12px,1.5vw,16px) 0', borderBottom: '1px solid #DDE3ED' }}>
                    <span style={{ fontFamily: 'var(--font-label)', fontSize: 9, letterSpacing: '0.16em', color: '#1a396e', flexShrink: 0, minWidth: 24 }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(0.8rem,1vw,0.95rem)', textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#0F1A2E' }}>{g}</span>
                  </div>
                ))}
              </div>

              {/* ODS icons */}
              <div style={{ display: 'flex', gap: 'clamp(12px,1.5vw,20px)', flexWrap: 'wrap' }} className="sus-ods-row">
                {displayODS.map(o => (
                  <div key={o.alt} className="sus-ods-icon" style={{ opacity: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={o.src} alt={o.alt} style={{ width: 'clamp(52px,6vw,72px)', height: 'auto', display: 'block' }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="sus-s3-right" style={{ opacity: 0, position: 'relative' }}>
              <div aria-hidden style={{ position: 'absolute', top: -20, right: -12, zIndex: 0, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(80px,12vw,160px)', lineHeight: 1, color: 'rgba(26,57,110,0.05)', letterSpacing: '-0.05em', pointerEvents: 'none', userSelect: 'none' }}>ODS</div>
              <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 4, overflow: 'hidden', background: '#0d1d35', zIndex: 1 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Sustentabilidade-omatapalo.png" alt="ODS Omatapalo" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(7,16,31,0.6) 100%)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CERTIFICAÇÕES ── */}
      <section ref={s4Ref} style={{ background: '#1a396e', position: 'relative', overflow: 'hidden', paddingTop: 'clamp(72px,10vh,120px)', paddingBottom: 'clamp(72px,10vh,120px)' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...gridTexture }} />
        <div aria-hidden style={{ position: 'absolute', top: -20, right: -20, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(100px,15vw,220px)', lineHeight: 1, color: 'rgba(255,255,255,0.04)', letterSpacing: '-0.05em', pointerEvents: 'none', userSelect: 'none' }}>ISO</div>

        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="sus-s4-hdr" style={{ opacity: 0, marginBottom: 'clamp(48px,6vw,72px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect width="10" height="10" fill="rgba(255,255,255,0.4)" /></svg>
              <span style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>{t.sustentabilidadePage.certsEyebrow}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px,4vw,64px)', alignItems: 'flex-end' }} className="sus-s4-hdr-grid">
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem,4vw,4.5rem)', color: '#fff', letterSpacing: '-0.035em', lineHeight: 0.92, textTransform: 'uppercase' }}>
                {certsTitle}<br />
                <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>{certsOutline}</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1.1vw,16px)', color: '#fff', lineHeight: 1.8, margin: 0 }}>
                {certsDesc}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(12px,1.5vw,20px)' }} className="sus-cert-grid">
            {displayCertLogos.map(c => (
              <a key={c.alt} href={c.href} target="_blank" rel="noopener noreferrer" className="sus-cert" style={{
                opacity: 0, textDecoration: 'none',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 3, padding: 'clamp(28px,3.5vw,48px) clamp(20px,2.5vw,32px)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
                transition: 'background 0.25s, border-color 0.25s', cursor: 'pointer',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.11)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.22)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.src} alt={c.alt} style={{ maxHeight: 'clamp(70px,8vw,110px)', maxWidth: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)', display: 'block' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 13, color: '#fff', letterSpacing: '0.02em', marginBottom: 4 }}>{c.alt}</div>
                  <div style={{ fontFamily: 'var(--font-label)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff' }}>{c.label}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. RELATÓRIO ── */}
      <section ref={s5Ref} style={{ background: '#07101f', position: 'relative', overflow: 'hidden', paddingTop: 'clamp(72px,10vh,120px)', paddingBottom: 'clamp(72px,10vh,120px)' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...gridTexture }} />

        <div className="wrap sus-s5-inner" style={{ opacity: 0, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }} className="sus-s5-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect width="10" height="10" fill="rgba(255,255,255,0.4)" /></svg>
                <span style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>{t.sustentabilidadePage.relEyebrow}</span>
              </div>
              <h2 style={{ margin: '0 0 clamp(16px,2vw,28px)', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem,3.5vw,4rem)', color: '#fff', letterSpacing: '-0.035em', lineHeight: 0.92, textTransform: 'uppercase' }}>
                {relTitle1}<br />
                <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.18)' }}>{relTitle2}</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px,1.2vw,16px)', color: '#fff', lineHeight: 1.8, margin: 0, maxWidth: 440 }}>
                {displayRelDesc}
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, padding: 'clamp(32px,4vw,56px)', display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, background: '#1a396e', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-label)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>{docLabel}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(0.9rem,1.2vw,1.1rem)', color: '#fff', letterSpacing: '-0.01em' }}>{displayRelTitulo}</div>
                </div>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />
              <a href={relPdf} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff', textDecoration: 'none', background: '#1a396e', padding: '14px 24px', borderRadius: 2, alignSelf: 'flex-start' }}>
                {t.sustentabilidadePage.relBtn}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .sus-s1-grid,.sus-s3-grid,.sus-s5-grid { grid-template-columns:1fr !important; }
          .sus-s2-hdr-grid,.sus-s4-hdr-grid { grid-template-columns:1fr !important; }
          .sus-esg-grid { grid-template-columns:1fr 1fr !important; }
          .sus-cert-grid { grid-template-columns:1fr 1fr !important; }
        }
        @media (max-width: 580px) {
          .sus-esg-grid { grid-template-columns:1fr !important; }
        }
      `}</style>
    </div>
  );
}
