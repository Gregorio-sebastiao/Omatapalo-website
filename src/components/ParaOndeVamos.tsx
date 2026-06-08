'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function ParaOndeVamos() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section ref={ref} id="sustentabilidade" aria-labelledby="sustentabilidade-h" className="section bg-white overflow-hidden">
      <div className="wrap">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <div className="eyebrow mb-6">
              <span className="eyebrow-bar" aria-hidden="true" />
              <span className="eyebrow-text">Sustentabilidade</span>
            </div>
            <h2 id="sustentabilidade-h" className="t-h2 text-[var(--navy)] mb-8">
              Para Onde Vamos
            </h2>

            <p className="t-body-lg text-[var(--text-2)] mb-5">
              A aposta nas Energias Renováveis representa um compromisso ambicioso, suportado pelos nossos 66 ha de sucesso enquanto oferta de Inovação. Não é tanto apresar de coisas que estão bem, mas continuar para que todas possam ter vidas mais sustentáveis.
            </p>
            <p className="t-body text-[var(--text-3)] mb-10">
              Estamos a implementar medidas concretas para proteger o futuro da humanidade, comprometidos com a estratégia de uma Angola mais limpa, expandindo continuamente o nosso portfólio sustentável.
            </p>

            {/* ESG — text-only, clean */}
            <div role="list" className="flex flex-col gap-5 mb-12" aria-label="Pilares ESG">
              {[
                { label: 'Ambiente', desc: 'Energia renovável, gestão de resíduos e compensação de carbono.' },
                { label: 'Social', desc: 'Academia Omatapalo, apoio às comunidades e programas de saúde.' },
                { label: 'Governança', desc: 'Transparência, ética e Pacto Global das Nações Unidas.' },
              ].map((p, i) => (
                <motion.div
                  key={p.label}
                  role="listitem"
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-start gap-5"
                >
                  <div className="w-1 h-full min-h-[40px] bg-[var(--orange)] shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <div className="font-bold text-[var(--navy)] mb-1">{p.label}</div>
                    <div className="t-sm text-[var(--text-3)]">{p.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="btn btn-navy">Saber Mais →</button>
          </motion.div>

          {/* Image */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.15 }} className="relative">
            <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <motion.div style={{ y: imgY }} className="absolute inset-0 scale-[1.08]">
                <Image
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80&auto=format&fit=crop"
                  alt="Painel solar — compromisso Omatapalo com energias renováveis"
                  fill className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw" unoptimized
                />
              </motion.div>
              <div className="absolute top-0 right-0 bottom-0 w-1 bg-[var(--orange)]" aria-hidden="true" />
            </div>

            {/* ISO card — floats bottom left */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-4 bg-white shadow-2xl p-6"
            >
              <div className="eyebrow-text mb-3">Certificações</div>
              <div className="flex gap-3" role="list">
                {['ISO 9001', 'ISO 14001', 'ISO 45001'].map(c => (
                  <span key={c} role="listitem" className="font-black text-[var(--navy)] t-sm">{c}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
