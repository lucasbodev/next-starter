'use client';

import React, { type ReactElement } from 'react';
import '@/app/globals.scss';
import useIsomorphicLayoutEffect from '@/lib/styles/animations/use-isomorphic-layout-effect';
import { revealHomeTitle } from '@/lib/styles/animations/animations';

const HomeAnimations = (
    { children }:
        Readonly<{ children: React.ReactNode }>):
    ReactElement => {
        
    useIsomorphicLayoutEffect(() => {
        revealHomeTitle();
    }, []);

    return (
        <>
            {children}
        </>
    );
};

export default HomeAnimations;

