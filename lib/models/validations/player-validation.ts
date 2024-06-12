import { type Prisma } from '@prisma/client';
import { z } from 'zod';
import { type ActionResult } from '@/lib/actions/action-result';
import { Validation } from '@/lib/models/validations/validation';

export class PlayerValidation implements Validation<Prisma.PlayerCreateInput> {

    PlayerCreateInputValidation = z.object({
        email: z.string().email(),
        name: z.string(),
        age: z.number().int().positive()
    }) satisfies z.Schema<Prisma.PlayerCreateInput>;

    validate(data: Prisma.PlayerCreateInput): ActionResult<void> {
        try {
            this.PlayerCreateInputValidation.parse(data);
            return { message: 'Player validated.', error: false };
        } catch (error) {
            if (error instanceof z.ZodError) {
                return { message: Validation.getZodMessage(error), error: true };
            }
            return { message: 'Player not validated.', error: true };
        }
    }
}


