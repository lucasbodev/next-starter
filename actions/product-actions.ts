"use server";

import { redirect } from "@/i18n/routing";
import { getLocale, getTranslations } from 'next-intl/server';
import { ProductValidator } from '@/models/validations/product-validator';
import { PrismaProductRepository } from '@/models/repositories/prisma-product-repository';
import { ErrorResponse } from "@/models/errors/error-response";
import { ProductParser } from "@/models/DTOs/product-parser";
import { VercelFileStorage } from "@/models/storage/vercel-file-storage";

export const getProducts = async () => {
    const t = await getTranslations("Products");

    return new PrismaProductRepository(t).all();
};

export const getProduct = async (id: number) => {
    const t = await getTranslations("ProductForm");

    return new PrismaProductRepository(t).find(id);
};

export const createProduct = async (prevState: unknown, data: FormData) => {
    const t = await getTranslations("ProductForm");

    let submission = new ProductValidator(t).validate(data);

    if (submission.status === 'error') {
        return submission.reply();
    }

    try {
        let product = new ProductParser().parse(data);
        const imageUrl = await new VercelFileStorage().store(data.get('image') as File);
        product.image = imageUrl;
        await new PrismaProductRepository(t).create(product);
    } catch (e) {
        const error = e as ErrorResponse;
        return submission.reply({
            fieldErrors: {
                [error.field!]: [error.message]
            }
        });
    }

    const locale = await getLocale();

    return redirect({ href: '/add-product/success', locale });
};

// export const updateProduct = async (prevState: unknown, data: FormData, id: number) => {
//     const t = await getTranslations("ProductForm");

//     let submission = new ProductValidation(t).validate(data);

//     if (submission.status === 'error') {
//         return submission.reply();
//     }

//     let submissionResult = await new PrismaProductRepository(t).update(submission, id);

//     if (submissionResult.status === 'error') {
//         return submissionResult;
//     }

//     const locale = await getLocale();

//     return redirect({ href: '/products', locale });
// }

