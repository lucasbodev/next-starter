'use server';

import { type Player, type Prisma } from '@prisma/client';
import { isAuthentified } from '@/lib/services/auth-service';
import { type ActionResult } from '@/lib/actions/action-result';
import { PlayerRepository } from '@/lib/models/repositories/player-repository';
import { FileRepository } from '@/lib/models/repositories/file-repository';
import { PlayerValidation } from '@/lib/models/validations/player-validation';
import { getPlayersDictionary } from '@/dictionaries';
import { DEFAULT_LOCALE } from '@/middleware';
import { cookies } from 'next/headers';
import { type PlayerDictionary } from '@/lib/models/dictionaries/player/player-dictionary';

export const getPlayers = async (): Promise<ActionResult<Player[]>> => {
    const locale = cookies().get('NEXT_LOCALE')?.value ?? DEFAULT_LOCALE;
    const dictionary = await getPlayersDictionary(locale);
    const playerRepository = new PlayerRepository(dictionary);
    const authResult = await isAuthentified();
    if (authResult.error) {
        return { message: authResult.message, error: true };
    }
    return await playerRepository.all();
};

export const addPlayer = async (data: FormData): Promise<ActionResult<number>> => {
    const authResult = await isAuthentified();
    if (authResult.error) {
        return { message: authResult.message, error: true };
    }
    const dictionary = await getDictionary();
    const playerRepository = new PlayerRepository(dictionary);
    const playerValidation = new PlayerValidation();
    const player = parsePlayer(data);
    const { message, error } = playerValidation.validate(player);
    if (error) {
        return { message, error };
    }
    const uploadResult = await addImage(data);
    player.pictureUrl = uploadResult.data;
    return await playerRepository.create(player);
};

const addImage = async (data: FormData): Promise<ActionResult<string>> => {
    const fileRepository = new FileRepository();
    const file = data.get('image') as File;
    const picture = { ...file, name: `images/${file.name}` };
    const uploadResult = await fileRepository.create(picture);
    return uploadResult;
};

const parsePlayer = (data: FormData): Prisma.PlayerCreateInput => {
    return {
        email: data.get('email') as string,
        name: data.get('name') as string,
        age: Number(data.get('age') as string),
    };
};

const getDictionary = async (): Promise<PlayerDictionary> => {
    const locale = cookies().get('NEXT_LOCALE')?.value ?? DEFAULT_LOCALE;
    return await getPlayersDictionary(locale);
};
