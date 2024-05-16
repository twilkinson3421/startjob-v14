import { Interface } from "@utils/interface";

const [inputVariants, applyInputVariants] = Interface.Methods.registerVariants({
  base: "",
  variants: {},
  default: {},
});

export const Input = Interface.Methods.createComponent<
  HTMLInputElement,
  Interface.Bundle.Types.HTMLAttributes<HTMLInputElement>,
  typeof inputVariants,
  {}
>({
  debugName: "Input",
  component: ({ children, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={Interface.Bundle.cn(applyInputVariants({}), className)}
        {...props}
      />
    );
  },
});
