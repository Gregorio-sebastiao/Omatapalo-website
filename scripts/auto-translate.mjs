/**
 * Auto-translate all PT content in Supabase to EN and FR.
 * Uses Google Translate free endpoint (no API key needed).
 * Run: node scripts/auto-translate.mjs
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rsbzgeqgfseyeogexkwk.supabase.co';
const SERVICE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzYnpnZXFnZnNleWVvZ2V4a3drIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjM1OTE5NiwiZXhwIjoyMDk3OTM1MTk2fQ.Yg-wbsF8P8xI6ZyzJ3EZaZNjzyEnlU4S4KH5Z3SKR1g';
const db = createClient(SUPABASE_URL, SERVICE_KEY);

// Pages to translate (PT source → EN + FR locale copies)
const PAGES = [
  'home',
  'quem-somos',
  'grandes-numeros',
  'negocios',
  'fazemos-acontecer',
  'historia',
  'manifesto',
  'sustentabilidade',
  'responsabilidade',
  'cdh',
];

// Fields that contain JSON (need special handling)
const JSON_FIELDS = new Set([
  'items', 'header', 'texts', 'images', 'sectors', 'big', 'small',
  'timeline', 'values', 'cards', 'stats', 'highlights',
]);

// Fields to skip (images/URLs/numbers don't need translation)
const SKIP_FIELDS = new Set([
  'img', 'src', 'logo', 'href', 'link', 'url', 'photo',
  'hero_img', 'bg_img', 'image', 'banner',
  'cta_primary_href', 'cta_secondary_href',
  'stat1_value', 'stat2_value', 'stat3_value', 'stat4_value',
  'stat5_value', 'stat6_value', 'stat7_value',
  'value', 'suffix', 'prefix', 'year', 'id', 'short',
]);

// ── Google Translate (free, no key) ──────────────────────────────────────────
async function translate(text, targetLang) {
  if (!text || !text.trim() || text.length < 2) return text;
  // Skip if it looks like a URL or number
  if (/^https?:\/\//.test(text) || /^\d+$/.test(text.trim())) return text;

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=pt&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    // Response is nested array: [[["translated","original",...],...]
    const translated = data[0]?.map(chunk => chunk[0]).join('') ?? text;
    return translated;
  } catch (e) {
    console.warn(`  ⚠ Tradução falhou para "${text.slice(0,40)}": ${e.message}`);
    return text;
  }
}

// Throttle to avoid rate limiting
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Recursively translate text fields in a JSON value ────────────────────────
async function translateValue(value, targetLang, fieldName = '') {
  if (SKIP_FIELDS.has(fieldName)) return value;
  if (typeof value === 'string') {
    return translate(value, targetLang);
  }
  if (Array.isArray(value)) {
    const results = [];
    for (const item of value) {
      results.push(await translateValue(item, targetLang));
      await sleep(150);
    }
    return results;
  }
  if (typeof value === 'object' && value !== null) {
    const result = {};
    for (const [k, v] of Object.entries(value)) {
      if (SKIP_FIELDS.has(k)) {
        result[k] = v;
      } else {
        result[k] = await translateValue(v, targetLang, k);
        await sleep(150);
      }
    }
    return result;
  }
  return value;
}

// ── Process one page ─────────────────────────────────────────────────────────
async function translatePage(page, targetLang) {
  const localePage = `${page}-${targetLang}`;

  // Read PT source
  const { data: rows, error } = await db.from('site_content').select('field,value').eq('page', page);
  if (error) { console.error(`  ❌ Erro ao ler ${page}: ${error.message}`); return; }
  if (!rows || rows.length === 0) { console.log(`  ⏭ ${page}: sem dados`); return; }

  const upsertRows = [];

  for (const row of rows) {
    if (SKIP_FIELDS.has(row.field)) {
      upsertRows.push({ page: localePage, field: row.field, value: row.value });
      continue;
    }

    let translated;
    if (JSON_FIELDS.has(row.field)) {
      try {
        const parsed = JSON.parse(row.value);
        const translatedObj = await translateValue(parsed, targetLang, row.field);
        translated = JSON.stringify(translatedObj);
      } catch {
        translated = await translate(row.value, targetLang);
      }
    } else {
      translated = await translate(row.value, targetLang);
    }

    await sleep(200);
    upsertRows.push({ page: localePage, field: row.field, value: translated });
    console.log(`    ${row.field}: ${String(row.value).slice(0,40).replace(/\n/g,' ')} → ${String(translated).slice(0,40).replace(/\n/g,' ')}`);
  }

  // Save to Supabase
  const { error: upErr } = await db.from('site_content').upsert(upsertRows, { onConflict: 'page,field' });
  if (upErr) console.error(`  ❌ Erro ao guardar ${localePage}: ${upErr.message}`);
  else console.log(`  ✅ ${localePage} guardado (${upsertRows.length} campos)`);
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log('🌍 Auto-tradução PT → EN + FR\n');

  for (const page of PAGES) {
    console.log(`\n📄 ${page}`);
    // Check if page has content
    const { data } = await db.from('site_content').select('field').eq('page', page).limit(1);
    if (!data || data.length === 0) { console.log('  ⏭ sem conteúdo, a saltar'); continue; }

    console.log(`  → EN`);
    await translatePage(page, 'en');
    await sleep(500);

    console.log(`  → FR`);
    await translatePage(page, 'fr');
    await sleep(500);
  }

  console.log('\n🎉 Tradução completa!');
}

run().catch(e => { console.error(e); process.exit(1); });
