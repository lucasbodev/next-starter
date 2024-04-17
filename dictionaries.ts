import 'server-only';

import { type Dictionary } from '@/lib/models/dictionaries/dictionary';
import { type PlayerDictionary } from '@/lib/models/dictionaries/player/player-dictionary';

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  return await import(`@/dictionaries/${locale}.json`).then((module) => module.default);
};

export const getPlayersDictionary = async (locale: string): Promise<PlayerDictionary> => {
  console.log("locale: ", locale);
  return await import(`@/dictionaries/players/${locale}.json`).then((module) => module.default);
};