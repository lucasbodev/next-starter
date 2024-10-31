'use server';

import { cookies } from "next/headers";
import { type NextRequest } from "next/server";
import { DEFAULT_LOCALE, locales } from "@/middleware";

export const getBrowserLocale = async (request: NextRequest): Promise<string> => {
    const acceptLanguage = request.headers.get('Accept-Language');
    const preferredLocale = acceptLanguage?.split(',').map((locale) => locale.split(';')[0]);
    return preferredLocale?.find((locale) => locales.includes(locale)) ?? "";
};

export const getCookieLocale = async (): Promise<string> => {
    const cookieLocale = (await cookies()).get('NEXT_LOCALE');

    if(((cookieLocale?.value) != null) && locales.includes(cookieLocale?.value)) {
        return cookieLocale.value;
    }

    return "";
};

export const getLocale = async (request: NextRequest): Promise<string> => {
    const cookieLocale =  getCookieLocale();
    const browserLocale = getBrowserLocale(request);

    return await (cookieLocale ?? browserLocale ?? DEFAULT_LOCALE);
};