"use server";

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

    const locale = await getLocale();

    return redirect({ href: '/products/add-product/success', locale });
};