'use server';

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { locales } from "@/middleware";

export const setPreferredLanguage = async (formData: FormData): Promise<void> => {
    const locale = formData.get('lang') as string;
    const cookieStore = await cookies();
    cookieStore.set('NEXT_LOCALE', locale);
    redirect(await getRedirectUrl(locale));
};

const getRedirectUrl = async (locale: string): Promise<string> => {
    const headersList = await headers();
    const refererUrl = headersList.get('referer');
    let redirectUrl = `/${locale}`;

    if (refererUrl !== null) {
        const previousLocale = getLocaleInReferer(refererUrl) ?? '';
        if (previousLocale !== '') {
            redirectUrl = refererUrl.replace(`/${previousLocale}`, `/${locale}`);
        }
    }

    return redirectUrl;
};

const getLocaleInReferer = (refererUrl: string): string | undefined => {
    return locales.find((locale) => refererUrl.includes(locale));
};