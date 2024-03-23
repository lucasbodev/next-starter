'use server';

import { prisma } from "@/app/db";
import { player } from "@prisma/client";
import {revalidatePath} from "next/cache";

const playerId = 1;

export async function getPlayer() {
    const player = await prisma.player.findUnique({
        where: { id: playerId },
    });

    if(!player) {
        throw new Error('player not found');
    }

    return player;
}

export async function addPlayer(player: any) {
    await prisma.player.create({
        data: {
            email: player.email,
            name: player.name,
            age: player.age,
        },
    });
    revalidatePath('/players');
}
