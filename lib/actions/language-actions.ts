'use server';

import { locales } from '@/middleware';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const setPreferredLanguage = async (formData: FormData): Promise<void> => {
    const locale = formData.get('lang') as string;
    const cookieStore = cookies();
    cookieStore.set('NEXT_LOCALE', locale);
    redirect(getRedirectUrl(locale));
};

const getRedirectUrl = (locale: string): string => {
    const headersList = headers();
    const refererUrl = headersList.get('referer');
    let redirectUrl = `/${locale}`;
    if (refererUrl !== null) {
        const previousLocale = getLocaleInReferer(refererUrl) ?? '';
        if (previousLocale !== '') {
            const refererPage = refererUrl.replace(`https://next-starter-five-murex.vercel.app/${previousLocale}`, '');
            redirectUrl = `/${locale}${refererPage}`;
        }
    }
    return redirectUrl;
};

const getLocaleInReferer = (refererUrl: string): string | undefined => {
    let locale = null;
    locale = locales.find((locale) => refererUrl.includes(locale));
    return locale;
};


