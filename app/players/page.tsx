import players from '@/lib/styles/players/players.module.scss';
import ViewPlayers from '@/lib/components/players/view-players';
import AddPlayer from '@/lib/components/players/add-player';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { type NextPage } from 'next';
import React from 'react';

const Players: NextPage = withPageAuthRequired(async () => {
  return (
        <div className={players.flex_container}>
            <section className={`${players.flex_item_40}`}>
                <AddPlayer/>
            </section>
            <section className={players.flex_item_60}>
                <ViewPlayers/>
            </section>
        </div>
  );
}, { returnTo: '/players' });

export default Players;
