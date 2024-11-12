'use client';

import React, { type ReactElement } from "react";
import { type Player } from "@prisma/client";
import styles from "@/app/[lang]/players/players.module.css";
import { Card, CardBody, Image } from "@nextui-org/react";

interface PlayerListProps {
  players: Player[] | undefined;
}

const PlayerList = (data: PlayerListProps): ReactElement => {

  const players = data.players ?? [];

  return (<div className={styles.list}>
    {
      players.map((player: Player) => (
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
  </div>);
};

export default PlayerList;