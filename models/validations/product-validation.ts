import { z } from 'zod';
import { Validation } from '@/models/validations/validation';
import { Submission } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { ProductDTO } from '../DTOs/product-DTO';

export const productSchema = (t: (key: string) => string) => z.object({
    reference: z.string({ message: t('referenceRequired') }),
    name: z.string({ message: t('nameRequired') }).max(32, t('nameMaxLength')),
    description: z.string({ message: t('descriptionRequired') }).max(255, t('descriptionMaxLength')),
    price: z.number({ message: t('priceRequired') }).min(0, t('priceMinValue')),
    image: z.instanceof(File, { message: t('imageRequired') }),
    errors: z.string().optional(),
});

export class ProductValidation extends Validation<ProductDTO> {
    
    constructor(t: (key: string) => string) {
        super(t);
    }

    validate(data: FormData): Submission<ProductDTO> {
        return parseWithZod(data, {
            schema: productSchema(this.t),
        });
    }
}


