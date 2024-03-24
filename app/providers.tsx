// app/providers.tsx
'use client';

import { NextUIProvider } from '@nextui-org/react';
import React, { type ReactElement } from 'react';

export function Providers ({ children }: { children: React.ReactNode }): ReactElement {
  return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
  );
}
