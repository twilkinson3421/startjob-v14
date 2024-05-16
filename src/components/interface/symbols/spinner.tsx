import { HTMLAttributes } from "react";

import { Icons } from "@/config/icons";
import { Interface } from "@utils/interface";

const [spinnerVariants, applySpinnerVariants] =
  Interface.Methods.registerVariants({
    base: "",
    variants: {},
    default: {},
  } as const);

export const Spinner = Interface.Methods.createComponent<
  Icons.Types.Component,
  HTMLAttributes<Icons.Types.Component>,
  typeof spinnerVariants,
  {} & Icons.Types.ComponentProps
>({
  debugName: "Spinner",
  component: ({ children, className, ...props }, ref) => {
    return (
      <Icons.Interface.Spinner
        className={Interface.Bundle.cn(applySpinnerVariants({}), className)}
        ref={ref as any}
        {...props}
      />
    );
  },
});
