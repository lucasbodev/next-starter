"use server";

import { redirect } from "@/i18n/routing";
import { getLocale, getTranslations } from 'next-intl/server';
import { ProductValidation } from '@/models/validations/product-validation';
import { PrismaProductRepository } from '@/models/repositories/prisma-product-repository';

export const getProducts = async () => {
    const t = await getTranslations("Products");

    return new PrismaProductRepository(t).all();
};

export const createProduct = async (prevState: unknown, data: FormData) => {
    const t = await getTranslations("ProductForm");

    let submission = new ProductValidation(t).validate(data);

    if (submission.status === 'error') {
        return submission.reply();
    }

    let submissionResult = await new PrismaProductRepository(t).create(submission);

    if (submissionResult.status === 'error') {
        return submissionResult;
    }

    const locale = await getLocale();

    return redirect({ href: '/add-product/success', locale });
};

export const updateProduct = async (prevState: unknown, data: FormData, id: number) => {
    const t = await getTranslations("ProductForm");

    let submission = new ProductValidation(t).validate(data);

    if (submission.status === 'error') {
        return submission.reply();
    }

    let submissionResult = await new PrismaProductRepository(t).update(submission, id);

    if (submissionResult.status === 'error') {
        return submissionResult;
    }

    const locale = await getLocale();

    return redirect({ href: '/products', locale });
}