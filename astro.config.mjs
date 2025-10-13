// @ts-check
import { defineConfig } from 'astro/config';

import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4321'
      : 'https://graswald-schaetzle.com',
  integrations: [
    robotsTxt({
      sitemapBaseFileName: 'sitemap-index',
      // policy: [
      //   {
      //     userAgent: '*',
      //     disallow: '/',
      //   },
      // ],
    }),
    sitemap({
      lastmod: new Date(),
      xslURL: '/sitemap.xsl',
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          de: 'de',
        },
      },
    }),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "/src/styles/functions" as *; @use "/src/styles/mixins" as *;',
        },
      },
    },
    plugins: [],
  },
  image: {
    responsiveStyles: true,
  },
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
  },
  trailingSlash: 'never',
});

// file meta order
// -----
// import css

// import type

// type Something

// interface Something

// import package

// import astro:content

// import @content

// import @layouts
// import @components

// getStaticPaths

// Astro.Props
