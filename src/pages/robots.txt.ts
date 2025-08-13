import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.toString() || 'http://localhost:4321';
  
  const robots = `User-agent: *
Allow: /

User-agent: GPTBot  
Allow: /

User-agent: ChatGPT-User
Allow: /

Sitemap: ${siteUrl}sitemap.xml`;

  return new Response(robots, { headers: { 'Content-Type': 'text/plain' } });
};