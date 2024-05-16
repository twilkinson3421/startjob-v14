import { ButtonHTMLAttributes } from "react";

import { Interface } from "@utils/interface";

const [buttonVariants, applyButtonVariants] =
  Interface.Methods.registerVariants({
    base: "px-4 py-2 rounded-md shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed border border-transparent",
    variants: {
      variant: {
        primary: "bg-primary text-white hover:opacity-70",
        default:
          "bg-transparent border-muted-foreground hover:border-primary hover:text-primary",
        outline:
          "bg-transparent border-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground",
        dashed:
          "border-muted-foreground border-dashed hover:border-primary hover:text-primary",
        ghost: "shadow-none hover:bg-muted",
      },
    },
    default: {
      variant: "default",
    },
  } as const);

export const Button = Interface.Methods.createComponent<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>,
  typeof buttonVariants,
  {}
>({
  debugName: "Button",
  variants: buttonVariants,
  component: ({ children, className, variant, ...props }, ref) => {
    return (
      <button
        className={Interface.Bundle.cn(
          applyButtonVariants({ variant }),
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
});
