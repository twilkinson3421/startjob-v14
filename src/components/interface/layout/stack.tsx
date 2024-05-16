import { HTMLAttributes } from "react";

import { Interface } from "@utils/interface";

const [stackVariants, applyStackVariants] = Interface.Methods.registerVariants({
  base: "flex flex-col",
  variants: {},
  default: {},
} as const);

export const Stack = Interface.Methods.createComponent<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>,
  typeof stackVariants,
  {}
>({
  debugName: "Stack",
  component: ({ children, className, ...props }, ref) => {
    return (
      <div
        className={Interface.Bundle.cn(applyStackVariants({}), className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
});
