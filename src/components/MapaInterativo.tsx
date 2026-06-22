'use client';

import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const PAISES = [
  { name: 'Angola', code: 'AO', numericId: '024', coordinates: [17.87, -11.20] as [number, number], desc: 'Sede · Lubango — operação nacional em todas as províncias', continent: 'ÁFRICA' },
  { name: 'Moçambique', code: 'MZ', numericId: '508', coordinates: [35.53, -18.67] as [number, number], desc: 'Infraestrutura e construção civil', continent: 'ÁFRICA' },
  { name: 'Namíbia', code: 'NA', numericId: '516', coordinates: [18.49, -22.96] as [number, number], desc: 'Mineração e obras públicas', continent: 'ÁFRICA' },
  { name: 'RDC', code: 'CD', numericId: '180', coordinates: [23.65, -2.88] as [number, number], desc: 'República Democrática do Congo', continent: 'ÁFRICA' },
  { name: 'Portugal', code: 'PT', numericId: '620', coordinates: [-8.22, 39.40] as [number, number], desc: 'Representação e parcerias europeias', continent: 'EUROPA' },
  { name: 'Espanha', code: 'ES', numericId: '724', coordinates: [-3.75, 40.46] as [number, number], desc: 'Parcerias comerciais e técnicas', continent: 'EUROPA' },
  { name: 'Reino Unido', code: 'GB', numericId: '826', coordinates: [-3.44, 55.38] as [number, number], desc: 'Parcerias estratégicas e financeiras', continent: 'EUROPA' },
  { name: 'EUA', code: 'US', numericId: '840', coordinates: [-95.71, 37.09] as [number, number], desc: 'Parcerias estratégicas e de investimento', continent: 'AMÉRICAS' },
];

const PAISES_IDS = new Set(PAISES.map(p => p.numericId));
const PAISES_MAP = Object.fromEntries(PAISES.map(p => [p.numericId, p]));

export default function MapaInterativo() {
  const [active, setActive] = useState<typeof PAISES[0] | null>(null);

  return (
    <div style={{
      position: 'relative',
      borderRadius: 12,
      overflow: 'hidden',
      background: '#020d1a',
      boxShadow: '0 0 40px rgba(0,200,255,0.25), 0 0 80px rgba(0,150,255,0.12), inset 0 0 60px rgba(0,200,255,0.05)',
      border: '1px solid rgba(0,200,255,0.3)',
      transform: 'perspective(1200px) rotateX(4deg)',
      transformOrigin: 'center bottom',
    }}>
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes flicker {
          0%, 97%, 100% { opacity: 1; }
          98% { opacity: 0.85; }
          99% { opacity: 0.95; }
        }
        @keyframes pulse-marker {
          0% { r: 5; opacity: 1; }
          100% { r: 26; opacity: 0; }
        }
        @keyframes pulse-marker2 {
          0% { r: 5; opacity: 0.7; }
          100% { r: 18; opacity: 0; }
        }
        @keyframes holo-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .holo-wrap { animation: flicker 6s infinite; }
        .marker-p1 { animation: pulse-marker 2.4s ease-out infinite; }
        .marker-p2 { animation: pulse-marker2 2.4s ease-out infinite 0.6s; }
        .marker-glow { animation: holo-glow 2s ease-in-out infinite; }
      `}</style>

      {/* Scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '3px',
          background: 'linear-gradient(to bottom, transparent, rgba(0,220,255,0.06), transparent)',
          animation: 'scanline 4s linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
        }} />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,200,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Edge glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,200,255,0.08) 100%)',
        }} />
        {/* Top border glow */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, rgba(0,220,255,0.8), transparent)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(0,220,255,0.4), transparent)' }} />
      </div>

      <div className="holo-wrap">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 130, center: [10, 10] }}
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isOmat = PAISES_IDS.has(geo.id);
                const isActive = active?.numericId === geo.id;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isActive ? 'rgba(0,240,255,0.7)' : isOmat ? 'rgba(0,180,255,0.55)' : 'rgba(0,80,140,0.45)'}
                    stroke="rgba(0,200,255,0.4)"
                    strokeWidth={0.5}
                    onMouseEnter={() => isOmat && setActive(PAISES_MAP[geo.id])}
                    onMouseLeave={() => setActive(null)}
                    style={{
                      default: { outline: 'none', transition: 'fill 0.25s ease' },
                      hover: { outline: 'none', fill: isOmat ? 'rgba(0,240,255,0.65)' : 'rgba(0,100,160,0.55)', cursor: isOmat ? 'pointer' : 'default' },
                      pressed: { outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {PAISES.map((p) => {
            const isActive = active?.code === p.code;
            return (
              <Marker
                key={p.code}
                coordinates={p.coordinates}
                onMouseEnter={() => setActive(p)}
                onMouseLeave={() => setActive(null)}
              >
                <circle className="marker-p1" cx={0} cy={0} r={5} fill="none" stroke="rgba(0,220,255,0.6)" strokeWidth={1} />
                <circle className="marker-p2" cx={0} cy={0} r={5} fill="none" stroke="rgba(0,220,255,0.4)" strokeWidth={0.8} />
                <circle
                  className="marker-glow"
                  cx={0} cy={0}
                  r={isActive ? 8 : 5}
                  fill={isActive ? 'rgba(0,255,255,0.9)' : 'rgba(0,220,255,0.85)'}
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth={isActive ? 2 : 1.2}
                  style={{
                    cursor: 'pointer',
                    filter: `drop-shadow(0 0 ${isActive ? '8px' : '4px'} rgba(0,220,255,0.9))`,
                    transition: 'all 0.2s ease',
                  }}
                />
              </Marker>
            );
          })}
        </ComposableMap>
      </div>

      {/* Info panel */}
      <div style={{
        position: 'absolute', bottom: 14, left: 14, right: 14,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        pointerEvents: 'none', zIndex: 20,
      }}>
        <div style={{
          background: 'rgba(0,10,30,0.88)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${active ? 'rgba(0,220,255,0.6)' : 'rgba(0,200,255,0.15)'}`,
          borderRadius: 8,
          padding: '10px 16px',
          minWidth: 230,
          transition: 'all 0.25s ease',
          boxShadow: active ? '0 0 20px rgba(0,200,255,0.2)' : 'none',
        }}>
          {active ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(0,220,255,0.9)', boxShadow: '0 0 6px rgba(0,220,255,0.8)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(0,220,255,0.7)', letterSpacing: '0.12em' }}>{active.code} · {active.continent}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 17, color: '#00f0ff', textTransform: 'uppercase', letterSpacing: '-0.01em', textShadow: '0 0 10px rgba(0,220,255,0.5)' }}>{active.name}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(150,230,255,0.7)', marginTop: 3, lineHeight: 1.5 }}>{active.desc}</div>
            </>
          ) : (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(0,200,255,0.4)', letterSpacing: '0.05em' }}>— SELECIONE UM PAÍS —</div>
          )}
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 36, color: '#00f0ff', lineHeight: 1, textShadow: '0 0 20px rgba(0,220,255,0.7)' }}>{PAISES.length}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(0,200,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>países</div>
        </div>
      </div>
    </div>
  );
}
