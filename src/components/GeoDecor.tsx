'use client';

import { motion } from 'framer-motion';

/* Reproduz o ícone geométrico da Omatapalo como elemento decorativo */
export function GeoIcon({
  size = 80,
  color = 'currentColor',
  className = '',
  animated = false,
  delay = 0,
}: {
  size?: number;
  color?: string;
  className?: string;
  animated?: boolean;
  delay?: number;
}) {
  const svg = (
    <svg
      width={size} height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top-left L — com corte diagonal no canto interior */}
      <path d="M5 5 L80 5 L80 20 L30 20 L20 30 L20 80 L5 80 Z" fill={color} />
      {/* Bottom-right L — com corte diagonal no canto interior */}
      <path d="M95 95 L20 95 L20 80 L70 80 L80 70 L80 20 L95 20 Z" fill={color} />
      {/* Center square */}
      <rect x="40" y="40" width="20" height="20" fill={color} />
    </svg>
  );

  if (!animated) return <div className={className} aria-hidden="true">{svg}</div>;

  return (
    <motion.div
      className={className}
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {svg}
    </motion.div>
  );
}

/* Quadrado outline decorativo */
export function GeoSquare({
  size = 160,
  color = 'currentColor',
  rotate = 0,
  className = '',
  delay = 0,
}: {
  size?: number;
  color?: string;
  rotate?: number;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      aria-hidden="true"
      initial={{ opacity: 0, rotate: rotate - 8 }}
      whileInView={{ opacity: 1, rotate }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: size, height: size, border: `1px solid ${color}` }}
    />
  );
}
