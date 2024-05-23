"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Interface } from "@utils/interface";

export namespace Tooltip {
  export namespace Types {
    export type ProviderProps = TooltipPrimitive.TooltipProviderProps;
    export type TooltipProps = TooltipPrimitive.TooltipProps;
    export type TriggerProps = TooltipPrimitive.TooltipTriggerProps;
    export type ContentProps = TooltipPrimitive.TooltipContentProps;
  }

  export const Provider = TooltipPrimitive.Provider;
  export const Tooltip = TooltipPrimitive.Tooltip;
  export const Trigger = TooltipPrimitive.Trigger;

  const [contentVariants, applyContentVariants] =
    Interface.Methods.registerVariants({
      base: "bg-popover text-popover-foreground border rounded-md z-50 overflow-hidden px-inner-x-md py-inner-y-md text-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      variants: {},
      default: {},
    } as const);

  export const Content = Interface.Methods.createComponent<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    typeof contentVariants,
    {}
  >({
    debugName: "TooltipContent",
    Component: (
      { className, side = "top", sideOffset = 4, align = "center", ...props },
      ref
    ) => {
      return (
        <TooltipPrimitive.Content
          {...{ side, sideOffset, align }}
          className={Interface.Bundle.cn(applyContentVariants({}), className)}
          ref={ref}
          {...props}
        />
      );
    },
  });
}
