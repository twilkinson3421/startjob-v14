import { Icons } from "@/config/icons";
import { Interface } from "@utils/interface";

const [spinnerVariants, applySpinnerVariants] =
  Interface.Methods.registerVariants({
    base: "animate-spin ease-in-out",
    variants: {},
    default: {},
  } as const);

export const Spinner = Interface.Methods.createComponent<
  Icons.Types.Component,
  Interface.Bundle.Types.HTMLAttributes<Icons.Types.Component>,
  typeof spinnerVariants,
  {} & Icons.Types.ComponentProps
>({
  debugName: "Spinner",
  Component: ({ className, ...props }, ref) => {
    return (
      <Icons.Interface.Spinner
        className={Interface.Bundle.cn(applySpinnerVariants({}), className)}
        ref={ref as any}
        {...props}
      />
    );
  },
});
