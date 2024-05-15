import { IconAt, IconMenu, IconUser, IconUsersGroup } from "@tabler/icons-react";

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
    default: 24,
    smallx: 16,
    small: 20,
    medium: 24,
    large: 28,
    largex: 32,
    largex2: 48,
    largex3: 64,
    inline: undefined,
  } as const satisfies Record<string, IconProps["size"]>;

  export const { Interface, Application } = Icons.Internal.initIcons({
    Interface: {
      Menu: IconMenu,
    },

    Application: {
      User: IconUser,
      Team: IconUsersGroup,
      Email: IconAt,
    },
  });
}
