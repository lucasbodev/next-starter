"use server";

import { redirect } from "@/i18n/routing";
import { getLocale, getTranslations } from 'next-intl/server';
import { ProductValidation } from '@/lib/models/validations/product-validation';
import { PrismaProductRepository } from '@/lib/models/repositories/prisma-product-repository';

export const createProduct = async (prevState: unknown, data: FormData) => {
    const t = await getTranslations("AddProductForm");

    let submission = new ProductValidation(t).validate(data);

    if (submission.status === 'error') {
        return submission.reply();
    }

    let submissionResult = await new PrismaProductRepository(t).create(submission);

    if (submissionResult.status === 'error') {
        return submissionResult;
    }

    const locale = await getLocale();

    return redirect({ href: '/products/add-product/success', locale });
};