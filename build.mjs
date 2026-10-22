import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const raw = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || '';
const origin = raw ? new URL(raw.startsWith('http') ? raw : `https://${raw}`).origin : '';
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
for (const name of await readdir('dist')) {
  if (!name.endsWith('.html')) continue;
  const file = join('dist', name);
  const html = await readFile(file, 'utf8');
  await writeFile(file, html.replaceAll('__SITE_ORIGIN__', origin));
}
console.log('Portfolio build complete.');
