export namespace Navigation {
  export const Routes = {
    home: "/",
    login: "/login",
    register: "/register",
  } as const;

  export const External = {
    googleMaps: "https://maps.google.com/?q={location}",
  } as const;

  export const Dynamic = {
    googleMaps: <Location extends string>(
      location: Location
    ): GTypes.Utils.ReplaceStringPart<
      typeof Navigation.External.googleMaps,
      Location
    > => {
      return Navigation.External.googleMaps.replace(
        "{location}",
        location
      ) as GTypes.Utils.ReplaceStringPart<
        typeof Navigation.External.googleMaps,
        Location
      >;
    },
  } as const;

  export const Redirects = {
    existingSessionInAuth: Navigation.Routes.home,
    loginSucess: Navigation.Routes.home,
    registerSuccess: Navigation.Routes.home,
  } as const;
}
