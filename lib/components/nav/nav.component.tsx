import styles from '@/lib/components/nav/nav.module.css';
import Account from '@/lib/components/account/account.component';
import React, { type ReactElement } from 'react';
import { getDictionary } from '@/dictionaries';
import { type LangParams } from '@/lib/models/dictionaries/lang-params';
import { getSession } from '@auth0/nextjs-auth0';
import NavLink from './nav-link.component';
import ResponsiveNavLayout from './responsive-nav-layout.component';

interface NavParams {
  params: LangParams | Promise<LangParams>;
}

const Nav = async ({ params}: Readonly<NavParams>): Promise<ReactElement> => {

    const awaitedParams = await params;
    const { lang } = awaitedParams;


    const user = await getSession();
    const dictionary = await getDictionary(lang);

    return (
        <ResponsiveNavLayout>
            <NavLink href="/" name={dictionary.links.homeLink} />
            <NavLink href="/count" name={dictionary.links.countLink} />
            {(user != null) && <NavLink href="/players" name={dictionary.links.playerLink} />}
            <NavLink href="/data-sheet/view-datasheets" name={dictionary.links.datasheetsLink} />
            <div className={styles.account}>
                <div className={styles.link}>
                    <Account params={{ lang }} />
                </div>
            </div>
        </ResponsiveNavLayout>
    );
};

export default Nav;
