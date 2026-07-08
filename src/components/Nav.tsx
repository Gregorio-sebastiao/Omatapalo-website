'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { Locale } from '@/lib/i18n/translations';

const FLAGS: { locale: Locale; countryCode: string; label: string }[] = [
  { locale: 'pt', countryCode: 'ao', label: 'PT' },
  { locale: 'en', countryCode: 'gb', label: 'EN' },
  { locale: 'fr', countryCode: 'fr', label: 'FR' },
];

function FlagImg({ code, size = 20 }: { code: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/flags/${code}.png`}
      width={size}
      height={Math.round(size * 0.67)}
      alt={code.toUpperCase()}
      style={{ borderRadius: 2, objectFit: 'cover', flexShrink: 0, display: 'block' }}
    />
  );
}

const DEFAULT_NAV = [
  { t: 'O Grupo', href: '/omatapalo', sub: [
    { t: 'Omatapalo no Mundo', href: '/omatapalo#mundo' },
    { t: 'História', href: '/omatapalo' },
    { t: 'Conselho de Administração', href: '/omatapalo#conselho' },
  ]},
  { t: 'Portefólio', href: '/portefolio' },
  { t: 'Pessoas', href: '/pessoas', sub: [
    { t: 'Candidaturas', href: '/pessoas#candidaturas' },
  ]},
  { t: 'Sustentabilidade', href: '/sustentabilidade' },
  { t: 'R.Social', href: '/responsabilidade-social', sub: [
    { t: 'Missão Fazer Sorrir', href: '/responsabilidade-social#missao' },
  ]},
  { t: 'CDH', href: '/cdh' },
  { t: 'Media', href: '#', sub: [
    { t: 'Notícias', href: '/noticias' },
  ]},
  { t: 'Press Kit', href: '/press-kit' },
];

type NavEntry = { t: string; href: string; sub?: { t: string; href: string }[] };

const ALL_PAGES = [
  { t: 'O Grupo', href: '/omatapalo' },
  { t: 'Omatapalo no Mundo', href: '/omatapalo#mundo' },
  { t: 'História', href: '/omatapalo' },
  { t: 'Conselho de Administração', href: '/omatapalo#conselho' },
  { t: 'Portefólio', href: '/portefolio' },
  { t: 'Pessoas', href: '/pessoas' },
  { t: 'Candidaturas', href: '/pessoas#candidaturas' },
  { t: 'CDH', href: '/cdh' },
  { t: 'Media', href: '/media' },
  { t: 'Press Kit', href: '/press-kit' },
  { t: 'Sustentabilidade', href: '/sustentabilidade' },
  { t: 'R.Social', href: '/responsabilidade-social' },
  { t: 'Missão Fazer Sorrir', href: '/responsabilidade-social#missao' },
  { t: 'Contactos', href: '/contactos' },
];

function buildTranslatedNav(tNav: typeof import('@/lib/i18n/translations').translations['pt']['nav']): NavEntry[] {
  return [
    { t: tNav.grupo, href: '/omatapalo', sub: [
      { t: tNav.mundo, href: '/omatapalo#mundo' },
      { t: tNav.historia, href: '/omatapalo' },
      { t: tNav.conselho, href: '/omatapalo#conselho' },
    ]},
    { t: tNav.portefolio, href: '/portefolio' },
    { t: tNav.pessoas, href: '/pessoas', sub: [
      { t: tNav.candidaturas, href: '/pessoas#candidaturas' },
    ]},
    { t: tNav.sustentabilidade, href: '/sustentabilidade' },
    { t: tNav.rsocial, href: '/responsabilidade-social', sub: [
      { t: tNav.missaoSorrir, href: '/responsabilidade-social#missao' },
    ]},
    { t: tNav.cdh, href: '/cdh' },
    { t: tNav.media, href: '#', sub: [
      { t: tNav.noticias, href: '/noticias' },
    ]},
    { t: tNav.pressKit, href: '/press-kit' },
  ];
}

function buildTranslatedPages(tNav: typeof import('@/lib/i18n/translations').translations['pt']['nav']) {
  return [
    { t: tNav.grupo, href: '/omatapalo' },
    { t: tNav.mundo, href: '/omatapalo#mundo' },
    { t: tNav.historia, href: '/omatapalo' },
    { t: tNav.conselho, href: '/omatapalo#conselho' },
    { t: tNav.portefolio, href: '/portefolio' },
    { t: tNav.pessoas, href: '/pessoas' },
    { t: tNav.cdh, href: '/cdh' },
    { t: tNav.media, href: '/media' },
    { t: tNav.pressKit, href: '/press-kit' },
    { t: tNav.sustentabilidade, href: '/sustentabilidade' },
    { t: tNav.rsocial, href: '/responsabilidade-social' },
    { t: tNav.missaoSorrir, href: '/responsabilidade-social#missao' },
    { t: tNav.contactos, href: '/contactos' },
  ];
}

export default function Nav() {
  const { locale, setLocale, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [ptNav, setPtNav] = useState<NavEntry[]>(DEFAULT_NAV.map(n => ({ ...n, sub: n.sub?.map(s => ({ t: s.t, href: s.href })) })));
  const DEFAULT_LOGO = '/logo/LOGO OMT 1.png';
  const [logoUrl, setLogoUrl] = useState(DEFAULT_LOGO);
  const [langOpen, setLangOpen] = useState(false);

  const nav = locale === 'pt' ? ptNav : buildTranslatedNav(t.nav);
  const allPages = locale === 'pt' ? ALL_PAGES : buildTranslatedPages(t.nav);

  useEffect(() => {
    createClient().from('site_settings').select('key,value').then(({ data }) => {
      if (!data) return;
      for (const row of data) {
        if (row.key === 'nav_items') {
          try {
            const items = JSON.parse(row.value);
            const parsed: NavEntry[] = items.map((n: { label: string; href: string; sub?: { label: string; href: string }[] }) => ({
              t: n.label, href: n.href,
              sub: n.sub?.map(s => ({ t: s.label, href: s.href })),
            }));
            // Always ensure Candidaturas appears under Pessoas
            const pessoasIdx = parsed.findIndex(n => n.href === '/pessoas');
            if (pessoasIdx !== -1) {
              const sub = parsed[pessoasIdx].sub ?? [];
              if (!sub.some(s => s.href === '/pessoas#candidaturas')) {
                parsed[pessoasIdx] = { ...parsed[pessoasIdx], sub: [...sub, { t: 'Candidaturas', href: '/pessoas#candidaturas' }] };
              }
            }
            setPtNav(parsed);
          } catch {}
        }
        if (row.key === 'logo_url' && row.value) setLogoUrl(row.value);
      }
    });
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); setLangOpen(false); } };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const fn = (e: MouseEvent) => { if (!(e.target as Element).closest('[data-lang-dropdown]')) setLangOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [langOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* GSAP entrance */
  useEffect(() => {
    let gsap: typeof import('gsap').gsap | null = null;
    import('gsap').then(({ gsap: g }) => {
      gsap = g;
      if (headerRef.current) {
        g.fromTo(headerRef.current,
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 }
        );
      }
    });
    return () => {};
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        id="top"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-white/10' : ''}`}
        style={{
          background: scrolled
            ? '#1a396e'
            : 'linear-gradient(180deg, rgba(7,16,31,0.55), rgba(7,16,31,0))',
          backdropFilter: scrolled ? 'none' : 'none',
          WebkitBackdropFilter: 'none',
          opacity: 0,
        }}
      >
        <div className="wrap flex items-center gap-6 h-20">
          <a href="/" aria-label="Omatapalo — início" style={{ flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
              alt="Omatapalo"
              onError={e => { e.currentTarget.src = DEFAULT_LOGO; }}
              style={{ width: 140, height: 'auto', filter: 'brightness(0) invert(1)', display: 'block' }}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5 ml-auto h-full">
            {nav.map((n) => (
              <div key={n.t} className="relative h-full flex items-center group">
                <a
                  href={n.href}
                  className="flex items-center gap-1 text-[14px] font-semibold tracking-[0.05em] uppercase transition-colors duration-200 whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-sans)', color: '#ffffff' }}
                >
                  {n.t}
                  {n.sub && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 group-hover:rotate-180">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </a>
                {/* Underline */}
                <span className="absolute bottom-[18px] left-0 w-0 h-[2px] bg-[var(--navy-300)] group-hover:w-full transition-all duration-300" />

                {n.sub && (
                  <div className="absolute top-full left-[-16px] min-w-[248px] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200"
                    style={{
                      background: 'rgba(7,16,31,0.45)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      borderRadius: 'var(--radius-md)',
                      padding: '8px',
                    }}>
                    {n.sub.map((s) => (
                      <a key={s.t} href={s.href}
                        className="block px-3.5 py-2.5 rounded text-[12px] font-semibold uppercase tracking-[0.08em] hover:bg-white/[0.07] transition-colors duration-150"
                        style={{ fontFamily: 'var(--font-sans)', color: '#ffffff' }}>
                        {s.t}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href="/contactos"
              className="btn btn-ghost-white ml-2"
              style={{ height: '40px', paddingInline: '20px', fontSize: '13px', textTransform: 'uppercase' }}>
              {t.nav.contactos}
            </a>

          </nav>

          {/* Language switcher — desktop dropdown */}
          <div data-lang-dropdown style={{ position: 'relative', borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: 12 }} className="hidden lg:block">
            <button
              onClick={() => setLangOpen(o => !o)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', color: '#fff' }}
            >
              <FlagImg code={FLAGS.find(f => f.locale === locale)?.countryCode ?? 'ao'} size={20} />
              <span style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.12em', fontWeight: 700 }}>{locale.toUpperCase()}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: 'transform .2s', transform: langOpen ? 'rotate(180deg)' : 'none' }}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {langOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: '#1a396e', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, overflow: 'hidden', minWidth: 90, zIndex: 100, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
                {FLAGS.map(({ locale: l, label, countryCode }) => (
                  <button key={l} onClick={() => { setLocale(l); setLangOpen(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '9px 16px', background: locale === l ? 'rgba(255,255,255,0.12)' : 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.12em', fontWeight: 700, color: '#fff', textAlign: 'left' }}>
                    <FlagImg code={countryCode} size={20} />{label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language switcher — mobile dropdown */}
          <div data-lang-dropdown style={{ position: 'relative' }} className="lg:hidden ml-auto mr-1">
            <button
              onClick={() => setLangOpen(o => !o)}
              style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', color: '#fff' }}
            >
              <FlagImg code={FLAGS.find(f => f.locale === locale)?.countryCode ?? 'ao'} size={18} />
              <span style={{ fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: '0.12em', fontWeight: 700 }}>{locale.toUpperCase()}</span>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {langOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, background: '#1a396e', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, overflow: 'hidden', minWidth: 80, zIndex: 100, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
                {FLAGS.map(({ locale: l, label, countryCode }) => (
                  <button key={l} onClick={() => { setLocale(l); setLangOpen(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 14px', background: locale === l ? 'rgba(255,255,255,0.12)' : 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: '0.12em', fontWeight: 700, color: '#fff', textAlign: 'left' }}>
                    <FlagImg code={countryCode} size={18} />{label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Burger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Menu"
            className="lg:hidden text-white p-2"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-[90] flex flex-col overflow-y-auto transition-transform duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: 'var(--navy-950)', padding: 'clamp(20px,5vw,40px)' }}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} alt="Omatapalo" onError={e => { e.currentTarget.src = DEFAULT_LOGO; }} style={{ width: 80, height: 'auto', filter: 'brightness(0) invert(1)' }} />
          <button onClick={() => setOpen(false)} aria-label="Fechar" className="text-white p-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        {/* Language switcher mobile */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {FLAGS.map(({ locale: l, countryCode, label }) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              style={{
                background: locale === l ? 'rgba(255,255,255,0.12)' : 'none',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 8, cursor: 'pointer',
                padding: '8px 14px',
                display: 'flex', alignItems: 'center', gap: 8,
                color: '#fff', fontSize: 13, fontWeight: 700,
                opacity: locale === l ? 1 : 0.5,
                transition: 'all .2s',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://flagcdn.com/24x18/${countryCode}.png`} width={24} height={18} alt={label} style={{ borderRadius: 2, display: 'block' }} />
              {label}
            </button>
          ))}
        </div>

        <nav className="flex flex-col">
          {allPages.map((p, i) => (
            <a
              key={p.t}
              href={p.href}
              onClick={() => setOpen(false)}
              className="flex items-center py-3 border-b border-white/10 hover:pl-2.5 transition-all duration-200 group"
            >
              <span
                className="font-black uppercase text-white group-hover:text-[var(--navy-200)] transition-colors"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px,2.8vw,22px)', letterSpacing: '-0.01em' }}>
                {p.t}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
