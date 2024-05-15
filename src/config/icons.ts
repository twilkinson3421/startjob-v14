import { IconAt, IconMenu, IconUser, IconUsers } from "@tabler/icons-react";

import type { Icon, IconProps } from "@tabler/icons-react";

export namespace Icons {
  export namespace Types {
    export type ComponentProps = IconProps;
    export type Component = React.ForwardRefExoticComponent<
      Omit<IconProps, "ref"> & React.RefAttributes<Icon>
    >;
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
      Menu: IconMenu,
    },

    Application: {
      User: IconUser,
      Team: IconUsers,
      Email: IconAt,
    },
  });
}
