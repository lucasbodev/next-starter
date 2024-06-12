"use server";

import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';
import { locales, DEFAULT_LOCALE } from '@/middleware';

export const getBrowserLocale = (request: NextRequest): string | undefined => {
    const acceptLanguage = request.headers.get('Accept-Language');
    const preferredLocale = acceptLanguage?.split(',').map((locale) => locale.split(';')[0]);
    const locale = preferredLocale?.find((locale) => locales.includes(locale));
    return locale;
};

export const getCookieLocale = (): string | undefined => {
    const cookieLocale = cookies().get('NEXT_LOCALE');
    console.log('cookieLocale', cookieLocale?.value);
    if((cookieLocale != null || cookieLocale !== undefined) && locales.includes(cookieLocale?.value)) {
        return cookieLocale.value;
    }
};

export const getLocale = (request: NextRequest): string => {
    const cookieLocale = getCookieLocale();
    const browserLocale = getBrowserLocale(request);
    const locale = cookieLocale ?? browserLocale ?? DEFAULT_LOCALE;
    return locale;
};