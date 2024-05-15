import { At, Equals, User, Users } from "@phosphor-icons/react/dist/ssr";

import type { Icon, IconProps } from "@phosphor-icons/react";

export namespace Icons {
  export namespace Types {
    export type ComponentProps = IconProps;
    export type Component = Icon;
  }

  export namespace Internal {
    export type Declaration = Record<
      string,
      Record<string, Icons.Types.Component>
    >;

    export const initIcons = <IconsDeclaration extends Declaration>(
      icons: IconsDeclaration
    ) => icons;
  }

  export const Sizes = {
    default: 16,
    smallx: 12,
    small: 14,
    medium: 22,
    large: 28,
    largex: 32,
    large2x: 48,
    large3x: 64,
    inline: undefined,
  } as const satisfies Record<string, IconProps["size"]>;

  export const { Interface, Application } = Icons.Internal.initIcons({
    Interface: {
      Menu: Equals,
    },

    Application: {
      User: User,
      Team: Users,
      Email: At,
    },
  });
}
