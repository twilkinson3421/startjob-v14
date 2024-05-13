import { ForwardRefExoticComponent, RefAttributes } from "react";

import { IconMenu, IconUser } from "@tabler/icons-react";

import type { Icon, IconProps } from "@tabler/icons-react";

export namespace Icons {
  export namespace Types {
    export type ComponentProps = IconProps;
    export type Component = ForwardRefExoticComponent<
      Omit<Icon, "ref"> & RefAttributes<Icon>
    >;
  }

  export namespace Internal {
    export type Declaration = Record<
      string,
      Record<string, Icons.Types.Component>
    >;

    export function initIcons<IconsDeclaration extends Declaration>(
      icons: IconsDeclaration
    ) {
      return icons;
    }
  }

  export const { Interface, Application } = Icons.Internal.initIcons({
    Interface: {
      Menu: IconMenu,
    },

    Application: {
      User: IconUser,
    },
  });
}
