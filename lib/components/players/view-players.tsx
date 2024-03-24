import {getPlayers} from '@/lib/actions/player-actions';
import {Image, Card, CardBody} from '@nextui-org/react';

import React, {type ReactElement} from 'react';

const ViewPlayers = async (): Promise<ReactElement> => {
    try {
        const players = await getPlayers();
        return (
            <div className="flex flex-col">
                <h1>View Players</h1>
                <div className="flex flex-col gap-3">
                    {players.map((player: any) => (
                        <Card className="w-4/6 md:w-1/2" key={player.id}>
                            <CardBody className="flex">
                                <div className="flex justify-between
                                items-center">
                                    <Image
                                        className="border-1px"
                                        alt="nextui logo"
                                        height={40}
                                        radius="sm"
                                        src={player.pictureUrl}
                                        width={40}
                                    />
                                    <p className="text-default-500">
                                        {player.age} y.
                                    </p></div>
                                <div className="flex flex-col">
                                    <p className="text-md">{player.name}</p>
                                    <p className="text-small text-default-500">{player.email}</p>
                                </div>

                            </CardBody>
                        </Card>
                    ))
                    }
                </div>
            </div>
        );
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get players');
    }
};

export default ViewPlayers;
