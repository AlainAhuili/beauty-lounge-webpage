// Page translation.
// German is written in the HTML. Every other language lives in i18n/<code>.json
// and is loaded only when chosen. Elements carry their key in data-i18n
// (inner HTML) or data-i18n-alt (image alt text).
// Language order on first visit: ?lang= in the URL, the last choice, the
// browser's language, then German.

const LANGS = ['de', 'en', 'fr', 'es', 'it', 'nl', 'pt', 'tr', 'el', 'pl', 'cs'];
const DEFAULT = 'de';

const select = document.getElementById('lang-select');
const description = document.querySelector('meta[name="description"]');
const cache = {};

// The German texts, read once from the HTML so German can be restored.
const german = {
  'meta.title': document.title,
  'meta.description': description.content,
};
document.querySelectorAll('[data-i18n]').forEach((el) => { german[el.dataset.i18n] = el.innerHTML; });
document.querySelectorAll('[data-i18n-alt]').forEach((el) => { german[el.dataset.i18nAlt] = el.alt; });
cache[DEFAULT] = german;

function readStored() {
  try { return localStorage.getItem('lang'); } catch { return null; }
}

function store(lang) {
  try { localStorage.setItem('lang', lang); } catch { /* private mode: the choice is just not remembered */ }
}

function initialLang() {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (LANGS.includes(fromUrl)) return fromUrl;
  const stored = readStored();
  if (LANGS.includes(stored)) return stored;
  const fromBrowser = (navigator.languages || [navigator.language])
    .map((l) => String(l).slice(0, 2).toLowerCase())
    .find((l) => LANGS.includes(l));
  return fromBrowser || DEFAULT;
}

async function load(lang) {
  if (!cache[lang]) {
    const res = await fetch(`i18n/${lang}.json`);
    if (!res.ok) throw new Error(`Missing translation file for "${lang}"`);
    cache[lang] = await res.json();
  }
  return cache[lang];
}

async function setLang(lang) {
  let texts;
  try {
    texts = await load(lang);
  } catch (err) {
    console.error(err);
    lang = DEFAULT;
    texts = german;
  }
  // A key missing from a translation falls back to German.
  const t = (key) => texts[key] ?? german[key];

  document.querySelectorAll('[data-i18n]').forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => { el.alt = t(el.dataset.i18nAlt); });
  document.title = t('meta.title');
  description.content = t('meta.description');
  document.documentElement.lang = lang;
  document.body.dataset.lang = lang;
  select.value = lang;

  store(lang);
  const url = new URL(location.href);
  if (lang === DEFAULT) url.searchParams.delete('lang'); else url.searchParams.set('lang', lang);
  history.replaceState(null, '', url);
}

select.addEventListener('change', () => setLang(select.value));

const start = initialLang();
if (start !== DEFAULT) setLang(start);
