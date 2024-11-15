import React from 'react';
import type { Metadata } from 'next';
import '@/app/globals.css';
import Nav from '@/lib/components/nav/nav.component';
import { Providers } from '@/app/providers';
import '@/lib/styles/animations/gsap-config';
import Footer from '@/lib/components/footer/footer.component';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from 'geist/font/sans';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const LocaleLayout = async (
  { children, params }: { children: React.ReactNode; params: Promise<{ locale: string }>; }
) => {

  const { locale } = await params;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={GeistSans.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Nav />
            {children}
            <Footer/>
            <SpeedInsights />
            <Analytics />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
