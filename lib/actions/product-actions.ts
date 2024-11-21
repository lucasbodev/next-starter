"use server";

import { prisma } from '@/db';
import { parseWithZod } from "@conform-to/zod";
import { addProductSchema } from "@/app/lib/zodSchemas";
import { redirect } from "@/i18n/routing";
import { getLocale, getTranslations } from 'next-intl/server';
import { put } from '@vercel/blob';
import { Prisma } from '@prisma/client';

export const createProduct = async (prevState: unknown, data: FormData) => {
    const t = await getTranslations("AddProductForm");
    const submission = parseWithZod(data, {
        schema: addProductSchema(t),
    });

    if (submission.status === 'error') {
        return submission.reply();
    }

    const { reference, name, description, price, image } = submission.payload;

    let imageUrl = '';

    try {
        const { url } = await put((image as File).name, image as File, {
            access: 'public',
        });
        imageUrl = url;
    } catch (e) {
        return submission.reply({
            fieldErrors: {
                image: [t('imageUploadFailed')],
            }
        });
    }

    try {
        const product = await prisma.product.create({
            data: {
                reference: reference as string,
                name: name as string,
                description: description as string,
                price: Number(price),
                image: imageUrl
            }
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return submission.reply({
                    fieldErrors: {
                        reference: [t('unicityConstraintViolation')],
                    }
                });
            } else {
                return submission.reply({
                    fieldErrors: {
                        errors: [t('productCreationFailed')],
                    }
                });
            }
        }
    }

    const locale = await getLocale();

    return redirect({ href: '/products/add-product/success', locale });
};