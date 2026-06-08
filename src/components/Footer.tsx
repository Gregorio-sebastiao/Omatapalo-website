'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { GeoIcon } from './GeoDecor';

const cols = [
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Nós', href: '#' },
      { label: 'História', href: '#' },
      { label: 'Liderança', href: '#' },
      { label: 'Missão & Visão', href: '#' },
      { label: 'Prémios', href: '#' },
    ],
  },
  {
    title: 'Serviços',
    links: [
      { label: 'Engenharia', href: '#' },
      { label: 'Obras Públicas', href: '#' },
      { label: 'Imobiliário', href: '#' },
      { label: 'Agroindústria', href: '#' },
      { label: 'Energia', href: '#' },
    ],
  },
  {
    title: 'Marcas',
    links: [
      { label: 'Prime Properties', href: '#' },
      { label: 'Flow Hotel', href: '#' },
      { label: 'Metalosul', href: '#' },
      { label: 'Drill Go', href: '#' },
      { label: 'Mormolo', href: '#' },
    ],
  },
];

const socials = [
  {
    label: 'LinkedIn', href: '#',
    svg: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  },
  {
    label: 'Facebook', href: '#',
    svg: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  },
  {
    label: 'Instagram', href: '#',
    svg: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z',
  },
  {
    label: 'YouTube', href: '#',
    svg: 'M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z M9.75 15.02l5.75-3.02-5.75-3.02v6.04z',
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--navy-dark)] text-white relative overflow-hidden" role="contentinfo">

      {/* ── Big CTA band ── */}
      <div className="relative border-b border-white/[0.07] overflow-hidden">
        {/* Background geo mark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none" aria-hidden="true">
          <GeoIcon size={360} color="white" className="opacity-[0.03]" />
        </div>

        <div className="wrap py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="t-label text-white/35 mb-4">Próximo Passo</p>
              <h2
                className="font-black text-white leading-[0.9] mb-0"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', letterSpacing: '-0.035em' }}
              >
                Vamos Construir<br />
                <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.3)', color: 'transparent' }}>
                  Juntos?
                </span>
              </h2>
            </div>
            <div className="flex flex-col gap-5">
              <p className="t-body text-white/45 max-w-sm">
                Fale connosco sobre o seu projecto. A nossa equipa está pronta para transformar a sua visão em realidade.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#contactos" className="btn btn-primary">Iniciar Projecto →</a>
                <a href="tel:+244000000000" className="btn btn-ghost-white">+244 000 000 000</a>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-2 h-2 rounded-full bg-green-400" aria-hidden="true" />
                <span className="t-xs text-white/35">Disponível para novos projectos em 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="wrap py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 xl:gap-16 mb-20">

          {/* Brand col */}
          <div>
            <div className="mb-8">
              <Image
                src="/logo.png"
                alt="Omatapalo"
                width={160}
                height={42}
                className="h-9 w-auto brightness-0 invert opacity-80"
              />
            </div>
            <p className="t-sm text-white/35 leading-relaxed mb-8 max-w-xs">
              Engenharia, Construção e Infraestrutura a transformar Angola e o continente africano desde 1994.
            </p>

            {/* Office info */}
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex items-start gap-3">
                <svg className="shrink-0 mt-0.5 opacity-30" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="t-xs text-white/35">Luanda, Angola</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="shrink-0 mt-0.5 opacity-30" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <span className="t-xs text-white/35">geral@omatapalo.ao</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-2" role="list" aria-label="Redes sociais">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  role="listitem"
                  aria-label={`Omatapalo no ${s.label}`}
                  className="w-10 h-10 flex items-center justify-center border border-white/[0.08] text-white/30 hover:text-white hover:border-white/30 transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d={s.svg} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="t-label text-white/50 mb-7">{col.title}</h3>
              <ul className="flex flex-col gap-3.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="t-sm text-white/30 hover:text-white transition-colors duration-200 block group flex items-center gap-2"
                    >
                      <span className="w-0 h-px bg-white/50 group-hover:w-3 transition-all duration-200 inline-block" aria-hidden="true" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Certifications row */}
        <div className="flex flex-wrap items-center gap-4 py-8 border-t border-b border-white/[0.07] mb-8">
          <span className="t-label text-white/20 mr-2">Certificações</span>
          {['ISO 9001', 'ISO 14001', 'ISO 45001', 'OHSAS 18001'].map(c => (
            <span key={c} className="t-xs font-bold text-white/30 px-3 py-1.5 border border-white/[0.08]">{c}</span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="t-xs text-white/20">
            © {new Date().getFullYear()} Grupo Omatapalo · Todos os direitos reservados · Luanda, Angola
          </p>
          <nav aria-label="Links legais" className="flex flex-wrap gap-6">
            {['Privacidade', 'Termos de Uso', 'Cookies'].map(l => (
              <a key={l} href="#" className="t-xs text-white/20 hover:text-white/55 transition-colors duration-200">{l}</a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
