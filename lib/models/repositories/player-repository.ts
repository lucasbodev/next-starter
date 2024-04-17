import { prisma } from '@/db';
import { type Player, Prisma } from '@prisma/client';
import { type ActionResult } from '@/lib/actions/action-result';
import { type Repository } from '@/lib/models/repositories/repository';
import { type PlayerDictionary } from '@/lib/models/dictionaries/player/player-dictionary';

export class PlayerRepository implements Repository<Prisma.PlayerCreateInput, Player, number> {

    dictionary: PlayerDictionary;

    constructor (dictionary: PlayerDictionary) {
        this.dictionary = dictionary;
    }
    
    async all(): Promise<ActionResult<Player[]>> {
        try {
            const players = await prisma.player.findMany();
            if (players === undefined || players === null) {
                return { message: this.dictionary.notFound, error: true };
            } else if (players.length === 0) {
                return { message: this.dictionary.empty, error: false, data: players };
            }
            return { message: 'Players found', error: false, data: players };
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                return { message: e.message, error: true };
            }
            return { message: this.dictionary.notFound, error: true };
        }
    }

    async create(data: Prisma.PlayerCreateInput): Promise<ActionResult<number>> {
        try {
            const { id } = await prisma.player.create({ data });
            return { message: this.dictionary.addSuccess, error: false, data: id };
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                return { message: e.message, error: true };
            }
            return { message: this.dictionary.error, error: true };
        }
    }
}