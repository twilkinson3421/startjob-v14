import accept_language from "accept-language";
import { locale_config } from "./locale/config";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";

export const middleware = (request: NextRequest, _event: NextFetchEvent) => {
  accept_language.languages([...locale_config.supported.locales]);
  const host_locale = request.nextUrl.pathname.split("/")[1];

  const destination_locale: string = (() => {
    if (request.cookies.has(locale_config.server.cookie_name))
      return accept_language.get(
        request.cookies.get(locale_config.server.cookie_name)!.value
      )!;
    return (
      accept_language.get(request.headers.get("Accept-Language")) ??
      locale_config.defaults.locale
    );
  })();

  for (const i_ignore_url of locale_config.server.ignore_middleware)
    if (request.nextUrl.pathname.startsWith(i_ignore_url))
      return NextResponse.next();

  if (!host_locale)
    return NextResponse.redirect(
      new URL(`/${destination_locale}`, request.url)
    );

  if (
    locale_config.supported.locales.some((i_locale) => i_locale === host_locale)
  ) {
    const response = NextResponse.next();
    response.cookies.set(locale_config.server.cookie_name, host_locale);
    return response;
  }

  if (locale_config.other.locale_pattern.test(host_locale)) {
    const best_destination = destination_locale; // TODO Add best match
    const keep = request.nextUrl.pathname.split("/").slice(2);
    const location = !!keep.length ? `/${keep.join("/")}` : "";
    const new_path = `/${best_destination}${location}`;
    return NextResponse.redirect(new URL(new_path, request.url));
  }

  return NextResponse.redirect(
    new URL(`/${destination_locale}${request.nextUrl.pathname}`, request.url)
  );
};

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
