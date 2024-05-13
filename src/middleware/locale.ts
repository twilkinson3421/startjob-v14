import acceptLanguage from "accept-language";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { localeConfig } from "@locale/config";

export function localeMiddleware(request: NextRequest, _event: NextFetchEvent) {
  acceptLanguage.languages([...localeConfig.supported.locales]);
  const hostLocale = request.nextUrl.pathname.split("/")[1];

  const destinationLocale: string = (() => {
    if (request.cookies.has(localeConfig.server.cookieName))
      return acceptLanguage.get(
        request.cookies.get(localeConfig.server.cookieName)!.value
      )!;
    return (
      acceptLanguage.get(request.headers.get("Accept-Language")) ??
      localeConfig.defaults.locale
    );
  })();

  for (const i_ignoreUrl of localeConfig.server.ignoreMiddleware)
    if (request.nextUrl.pathname.startsWith(i_ignoreUrl))
      return NextResponse.next();

  if (!hostLocale)
    return NextResponse.redirect(new URL(`/${destinationLocale}`, request.url));

  if (
    localeConfig.supported.locales.some((iLocale) => iLocale === hostLocale)
  ) {
    const response = NextResponse.next();
    response.cookies.set(localeConfig.server.cookieName, hostLocale);
    return response;
  }

  if (localeConfig.other.localePattern.test(hostLocale)) {
    const bestDestination = destinationLocale; // TODO Add best match
    const keep = request.nextUrl.pathname.split("/").slice(2);
    const location = !!keep.length ? `/${keep.join("/")}` : "";
    const newPath = `/${bestDestination}${location}`;
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  return NextResponse.redirect(
    new URL(`/${destinationLocale}${request.nextUrl.pathname}`, request.url)
  );
}
