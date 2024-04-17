import styles from '@/lib/components/nav/nav.module.scss';
import Account from '@/lib/components/account/account.component';
import React, { type ReactElement } from 'react';
import { getDictionary, type LangParams } from '@/dictionaries';
import { getSession } from '@auth0/nextjs-auth0';
import NavLink from './nav-link.component';
import ResponsiveNavLayout from './responsive-nav-layout.component';

const Nav = async ({ params: { lang } }: Readonly<{ params: LangParams }>): Promise<ReactElement> => {

    const user = await getSession();
    const dictionary = await getDictionary(lang);

    return (
        <ResponsiveNavLayout>
            <NavLink href="/" name={dictionary.links.homeLink} />
            <NavLink href="/count" name={dictionary.links.countLink} />
            {(user != null) && <NavLink href="/players" name={dictionary.links.playerLink} />}
            <div className={styles.account}>
                <div className={styles.link}>
                    <Account params={{ lang }} />
                </div>
            </div>
        </ResponsiveNavLayout>
    );
};

export default Nav;
