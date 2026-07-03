'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const STATS_BASE = [
  { value: 30, suffix: '+', icon: '◆' },
  { value: 15000, suffix: '+', icon: '◉' },
  { value: 1500000, suffix: ' m²', icon: '◈' },
  { value: 5000, suffix: '+km', icon: '◬' },
  { value: 8, suffix: '', icon: '◌' },
  { value: 3, suffix: '', icon: '◇' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const dur = 2200;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 4);
      setCount(Math.round(e * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  const fmt = count >= 1000000
    ? (count / 1000000).toFixed(1) + 'M'
    : count >= 1000
    ? count.toLocaleString('pt')
    : count.toString();

  return <span ref={ref} className="tabular-nums">{fmt}{suffix}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLanguage();
  const stats = STATS_BASE.map((s, i) => ({ ...s, label: t.stats.labels[i], sub: t.stats.subs[i] }));

  return (
    <section ref={ref} className="bg-[var(--brand-navy)] relative overflow-hidden">
      {/* Decorative bg pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Top orange bar */}
      <div className="h-1 bg-gradient-to-r from-[var(--brand-orange)] via-[var(--brand-orange-light)] to-transparent" />

      <div className="wrap py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/[0.06] rounded-sm overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="bg-[var(--brand-navy)] px-6 py-10 group hover:bg-[var(--brand-navy-2)] transition-colors duration-400"
            >
              <div className="text-[var(--brand-orange)] text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
              <div className="text-white font-black text-[clamp(1.6rem,3vw,2.4rem)] leading-none mb-2 group-hover:text-[var(--brand-orange)] transition-colors duration-300">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">{s.label}</div>
              <div className="text-white/30 text-[10px]">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
