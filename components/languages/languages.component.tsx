'use client';

import React from 'react';
import { Link, routing, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';

const Languages = () => {

    const currentLocale = useLocale();

    const pathname = usePathname();

    return (
        <details className="dropdown">
            <summary className="btn btn-ghost m-1">{currentLocale.toUpperCase()}</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {routing.locales.map((locale) => (
                    <li key={locale}><Link locale={locale} href={pathname as any}>{locale.toUpperCase()}</Link></li>
                ))}
            </ul>
        </details>
    );
};

export default Languages;
