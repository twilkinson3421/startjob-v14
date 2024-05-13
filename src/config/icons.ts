import { ForwardRefExoticComponent, RefAttributes } from "react";

import type { Icon, IconProps } from "@tabler/icons-react";

export namespace Icons {
  export namespace Types {
    export type ComponentProps = IconProps;
    export type Component = ForwardRefExoticComponent<
      Omit<Icon, "ref"> & RefAttributes<Icon>
    >;
  }
}
