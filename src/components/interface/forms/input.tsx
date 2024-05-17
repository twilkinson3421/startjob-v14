"use client";

import { useRef } from "react";

import { Interface } from "@utils/interface";

export namespace Input {
  const [rootVariants, applyRootVariants] = Interface.Methods.registerVariants({
    base: "flex items-stretch w-full rounded-md border border-border shadow-sm bg-background cursor-text overflow-clip placeholder:text-muted-foreground [&:has(>input:focus-visible)]:border-primary [&:has(>input:disabled)]:cursor-not-allowed [&:has(>input:disabled)]:opacity-50",
    variants: {},
    default: {},
  } as const);

  export const Root = Interface.Methods.createComponent<
    HTMLDivElement,
    Interface.Bundle.Types.HTMLAttributes<HTMLDivElement>,
    typeof rootVariants,
    {}
  >({
    debugName: "InputRoot",
    Component: ({ children, className, ...props }, ref) => {
      const rootContainer = useRef<HTMLDivElement>(null);

      // * Focuses the input component...
      // * ...and sets the cursor position based on the pointer position
      const handlePointerDown = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!rootContainer.current) return;

        const input =
          rootContainer.current.querySelector("input") ??
          rootContainer.current.querySelector("textarea");
        if (!input) return;

        const side = e.clientX > input.offsetLeft ? "right" : "left";
        const cursorPosition = side === "right" ? input.value.length : 0;

        requestAnimationFrame(() => {
          try {
            input.setSelectionRange(cursorPosition, cursorPosition);
          } catch (_error) {}
          input.focus();
        });
      };

      return (
        <div className="w-full" ref={rootContainer}>
          <div
            onPointerDown={handlePointerDown}
            className={Interface.Bundle.cn(applyRootVariants({}), className)}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </div>
      );
    },
  });

  const [inputVariants, applyInputVariants] =
    Interface.Methods.registerVariants({
      base: "flex w-full bg-transparent px-3 py-2 border-none focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed",
      variants: {},
      default: {},
    } as const);

  export const Input = Interface.Methods.createComponent<
    HTMLInputElement,
    Interface.Bundle.Types.HTMLAttributes<HTMLInputElement>,
    typeof inputVariants,
    {}
  >({
    debugName: "InputInput",
    Component: ({ className, ...props }, ref) => {
      return (
        <input
          onPointerDown={(e) => e.stopPropagation()}
          className={Interface.Bundle.cn(applyInputVariants({}), className)}
          ref={ref}
          {...props}
        />
      );
    },
  });

  const [slotVariants, applySlotVariants] = Interface.Methods.registerVariants({
    base: "flex items-center justify-center text-muted-foreground",
    variants: {
      side: {
        left: "pl-3",
        right: "pr-3",
      },
      align: {
        default: "",
        flush: "px-0",
      },
      variant: {
        default: "",
        nub: "px-3 bg-muted",
      },
    },
    default: {
      side: "left",
      align: "default",
      variant: "default",
    },
  } as const);

  export const Slot = Interface.Methods.createComponent<
    HTMLDivElement,
    Interface.Bundle.Types.HTMLAttributes<HTMLDivElement>,
    typeof slotVariants,
    {}
  >({
    debugName: "InputSlot",
    Component: (
      { children, className, side, align, variant, ...props },
      ref
    ) => {
      return (
        <div
          onPointerDown={(e) =>
            variant === "nub" ? e.stopPropagation() : undefined
          }
          className={Interface.Bundle.cn(
            applySlotVariants({ side, align, variant }),
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    },
  });
}
