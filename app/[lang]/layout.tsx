import React, { type ReactElement } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.scss';
import Nav from '@/lib/components/nav/nav.component';
import { Providers } from '@/app/providers';
import { type LangParams } from '../dictionaries';
import '@/lib/animations/gsap-config';
import Footer from '@/lib/components/footer/footer.component';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react";


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

const RootLayout = (
  { params: { lang }, children }:
    Readonly<{ params: LangParams; children: React.ReactNode }>):
  ReactElement => {

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <Providers>
          <Nav params={{ lang }} />
          {children}
          <Footer params={{ lang }} />
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
