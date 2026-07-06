/**
 * Google Translate free endpoint with localStorage persistence.
 * Translations survive page reloads — only fetched once per text+language.
 */

const PREFIX = 'omt-gt:';

function lsGet(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}

function lsSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // localStorage full — purge oldest omt-gt entries and retry
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(PREFIX));
      keys.slice(0, Math.ceil(keys.length / 2)).forEach(k => localStorage.removeItem(k));
      localStorage.setItem(key, value);
    } catch {}
  }
}

async function gtxChunk(text: string, lang: string): Promise<string> {
  if (!text || !text.trim() || text.length < 2) return text;

  const key = `${PREFIX}${lang}:${text.slice(0, 100)}`;
  const cached = lsGet(key);
  if (cached) return cached;

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=pt&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const data = await fetch(url).then(r => r.json());
    const result: string = data[0]?.map((c: [string]) => c[0]).join('') ?? text;
    lsSet(key, result);
    return result;
  } catch {
    return text;
  }
}

export async function gtx(text: string, lang: string): Promise<string> {
  if (!text || !text.trim() || text.length < 2) return text;
  if (lang === 'pt') return text;

  // For long texts, split by HTML block tags and translate each chunk
  if (text.length > 1500) {
    const parts = text.split(/(?<=<\/(?:p|h[1-6]|li|blockquote|div)>)/i);
    const translated = await Promise.all(parts.map(p => gtxChunk(p, lang)));
    return translated.join('');
  }

  return gtxChunk(text, lang);
}
