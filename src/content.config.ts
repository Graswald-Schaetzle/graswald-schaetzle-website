import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const globals = defineCollection({
  loader: glob({ base: './src/content', pattern: 'globals.json' }),
  schema: ({ image }) =>
    z.object({
      general: z.array(
        z.object({
          siteTitle: z.string(),
          siteDescription: z.string(),
          siteImage: image(),
        }),
      ),
      page404: z.array(
        z.object({
          title: z.string(),
          subline: z.string(),
          linkText: z.string(),
        }),
      ),
    }),
});

const pageHome = defineCollection({
  loader: glob({ base: './src/content', pattern: 'pageHome.md' }),
  schema: () =>
    z.object({
      title: z.string().optional(),
      moduleTitle: z.object({
        type: z.literal('moduleTitle'),
        title: z.string(),
      }),
    }),
});

const pagesGeneric = defineCollection({
  loader: glob({ base: './src/content/pagesGeneric', pattern: '**/*.md' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    sections: z.array(
      z.object({
        modules: z.array(
          z.discriminatedUnion('type', [
            z.object({
              type: z.literal('moduleTitle'),
              title: z.string(),
            }),
          ]),
        ),
      }),
    ),
  }),
});

export const collections = { globals, pageHome, pagesGeneric };
