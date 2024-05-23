import * as React from "react";

import { Spinner } from "@ui-symbols/spinner";
import { Truncate } from "@ui-typography/truncate";
import { Interface } from "@utils/interface";

import type { ButtonHTMLAttributes } from "react";
const [buttonVariants, applyButtonVariants] =
  Interface.Methods.registerVariants({
    base: "inline-flex items-center justify-between rounded-md shadow-sm font-medium select-none transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-transparent truncate",
    variants: {
      variant: {
        default:
          "bg-transparent border-muted-foreground/50 hover:border-primary hover:text-primary",
        primary: "bg-primary text-primary-foreground hover:opacity-70",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-70",
        success: "bg-success text-success-foreground hover:opacity-70",
        outline:
          "bg-transparent border-muted-foreground/50 hover:bg-primary hover:border-primary hover:text-primary-foreground",
        dashed:
          "border-muted-foreground/30 border-dashed hover:border-primary hover:text-primary",
        ghost: "shadow-none hover:bg-muted",
      },
      size: {
        default: "px-inner-x-md py-inner-y-md gap-inner-x-md",
        small: "px-inner-x-sm py-inner-y-sm gap-inner-x-sm",
        large: "px-inner-x-lg py-inner-y-lg gap-inner-x-lg",
        icon: "p-inner-y-md justify-center gap-inner-y-md",
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
  { loading?: boolean; hideContentWhenLoading?: boolean; noTruncate?: boolean }
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
      noTruncate,
      ...props
    },
    ref
  ) => {
    hideContentWhenLoading ??= size === "icon";
    const showChildren = !loading || !hideContentWhenLoading;
    const ChildWrapper = !!noTruncate ? React.Fragment : Truncate;

    return (
      <button
        ref={ref}
        className={Interface.Bundle.cn(
          applyButtonVariants({ variant, size }),
          className
        )}
        disabled={!!disabled || !!loading}
        {...props}
      >
        {showChildren && <ChildWrapper>{children}</ChildWrapper>}
        {loading && <Spinner className="flex-shrink-0" />}
      </button>
    );
  },
});
