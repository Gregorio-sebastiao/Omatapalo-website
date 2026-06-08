'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const cats = ['Todos', 'Construção', 'Infraestrutura', 'Imobiliário', 'Industria'];

const projects = [
  {
    title: 'Hospital Central de Luanda', cat: 'Construção',
    area: 'Luanda', year: '2023', featured: true,
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80&auto=format&fit=crop',
    desc: 'Infraestrutura hospitalar de referência nacional com 450 camas e equipamento de última geração.',
  },
  {
    title: 'Estrada Luanda–Malanje', cat: 'Infraestrutura',
    area: 'Angola', year: '2022', featured: false,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&auto=format&fit=crop',
    desc: '450km de rodovia pavimentada conectando províncias.',
  },
  {
    title: 'Condomínio Prime Talatona', cat: 'Imobiliário',
    area: 'Luanda', year: '2022', featured: false,
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=80&auto=format&fit=crop',
    desc: '800 unidades habitacionais premium no coração de Talatona.',
  },
  {
    title: 'Parque Industrial Viana', cat: 'Industria',
    area: 'Luanda', year: '2021', featured: true,
    img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80&auto=format&fit=crop',
    desc: 'Complexo industrial integrado de 120.000m² com 40+ empresas instaladas.',
  },
  {
    title: 'Ponte Rio Kwanza', cat: 'Infraestrutura',
    area: 'Kwanza Sul', year: '2021', featured: false,
    img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&q=80&auto=format&fit=crop',
    desc: 'Travessia de 380m conectando margens do Rio Kwanza.',
  },
  {
    title: 'Torre Empresarial Downtown', cat: 'Construção',
    area: 'Luanda', year: '2020', featured: false,
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80&auto=format&fit=crop',
    desc: 'Edifício de escritórios classe A, 28 andares, 32.000m².',
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [active, setActive] = useState('Todos');

  const filtered = active === 'Todos' ? projects : projects.filter(p => p.cat === active);
  const featured = filtered.find(p => p.featured) || filtered[0];
  const rest = filtered.filter(p => p !== featured);

  return (
    <section id="portfolio" ref={ref} className="section bg-[var(--dark-2)]">
      <div className="wrap">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-4 mb-6">
              <span className="divider-line" />
              <span className="label-sm text-[var(--brand-orange)]">Portefólio</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }} className="display-lg text-white">
              Projetos que<br /><span className="orange-gradient">Definem Nações.</span>
            </motion.h2>
          </div>

          {/* Filters */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }} className="flex flex-wrap gap-2">
            {cats.map(c => (
              <button key={c} onClick={() => setActive(c)}
                className={`label-sm px-5 py-2.5 border transition-all duration-300 cursor-none ${
                  active === c
                    ? 'bg-[var(--brand-orange)] text-white border-[var(--brand-orange)]'
                    : 'border-white/10 text-[var(--gray)] hover:border-[var(--brand-orange)]/50 hover:text-white'
                }`}>
                {c}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Featured + grid layout ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4"
          >
            {/* Featured card — spans 2 cols */}
            {featured && (
              <div className="lg:col-span-2 group relative overflow-hidden card-hover cursor-none">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={featured.img} alt={featured.title}
                    fill className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width:1024px) 100vw, 66vw" unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B12] via-[#070B12]/30 to-transparent" />
                  <div className="absolute top-5 left-5 bg-[var(--brand-orange)] label-sm text-white px-3 py-1.5">
                    Destaque
                  </div>
                </div>
                <div className="bg-[var(--dark-3)] border border-white/[0.06] p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="label-sm text-[var(--brand-orange)]">{featured.cat}</span>
                    <span className="text-white/20 text-xs">·</span>
                    <span className="label-sm text-[var(--gray)]">{featured.area}</span>
                    <span className="text-white/20 text-xs">·</span>
                    <span className="label-sm text-[var(--gray)]">{featured.year}</span>
                  </div>
                  <h3 className="text-white text-2xl font-black mb-3 group-hover:text-[var(--brand-orange)] transition-colors duration-300">
                    {featured.title}
                  </h3>
                  <p className="text-[var(--gray)] text-sm leading-relaxed">{featured.desc}</p>
                </div>
              </div>
            )}

            {/* Smaller cards */}
            <div className="flex flex-col gap-4">
              {rest.slice(0, 3).map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="group flex gap-0 overflow-hidden border border-white/[0.06] card-hover cursor-none bg-[var(--dark-3)]"
                >
                  <div className="relative w-28 shrink-0 overflow-hidden">
                    <Image
                      src={p.img} alt={p.title}
                      fill className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="112px" unoptimized
                    />
                    <div className="absolute inset-0 bg-[var(--brand-navy)]/30" />
                  </div>
                  <div className="p-4 flex-1 min-w-0">
                    <div className="label-sm text-[var(--brand-orange)] mb-2">{p.cat} · {p.year}</div>
                    <h4 className="text-white text-sm font-bold leading-snug group-hover:text-[var(--brand-orange)] transition-colors duration-300 truncate">
                      {p.title}
                    </h4>
                    <p className="text-[var(--gray)] text-xs mt-1 leading-relaxed line-clamp-2">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }} className="text-center mt-12">
          <button className="btn-outline">Ver Todos os Projetos →</button>
        </motion.div>
      </div>
    </section>
  );
}
