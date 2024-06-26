import { Interface } from "@utils/interface";

const [groupVariants, applyGroupVariants] = Interface.Methods.registerVariants({
  base: "flex items-center",
  variants: {},
  default: {},
} as const);

export const Group = Interface.Methods.createComponent<
  HTMLDivElement,
  Interface.Bundle.Types.HTMLAttributes<HTMLDivElement>,
  typeof groupVariants,
  {}
>({
  debugName: "Group",
  Component: ({ children, className, ...props }, ref) => {
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
