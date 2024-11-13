import React, { type ReactElement } from 'react';
import { getPlayers } from '@/lib/actions/player-actions';
import PlayerList from "@/lib/components/players/player-list.component";

const Players = async (): Promise<ReactElement> => {

    const { error, message, data } = await getPlayers();

    if (error) {
        throw new Error(message);
    }

    return (
      <PlayerList players={data} />
    );
};

export default Players;
