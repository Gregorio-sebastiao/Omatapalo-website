'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const pillars = [
  { icon: '◎', title: 'Ambiente', color: 'from-green-900/30', items: ['Energias renováveis nos projetos', 'Gestão de resíduos certificada', 'Compensação de carbono', 'Proteção da biodiversidade'] },
  { icon: '◉', title: 'Social', color: 'from-blue-900/30', items: ['15.000+ empregos criados', 'Academia Omatapalo', 'Apoio às comunidades', 'Programas de saúde'] },
  { icon: '◈', title: 'Governança', color: 'from-purple-900/30', items: ['Transparência corporativa', 'Ética e conformidade', 'Fornecimento responsável', 'Pacto Global ONU'] },
];

const certs = [
  { code: 'ISO 9001', title: 'Qualidade', year: '2014' },
  { code: 'ISO 14001', title: 'Ambiente', year: '2014' },
  { code: 'ISO 45001', title: 'Segurança', year: '2018' },
  { code: 'ODS ONU', title: 'Dev. Sustentável', year: '2020' },
];

export default function Sustainability() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="sustentabilidade" ref={ref} className="section bg-[var(--dark)] overflow-hidden">
      <div className="wrap">

        {/* ── Top: Image + text split ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80&auto=format&fit=crop"
                alt="Sustentabilidade Omatapalo" fill className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw" unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-navy)]/50 to-transparent" />
            </div>
            {/* Cert badges */}
            <div className="absolute -bottom-6 -right-6 grid grid-cols-2 gap-2">
              {certs.map((c, i) => (
                <motion.div
                  key={c.code}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="bg-[var(--brand-navy)] border border-[var(--brand-orange)]/30 p-3 text-center"
                >
                  <div className="text-[var(--brand-orange)] text-xs font-black">{c.code}</div>
                  <div className="text-white/40 text-[9px] mt-0.5">{c.title}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="divider-line" />
              <span className="label-sm text-[var(--brand-orange)]">ESG & Sustentabilidade</span>
            </div>
            <h2 className="display-lg text-white mb-8">
              Crescer com<br /><span className="orange-gradient">Responsabilidade.</span>
            </h2>
            <p className="text-[var(--gray-2)] text-lg leading-relaxed mb-6">
              O compromisso com a sustentabilidade não é uma obrigação regulatória — é a base
              da nossa estratégia de crescimento a longo prazo e do legado que deixamos em Angola.
            </p>
            <p className="text-[var(--gray)] text-base leading-relaxed mb-10">
              Certificados pelas mais exigentes normas internacionais e signatários do Pacto Global
              das Nações Unidas, integramos os ODS em cada decisão empresarial.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-[var(--brand-orange)] text-3xl font-black">100%</div>
                <div className="text-white/50 text-xs mt-1">Projetos com avaliação ambiental</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-[var(--brand-orange)] text-3xl font-black">2030</div>
                <div className="text-white/50 text-xs mt-1">Meta carbono neutro</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Pillars ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
              className={`relative overflow-hidden bg-[var(--dark-3)] border border-white/[0.06] p-8 group hover:border-[var(--brand-orange)]/30 transition-all duration-400`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="text-[var(--brand-orange)] text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{p.icon}</div>
                <h3 className="text-white text-2xl font-black mb-6">{p.title}</h3>
                <ul className="flex flex-col gap-3">
                  {p.items.map(item => (
                    <li key={item} className="flex items-center gap-3 text-[var(--gray-2)] text-sm">
                      <span className="w-1.5 h-1.5 bg-[var(--brand-orange)] rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
