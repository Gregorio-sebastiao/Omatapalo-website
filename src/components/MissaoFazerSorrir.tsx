'use client';

import { useEffect, useRef, useState } from 'react';
import PactoGlobal from '@/components/PactoGlobal';

/* ������������������������������������������������������������������������������������������������������������������
   TYPES
������������������������������������������������������������������������������������������������������������������ */
type Project = {
  ods: number;
  odsColor: string;
  odsLabel: string;
  category: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  directa: number | null;
  indirecta: number | null;
  location: string;
  since: string;
  img: string;
  timeline: { year: string; event: string }[];
};

/* ������������������������������������������������������������������������������������������������������������������
   PROJECTS DATA
������������������������������������������������������������������������������������������������������������������ */
const PROJECTS: Project[] = [
  {
    ods: 1, odsColor: '#1a396e', odsLabel: 'Erradicar a Pobreza', category: 'Comunidade',
    title: 'Aldeia de Crianças SOS Lubango',
    shortDesc: 'Patrocínio de casas da Aldeia SOS, apoiando dezenas de crianças no seu desenvolvimento educativo e psicoemocional.',
    fullDesc: 'A OMATAPALO apadrinha várias casas da Aldeia SOS Lubango, com um agregado de várias dezenas de pessoas, contribuindo com uma renda mensal como forma de apoiar estas crianças a manter o sorriso e no intuito de fortalecer o processo de ensino e aprendizagem, para além do desenvolvimento psicoemocional deste grupo.',
    directa: 54, indirecta: 162, location: 'Lubango, Huíla', since: '2015',
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    timeline: [
      { year: '2015', event: 'Início do patrocínio das primeiras casas da Aldeia SOS' },
      { year: '2018', event: 'Expansão do apoio a mais casas e programas educativos' },
      { year: '2021', event: 'Reforço do programa psicoemocional para crianças' },
      { year: '2024', event: 'Mais de 54 crianças apoiadas directamente' },
    ],
  },
  {
    ods: 1, odsColor: '#1a396e', odsLabel: 'Erradicar a Pobreza', category: 'Infraestrutura Social',
    title: 'Paróquia Nª Srª Muxima do Toco',
    shortDesc: 'Infraestrutura social completa para uma comunidade de 20 mil habitantes: escolas, hospitais, cozinha comunitária e formação profissional.',
    fullDesc: 'A Paróquia da Mamã Muxima do Toco existe desde Março de 2012 e é a mais nova da Arquidiocese do Lubango, situada na comuna do Hoque. A OMATAPALO contribui desde a fundação com a construção de escolas do 1.º e 2.º ciclo, dois hospitais equipados, cozinha comunitária, centro juvenil de formação profissional, biblioteca, habitações de apoio a crianças com mobilidade reduzida, irmãs missionárias e médicos residentes.',
    directa: 20180, indirecta: 59960, location: 'Lubango, Huíla', since: '2012',
    img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80',
    timeline: [
      { year: '2012', event: 'Início da parceria com a Paróquia Muxima do Toco' },
      { year: '2014', event: 'Construção das primeiras escolas do 1.º ciclo' },
      { year: '2017', event: 'Inauguração dos dois hospitais equipados' },
      { year: '2019', event: 'Centro juvenil de formação profissional e biblioteca' },
      { year: '2023', event: '20 180 pessoas impactadas directamente' },
    ],
  },
  {
    ods: 1, odsColor: '#1a396e', odsLabel: 'Erradicar a Pobreza', category: 'Solidariedade',
    title: 'Venha Dar a Sua Mão',
    shortDesc: 'Campanha anual de recolha e doação de brinquedos, roupa e material escolar para crianças carenciadas em todo o país.',
    fullDesc: 'A campanha "Venha Dar a Sua Mão" mobiliza colaboradores, parceiros e cidadãos para a doação de brinquedos, roupa, calçado e material escolar. Os bens são distribuídos pelas comunidades mais carenciadas em Luanda, Lubango e Huambo, levando alegria e dignidade às crianças em épocas festivas.',
    directa: 5000, indirecta: 15000, location: 'Nacional', since: '2014',
    img: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&q=80',
    timeline: [
      { year: '2014', event: 'Lançamento da primeira campanha de solidariedade' },
      { year: '2018', event: 'Expansão a Lubango e Huambo' },
      { year: '2023', event: 'Mais de 5.000 crianças beneficiadas' },
    ],
  },
  {
    ods: 2, odsColor: '#DDA63A', odsLabel: 'Erradicar a Fome', category: 'Alimentação',
    title: 'Campanha Sopas Solidárias',
    shortDesc: 'Mais de 1.000 sopas diárias em Luanda desde Dezembro de 2021. Mais de 500.000 refeições entregues a quem mais precisa.',
    fullDesc: 'Desde Dezembro de 2021, a OMATAPALO distribui mais de 1.000 sopas e pão diariamente em vários pontos de Luanda � Baixa, Talatona, Viana, Zango e Cacuaco. Uma iniciativa contínua que já ultrapassou 500.000 refeições entregues, levando dignidade e nutrição às populações mais vulneráveis da capital angolana.',
    directa: 1000, indirecta: 500000, location: 'Luanda (5 zonas)', since: '2021',
    img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    timeline: [
      { year: '2021', event: 'Lançamento em Dezembro � primeiras sopas solidárias' },
      { year: '2022', event: 'Expansão para 5 zonas de Luanda' },
      { year: '2023', event: '100.000 refeições acumuladas' },
      { year: '2024', event: 'Marco de 500.000 refeições entregues' },
    ],
  },
  {
    ods: 2, odsColor: '#DDA63A', odsLabel: 'Erradicar a Fome', category: 'Agricultura',
    title: 'Apoio às Comunidades Agrícolas',
    shortDesc: 'Apoio mecânico e sementes para 150 hectares de cultivo de milho e feijão, beneficiando centenas de famílias da Fazenda Mumba.',
    fullDesc: 'A OMATAPALO apoia comunidades agrícolas na Fazenda Mumba com equipamento mecânico e sementes para o cultivo de milho e feijão em cerca de 150 hectares. Centenas de famílias das comunidades envolventes beneficiam desta iniciativa, garantindo segurança alimentar e sustento local.',
    directa: null, indirecta: null, location: 'Fazenda Mumba', since: '2019',
    img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
    timeline: [
      { year: '2019', event: 'Lançamento do programa de apoio agrícola' },
      { year: '2021', event: 'Expansão para 150 hectares de cultivo' },
      { year: '2024', event: 'Centenas de famílias beneficiadas anualmente' },
    ],
  },
  {
    ods: 3, odsColor: '#4C9F38', odsLabel: 'Saúde de Qualidade', category: 'Saúde',
    title: 'Campanha Médica do Tchivinguiro',
    shortDesc: 'Consultas, medicamentos, alimentação e material escolar para 400 crianças da região do Humpata anualmente.',
    fullDesc: 'Anualmente no município do Humpata, a OMATAPALO organiza a Campanha Médica do Tchivinguiro, proporcionando consultas médicas, medicamentos, alimentação, roupa, calçado, brinquedos e material escolar para cerca de 400 crianças da região. A iniciativa conta com voluntários médicos e enfermeiros do Hospital S. António de Portugal.',
    directa: 400, indirecta: null, location: 'Humpata, Huíla', since: '2016',
    img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
    timeline: [
      { year: '2016', event: 'Primeira campanha médica no Tchivinguiro' },
      { year: '2019', event: 'Integração de voluntários do Hospital S. António' },
      { year: '2023', event: '400 crianças atendidas anualmente' },
    ],
  },
  {
    ods: 3, odsColor: '#4C9F38', odsLabel: 'Saúde de Qualidade', category: 'Saúde',
    title: 'Doação de Sangue',
    shortDesc: 'Campanhas regulares de doação de sangue nos escritórios e obras da OMATAPALO, abastecendo hospitais angolanos.',
    fullDesc: 'A OMATAPALO promove regularmente campanhas de doação de sangue entre os seus colaboradores e comunidades parceiras. As dádivas são encaminhadas para hospitais públicos de referência, contribuindo para salvar vidas em momentos críticos.',
    directa: null, indirecta: null, location: 'Nacional', since: '2017',
    img: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&q=80',
    timeline: [
      { year: '2017', event: 'Primeira campanha interna de doação de sangue' },
      { year: '2020', event: 'Parcerias com hospitais públicos de referência' },
      { year: '2024', event: 'Campanhas regulares em toda a empresa' },
    ],
  },
  {
    ods: 4, odsColor: '#C5192D', odsLabel: 'Educação de Qualidade', category: 'Educação',
    title: 'Projecto Merenda Escolar',
    shortDesc: 'Mais de 150.000 refeições escolares por ano a alunos de cinco aldeias vizinhas da Fazenda Mumba.',
    fullDesc: 'A Fazenda Mumba distribui mais de 150.000 refeições escolares por ano a alunos das aldeias de Manengo, Hungulo, Makova, Calundungo e Kwanda. Com mais de 500.000 refeições acumuladas, este projecto garante que nenhuma criança estude com fome.',
    directa: 150000, indirecta: 500000, location: 'Fazenda Mumba', since: '2016',
    img: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80',
    timeline: [
      { year: '2016', event: 'Início do programa de merenda escolar' },
      { year: '2019', event: 'Expansão às 5 aldeias vizinhas' },
      { year: '2024', event: 'Marco de 500.000 refeições acumuladas' },
    ],
  },
  {
    ods: 4, odsColor: '#C5192D', odsLabel: 'Educação de Qualidade', category: 'Educação',
    title: 'PROJECTO ESCOLA FAZER SORRIR',
    shortDesc: 'Construção e equipamento de salas de aula e doação de material escolar em comunidades rurais de Angola.',
    fullDesc: 'Através do programa PROJECTO ESCOLA FAZER SORRIR, a OMATAPALO constrói e equipa salas de aula em comunidades rurais com pouca infraestrutura educativa. São também doados cadernos, lápis, mochilas e livros para que as crianças possam estudar com dignidade.',
    directa: 2000, indirecta: 6000, location: 'Nacional', since: '2018',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    timeline: [
      { year: '2018', event: 'Construção das primeiras salas de aula' },
      { year: '2021', event: 'Doação de material escolar a 2.000 alunos' },
      { year: '2024', event: 'Expansão a novas províncias' },
    ],
  },
];

/* ������������������������������������������������������������������������������������������������������������������
   IMPACT STATS
������������������������������������������������������������������������������������������������������������������ */
const IMPACT_STATS = [
  { value: 220000, label: 'Famílias Apoiadas', suffix: '+', icon: '�x�⬍�x�⬍�x�⬍�x�' },
  { value: 500000, label: 'Sopas Distribuídas', suffix: '+', icon: '�x��' },
  { value: 500000, label: 'Merendas Escolares', suffix: '+', icon: '�xa' },
  { value: 12, label: 'Projectos Activos', suffix: '+', icon: '�xR�' },
  { value: 14, label: 'Centrais Solares', suffix: '', icon: '�ܬ️' },
];

/* ������������������������������������������������������������������������������������������������������������������
   TIMELINE DATA
������������������������������������������������������������������������������������������������������������������ */
const TIMELINE = [
  { year: '2003', title: 'Início da Missão', desc: 'Primeiros projectos de responsabilidade social do Grupo OMATAPALO.' },
  { year: '2012', title: 'Paróquia Muxima do Toco', desc: 'Início da parceria com a comunidade de 20.000 habitantes no Lubango.' },
  { year: '2015', title: 'Aldeia SOS Lubango', desc: 'Patrocínio das primeiras casas da Aldeia de Crianças SOS.' },
  { year: '2016', title: 'Campanha Médica', desc: 'Primeira campanha médica no Tchivinguiro com 400 crianças atendidas.' },
  { year: '2019', title: 'Apoio Agrícola', desc: 'Lançamento do programa de apoio às comunidades agrícolas da Fazenda Mumba.' },
  { year: '2021', title: 'Sopas Solidárias', desc: 'Início da distribuição de 1.000 sopas diárias em Luanda.' },
  { year: '2024', title: 'Campanhas de Leitura', desc: 'Doação de livros e materiais escolares a centenas de crianças angolanas.' },
  { year: '2026', title: 'Sorrisos que Alimentam & Cuidam', desc: 'Novos programas de nutrição e saúde comunitária em expansão nacional.' },
];

/* ������������������������������������������������������������������������������������������������������������������
   TESTIMONIALS
������������������������������������������������������������������������������������������������������������������ */
const TESTIMONIALS = [
  {
    name: 'Directora da Aldeia SOS',
    role: 'Aldeia SOS Lubango',
    text: 'O apoio da OMATAPALO transformou a vida de dezenas de crianças. Hoje têm acesso a educação, saúde e afecto � coisas que nenhuma criança deve crescer sem.',
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=80',
  },
  {
    name: 'Padre Manuel Costa',
    role: 'Paróquia Muxima do Toco',
    text: 'Desde 2012 que a OMATAPALO é um pilar desta comunidade. As escolas, o hospital e a cozinha comunitária são a prova de que o sector privado pode ser motor de mudança social.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
  },
  {
    name: 'Coordenadora do Programa',
    role: 'Campanha Sopas Solidárias',
    text: 'Cada sopa que distribuímos é um gesto de humanidade. A OMATAPALO percebeu que construir não é só estradas � é construir dignidade e esperança.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
  },
  {
    name: 'João Sebastião',
    role: 'Fazenda Mumba � Agricultor',
    text: 'Com o apoio da OMATAPALO, a nossa terra voltou a produzir. As nossas famílias têm agora segurança alimentar que nunca tivemos antes.',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80',
  },
];

/* ������������������������������������������������������������������������������������������������������������������
   ODS SECTION DATA
������������������������������������������������������������������������������������������������������������������ */
const ODS_SECTION = [
  {
    num: 1, color: '#1a396e', label: 'Erradicação da Pobreza', logo: '/responsabilidade-1.png',
    desc: 'Apoio comunitário directo a famílias e crianças em situação de vulnerabilidade.',
    projects: ['Aldeia SOS Lubango', 'Paróquia Muxima do Toco', 'Venha Dar a Sua Mão'],
  },
  {
    num: 2, color: '#DDA63A', label: 'Fome Zero', logo: '/responsabilidade-2.png',
    desc: 'Distribuição de refeições, sopas e apoio à produção agrícola local.',
    projects: ['Sopas Solidárias', 'Apoio às Comunidades Agrícolas'],
  },
  {
    num: 3, color: '#4C9F38', label: 'Saúde de Qualidade', logo: '/responsabilidade-3.png',
    desc: 'Campanhas médicas, doação de sangue e acesso a cuidados de saúde primários.',
    projects: ['Campanha Médica Tchivinguiro', 'Doação de Sangue'],
  },
  {
    num: 4, color: '#C5192D', label: 'Educação de Qualidade', logo: '/responsabilidade-4.png',
    desc: 'Merenda escolar, material didáctico e construção de infraestruturas educativas.',
    projects: ['Merenda Escolar', 'PROJECTO ESCOLA FAZER SORRIR'],
  },
];

/* ������������������������������������������������������������������������������������������������������������������
   HOOKS
������������������������������������������������������������������������������������������������������������������ */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCounter(target: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const total = Math.round(duration / 16);
    const timer = setInterval(() => {
      frame++;
      const ease = 1 - Math.pow(1 - frame / total, 4);
      setVal(Math.round(ease * target));
      if (frame >= total) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return val;
}

function fmt(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
  if (n >= 1000) return Math.round(n / 1000) + 'k';
  return n.toLocaleString('pt-PT');
}

/* ������������������������������������������������������������������������������������������������������������������
   ODS BADGE
������������������������������������������������������������������������������������������������������������������ */
const ODS_LOGO: Record<number, string> = {
  1: '/responsabilidade-1.png',
  2: '/responsabilidade-2.png',
  3: '/responsabilidade-3.png',
  4: '/responsabilidade-4.png',
  8: '/ods-08.png',
  9: '/ods-09.png',
  11: '/ods-11.png',
  13: '/ods-13.png',
};

function OdsBadge({ num, size = 48 }: { num: number; color?: string; size?: number }) {
  return (
    <img src={ODS_LOGO[num]} alt={`ODS ${num}`} width={size} height={size}
      style={{ flexShrink: 0, borderRadius: 8, display: 'block', objectFit: 'cover' }} />
  );
}

/* ������������������������������������������������������������������������������������������������������������������
   STAT CARD
������������������������������������������������������������������������������������������������������������������ */
function StatCard({ stat, active }: { stat: typeof IMPACT_STATS[0]; active: boolean }) {
  const val = useCounter(stat.value, active);
  return (
    <div style={{ textAlign: 'center', padding: 'clamp(28px,3.5vw,48px) 16px' }}>
      <div style={{ fontSize: '2rem', marginBottom: 12 }}>{stat.icon}</div>
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 900,
        fontSize: 'clamp(2.2rem,4vw,3.5rem)', lineHeight: 1,
        letterSpacing: '-0.04em', color: '#fff', marginBottom: 8,
      }}>
        {fmt(val)}{stat.suffix}
      </div>
      <div style={{
        fontFamily: 'var(--font-sans)', fontSize: '0.78rem',
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: '#fff',
      }}>{stat.label}</div>
    </div>
  );
}

/* ������������������������������������������������������������������������������������������������������������������
   PROJECT ROW
������������������������������������������������������������������������������������������������������������������ */
function ProjectCard({ project, onOpen, index }: { project: Project; onOpen: () => void; index: number }) {
  const { ref, visible } = useInView(0.08);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      style={{
        display: 'grid',
        gridTemplateColumns: '100px 1fr',
        gap: 'clamp(24px,3vw,48px)',
        alignItems: 'start',
        padding: 'clamp(28px,3.5vw,44px) 0',
        borderTop: '1px solid #E2E8F0',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: `opacity 0.55s ease ${index * 0.06}s, transform 0.55s ease ${index * 0.06}s`,
        position: 'relative',
      }}
    >
      {/* ODS Logo */}
      <div style={{ paddingTop: 4 }}>
        <OdsBadge num={project.ods} size={100} />
      </div>

      {/* Main content */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{
            fontFamily: 'var(--font-label)', fontSize: '10px',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: project.odsColor, fontWeight: 700,
          }}>
            ODS {project.ods}
          </span>
          <span style={{ width: 1, height: 10, background: '#CBD5E1' }} />
          <span style={{
            fontFamily: 'var(--font-label)', fontSize: '10px',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#1a1a1a',
          }}>{project.category}</span>
          <span style={{ width: 1, height: 10, background: '#CBD5E1' }} />
          <span style={{
            fontFamily: 'var(--font-label)', fontSize: '10px',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#1a1a1a',
          }}>{project.location}</span>
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: 'clamp(1.1rem,1.6vw,1.4rem)', lineHeight: 1.1,
          letterSpacing: '-0.03em', textTransform: 'uppercase',
          color: hovered ? project.odsColor : 'var(--navy-950)',
          margin: '0 0 14px',
          transition: 'color 0.25s',
        }}>{project.title}</h3>

        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(0.85rem,1.1vw,0.95rem)',
          lineHeight: 1.8, color: '#1a1a1a', margin: '0 0 20px',
          maxWidth: '72ch',
        }}>{project.fullDesc}</p>
      </div>

      {/* Hover accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        height: 1, width: hovered ? '100%' : '0%',
        background: project.odsColor,
        transition: 'width 0.4s ease',
      }} />
    </div>
  );
}

/* ������������������������������������������������������������������������������������������������������������������
   PROJECT MODAL
������������������������������������������������������������������������������������������������������������������ */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 20);
    document.body.style.overflow = 'hidden';
    return () => { clearTimeout(t); document.body.style.overflow = ''; };
  }, []);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(6,13,26,0.88)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(12px,3vw,32px)',
      opacity: mounted ? 1 : 0, transition: 'opacity 0.3s',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 20, overflow: 'hidden',
        width: '100%', maxWidth: 820, maxHeight: '92vh', overflowY: 'auto',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'none' : 'translateY(32px) scale(0.97)',
        transition: 'opacity 0.4s, transform 0.4s',
      }}>
        <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
          <button onClick={onClose} style={{
            all: 'unset', position: 'absolute', top: 20, right: 20, cursor: 'pointer',
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 22, lineHeight: 1,
          }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          <div style={{ position: 'absolute', bottom: 24, left: 28, display: 'flex', alignItems: 'center', gap: 16 }}>
            <OdsBadge num={project.ods} color={project.odsColor} size={56} />
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: project.odsColor, marginBottom: 4 }}>
                ODS {project.ods} · {project.odsLabel}
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.1rem,2.5vw,1.6rem)', letterSpacing: '-0.03em', textTransform: 'uppercase', color: '#fff', margin: 0, lineHeight: 1.1 }}>
                {project.title}
              </h2>
            </div>
          </div>
        </div>
        <div style={{ padding: 'clamp(24px,4vw,44px)' }}>
          {(project.directa || project.indirecta) && (
            <div style={{ display: 'grid', gridTemplateColumns: project.directa && project.indirecta ? '1fr 1fr 1fr' : '1fr 1fr', gap: 16, marginBottom: 36 }}>
              {project.directa && (
                <div style={{ background: `${project.odsColor}0d`, borderRadius: 12, padding: '20px 16px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', color: project.odsColor, lineHeight: 1 }}>{fmt(project.directa)}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', marginTop: 4 }}>Pessoas Directas</div>
                </div>
              )}
              {project.indirecta && (
                <div style={{ background: '#F8F9FB', borderRadius: 12, padding: '20px 16px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', color: '#0A2D74', lineHeight: 1 }}>{fmt(project.indirecta)}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', marginTop: 4 }}>Pessoas Indirectas</div>
                </div>
              )}
              <div style={{ background: '#F8F9FB', borderRadius: 12, padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', color: '#0A2D74', lineHeight: 1 }}>{project.since}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', marginTop: 4 }}>Desde</div>
              </div>
            </div>
          )}
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', lineHeight: 1.85, color: '#334155', margin: 0 }}>
            {project.fullDesc}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ������������������������������������������������������������������������������������������������������������������
   TIMELINE SECTION
������������������������������������������������������������������������������������������������������������������ */
function TimelineSection() {
  const { ref, visible } = useInView(0.05);
  return (
    <section style={{ background: '#fff', overflow: 'hidden' }}>
      <div className="wrap" style={{ padding: 'clamp(72px,9vw,120px) 0' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'end', marginBottom: 'clamp(56px,7vw,80px)' }} className="tl-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ width: 28, height: 2, background: 'var(--navy-950)' }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--navy-600)' }}>
                Desde 2003
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem,3.5vw,3rem)', letterSpacing: '-0.04em', textTransform: 'uppercase', color: '#0A0F1E', margin: 0, lineHeight: 0.95 }}>
              Uma Década<br /><em style={{ fontStyle: 'normal', color: '#0A2D74' }}>de Impacto</em>
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', lineHeight: 1.75, color: '#1a1a1a', margin: 0 }}>
            A linha do tempo da Missão Fazer Sorrir reflecte o compromisso crescente da OMATAPALO com as comunidades angolanas � um projecto de cada vez.
          </p>
        </div>

        {/* Timeline */}
        <div ref={ref} style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: 'clamp(80px,10vw,120px)', top: 0, bottom: 0,
            width: 2, background: 'linear-gradient(to bottom, #E2E8F0 0%, #0A2D74 50%, #E2E8F0 100%)',
          }} />

          {TIMELINE.map((item, i) => (
            <div
              key={i}
              className="tl-item"
              style={{
                display: 'grid', gridTemplateColumns: 'clamp(80px,10vw,120px) 1fr',
                gap: 'clamp(24px,4vw,56px)',
                marginBottom: i < TIMELINE.length - 1 ? 'clamp(32px,4vw,52px)' : 0,
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateX(-20px)',
                transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`,
              }}
            >
              {/* Year */}
              <div style={{ textAlign: 'right', paddingRight: 'clamp(16px,2vw,28px)', paddingTop: 4, position: 'relative' }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 900,
                  fontSize: 'clamp(0.9rem,1.3vw,1.1rem)',
                  color: '#0A2D74', letterSpacing: '-0.02em',
                }}>{item.year}</div>
                {/* Dot */}
                <div style={{
                  position: 'absolute', right: -7, top: 6,
                  width: 14, height: 14, borderRadius: '50%',
                  background: i % 2 === 0 ? '#0A2D74' : '#fff',
                  border: '2px solid #0A2D74',
                }} />
              </div>
              {/* Content */}
              <div style={{ paddingBottom: 8, borderBottom: i < TIMELINE.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(0.95rem,1.4vw,1.15rem)', color: '#0A0F1E', marginBottom: 6, letterSpacing: '-0.01em' }}>
                  {item.title}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', color: '#1a1a1a', lineHeight: 1.65 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ������������������������������������������������������������������������������������������������������������������
   ODS INTERACTIVE SECTION
������������������������������������������������������������������������������������������������������������������ */
function OdsInteractiveSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { ref, visible } = useInView(0.1);

  return (
    <section style={{ background: '#F4F6F9', overflow: 'hidden' }}>
      <div className="wrap" style={{ padding: 'clamp(72px,9vw,120px) 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'end', marginBottom: 'clamp(48px,6vw,72px)' }} className="ods-int-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ width: 28, height: 2, background: 'var(--navy-950)' }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--navy-600)' }}>Agenda 2030 · ONU</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem,3.5vw,3rem)', letterSpacing: '-0.04em', textTransform: 'uppercase', color: '#0A0F1E', margin: 0, lineHeight: 0.95 }}>
              Objectivos<br /><em style={{ fontStyle: 'normal', color: '#0A2D74' }}>que Guiam</em><br />a Missão
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', lineHeight: 1.75, color: '#1a1a1a', margin: 0 }}>
            A OMATAPALO abraça 4 dos 17 Objectivos de Desenvolvimento Sustentável da ONU, alinhando cada iniciativa social com a Agenda 2030.
          </p>
        </div>

        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="ods-int-grid">
          {ODS_SECTION.map((o, i) => (
            <div
              key={o.num}
              onMouseEnter={() => setHovered(o.num)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderRadius: 16, overflow: 'hidden',
                cursor: 'default',
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(32px)',
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s, box-shadow 0.3s`,
                boxShadow: hovered === o.num ? '0 24px 64px rgba(0,0,0,0.15)' : '0 4px 20px rgba(0,0,0,0.06)',
              }}
            >
              {/* Color header with logo */}
              <div style={{
                background: o.color,
                padding: 'clamp(20px,2.5vw,32px)',
                display: 'flex', flexDirection: 'column', gap: 16,
                transition: 'padding 0.3s',
              }}>
                <img src={o.logo} alt={`ODS ${o.num}`} width={72} height={72}
                  style={{ borderRadius: 10, objectFit: 'cover', display: 'block' }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2.5rem,4vw,3.5rem)', color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>
                    {o.num.toString().padStart(2, '0')}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(0.8rem,1.1vw,0.95rem)', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                    {o.label}
                  </div>
                </div>
              </div>

              {/* White body */}
              <div style={{ background: '#fff', padding: 'clamp(16px,2vw,24px)' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', lineHeight: 1.65, color: '#1a1a1a', margin: '0 0 16px' }}>
                  {o.desc}
                </p>
                {/* Project list */}
                <div style={{
                  overflow: 'hidden',
                  maxHeight: hovered === o.num ? '200px' : '0px',
                  opacity: hovered === o.num ? 1 : 0,
                  transition: 'max-height 0.4s ease, opacity 0.3s ease',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 16, height: 2, background: o.color }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1a1a1a' }}>Projectos</span>
                  </div>
                  {o.projects.map((p, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: o.color, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: '#1a1a1a' }}>{p}</span>
                    </div>
                  ))}
                </div>
                <div style={{ height: 3, background: o.color, borderRadius: 2, marginTop: 8 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ������������������������������������������������������������������������������������������������������������������
   TESTIMONIALS SECTION
������������������������������������������������������������������������������������������������������������������ */
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const { ref, visible } = useInView(0.1);

  return (
    <section style={{ background: 'var(--navy-950)', overflow: 'hidden' }}>
      <div className="wrap" style={{ padding: 'clamp(72px,9vw,120px) 0' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ width: 28, height: 2, background: 'rgba(255,255,255,0.3)' }} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#fff' }}>Vozes da Missão</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem,3.5vw,3rem)', letterSpacing: '-0.04em', textTransform: 'uppercase', color: '#fff', margin: '0 0 clamp(48px,6vw,72px)', lineHeight: 0.95 }}>
          Quem Sentiu<br /><em style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.35)' }}>o Impacto</em>
        </h2>

        {/* Testimonial card */}
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'center' }} className="tst-grid">
          {/* Quote */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateX(-32px)',
            transition: 'opacity 0.7s, transform 0.7s',
          }}>
            <div style={{ fontSize: '5rem', lineHeight: 0.7, color: 'rgba(255,255,255,0.1)', fontFamily: 'Georgia, serif', marginBottom: 24 }}>"</div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'clamp(1.1rem,1.8vw,1.4rem)',
              lineHeight: 1.65, color: 'rgba(255,255,255,0.85)', margin: '0 0 32px',
              fontStyle: 'italic',
            }}>
              {TESTIMONIALS[active].text}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={TESTIMONIALS[active].img} alt={TESTIMONIALS[active].name}
                width={52} height={52}
                style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.2)' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.95rem', color: '#fff', letterSpacing: '-0.01em' }}>{TESTIMONIALS[active].name}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2 }}>{TESTIMONIALS[active].role}</div>
              </div>
            </div>
          </div>

          {/* Navigation + dots */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  all: 'unset', cursor: 'pointer',
                  padding: '20px 24px', borderRadius: 12,
                  background: active === i ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: `1px solid ${active === i ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)'}`,
                  transition: 'background 0.25s, border 0.25s',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.9rem', color: active === i ? '#fff' : 'rgba(255,255,255,0.45)', letterSpacing: '-0.01em', marginBottom: 4 }}>
                  {t.name}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {t.role}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ������������������������������������������������������������������������������������������������������������������
   CTA FINAL
������������������������������������������������������������������������������������������������������������������ */
function CtaFinal() {
  const { ref, visible } = useInView(0.15);
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #0A2D74 0%, #06080E 100%)',
    }}>
      {/* Geometric accents */}
      <div style={{
        position: 'absolute', right: '-8%', top: '-20%',
        width: '50vw', height: '50vw', maxWidth: 640,
        border: '1px solid rgba(255,255,255,0.04)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: '5%', bottom: '-30%',
        width: '35vw', height: '35vw', maxWidth: 450,
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div
        ref={ref}
        className="wrap"
        style={{
          padding: 'clamp(88px,11vw,140px) 0',
          position: 'relative', zIndex: 1,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(32px)',
          transition: 'opacity 0.8s, transform 0.8s',
          maxWidth: 760,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <span style={{ width: 28, height: 2, background: 'rgba(255,255,255,0.3)' }} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Missão Fazer Sorrir</span>
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: 'clamp(2.2rem,5vw,4.5rem)', lineHeight: 0.92,
          letterSpacing: '-0.04em', textTransform: 'uppercase',
          color: '#fff', margin: '0 0 28px',
        }}>
          Construímos mais do<br />que infraestruturas.<br />
          <em style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.3)' }}>Construímos futuros.</em>
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.95rem,1.3vw,1.1rem)', lineHeight: 1.75, color: '#fff', margin: '0 0 48px', maxWidth: 540 }}>
          Cada projecto social da OMATAPALO é um acto de fé no futuro de Angola. Junte-se a nós nesta missão que transforma sorrisos em legado.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <a href="/omatapalo" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: '#fff', color: '#0A2D74',
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '17px 36px', borderRadius: 100, textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; (e.currentTarget as HTMLAnchorElement).style.boxShadow = ''; }}
          >
            Conheça a OMATAPALO
          </a>
          <a href="/sustentabilidade" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'transparent', color: '#fff',
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '17px 36px', borderRadius: 100, textDecoration: 'none',
            border: '2px solid rgba(255,255,255,0.2)',
            transition: 'border-color 0.2s, color 0.2s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)'; }}
          >
            Relatório de Sustentabilidade
          </a>
        </div>
      </div>
    </section>
  );
}

/* ������������������������������������������������������������������������������������������������������������������
   MAIN COMPONENT
������������������������������������������������������������������������������������������������������������������ */
export default function MissaoFazerSorrir({ hideHero = false, filterODS = null }: { hideHero?: boolean; filterODS?: number | null }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const statsInView = useInView(0.2);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (hideHero) return;
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hideHero]);

  const filtered = filterODS ? PROJECTS.filter(p => p.ods === filterODS) : PROJECTS;

  return (
    <div>

      {/* ���� HERO �������������������������������������������������������������������������������������� */}
      {!hideHero && (
        <div ref={heroRef} style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=85"
            alt="Missão Fazer Sorrir"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '115%',
              objectFit: 'cover', objectPosition: 'center',
              transform: `translateY(${scrollY * 0.35}px)`, top: '-7.5%',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(6,13,26,0.88) 0%, rgba(10,45,116,0.72) 50%, rgba(6,13,26,0.65) 100%)' }} />
          <div className="wrap" style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ maxWidth: 720 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                <div style={{ width: 32, height: 2, background: '#1a396e' }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#fff' }}>
                  Responsabilidade Social · Omatapalo
                </span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2.2rem,5vw,4.5rem)', lineHeight: 0.9, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 28px', textTransform: 'uppercase' }}>
                Missão<br />
                <em style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.35)' }}>Fazer</em><br />
                Sorrir
              </h1>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1rem,1.5vw,1.15rem)', lineHeight: 1.75, color: '#fff', margin: '0 0 44px', maxWidth: 520 }}>
                Transformamos vidas através da educação, saúde, alimentação e desenvolvimento comunitário.
              </p>
              <a href="#projectos-terreno" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#fff', color: '#0A2D74',
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '16px 32px', borderRadius: 100, textDecoration: 'none',
              }}>
                Explorar o Impacto
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.4))' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>scroll</span>
          </div>
        </div>
      )}


      {/* Pacto Global */}
      {!hideHero && <PactoGlobal />}

      {/* ���� IMPACT STATS ���������������������������������������������������������������������� */}
      {!hideHero && (
        <div ref={statsInView.ref} style={{ background: '#060D1A' }}>
          <div className="wrap">
            <div className="mfs-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)' }}>
              {IMPACT_STATS.map((s, i) => (
                <div key={i} style={{ borderRight: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <StatCard stat={s} active={statsInView.visible} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ���� PROJECTS GRID �������������������������������������������������������������������� */}
      <div id="projectos-terreno" style={{ background: '#F4F6F9' }}>
        <div className="wrap" style={{ paddingTop: 'clamp(64px,8vw,100px)', paddingBottom: 'clamp(64px,8vw,100px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'end', marginBottom: 'clamp(40px,5vw,64px)' }} className="mfs-projects-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ width: 24, height: 2, background: '#0A2D74' }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0A2D74', fontWeight: 700 }}>
                  {filterODS ? `ODS ${filterODS} · ${PROJECTS.find(p => p.ods === filterODS)?.odsLabel ?? ''}` : `${PROJECTS.length} Iniciativas Activas`}
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem,3.5vw,3rem)', letterSpacing: '-0.04em', textTransform: 'uppercase', color: '#0A0F1E', margin: 0, lineHeight: 0.95 }}>
                Projectos no<br /><em style={{ fontStyle: 'normal', color: '#0A2D74' }}>Terreno</em>
              </h2>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', lineHeight: 1.75, color: '#1a1a1a', margin: 0 }}>
              Cada projecto representa um compromisso real com as comunidades angolanas. Clique para descobrir o impacto completo, a cronologia e os indicadores.
            </p>
          </div>
          <div className="mfs-grid">
            {filtered.map((p, i) => (
              <ProjectCard key={i} index={i} project={p} onOpen={() => setSelectedProject(p)} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#1a1a1a' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', color: '#CBD5E1', marginBottom: 8 }}>Sem projectos para este ODS</div>
            </div>
          )}
        </div>
      </div>

      {/* ���� MODAL ������������������������������������������������������������������������������������ */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}

      <style>{`
        @media (max-width: 1024px) {
          .ods-int-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 900px) {
          .mfs-stats { grid-template-columns: repeat(3,1fr) !important; }
          .mfs-grid { grid-template-columns: repeat(2,1fr) !important; }
          .mfs-projects-header { grid-template-columns: 1fr !important; }
          .tl-header { grid-template-columns: 1fr !important; }
          .ods-int-header { grid-template-columns: 1fr !important; }
          .tst-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .mfs-stats { grid-template-columns: repeat(2,1fr) !important; }
          .mfs-grid { grid-template-columns: 1fr !important; }
          .ods-int-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
