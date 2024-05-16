import { HTMLAttributes } from "react";

import { Interface } from "@utils/interface";

const [groupVariants, applyGroupVariants] = Interface.Methods.registerVariants({
  base: "flex items-center",
  variants: {},
  default: {},
} as const);

export const Group = Interface.Methods.createComponent<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>,
  typeof groupVariants,
  {}
>({
  debugName: "Group",
  variants: groupVariants,
  component: ({ children, className, ...props }, ref) => {
    return (
      <div
        className={Interface.Bundle.cn(applyGroupVariants({}), className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
});
