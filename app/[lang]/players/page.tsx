import React, { type ReactElement } from 'react';
import { getPlayers } from '@/lib/actions/player-actions';
import styles from '@/app/[lang]/players/players.module.scss';
import { Image, Card, CardBody } from '@nextui-org/react';
import { type Player } from '@prisma/client';

const Players = async (): Promise<ReactElement> => {

    const { error, message, data } = await getPlayers();

    if (error) {
        throw new Error(message);
    }

    return (
        <div className={styles.list}>
            {
                data?.map((player: Player) => (
                    <Card className="w-4/6 md:w-1/2" key={player.id}>
                        <CardBody className="flex">
                            <div className="flex justify-between
                                items-center">
                                <Image
                                    className="border-1px"
                                    alt="nextui logo"
                                    height={40}
                                    radius="sm"
                                    src={player.pictureUrl ?? ''}
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
    );
};

export default Players;
