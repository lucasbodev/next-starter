import { error } from 'console';
import { z } from 'zod';

export const addProductSchema = (t: (key: string) => string) => z.object({
    reference: z.string({ message: t('referenceRequired') }),
    name: z.string({ message: t('nameRequired') }).max(32, t('nameMaxLength')),
    description: z.string({ message: t('descriptionRequired') }).max(255, t('descriptionMaxLength')),
    price: z.number({ message: t('priceRequired') }).min(0, t('priceMinValue')),
    image: z.instanceof(File, { message: t('imageRequired') }),
    errors: z.string().optional(),
});