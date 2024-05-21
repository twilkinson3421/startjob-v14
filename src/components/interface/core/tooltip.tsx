import { TooltipAnchorProps, TooltipProps } from "@ariakit/react";
import { Tooltip as TooltipModule } from "@modules/tooltip";
import { Interface } from "@utils/interface";

export namespace Tooltip {
  export const Root = TooltipModule.TooltipProvider;

  const [triggerVariants, applyTriggervariants] =
    Interface.Methods.registerVariants({
      base: "",
      variants: {},
      default: {},
    } as const);

  export const Trigger = Interface.Methods.createComponent<
    HTMLDivElement,
    Internal.AnchorProps,
    typeof triggerVariants,
    {}
  >({
    debugName: "TooltipTrigger",
    Component: ({ children, className, ...props }, ref) => {
      return (
        <TooltipModule.TooltipAnchor
          render={() => children}
          className={Interface.Bundle.cn(applyTriggervariants({}), className)}
          ref={ref}
          {...props}
        />
      );
    },
  });

  const [contentVariants, applyContentvariants] =
    Interface.Methods.registerVariants({
      base: "bg-background rounded-md border shadow-md px-3 py-1",
      variants: {
        size: {
          default: "text-sm",
        },
      },
      default: {
        size: "default",
      },
    } as const);

  export const Content = Interface.Methods.createComponent<
    HTMLDivElement,
    TooltipProps,
    typeof contentVariants,
    {}
  >({
    debugName: "TooltipContent",
    Component: ({ children, className, size, ...props }, ref) => {
      return (
        <TooltipModule.Tooltip
          className={Interface.Bundle.cn(
            applyContentvariants({ size }),
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </TooltipModule.Tooltip>
      );
    },
  });

  export namespace Internal {
    export type AnchorProps = Omit<TooltipAnchorProps, "aria-label"> &
      Required<Pick<TooltipAnchorProps, "aria-label">>;
  }
}
