/**
 * Seed i18n content for EN and FR locales in Supabase.
 * Run: node scripts/seed-i18n.mjs
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rsbzgeqgfseyeogexkwk.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzYnpnZXFnZnNleWVvZ2V4a3drIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjM1OTE5NiwiZXhwIjoyMDk3OTM1MTk2fQ.Yg-wbsF8P8xI6ZyzJ3EZaZNjzyEnlU4S4KH5Z3SKR1g';

const db = createClient(SUPABASE_URL, SERVICE_KEY);

// ─── quem-somos ────────────────────────────────────────────────────────────
const QUEM_SOMOS_EN_TEXTS = [
  'We are an Angolan business group present in strategic sectors of the economy, committed to creating value, sustainable development, and the progress of Angola.',
  'Founded in 2003, Grupo Omatapalo has been consolidating a growth trajectory grounded in excellence, innovation, and positive impact.',
  'More than building infrastructure, we build trust, opportunities, and the future.',
];

const QUEM_SOMOS_FR_TEXTS = [
  'Nous sommes un groupe d\'entreprises angolais présent dans les secteurs stratégiques de l\'économie, engagé dans la création de valeur, le développement durable et le progrès de l\'Angola.',
  'Fondé en 2003, le Groupe Omatapalo consolide une trajectoire de croissance fondée sur l\'excellence, l\'innovation et l\'impact positif.',
  'Plus que construire des infrastructures, nous construisons la confiance, les opportunités et l\'avenir.',
];

// The images are the same for all locales — reuse PT images
const PT_IMAGES = [
  { src: '/EN-230-omatapalo-2.jpg', label: 'National Road 230 - Saurimo' },
  { src: '/Salao-Protocolar-1-1.jpg', label: 'Protocol Hall - Luanda' },
  { src: '/HOSPITAL MILITAR_1306202.JPG', label: 'Military Hospital' },
  { src: '/omatapalo-construcao-do-monumento-do-soldado-desconhecido.jpg', label: 'Monument to the Unknown Soldier - Luanda' },
  { src: '/DSC_0030.jpg', label: 'Mission Make Smile' },
  { src: '/Academia-barra.jpg', label: 'Omatapalo Academy' },
];

const PT_IMAGES_FR = [
  { src: '/EN-230-omatapalo-2.jpg', label: 'Route Nationale 230 - Saurimo' },
  { src: '/Salao-Protocolar-1-1.jpg', label: 'Salle Protocolaire - Luanda' },
  { src: '/HOSPITAL MILITAR_1306202.JPG', label: 'Hôpital Militaire' },
  { src: '/omatapalo-construcao-do-monumento-do-soldado-desconhecido.jpg', label: 'Monument au Soldat Inconnu - Luanda' },
  { src: '/DSC_0030.jpg', label: 'Mission Faire Sourire' },
  { src: '/Academia-barra.jpg', label: 'Académie Omatapalo' },
];

// ─── grandes-numeros ───────────────────────────────────────────────────────
const GN_HEADER_EN = {
  eyebrow: 'What We Have Built',
  title: 'Great\nNumbers',
  description: 'More than two decades building infrastructure that improves community lives and contributes to the country\'s growth.',
};

const GN_HEADER_FR = {
  eyebrow: 'Ce Que Nous Avons Construit',
  title: 'Grands\nChiffres',
  description: 'Plus de deux décennies à construire des infrastructures qui améliorent la vie des communautés et contribuent à la croissance du pays.',
};

const GN_ITEMS_EN = [
  { value: '14',   label: 'Hospitals',          img: '/inauguracao.jpg',                     suffix: '' },
  { value: '5000', label: 'Roads',               img: '/EN-230-omatapalo-2.jpg',              suffix: 'km' },
  { value: '4',    label: 'Ports',               img: '/TOPSIDE NAMIBE.JPG',                  suffix: '' },
  { value: '6',    label: 'High-voltage Lines',  img: '/omatapalo-electrificacao.jpg',         suffix: '' },
  { value: '6',    label: 'Special Constructions', img: '/MINISTÉRIO DO PLANEAMENTO.JPG',     suffix: '' },
  { value: '10',   label: 'Schools',             img: '/colegio-paula-frassinetti.jpg',        suffix: '' },
  { value: '2',    label: 'Airports',            img: '/aeroporto-namibe.jpg',                 suffix: '' },
  { value: '3500', label: 'Equipment Units',     img: '/GRUA.jpg',                             suffix: '' },
  { value: '3',    label: 'Dams',                img: '/barragem-calucuve.jpg',                suffix: '' },
  { value: '8',    label: 'Wastewater Plants',   img: '/etar-huila.jpg',                       suffix: '' },
  { value: '7',    label: 'Hotel Units',         img: '/FLOW HOTEL LUANDA AEROPORTO.jpeg',     suffix: '' },
  { value: '14',   label: 'Solar Plants',        img: '/parquesolar.jpg',                      suffix: '' },
];

const GN_ITEMS_FR = [
  { value: '14',   label: 'Hôpitaux',            img: '/inauguracao.jpg',                     suffix: '' },
  { value: '5000', label: 'Routes',              img: '/EN-230-omatapalo-2.jpg',              suffix: 'km' },
  { value: '4',    label: 'Ports',               img: '/TOPSIDE NAMIBE.JPG',                  suffix: '' },
  { value: '6',    label: 'Lignes Haute Tension', img: '/omatapalo-electrificacao.jpg',        suffix: '' },
  { value: '6',    label: 'Constructions Spéc.', img: '/MINISTÉRIO DO PLANEAMENTO.JPG',        suffix: '' },
  { value: '10',   label: 'Écoles',              img: '/colegio-paula-frassinetti.jpg',        suffix: '' },
  { value: '2',    label: 'Aéroports',           img: '/aeroporto-namibe.jpg',                 suffix: '' },
  { value: '3500', label: 'Équipements',         img: '/GRUA.jpg',                             suffix: '' },
  { value: '3',    label: 'Barrages',            img: '/barragem-calucuve.jpg',                suffix: '' },
  { value: '8',    label: 'Stations d\'Épuration', img: '/etar-huila.jpg',                    suffix: '' },
  { value: '7',    label: 'Unités Hôtelières',   img: '/FLOW HOTEL LUANDA AEROPORTO.jpeg',    suffix: '' },
  { value: '14',   label: 'Centrales Solaires',  img: '/parquesolar.jpg',                      suffix: '' },
];

// ─── negocios ─────────────────────────────────────────────────────────────
const NEGOCIOS_EN = {
  title1: 'Group',
  title2: 'Companies',
  intro: 'A diversified business ecosystem operating in Angola\'s key economic sectors.',
};

const NEGOCIOS_FR = {
  title1: 'Entreprises',
  title2: 'du Groupe',
  intro: 'Un écosystème d\'entreprises diversifié opérant dans les principaux secteurs de l\'économie angolaise.',
};

// ─── home ─────────────────────────────────────────────────────────────────
const HOME_EN = {
  eyebrow: 'Omatapalo Group · Since 2003',
  title_line1: 'WE MAKE',
  title_line2: 'IT HAPPEN',
  intro: 'Engineering, Construction and Infrastructure. Transforming Angola for more than two decades.',
  cta_primary: 'Discover the Group',
  cta_primary_href: '#grupo',
  cta_secondary: 'Talk to Us',
  cta_secondary_href: '#contactos',
  stat1_value: '23',       stat1_label: 'Years of Experience',
  stat2_value: '+15,000',  stat2_label: 'Employees',
  stat3_value: '+1.5M m²', stat3_label: 'Built Area',
  stat4_value: '+5,000 km',stat4_label: 'of Road',
  stat5_value: '',          stat5_label: '',
  stat6_value: '',          stat6_label: '',
  stat7_value: '+14',       stat7_label: 'Hospitals',
};

const HOME_FR = {
  eyebrow: 'Groupe Omatapalo · Depuis 2003',
  title_line1: 'NOUS FAISONS',
  title_line2: 'ARRIVER',
  intro: 'Ingénierie, Construction et Infrastructures. Transformer l\'Angola depuis plus de deux décennies.',
  cta_primary: 'Découvrir le Groupe',
  cta_primary_href: '#grupo',
  cta_secondary: 'Nous Contacter',
  cta_secondary_href: '#contactos',
  stat1_value: '23',       stat1_label: 'Années d\'Expérience',
  stat2_value: '+15 000',  stat2_label: 'Collaborateurs',
  stat3_value: '+1,5M m²', stat3_label: 'Surface Construite',
  stat4_value: '+5 000 km',stat4_label: 'de Route',
  stat5_value: '',          stat5_label: '',
  stat6_value: '',          stat6_label: '',
  stat7_value: '+14',       stat7_label: 'Hôpitaux',
};

// ─── helpers ──────────────────────────────────────────────────────────────
async function upsert(rows) {
  const { error } = await db.from('site_content').upsert(rows, { onConflict: 'page,field' });
  if (error) { console.error('❌', error.message); process.exit(1); }
}

async function run() {
  console.log('Seeding EN & FR content…\n');

  // quem-somos-en
  await upsert([
    { page: 'quem-somos-en', field: 'texts', value: JSON.stringify(QUEM_SOMOS_EN_TEXTS) },
    { page: 'quem-somos-en', field: 'images', value: JSON.stringify(PT_IMAGES) },
  ]);
  console.log('✅ quem-somos-en');

  // quem-somos-fr
  await upsert([
    { page: 'quem-somos-fr', field: 'texts', value: JSON.stringify(QUEM_SOMOS_FR_TEXTS) },
    { page: 'quem-somos-fr', field: 'images', value: JSON.stringify(PT_IMAGES_FR) },
  ]);
  console.log('✅ quem-somos-fr');

  // grandes-numeros-en
  await upsert([
    { page: 'grandes-numeros-en', field: 'header', value: JSON.stringify(GN_HEADER_EN) },
    { page: 'grandes-numeros-en', field: 'items', value: JSON.stringify(GN_ITEMS_EN) },
  ]);
  console.log('✅ grandes-numeros-en');

  // grandes-numeros-fr
  await upsert([
    { page: 'grandes-numeros-fr', field: 'header', value: JSON.stringify(GN_HEADER_FR) },
    { page: 'grandes-numeros-fr', field: 'items', value: JSON.stringify(GN_ITEMS_FR) },
  ]);
  console.log('✅ grandes-numeros-fr');

  // negocios-en
  await upsert([
    { page: 'negocios-en', field: 'title1', value: NEGOCIOS_EN.title1 },
    { page: 'negocios-en', field: 'title2', value: NEGOCIOS_EN.title2 },
    { page: 'negocios-en', field: 'intro',  value: NEGOCIOS_EN.intro  },
  ]);
  console.log('✅ negocios-en');

  // negocios-fr
  await upsert([
    { page: 'negocios-fr', field: 'title1', value: NEGOCIOS_FR.title1 },
    { page: 'negocios-fr', field: 'title2', value: NEGOCIOS_FR.title2 },
    { page: 'negocios-fr', field: 'intro',  value: NEGOCIOS_FR.intro  },
  ]);
  console.log('✅ negocios-fr');

  // home-en
  for (const [field, value] of Object.entries(HOME_EN)) {
    await upsert([{ page: 'home-en', field, value }]);
  }
  console.log('✅ home-en');

  // home-fr
  for (const [field, value] of Object.entries(HOME_FR)) {
    await upsert([{ page: 'home-fr', field, value }]);
  }
  console.log('✅ home-fr');

  console.log('\n🎉 Seed completo!');
}

run().catch(e => { console.error(e); process.exit(1); });
