import { ButtonHTMLAttributes } from "react";

import { Interface } from "@utils/interface";

const [buttonVariants, applyButtonVariants] =
  Interface.Methods.registerVariants({
    base: "inline-flex items-center justify-between rounded-md shadow-sm font-medium select-none disabled:opacity-50 disabled:cursor-not-allowed border border-transparent",
    variants: {
      variant: {
        default:
          "bg-transparent border-muted-foreground/50 hover:border-primary hover:text-primary",
        primary: "bg-primary text-white hover:opacity-70",
        dashed:
          "border-muted-foreground/30 border-dashed hover:border-primary hover:text-primary",
        ghost: "shadow-none hover:bg-muted",
      },
      size: {
        default: "px-4 py-2 gap-4",
        small: "px-3 py-1 gap-3",
        large: "px-8 py-3 gap-8",
        icon: "p-2 h-[calc(1rlh + 1rem)] w-[calc(1rlh + 1rem)] gap-2",
      },
    },
    default: {
      variant: "default",
      size: "default",
    },
  } as const);

export const Button = Interface.Methods.createComponent<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>,
  typeof buttonVariants,
  {}
>({
  debugName: "Button",
  component: ({ children, className, variant, size, ...props }, ref) => {
    return (
      <button
        className={Interface.Bundle.cn(
          applyButtonVariants({ variant, size }),
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
