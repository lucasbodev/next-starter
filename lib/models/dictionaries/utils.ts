import 'server-only';

import { locales } from '@/middleware';

export const getLocaleInReferer = (refererUrl: string): string | undefined => {
    let locale = null;
    locale = locales.find((locale) => refererUrl.includes(locale));
    return locale;
};