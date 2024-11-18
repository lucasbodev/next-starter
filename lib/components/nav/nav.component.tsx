import React from 'react';
import styles from '@/lib/components/nav/nav.module.css';
import Account from '@/lib/components/account/account.component';
import { getSession } from '@auth0/nextjs-auth0';
import NavLink from './nav-link.component';
import ResponsiveNavLayout from './responsive-nav-layout.component';
import { getTranslations } from 'next-intl/server';

const Nav = async () => {

    const t = await getTranslations('Nav');

    const user = await getSession();

    return (
        <ResponsiveNavLayout>
            <NavLink href="/" name={t('homeLink')} />
            <NavLink href="/count" name={t('countLink')} />
            <NavLink href="/products" name={t('productsLink')} />
            {(user != null) && <NavLink href="/players" name={t('playerLink')} />}
            <NavLink href="/data-sheet/view-datasheets" name={t('datasheetsLink')} />
            <div className={styles.account}>
                <div className={styles.link}>
                    <Account />
                </div>
            </div>
        </ResponsiveNavLayout>
    );
};

export default Nav;
