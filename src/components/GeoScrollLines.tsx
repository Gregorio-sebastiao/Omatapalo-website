'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/* Linhas geométricas que acompanham o scroll — inspiradas no ícone Omatapalo */
export default function GeoScrollLines() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const ref = useRef<HTMLDivElement>(null);

  const smoothScroll = useSpring(scrollY, { stiffness: 80, damping: 20 });

  // Linhas verticais — movem-se em velocidades diferentes (parallax)
  const line1Y = useTransform(smoothScroll, [0, 3000], ['0%', '-18%']);
  const line2Y = useTransform(smoothScroll, [0, 3000], ['0%', '-28%']);
  const line3Y = useTransform(smoothScroll, [0, 3000], ['0%', '-12%']);

  // Quadrados — rodam suavemente
  const sq1Rotate = useTransform(smoothScroll, [0, 3000], [0, 90]);
  const sq2Rotate = useTransform(smoothScroll, [0, 3000], [45, -45]);

  // Opacidade — aparece depois de sair do hero
  const opacity = useTransform(scrollY, [0, 200, 400], [0, 0, 1]);

  useEffect(() => {
    const unsub = scrollY.on('change', v => setVisible(v > 150));
    return unsub;
  }, [scrollY]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[5] hidden lg:block"
      aria-hidden="true"
    >
      <motion.div style={{ opacity }} className="absolute inset-0">

        {/* ── Linha vertical esquerda — L superior */}
        <motion.div
          style={{ y: line1Y }}
          className="absolute left-6 top-0"
        >
          {/* Barra vertical */}
          <div style={{ width: 1, height: 120, background: 'linear-gradient(to bottom, transparent, var(--navy), transparent)', opacity: 0.15 }} />
          {/* Pequeno L no topo */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: 12, height: 1, background: 'var(--navy)', opacity: 0.2 }} />
        </motion.div>

        {/* ── Linha vertical direita — L inferior */}
        <motion.div
          style={{ y: line2Y }}
          className="absolute right-6 bottom-0 flex flex-col items-end"
        >
          <div style={{ width: 1, height: 100, background: 'linear-gradient(to top, transparent, var(--navy), transparent)', opacity: 0.12 }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 1, background: 'var(--navy)', opacity: 0.18 }} />
        </motion.div>

        {/* ── Quadrado outline — lado direito */}
        <motion.div
          style={{ rotate: sq1Rotate, y: line1Y }}
          className="absolute right-10 top-[35vh]"
          animate={visible ? { opacity: [0, 0.06, 0.06] } : { opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div style={{ width: 40, height: 40, border: '1px solid var(--navy)' }} />
        </motion.div>

        {/* ── Quadrado outline menor — lado esquerdo */}
        <motion.div
          style={{ rotate: sq2Rotate, y: line3Y }}
          className="absolute left-10 top-[55vh]"
          animate={visible ? { opacity: [0, 0.05, 0.05] } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <div style={{ width: 28, height: 28, border: '1px solid var(--navy)' }} />
        </motion.div>

        {/* ── Mini ícone L — canto superior esquerdo, scroll para cima */}
        <motion.div
          style={{ y: line1Y }}
          className="absolute left-5 top-[20vh]"
          animate={visible ? { opacity: [0, 0.08] } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
            <path d="M5 5 L80 5 L80 20 L30 20 L20 30 L20 80 L5 80 Z" fill="var(--navy)" opacity="0.5" />
          </svg>
        </motion.div>

        {/* ── Mini ícone L invertido — canto inferior direito, scroll para baixo */}
        <motion.div
          style={{ y: line2Y }}
          className="absolute right-5 bottom-[20vh]"
          animate={visible ? { opacity: [0, 0.08] } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
            <path d="M95 95 L20 95 L20 80 L70 80 L80 70 L80 20 L95 20 Z" fill="var(--navy)" opacity="0.5" />
          </svg>
        </motion.div>

      </motion.div>
    </div>
  );
}
