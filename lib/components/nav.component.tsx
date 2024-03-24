import Link from 'next/link';
import styles from '@/lib/styles/components/nav.module.scss';
import Account from '@/lib/components/account';
import React, { type ReactElement } from 'react';

const Nav = async (): Promise<ReactElement> => {
  return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <Link href="/">
                        <strong>Home</strong>
                    </Link>
                </li>
                <li>
                    <Link href="/players">
                        <strong>Joueurs</strong>
                    </Link>
                </li>
                <li>
                    <Link href="/speedtest">
                        <strong>SpeedTest</strong>
                    </Link>
                </li>
                <li>
                    <Account/>
                </li>
            </ul>
        </nav>
  );
};

export default Nav;
