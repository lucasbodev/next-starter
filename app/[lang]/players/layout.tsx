import { type LangParams } from '@/lib/models/dictionaries/lang-params';
import players from '@/app/[lang]/players/players.module.scss';
import React, { type ReactElement } from 'react';
import { getDictionary } from '../../../dictionaries';
import AddPlayer from '@/lib/components/players/add-player.component';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

const PlayersLayout = async (
    { params: { lang }, children }:
        Readonly<{ params: LangParams; children: React.ReactNode }>):
    Promise<ReactElement> => {

    const user = await getSession();

    const dictionary = await getDictionary(lang);

    if (user == null) {
        redirect(`/api/auth/login`);
    }

    return (
        <div className={players.double__panel}>
            <section>
                <AddPlayer {...dictionary} />
            </section>
            <div className={players.right__panel}>
                {dictionary.players.list.title}
                {children}
            </div>
        </div>
    );
};

export default PlayersLayout;
