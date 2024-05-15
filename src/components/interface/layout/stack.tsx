import { Interface } from "@utils/interface";

const [stackVariants, applyStackVariants] = Interface.Methods.registerVariants({
  base: "flex flex-col",
  variants: {},
  default: {},
} as const);

export const Stack = Interface.Methods.createComponent<
  HTMLDivElement,
  typeof stackVariants,
  {}
>({
  debugName: "Stack",
  variants: stackVariants,
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
