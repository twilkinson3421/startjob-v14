import { Spinner } from "@ui-symbols/spinner";
import { Interface } from "@utils/interface";

import type { ButtonHTMLAttributes } from "react";

const [buttonVariants, applyButtonVariants] =
  Interface.Methods.registerVariants({
    base: "inline-flex items-center justify-between rounded-md shadow-sm font-medium select-none transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-transparent",
    variants: {
      variant: {
        default:
          "bg-transparent border-muted-foreground/50 hover:border-primary hover:text-primary",
        primary: "bg-primary text-white hover:opacity-70",
        outline:
          "bg-transparent border-muted-foreground/50 hover:bg-primary hover:border-primary hover:text-primary-foreground",
        dashed:
          "border-muted-foreground/30 border-dashed hover:border-primary hover:text-primary",
        ghost: "shadow-none hover:bg-muted",
      },
      size: {
        default: "px-4 py-2 gap-4",
        small: "px-3 py-1 gap-3",
        large: "px-8 py-3 gap-8",
        icon: "p-2 justify-center gap-2",
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
  { loading?: boolean; hideContentWhenLoading?: boolean }
>({
  debugName: "Button",
  Component: (
    {
      children,
      className,
      variant,
      size,
      loading,
      disabled,
      hideContentWhenLoading,
      ...props
    },
    ref
  ) => {
    hideContentWhenLoading ??= size === "icon";
    const showChildren = !loading || !hideContentWhenLoading;

    return (
      <button
        ref={ref}
        className={Interface.Bundle.cn(
          applyButtonVariants({ variant, size }),
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {showChildren && children}
        {loading && <Spinner />}
      </button>
    );
  },
});
