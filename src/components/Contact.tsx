'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [sent, setSent] = useState(false);

  return (
    <section id="contactos" ref={ref} className="section bg-[var(--brand-navy)] overflow-hidden">
      {/* Orange top bar */}
      <div className="h-1 bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-light)]" />

      <div className="wrap mt-0 pt-0">
        {/* BG decoration */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1590579491624-f98f36d4c763?w=600&q=60&auto=format&fit=crop"
            alt="" fill className="object-cover" unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[var(--brand-navy)]" />
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-4 mb-6">
              <span className="divider-line" />
              <span className="label-sm text-[var(--brand-orange)]">Contactos</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }} className="display-lg text-white mb-10">
              Vamos Construir<br /><span className="orange-gradient">Juntos.</span>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { icon: '◆', label: 'Sede', value: 'Rua Rainha Ginga\nLuanda, Angola' },
                { icon: '◉', label: 'Telefone', value: '+244 222 000 000\n+244 923 000 000' },
                { icon: '◈', label: 'Email', value: 'geral@omatapalo.ao\nrh@omatapalo.ao' },
                { icon: '◌', label: 'Horário', value: 'Seg–Sex: 08h–17h\nSáb: 08h–13h' },
              ].map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="bg-[var(--brand-navy-2)]/60 border border-white/[0.06] p-5 hover:border-[var(--brand-orange)]/30 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[var(--brand-orange)]">{c.icon}</span>
                    <span className="label-sm text-[var(--gray)]">{c.label}</span>
                  </div>
                  <div className="text-white text-sm leading-relaxed whitespace-pre-line">{c.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }} className="flex gap-3">
              {['LinkedIn', 'Facebook', 'Instagram', 'YouTube'].map(s => (
                <button key={s} className="text-[var(--gray)] border border-white/[0.08] px-3 py-2 text-[10px] tracking-wider hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition-all duration-300 cursor-none">
                  {s}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="bg-[var(--dark)]/60 backdrop-blur border border-white/[0.08] p-8"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
                <div className="w-16 h-16 bg-[var(--brand-orange)] flex items-center justify-center text-white text-2xl">✓</div>
                <h3 className="text-white text-2xl font-black">Mensagem Enviada!</h3>
                <p className="text-[var(--gray)] text-sm">A nossa equipa irá responder em menos de 24h.</p>
                <button onClick={() => setSent(false)} className="btn-outline mt-4">Enviar outra →</button>
              </div>
            ) : (
              <>
                <h3 className="text-white font-black text-xl mb-6">Envie a sua Mensagem</h3>
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'name', label: 'Nome', type: 'text' },
                      { name: 'company', label: 'Empresa', type: 'text' },
                    ].map(f => (
                      <div key={f.name} className="flex flex-col gap-1.5">
                        <label className="label-sm text-[var(--gray)]">{f.label}</label>
                        <input type={f.type} required
                          className="bg-[var(--brand-navy-2)]/50 border border-white/[0.08] text-white px-4 py-3 text-sm focus:border-[var(--brand-orange)] focus:outline-none transition-colors placeholder:text-white/15" />
                      </div>
                    ))}
                  </div>
                  {[
                    { name: 'email', label: 'Email', type: 'email' },
                    { name: 'subject', label: 'Assunto', type: 'text' },
                  ].map(f => (
                    <div key={f.name} className="flex flex-col gap-1.5">
                      <label className="label-sm text-[var(--gray)]">{f.label}</label>
                      <input type={f.type} required
                        className="bg-[var(--brand-navy-2)]/50 border border-white/[0.08] text-white px-4 py-3 text-sm focus:border-[var(--brand-orange)] focus:outline-none transition-colors placeholder:text-white/15" />
                    </div>
                  ))}
                  <div className="flex flex-col gap-1.5">
                    <label className="label-sm text-[var(--gray)]">Mensagem</label>
                    <textarea rows={4} required
                      className="bg-[var(--brand-navy-2)]/50 border border-white/[0.08] text-white px-4 py-3 text-sm focus:border-[var(--brand-orange)] focus:outline-none transition-colors resize-none placeholder:text-white/15" />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center mt-2">
                    Enviar Mensagem →
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
