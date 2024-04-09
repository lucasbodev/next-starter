'use client';

import React, { type ReactElement } from 'react';
import '@/app/globals.scss';
import useIsomorphicLayoutEffect from '@/lib/animations/use-isomorphic-layout-effect';
import { revealHomeTitle } from '@/lib/animations/animations';

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

