'use client';

import styles from '@/lib/components/nav/nav.module.css';
import Link from 'next/link';
import React, { useEffect, useState, type ReactElement } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const ResponsiveNavLayout = ({ children }: Readonly<{ children: React.ReactNode }>): ReactElement => {

    const [open, setOpen] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        if (open) {
            setOpen(false);
        }
    }, [pathname]);

    const toggle = (): void => {
        setOpen(!open);
    };

    return (
        <nav className={styles.nav}>
            <Link className={`${styles.link} ${styles.logo}`} href="/">
                <Image
                    src={`/next.svg`}
                    alt="Next.js Logo"
                    width={64}
                    height={64}
                />
            </Link>
            <div className={styles.desktop}>
                {children}
            </div>
            <div className={styles.mobile}>
                <button className={[styles.burger, open ? styles.open : ''].join(' ')} onClick={toggle}>
                    <span className={styles.line1}></span>
                    <span className={styles.line2}></span>
                </button>
                <div className={[styles.dropdown, open ? styles.open : ''].join(' ')}>
                    {children}
                </div>
            </div>
        </nav>

    );
};

export default ResponsiveNavLayout;
