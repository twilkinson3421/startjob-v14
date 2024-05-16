import * as React from "react";

import { cn as cn_internal } from "@utils/cn";

export namespace Interface {
  export namespace Types {
    export type VariantsDeclaration<NamedVariants extends Internal.Variant> =
      Internal.BaseVariant &
        Internal.NamedVariants &
        Internal.DefaultVariants<NamedVariants>;

    export type VariantProps<GivenNamedVariants extends Internal.Variant> = {
      [Key in keyof GivenNamedVariants]?: keyof GivenNamedVariants[Key];
    };
  }

  export namespace Internal {
    export type VariantValue = string;
    export type VariantRecord = Record<string, VariantValue>;
    export type Variant = Record<string, VariantRecord>;
    export type NamedVariants = Record<"variants", Variant>;
    export type BaseVariant = Record<"base", VariantValue>;

    export type DefaultVariants<GivenNamedVariants extends Variant> = Record<
      "default",
      {
        [Key in keyof GivenNamedVariants]: keyof GivenNamedVariants[Key];
      }
    >;
  }

  export namespace Methods {
    export function registerVariants<
      VariantsDeclaration extends Types.VariantsDeclaration<
        VariantsDeclaration["variants"]
      >
    >(variants: VariantsDeclaration) {
      const func = (options: {
        [Variant in keyof VariantsDeclaration["variants"]]?: keyof VariantsDeclaration["variants"][Variant];
      }) => {
        const baseStyle = variants.base;
        const variantsList = Object.keys(variants.variants);

        const variantsStyleList = variantsList.map(
          (variant) =>
            variants.variants[variant][
              (options[
                variant
              ] as keyof (typeof variants.variants)[typeof variant]) ??
                variants.default[variant]
            ]
        );

        return Bundle.cn(baseStyle, ...variantsStyleList);
      };

      return [variants, func] as const;
    }

    export function createComponent<
      ComponentType extends Element | React.ComponentType,
      ComponentAttributes extends React.HTMLAttributes<ComponentType>,
      VariantsDeclaration extends Types.VariantsDeclaration<
        VariantsDeclaration["variants"]
      >,
      PropTypes extends Record<string, any>
    >({
      debugName,
      component,
    }: {
      debugName: string;
      component: React.ForwardRefRenderFunction<
        ComponentType,
        ComponentAttributes &
          Types.VariantProps<VariantsDeclaration["variants"]> &
          PropTypes
      >;
    }) {
      type ComponentProps = ComponentAttributes &
        Types.VariantProps<VariantsDeclaration["variants"]> &
        PropTypes;

      const Component = React.forwardRef<ComponentType, ComponentProps>(
        component
      );
      Component.displayName = debugName;

      return Component;
    }
  }

  export namespace Bundle {
    export const cn = cn_internal;

    export namespace Types {
      export type HTMLAttributes<TemplateElement> =
        React.HTMLAttributes<TemplateElement>;
    }
  }
}
