import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['fr', 'nl', 'en', 'de'],

  // Used when no locale matches
  defaultLocale: 'fr',

  // The routing configuration
  pathnames: {
    '/': '/',
    '/count': {
      fr: '/compteur',
      en: '/count',
      de: '/zähler',
      nl: '/tellen',
    },
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);