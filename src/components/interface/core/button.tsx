import { Interface } from "@utils/interface";

// TODO: Is currently just proof of concept - implement!

const [buttonVariants, applyButtonVariants] =
  Interface.Methods.registerVariants({
    base: "p-2 bg-blue-500 rounded-md text-white transition-all duration-100",
    variants: {
      variant: {
        primary: "bg-primary",
        secondary:
          "bg-transparent, text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white",
      },
      size: {
        small: "p-1",
        medium: "p-2",
        large: "p-4",
      },
    },
    default: {
      variant: "primary",
      size: "medium",
    },
  } as const);

export const Button = Interface.Methods.createComponent<
  HTMLButtonElement,
  typeof buttonVariants,
  {}
>({
  debugName: "Button",
  variants: buttonVariants,
  component: ({ children, className, variant, size, ...props }, ref) => {
    return (
      <button
        className={Interface.Bundle.cn(
          applyButtonVariants({ variant, size }),
          className,
          ""
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
});
