'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { useLanguage } from '@/lib/i18n/LanguageContext';

function ContactForm() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 'var(--space-7)', boxShadow: 'var(--shadow-xl)', textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#E6F3EC', color: '#1F7A52', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)', fontSize: '28px' }}>✓</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', fontSize: 'var(--text-h3)', color: 'var(--text-strong)', marginBottom: '8px' }}>{t.contact.success}</h3>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 'var(--space-7)', boxShadow: 'var(--shadow-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
    >
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', fontSize: 'var(--text-h3)', color: 'var(--text-strong)', letterSpacing: '-0.01em' }}>{t.contact.title.replace('\n', ' ')}</h3>
      <div className="field"><label className="field__label">{t.contact.name}</label><input className="field__input" required placeholder={t.contact.namePlaceholder} /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }} className="form-row">
        <div className="field"><label className="field__label">{t.contact.email}</label><input className="field__input" type="email" required placeholder={t.contact.emailPlaceholder} /></div>
        <div className="field"><label className="field__label">{t.contact.subject}</label><input className="field__input" placeholder={t.contact.subjectPlaceholder} /></div>
      </div>
      <div className="field"><label className="field__label">{t.contact.message}</label><textarea className="field__textarea" required placeholder={t.contact.messagePlaceholder} /></div>
      <button type="submit" className="btn btn-primary" style={{ height: '52px' }}>
        {t.contact.send}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
    </form>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [phone, setPhone] = useState('+244 934 337 822');
  const [email, setEmail] = useState('info.ao@omatapalo.com');

  useEffect(() => {
    createClient()
      .from('site_content')
      .select('field,value')
      .eq('page', 'contactos')
      .in('field', ['phone', 'email'])
      .then(({ data }) => {
        data?.forEach(({ field, value }) => {
          if (field === 'phone') setPhone(value);
          if (field === 'email') setEmail(value);
        });
      });
  }, []);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;
        const elems = sectionRef.current.querySelectorAll('.reveal-ct');
        gsap.fromTo(Array.from(elems), { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', stagger: 0.12,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } });
      });
    });
  }, []);

  return (
    <section id="contactos" className="section" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', background: '#f6f8fb' }}>

      <div className="wrap relative z-[2]">
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 'var(--space-9)', alignItems: 'start' }} className="cta-grid">
          <div className="reveal-ct" style={{ opacity: 0 }}>
            <div className="eyebrow eyebrow--dark">{(t as any).contact?.nextStep ?? 'Próximo passo'}</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', color: '#1a396e', fontSize: 'var(--text-display-lg)', lineHeight: '0.95', letterSpacing: '-0.03em', marginTop: '16px', marginBottom: 0 }}>
              {(t as any).contact?.headline1 ?? 'Construímos'}<span style={{ color: 'transparent', WebkitTextStroke: '2px rgba(26,57,110,0.22)', display: 'block' }}>{(t as any).contact?.headline2 ?? 'O Seu Futuro'}</span>
            </h2>
            <p style={{ color: '#374151', fontSize: 'var(--text-lg)', lineHeight: 1.6, maxWidth: '46ch', marginTop: 'var(--space-5)' }}>
              {(t as any).contact?.intro ?? 'Para contactos com o Grupo OMATAPALO utilize, por favor, o formulário ao lado. A nossa equipa responderá com a maior brevidade possível.'}
            </p>
            <div style={{ marginTop: 'var(--space-7)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {(() => {
                const LABEL_MAP: Record<string, string> = {
                  'Sede Lubango': (t as any).contact?.hqLabel ?? 'Sede Lubango',
                  'Escritório Marginal Luanda': (t as any).contact?.officeLabel ?? 'Escritório Marginal Luanda',
                  'Email': (t as any).contact?.emailLabel ?? 'Email',
                  'Telefone': (t as any).contact?.phoneLabel ?? 'Telefone',
                };
                return [
                  { icon: '📍', label: 'Sede Lubango', value: 'Bairro do Tchioco, Zona Industrial II, Lubango – Angola' },
                  { icon: '📍', label: 'Escritório Marginal Luanda', value: 'Avenida 4 de Fevereiro, Nº 93, Marginal de Luanda' },
                  { icon: '004-message', label: 'Email', value: email },
                  { icon: 'telephone', label: 'Telefone', value: phone },
                ].map((c) => (
                  <div key={c.label} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: '14px', alignItems: 'start' }}>
                    {c.label === 'Email'
                      ? <img src="/icons/004-message.svg" alt="" width={22} height={22} style={{ marginTop: '3px', filter: 'invert(21%) sepia(54%) saturate(500%) hue-rotate(190deg) brightness(80%)' }} />
                      : c.label === 'Telefone'
                      ? <img src="/icons/telephone.svg" alt="" width={22} height={22} style={{ marginTop: '3px', filter: 'invert(21%) sepia(54%) saturate(500%) hue-rotate(190deg) brightness(80%)' }} />
                      : <img src="/placeholder.svg" alt="" width={22} height={22} style={{ marginTop: '3px', filter: 'invert(21%) sepia(54%) saturate(500%) hue-rotate(190deg) brightness(80%)' }} />
                    }
                    <div>
                      <div style={{ fontFamily: 'var(--font-label)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#1a396e', marginBottom: '3px' }}>{LABEL_MAP[c.label] ?? c.label}</div>
                      <div style={{ color: '#1e293b', fontSize: 'var(--text-base)' }}>{c.value}</div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

          <div className="reveal-ct" style={{ opacity: 0 }}>
            <ContactForm />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width:920px) { .cta-grid { grid-template-columns: 1fr !important; gap: var(--space-7) !important; } }
        @media (max-width:540px) { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
