'use server';

import {prisma} from '@/app/db';

import {revalidatePath} from 'next/cache';

export async function getPlayers(): Promise<any> {
    const players = await prisma.player.findMany();

    if (players === undefined || players === null) {
        throw new Error('players not found');
    }

    return players;
}

interface Player {
    email: any
    name: any
    age: any
}

export async function addPlayer(player: any): Promise<void> {
    await prisma.player.create({
        data: {
            email: player.email,
            name: player.name,
            age: player.age
        } satisfies Player
    });
    revalidatePath('/players');
}
