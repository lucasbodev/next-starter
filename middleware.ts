import { type NextRequest, NextResponse } from "next/server";

export const locales = ['fr', 'en', 'nl', 'de'];

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get('NEXT_LOCALE');
  if ((cookieLocale != null || cookieLocale !== undefined) && locales.includes(cookieLocale.value)) {
    return cookieLocale.value;
  } else {
    const acceptLanguage = request.headers.get('Accept-Language');
    const preferredLocale = acceptLanguage?.split(',').map((locale) => locale.split(';')[0]);
    const locale = preferredLocale?.find((locale) => locales.includes(locale));
    return locale ?? locales[0];
  }
}

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, fr, nl, en, de)
    `/((?!_next|api|fr|nl|en|de|favicon.ico|next.svg).*)`
    // Optional: only run on root (/) URL
    // '/'
  ],
};