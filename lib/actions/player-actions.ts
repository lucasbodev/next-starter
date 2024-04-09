'use server';

import {prisma} from '@/app/db';
import { getSession } from '@auth0/nextjs-auth0';

import {revalidatePath} from 'next/cache';

interface Player {
    email: any
    name: any
    age: any
}

export const getPlayers = async (): Promise<any> => {
    const players = await prisma.player.findMany();

    if (players === undefined || players === null) {
        throw new Error('players not found');
    }

    return players;
};

export const addPlayer = async (player: any): Promise<void> => {
    const session = await getSession();
    if (session === null || session === undefined) {
        throw new Error('Session not found');
    }
    await prisma.player.create({
        data: {
            email: player.email,
            name: player.name,
            age: player.age
        } satisfies Player
    });
    revalidatePath('/players');
};
