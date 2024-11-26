import React from 'react';
import styles from '@/components/nav/nav.module.css';
import Account from '@/components/account/account.component';
import NavLink from './nav-link.component';
import ResponsiveNavLayout from './responsive-nav-layout.component';
import { getTranslations } from 'next-intl/server';

const Nav = async () => {

    const t = await getTranslations('Nav');

    return (
        <ResponsiveNavLayout>
            <NavLink href="/" name={t('homeLink')} />
            <NavLink href="/count" name={t('countLink')} />
            <NavLink href="/products" name={t('productsLink')} />
            <div className={styles.account}>
                <div className={styles.link}>
                    <Account />
                </div>
            </div>
        </ResponsiveNavLayout>
    );
};

export default Nav;
