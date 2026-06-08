'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const roles = [
  { title: 'Engenharia & Projetos', open: 12, icon: '◈' },
  { title: 'Construção Civil', open: 28, icon: '◉' },
  { title: 'Tecnologia', open: 7, icon: '◌' },
  { title: 'Gestão', open: 5, icon: '◎' },
  { title: 'Agroindústria', open: 15, icon: '◬' },
  { title: 'Hotelaria', open: 9, icon: '◇' },
];

const images = [
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80&auto=format&fit=crop&crop=faces',
];

export default function People() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="pessoas" ref={ref} className="section bg-[var(--dark-2)] overflow-hidden">
      <div className="wrap">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-4 mb-6">
              <span className="divider-line" />
              <span className="label-sm text-[var(--brand-orange)]">Pessoas</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }} className="display-lg text-white mb-8">
              O Nosso<br /><span className="orange-gradient">Maior Ativo.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-[var(--gray-2)] text-lg leading-relaxed mb-10">
              Mais de 15.000 colaboradores definem quem somos. Investimos na formação,
              no desenvolvimento e no bem-estar de cada pessoa do Grupo Omatapalo.
            </motion.p>

            {/* Team photos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-0 mb-10"
            >
              {images.map((img, i) => (
                <div key={i} className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--dark-2)]"
                  style={{ marginLeft: i > 0 ? '-16px' : 0, zIndex: images.length - i }}>
                  <Image src={img} alt="Colaborador" fill className="object-cover" unoptimized />
                </div>
              ))}
              <div className="ml-2 flex flex-col pl-4">
                <span className="text-white font-black text-lg">15.000+</span>
                <span className="text-[var(--gray)] text-xs">Colaboradores activos</span>
              </div>
            </motion.div>

            {/* Benefits */}
            <div className="flex flex-col gap-3 mb-10">
              {[
                { icon: '◆', label: 'Academia Omatapalo', desc: 'Formação técnica e liderança interna' },
                { icon: '◉', label: 'Plano de Carreira', desc: 'Crescimento meritocrático e transparente' },
                { icon: '◈', label: 'Saúde & Bem-estar', desc: 'Seguros, apoio psicológico e instalações' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="flex items-start gap-4 p-4 bg-[var(--dark-3)] border border-white/[0.06] hover:border-[var(--brand-orange)]/30 transition-colors duration-300 group"
                >
                  <span className="text-[var(--brand-orange)] text-xl mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                  <div>
                    <div className="text-white text-sm font-bold mb-0.5">{item.label}</div>
                    <div className="text-[var(--gray)] text-xs">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }} className="btn-primary">
              Ver Vagas Abertas →
            </motion.button>
          </div>

          {/* Right: vacancy grid */}
          <div>
            <motion.p
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              className="label-sm text-[var(--gray)] mb-6">
              — Vagas em Destaque
            </motion.p>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.07 }}
                  className="group p-5 bg-[var(--dark-3)] border border-white/[0.06] hover:border-[var(--brand-orange)]/40 card-hover cursor-none"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[var(--brand-orange)] text-2xl group-hover:scale-110 transition-transform duration-300">{r.icon}</span>
                    <div className="text-right">
                      <div className="text-[var(--brand-orange)] text-2xl font-black leading-none">{r.open}</div>
                      <div className="text-white/20 text-[9px] tracking-widest uppercase">vagas</div>
                    </div>
                  </div>
                  <h4 className="text-white text-sm font-bold group-hover:text-[var(--brand-orange)] transition-colors duration-300 leading-snug">
                    {r.title}
                  </h4>
                </motion.div>
              ))}
            </div>

            {/* CTA box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="mt-4 p-6 bg-[var(--brand-navy)] border border-[var(--brand-orange)]/20 relative overflow-hidden"
            >
              <div className="absolute right-4 top-4 text-[var(--brand-orange)]/10 text-8xl font-black leading-none">→</div>
              <div className="relative z-10">
                <div className="label-sm text-[var(--brand-orange)] mb-2">Academia Omatapalo</div>
                <div className="text-white font-bold text-base mb-3">Candidatura Espontânea</div>
                <div className="text-[var(--gray)] text-xs mb-4 leading-relaxed">
                  Não encontrou a vaga certa? Envie a sua candidatura e faça parte do futuro.
                </div>
                <button className="btn-primary py-2.5 px-5 text-[0.65rem]">Candidatar-se →</button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
