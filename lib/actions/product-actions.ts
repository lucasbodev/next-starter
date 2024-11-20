"use server";

import { prisma } from '@/db';
import { parseWithZod } from "@conform-to/zod";
import { addProductSchema } from "@/app/lib/zodSchemas";
import { redirect } from "@/i18n/routing";
import { getLocale, getTranslations } from 'next-intl/server';

export const createProduct = async (prevState: unknown, data: FormData) => {
    const t = await getTranslations("AddProductForm");
    const submission = parseWithZod(data, {
        schema: addProductSchema(t),
    });
    
    if (submission.status === 'error') {
        return submission.reply();
    }

    const { name, description, price } = submission.payload;

    const product = await prisma.product.create({
        data: {
            name: name as string,
            description: description as string,
            price: Number(price),
            image: 'tralala'
        }
    });

    console.log(product);

    const locale = await getLocale();

    return redirect({ href: '/products/add-product/success', locale });
};