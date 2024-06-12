import { type NextRequest, NextResponse } from "next/server";
import { getLocale } from "@/lib/services/language-service";

export const locales = ['fr', 'en', 'nl', 'de'];
export const DEFAULT_LOCALE = locales[0];

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
  const { pathname } = request.nextUrl;
  const locale = getLocale(request);
  request.cookies.set('NEXT_LOCALE', locale);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);

};

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, fr, nl, en, de)
    `/((?!_next|api|fr|nl|en|de|favicon.ico|next.svg).*)`
    // Optional: only run on root (/) URL
    // '/'
  ],
};