'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const timeline = [
  { year: '1994', title: 'Fundação', desc: 'Grupo Omatapalo nasce em Luanda com visão de transformar Angola.' },
  { year: '2002', title: 'Obras Públicas', desc: 'Primeiros contratos rodoviários de grande escala no país.' },
  { year: '2008', title: 'Diversificação', desc: 'Expansão para imobiliário, agroindústria e hotelaria.' },
  { year: '2014', title: 'Certificações', desc: 'ISO 9001, ISO 14001 e ISO 45001. Padrões internacionais.' },
  { year: '2018', title: 'Flow Hotel', desc: 'Entrada no setor hoteleiro premium em Angola.' },
  { year: '2024', title: 'Presente', desc: '15.000+ colaboradores. Presença em múltiplos países africanos.' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);

  return (
    <section id="grupo" ref={ref} className="section bg-[var(--dark-2)] overflow-hidden">
      {/* ── TOP: Split layout ── */}
      <div className="wrap">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-24">

          {/* Left: image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.div style={{ scale: imgScale }} className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=85&auto=format&fit=crop"
                  alt="Construção civil Angola"
                  fill className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-2)]/60 to-transparent" />
              </motion.div>

              {/* Overlay card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="absolute bottom-6 left-6 right-6 bg-[var(--brand-navy)]/95 backdrop-blur p-6 border-l-4 border-[var(--brand-orange)]"
              >
                <div className="text-[var(--brand-orange)] text-3xl font-black mb-1">30+</div>
                <div className="text-white text-sm font-semibold">Anos a Construir Angola</div>
                <div className="text-white/50 text-xs mt-1">Desde 1994 — Luanda, Angola</div>
              </motion.div>
            </div>

            {/* Orange accent square */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--brand-orange)] -z-10 hidden lg:block" />
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="divider-line" />
              <span className="label-sm text-[var(--brand-orange)]">O Grupo</span>
            </div>
            <h2 className="display-lg text-white mb-8">
              Construindo o<br />
              <span className="orange-gradient">Futuro de Angola</span>
            </h2>
            <p className="text-[var(--gray-2)] text-lg leading-relaxed mb-6">
              O Grupo Omatapalo é um dos maiores e mais diversificados grupos empresariais de Angola,
              com presença em 8 setores estratégicos e mais de três décadas de excelência.
            </p>
            <p className="text-[var(--gray)] text-base leading-relaxed mb-10">
              Da construção de hospitais e estradas à produção agrícola, da hotelaria à pesca industrial —
              o nosso compromisso é criar valor duradouro para Angola e os seus parceiros.
            </p>

            {/* Values */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: '◆', label: 'Missão', val: 'Criar valor sustentável' },
                { icon: '◉', label: 'Visão', val: 'Referência em África' },
                { icon: '◈', label: 'Valores', val: 'Pessoas & Integridade' },
              ].map(v => (
                <div key={v.label} className="bg-[var(--dark-3)] border border-white/[0.06] p-4">
                  <div className="text-[var(--brand-orange)] text-xl mb-2">{v.icon}</div>
                  <div className="text-white/40 text-[10px] tracking-widest uppercase mb-1">{v.label}</div>
                  <div className="text-white text-xs font-semibold leading-snug">{v.val}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Timeline ── */}
        <div className="border-t border-white/[0.06] pt-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="label-sm text-[var(--gray)] mb-12"
          >
            — A Nossa História
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                className="group"
              >
                <div className="text-[var(--brand-orange)] font-black font-mono text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 origin-left">{t.year}</div>
                <div className="w-6 h-[2px] bg-[var(--brand-orange)]/30 group-hover:bg-[var(--brand-orange)] transition-colors duration-300 mb-3" />
                <div className="text-white text-sm font-bold mb-2">{t.title}</div>
                <div className="text-[var(--gray)] text-xs leading-relaxed">{t.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Marquee strip ── */}
      <div className="mt-20 overflow-hidden bg-[var(--brand-navy)] border-t border-b border-white/[0.06] py-4">
        <div className="animate-marquee flex gap-16 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="text-white/[0.06] text-5xl font-black uppercase tracking-tighter shrink-0">
              ENGENHARIA · CONSTRUÇÃO · INFRAESTRUTURA · AGROINDÚSTRIA · ENERGIA · ANGOLA · DESENVOLVIMENTO ·&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
