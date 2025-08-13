import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: process.env.VITE_PUBLIC_SITE_URL || 'http://localhost:4321',
  integrations: [
    mdx(),
    tailwind({
      applyBaseStyles: false,
    })
  ],
  output: 'static'
});