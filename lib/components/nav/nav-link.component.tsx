'use client';

import styles from '@/lib/components/nav/nav.module.css';
import React, { type ReactElement } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales } from '@/middleware';

interface NavLinkProps {
    href: string;
    name: string;
}

const NavLink = (props: NavLinkProps): ReactElement => {

    const pathname = usePathname();

    const isCurrentPathname = (pathname: string, href: string): boolean => {
        let isCurrent = false;
        if (href === '/') {
            locales.forEach((locale) => {
                if(pathname === `/${locale}`) {
                    isCurrent = true;
                }
            });
        } else {
            isCurrent = pathname.includes(href);
        }
        return isCurrent;
    };

    const active = (isCurrentPathname(pathname, props.href)) ? styles.active : '';

    return (
        <Link className={`${styles.link} ${active}`} href={props.href}>{props.name}</Link>
    );
};

export default NavLink;
