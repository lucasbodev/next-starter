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
    '/add-product': {
      fr: '/ajouter-produit',
      en: '/add-product',
      de: '/produkt-hinzufügen',
      nl: '/voeg-product-toe',
    },
    '/add-product/success': {
      fr: '/ajouter-produit/succes',
      en: '/add-product/success',
      de: '/produkt-hinzufügen/erfolg',
      nl: '/voeg-product-toe/succes',
    },
    '/edit-product/[id]': {
      fr: '/modifier-produit/[id]',
      en: '/edit-product/[id]',
      de: '/produkt-bearbeiten/[id]',
      nl: '/bewerk-product/[id]',
    },
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);