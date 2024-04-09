import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { type NextPage } from 'next';
import React from 'react';
import { getDictionary } from '../../dictionaries';
import ViewPlayers from '@/lib/components/players/view-players.component';

const Players: NextPage = withPageAuthRequired(async (context) => {

    const dictionary = await getDictionary(context.params?.lang as string);

    return (<ViewPlayers {...dictionary} />);
}, { returnTo: '/players' });

export default Players;
