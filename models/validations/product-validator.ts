import { z } from 'zod';
import { Validator } from '@/models/validations/validator';
import { Submission } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { ProductValidation } from '@/models/validations/product-validation';

export const productSchema = (t: (key: string) => string) => z.object({
    reference: z.string({ message: t('referenceRequired') }),
    name: z.string({ message: t('nameRequired') }).max(32, t('nameMaxLength')),
    description: z.string({ message: t('descriptionRequired') }).max(255, t('descriptionMaxLength')),
    price: z.number({ message: t('priceRequired') }).min(0, t('priceMinValue')),
    image: z.instanceof(File, { message: t('imageRequired') }),
});

export class ProductValidator extends Validator<ProductValidation> {
    
    constructor(t: (key: string) => string) {
        super(t);
    }

    validate(data: FormData): Submission<ProductValidation> {
        return parseWithZod(data, {
            schema: productSchema(this.t),
        });
    }
}


