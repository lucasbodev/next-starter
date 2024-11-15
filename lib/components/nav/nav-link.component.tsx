'use client';

import React from 'react';
import { Link, usePathname } from '@/i18n/routing';
import styles from '@/lib/components/nav/nav.module.css';

interface NavLinkProps {
    href: any;
    name: string;
}

const NavLink = (props: NavLinkProps) => {

    const pathname = usePathname();

    const active = pathname === (props.href as string) ? styles.active : '';

    return (
        <Link className={`${styles.link} ${active}`} href={props.href}>{props.name}</Link>
    );
};

export default NavLink;
