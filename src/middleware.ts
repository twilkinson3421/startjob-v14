import { NextFetchEvent, NextRequest } from "next/server";

import { localeMiddleware } from "./middleware/locale";

export const middleware = (request: NextRequest, _event: NextFetchEvent) => {
  return localeMiddleware(request, _event);
};

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
