'use server';

import { cookies } from "next/headers";
import { type NextRequest } from "next/server";
import { DEFAULT_LOCALE, locales } from "@/middleware";

export const getBrowserLocale = async (request: NextRequest): Promise<string | null> => {
    const acceptLanguage = request.headers.get('Accept-Language');
    console.log('acceptLanguage', acceptLanguage);

    if (!acceptLanguage) return null;

    const preferredLocales = acceptLanguage
        .split(',')
        .map(locale => locale.split(';')[0].trim());

    return preferredLocales.find(locale => locales.includes(locale)) ?? null;
};


export const getCookieLocale = async (): Promise<string | null> => {
    const cookieLocale = (await cookies()).get('NEXT_LOCALE');

    if(((cookieLocale?.value) != null) && locales.includes(cookieLocale?.value)) {
        return cookieLocale.value;
    }

    return null;
};

export const getLocale = async (request: NextRequest): Promise<string> => {
    const cookieLocale =  await getCookieLocale();
    const browserLocale = await getBrowserLocale(request);

    return  cookieLocale ?? browserLocale ?? DEFAULT_LOCALE;
};