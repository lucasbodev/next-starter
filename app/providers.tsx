// app/providers.tsx
'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { NextUIProvider } from '@nextui-org/react';
import React, { type ReactElement } from 'react';

export function Providers ({ children }: { children: React.ReactNode }): ReactElement {
  return (
    <UserProvider>
        <NextUIProvider>
            {children}
        </NextUIProvider>
    </UserProvider> 
  );
}
