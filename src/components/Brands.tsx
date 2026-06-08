'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const brands = [
  { name: 'Prime Properties', sector: 'Imobiliário', symbol: 'PP', color: 'from-amber-900/20' },
  { name: 'Flow Hotel', sector: 'Hotelaria', symbol: 'FH', color: 'from-sky-900/20' },
  { name: 'Metalosul', sector: 'Indústria', symbol: 'MS', color: 'from-zinc-800/20' },
  { name: 'Drill Go', sector: 'Minas', symbol: 'DG', color: 'from-orange-900/20' },
  { name: 'Investimo', sector: 'Energia', symbol: 'IN', color: 'from-yellow-900/20' },
  { name: 'Mormolo', sector: 'Pesca', symbol: 'PM', color: 'from-blue-900/20' },
];

export default function Brands() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="section bg-[var(--brand-navy)] border-t border-white/[0.06]">
      <div className="wrap">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-4 mb-6">
              <span className="divider-line" />
              <span className="label-sm text-[var(--brand-orange)]">Marcas do Grupo</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }} className="display-md text-white">
              Seis Marcas.<br /><span className="orange-gradient">Um Propósito.</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }} className="text-[var(--gray)] text-sm leading-relaxed max-w-xs">
            Cada marca é uma promessa de qualidade e especialização num setor específico.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group relative overflow-hidden bg-[var(--brand-navy-2)] border border-white/[0.06] p-6 flex flex-col items-center justify-center gap-4 card-hover cursor-none hover:border-[var(--brand-orange)]/30`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${b.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />
              <div className="relative z-10 w-14 h-14 border border-white/[0.08] group-hover:border-[var(--brand-orange)]/60 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white/30 text-sm font-black font-mono group-hover:text-[var(--brand-orange)] transition-colors duration-300">
                  {b.symbol}
                </span>
              </div>
              <div className="relative z-10 text-center">
                <div className="text-white text-xs font-bold mb-0.5">{b.name}</div>
                <div className="label-sm text-[var(--gray)]">{b.sector}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
