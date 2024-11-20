import { z } from 'zod';
import { type Prisma } from '@prisma/client';


export const addProductSchema = (t: (key: string) => string) => z.object({
    name: z.string({ message: t('nameRequired') }).max(32, t('nameMaxLength')),
    description: z.string({ message: t('descriptionRequired') }).max(255, t('descriptionMaxLength')),
    price: z.number({ message: t('priceRequired') }).min(0, t('priceMinValue')),
    image: z.instanceof(File, { message: t('imageRequired') })
});