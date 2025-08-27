import type { ImageFunction } from 'astro:content';

import { defineCollection, reference, z } from 'astro:content';
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
      navigation: z.array(
        z.object({
          links: z.array(
            z.object({
              title: z.string(),
              anchor: z.string(),
            }),
          ),
        }),
      ),
      footer: z.array(
        z.object({
          contact: z.string(),
          links: z.array(
            z.object({
              link: reference('pagesGeneric'),
            }),
          ),
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

const getStickyColumnSchema = (image: ImageFunction) =>
  z.object({
    anchor: z.string(),
    title: z.string(),
    sections: z.array(
      z.discriminatedUnion('type', [
        z.object({
          type: z.literal('componentStickyColumnContent'),
          title: z.string(),
          content: z.string(),
        }),
        z.object({
          type: z.literal('componentStickyColumnImage'),
          title: z.string(),
          image: z.object({
            image: image(),
            alt: z.string(),
          }),
        }),
        z.object({
          type: z.literal('componentStickyColumnList'),
          title: z.string(),
          text: z.array(z.string()),
        }),
      ]),
    ),
  });

const pageHome = defineCollection({
  loader: glob({ base: './src/content', pattern: 'pageHome.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),
      h1: z.string(),
      moduleStickyContent: z.object({
        anchor: z.string(),
        intro: z.string(),
        introLink: z.object({
          link: z.string(),
          linkText: z.string(),
        }),
        stickyColumn1: getStickyColumnSchema(image),
        stickyColumn2: getStickyColumnSchema(image),
        stickySection: z.object({
          content: z.object({
            title: z.string(),
            content: z.string(),
          }),
          column: getStickyColumnSchema(image),
        }),
      }),
      moduleTextLinksBlock: z.array(
        z.object({
          anchor: z.string().optional(),
          title: z.string(),
          content: z.string(),
          link: z.object({
            link: z.string(),
            linkText: z.string(),
          }),
          contacts: z
            .array(
              z.object({
                title: z.string(),
                mail: z.string().optional(),
                link: z.object({
                  link: z.string(),
                  linkText: z.string(),
                }),
              }),
            )
            .min(0)
            .max(2)
            .optional(),
        }),
      ),
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
            z.object({
              type: z.literal('moduleRichText'),
              content: z.string(),
            }),
          ]),
        ),
      }),
    ),
  }),
});

export const collections = { globals, pageHome, pagesGeneric };
