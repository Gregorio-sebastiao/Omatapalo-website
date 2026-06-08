'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const links = [
  { label: 'Omatapalo', href: '#grupo' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Regiões', href: '#regioes' },
  { label: 'Projectos SMOK', href: '#smok' },
  { label: 'Media', href: '#media' },
  { label: 'Sustentabilidade', href: '#sustentabilidade' },
  { label: 'Contactos', href: '#contactos' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelector(href)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        role="banner"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-white/97 backdrop-blur-xl shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="wrap flex items-center justify-between h-20">

          {/* Logo */}
          <a
            href="/"
            aria-label="Grupo Omatapalo — Página Inicial"
            className="flex items-center"
          >
            <Image
              src="/logo.png"
              alt="Omatapalo"
              width={180}
              height={48}
              className={`h-10 w-auto transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`}
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav aria-label="Navegação principal" className="hidden xl:flex items-center gap-8">
            {links.map(l => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className={`t-label transition-colors duration-200 relative group ${
                  scrolled ? 'text-[var(--text-3)] hover:text-[var(--navy)]' : 'text-white/70 hover:text-white'
                }`}
              >
                {l.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--orange)] group-hover:w-full transition-all duration-250`} aria-hidden="true" />
              </button>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="xl:hidden w-11 h-11 flex flex-col justify-center gap-[5px]"
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                aria-hidden="true"
                className={`block h-0.5 transition-all duration-250 ${
                  scrolled ? 'bg-[var(--navy)]' : 'bg-white'
                } ${
                  i === 0 ? (open ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6') :
                  i === 1 ? (open ? 'opacity-0 w-3' : 'w-4') :
                  (open ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-6')
                }`}
              />
            ))}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--navy-dark)] flex flex-col"
          >
            {/* Close button area */}
            <div className="h-20 wrap flex items-center justify-end">
              <button onClick={() => setOpen(false)} aria-label="Fechar menu"
                className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white">
                <span aria-hidden="true" className="text-2xl leading-none">✕</span>
              </button>
            </div>

            <nav aria-label="Menu mobile" className="wrap flex-1 flex flex-col justify-center gap-1">
              {links.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => go(l.href)}
                  className="text-left py-5 group flex items-center justify-between"
                >
                  <span className="t-h3 text-white/70 group-hover:text-white transition-colors duration-200">
                    {l.label}
                  </span>
                  <span aria-hidden="true" className="text-[var(--orange)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-2xl">
                    →
                  </span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
