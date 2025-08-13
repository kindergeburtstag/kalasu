import { defineCollection, z } from 'astro:content';

const cityThemeAge = defineCollection({
  type: 'content',
  schema: z.object({
    theme: z.string(),
    city: z.string(),
    ageBand: z.enum(['4-5', '6-7', '8-9']),
    durationMin: z.number().int().min(20).max(90),
    titleTag: z.string().max(60),
    metaDescription: z.string().min(150).max(160),
    h1: z.string(),
    heroSubtitle: z.string(),
    intro: z.string().optional(),
    features: z.array(z.string()),
    faq: z.array(z.object({
      q: z.string(),
      a: z.string()
    })),
    internalLinks: z.array(z.string()),
    publish: z.boolean().default(true)
  }),
});

export const collections = {
  cityThemeAge,
};