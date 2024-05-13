import { ReplaceStringPart } from "@/types/utils";

export namespace navigation {
  export const routes = {
    home: "/",
    login: "/login",
    register: "/register",
  } as const;

  export const external = {
    googleMaps: "https://maps.google.com/?q={location}",
  } as const;

  export const dynamic = {
    googleMaps: <Location extends string>(
      location: Location
    ): ReplaceStringPart<typeof navigation.external.googleMaps, Location> => {
      return navigation.external.googleMaps.replace(
        "{location}",
        location
      ) as ReplaceStringPart<typeof navigation.external.googleMaps, Location>;
    },
  } as const;

  export const redirects = {
    existingSessionInAuth: navigation.routes.home,
    loginSucess: navigation.routes.home,
    registerSuccess: navigation.routes.home,
  } as const;
}
