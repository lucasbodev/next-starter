// import { type NextRequest, NextResponse } from "next/server";
// import { getLocale } from "@/lib/services/language-service";

// export const locales = ['fr', 'en', 'nl', 'de'];
// export const DEFAULT_LOCALE = locales[0];

// export const middleware = async (request: NextRequest): Promise<NextResponse> => {
//   const { pathname } = request.nextUrl;
//   const locale = await getLocale(request);
//   request.cookies.set('NEXT_LOCALE', locale);
//   request.nextUrl.pathname = `/${locale}${pathname}`;
//   return NextResponse.redirect(request.nextUrl);
// };

// export const config = {
//   matcher: [
//     `/((?!_next|api|fr|nl|en|de|favicon.ico|next.svg).*)`
//   ],
// };

import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|nl|de|en)/:path*']
};