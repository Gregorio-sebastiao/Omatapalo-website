'use client';

type LangTabsProps = {
  lang: 'pt' | 'en' | 'fr';
  onChange: (l: 'pt' | 'en' | 'fr') => void;
};

const LANGS = [
  { code: 'pt' as const, flag: '🇵🇹', label: 'Português' },
  { code: 'en' as const, flag: '🇬🇧', label: 'English' },
  { code: 'fr' as const, flag: '🇫🇷', label: 'Français' },
];

export default function LangTabs({ lang, onChange }: LangTabsProps) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
      {LANGS.map(l => (
        <button
          key={l.code}
          onClick={() => onChange(l.code)}
          style={{
            padding: '6px 16px',
            borderRadius: 8,
            border: `1.5px solid ${lang === l.code ? '#1a396e' : '#e2e8f0'}`,
            background: lang === l.code ? '#1a396e' : '#fff',
            color: lang === l.code ? '#fff' : '#374151',
            fontWeight: 700, fontSize: 13, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
            transition: 'all .2s',
          }}
        >
          <span style={{ fontSize: 18 }}>{l.flag}</span> {l.label}
        </button>
      ))}
      {lang !== 'pt' && (
        <span style={{ marginLeft: 8, fontSize: 12, color: '#64748b', alignSelf: 'center' }}>
          A editar versão {lang.toUpperCase()} — guarda separado do Português
        </span>
      )}
    </div>
  );
}
