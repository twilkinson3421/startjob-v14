"use client";

import * as React from "react";

import { Icons } from "@config/icons";
import { useTranslationContext } from "@providers/locale";
import { usePasswordStateContext } from "@providers/password";
import { Button } from "@ui-core/button";
import { Interface } from "@utils/interface";

import type { PasswordStateContextValue } from "@providers/password";
export namespace Input {
  const [rootVariants, applyRootVariants] = Interface.Methods.registerVariants({
    base: "flex items-stretch w-full rounded-md border border-border shadow-sm bg-background cursor-text overflow-auto transition-all placeholder:text-muted-foreground [&:has(>input:focus-visible)]:border-primary [&:has(>input:disabled)]:cursor-not-allowed [&:has(>input:disabled)]:opacity-50",
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
      const rootContainer = React.useRef<HTMLDivElement>(null);

      //* Focuses the input component...
      //* ...and sets the cursor position based on the pointer position
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
    React.InputHTMLAttributes<HTMLInputElement>,
    typeof inputVariants,
    {
      variant?: "default" | "password";
    }
  >({
    debugName: "InputInput",
    Component: ({ className, variant, type, ...props }, ref) => {
      variant ??= "default";
      const passwordStateController = usePasswordStateContext();

      const inputType: React.InputHTMLAttributes<HTMLInputElement>["type"] =
        (() => {
          if (variant !== "password") return type;
          if (!passwordStateController.show) return "password";
          return type;
        })();

      return (
        <>
          <input
            onPointerDown={(e) => e.stopPropagation()}
            type={inputType}
            className={Interface.Bundle.cn(applyInputVariants({}), className)}
            ref={ref}
            {...props}
          />
          {variant === "password" && (
            <PasswordVisibilityToggle {...{ passwordStateController }} />
          )}
        </>
      );
    },
  });

  const [slotVariants, applySlotVariants] = Interface.Methods.registerVariants({
    base: "flex items-center justify-center text-muted-foreground",
    variants: {
      side: {
        left: "ml-3",
        right: "mr-3",
      },
      align: {
        default: "",
        flush: "mx-0",
      },
      variant: {
        default: "",
        nub: "px-3 bg-muted cursor-default",
      },
    },
    default: {
      side: "left",
      align: "default",
      variant: "default",
    },
    impliedAND: [
      {
        match: { variant: "nub" },
        implies: { align: "flush" },
      },
    ],
  } as const);

  export const Slot = Interface.Methods.createComponent<
    HTMLDivElement,
    Interface.Bundle.Types.HTMLAttributes<HTMLDivElement>,
    typeof slotVariants,
    {}
  >({
    debugName: "InputSlot",
    Component: (
      { children, className, side, align, variant, onPointerDown, ...props },
      ref
    ) => {
      if (variant === "nub") onPointerDown ??= (e) => e.stopPropagation();

      return (
        <div
          onPointerDown={onPointerDown}
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

  const [
    passwordVisibilityToggleVariants,
    applyPasswordVisibilityToggleVariants,
  ] = Interface.Methods.registerVariants({
    base: "px-0",
    variants: {},
    default: {},
  } as const);

  const PasswordVisibilityToggle = Interface.Methods.createComponent<
    HTMLDivElement,
    Omit<Interface.Bundle.Types.HTMLAttributes<HTMLDivElement>, "children">,
    typeof passwordVisibilityToggleVariants,
    { passwordStateController: PasswordStateContextValue }
  >({
    debugName: "InputPasswordVisibilityToggle",
    Component: ({ className, passwordStateController, ...props }, ref) => {
      const {} = useTranslationContext();

      const togglePasswordVisibility = () =>
        passwordStateController.setShow(!passwordStateController.show);

      const Icon = passwordStateController.show
        ? Icons.Interface.Hide
        : Icons.Interface.Show;

      return (
        <Slot
          variant="nub"
          side="right"
          className={Interface.Bundle.cn(
            applyPasswordVisibilityToggleVariants({}),
            className
          )}
          ref={ref}
          {...props}
        >
          <Button
            variant="ghost"
            className="hover:bg-transparent border-none -outline-offset-1 rounded-s-none"
            onClick={togglePasswordVisibility}
          >
            <Icon />
          </Button>
        </Slot>
      );
    },
  });
}
