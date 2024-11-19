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
    '/products': {
      fr: '/produits',
      en: '/products',
      de: '/produkte',
      nl: '/producten',
    },
    '/products/add-product': {
      fr: '/produits/ajouter-produit',
      en: '/products/add-product',
      de: '/produkte/produkt-hinzufügen',
      nl: '/producten/voeg-product-toe',
    },
    '/products/add-product/success': {
      fr: '/produits/ajouter-produit/succes',
      en: '/products/add-product/success',
      de: '/produkte/produkt-hinzufügen/erfolg',
      nl: '/producten/voeg-product-toe/succes',
    },
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);