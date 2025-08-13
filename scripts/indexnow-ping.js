import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ENV Variablen
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
const SITE_URL = process.env.VITE_PUBLIC_SITE_URL || process.env.SITE_URL;

if (!INDEXNOW_KEY || !SITE_URL) {
  console.log('❌ Fehlende Umgebungsvariablen:');
  console.log('   INDEXNOW_KEY und SITE_URL müssen gesetzt sein');
  console.log('   Beispiel: INDEXNOW_KEY=abc123 SITE_URL=https://kalasu.com npm run ping:indexnow');
  process.exit(1);
}

// Lese publizierte Slugs
async function getPublishedSlugs() {
  try {
    const contentDir = join(__dirname, '../src/content/cityThemeAge');
    if (!existsSync(contentDir)) return [];
    
    const { readdirSync } = await import('fs');
    const files = readdirSync(contentDir).filter(f => f.endsWith('.mdx'));
    
    // Vereinfacht: nehme alle MDX-Dateien (in Produktion: Frontmatter parsen)
    return files.map(f => f.replace('.mdx', ''));
  } catch (error) {
    console.warn('Warnung: Könnte Slugs nicht lesen, verwende Fallback');
    return ['pirat-berlin-67'];
  }
}

const slugs = await getPublishedSlugs();
const urls = [
  SITE_URL,
  `${SITE_URL}/schnitzeljagd`,
  ...slugs.map(slug => `${SITE_URL}/schnitzeljagd/${slug}`)
];

const payload = {
  host: new URL(SITE_URL).hostname,
  key: INDEXNOW_KEY,
  urlList: urls
};

console.log(`🚀 IndexNow Ping für ${urls.length} URLs:`);
console.log(`curl -X POST "https://api.indexnow.org/indexnow" -H "Content-Type: application/json" -d '${JSON.stringify(payload)}'`);

// Führe tatsächlichen Ping aus (optional)
try {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  if (response.ok) {
    console.log('✅ IndexNow Ping erfolgreich!');
  } else {
    console.log(`❌ IndexNow Ping fehlgeschlagen: ${response.status}`);
  }
} catch (error) {
  console.log('❌ Network Error:', error.message);
  console.log('Verwende den curl-Befehl oben für manuellen Ping.');
}