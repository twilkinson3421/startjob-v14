import * as React from "react";

import { cn as cn_internal } from "@utils/cn";

export namespace Interface {
  export namespace Types {
    export type VariantsDeclaration<NamedVariants extends Internal.Variant> =
      Internal.BaseVariant &
        Internal.NamedVariants &
        Internal.DefaultVariants<NamedVariants> &
        Partial<Internal.CompoundVariants<NamedVariants>> &
        Partial<Internal.ImpliedVariants<NamedVariants, "impliedAND">> &
        Partial<Internal.ImpliedVariants<NamedVariants, "impliedOR">>;

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

    export type CompoundVariants<GivenNamedVariants extends Variant> = Record<
      "compound",
      Array<{
        match: {
          [Key in keyof GivenNamedVariants]?: keyof GivenNamedVariants[Key];
        };
        style: VariantValue;
      }>
    >;

    export type ImpliedVariants<
      GivenNamedVariants extends Variant,
      ObjectName extends string
    > = Record<
      ObjectName,
      Array<{
        match: {
          [Key in keyof GivenNamedVariants]?: keyof GivenNamedVariants[Key];
        };
        implies: {
          [Key in keyof GivenNamedVariants]?: keyof GivenNamedVariants[Key];
        };
      }>
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

        //* Change options to conform to applied variants ->
        //? Format for impliedOR and impliedAND:

        //? impliedAND: [
        //?   {
        //?     match: { {variant name}: {variant value to check for} },
        //?     implies: { {variant name}: {value to be applied if match met} },
        //?   },
        //? ],

        //^ For impliedOR:
        //^ If at least one match is met, all implies are applied

        //^ For impliedAND:
        //^ If all matches are met, all implies are applied

        variants.impliedOR?.forEach((impliedORVariant) => {
          if (!impliedORVariant.match) return;
          if (!impliedORVariant.implies) return;

          if (
            Object.entries(impliedORVariant.match).some(
              ([variantName, variantValue]) => {
                const valueIsDefault =
                  variants.default[variantName] === variantValue;
                if (valueIsDefault && !options[variantName]) return true;
                return options[variantName] === variantValue;
              }
            )
          ) {
            Object.entries(impliedORVariant.implies).forEach(
              ([impliedVariantName, impliedVariantValue]) => {
                options[impliedVariantName as keyof typeof options] =
                  impliedVariantValue;
              }
            );
          }
        });

        variants.impliedAND?.forEach((impliedANDVariant) => {
          if (!impliedANDVariant.match) return;
          if (!impliedANDVariant.implies) return;

          if (
            Object.entries(impliedANDVariant.match).every(
              ([variantName, variantValue]) => {
                const valueIsDefault =
                  variants.default[variantName] === variantValue;
                if (valueIsDefault && !options[variantName]) return true;
                return options[variantName] === variantValue;
              }
            )
          ) {
            Object.entries(impliedANDVariant.implies).forEach(
              ([impliedVariantName, impliedVariantValue]) => {
                options[impliedVariantName as keyof typeof options] =
                  impliedVariantValue;
              }
            );
          }
        });

        //* Apply styles from named variants ->

        const variantsStyleList = variantsList.map(
          (variant) =>
            variants.variants[variant][
              (options[
                variant
              ] as keyof (typeof variants.variants)[typeof variant]) ??
                variants.default[variant]
            ]
        );

        //* Apply compound variants ->
        //? Example ->

        //? compound: [
        //?   {
        //?     match: {
        //?       variantName: {value to check for}
        //?       otherVariantName: {value to check for}
        //?       ...
        //?     },
        //?     style: {style to be applied}
        //?   }
        //?   ...
        //? ]

        //^ 1. Check if all [name, value] pairs in the variants object match the values in the options object

        //^ 2. Return true if the value specified is the default value AND no value was given in the options object

        //^ 3. If passing, push the given style to the variantsStyleList

        variants.compound?.forEach((compoundVariant) => {
          if (!compoundVariant.match) return;
          if (
            Object.entries(compoundVariant.match).every(
              ([variantName, variantValue]) => {
                const valueIsDefault =
                  variants.default[variantName] === variantValue;
                if (valueIsDefault && !options[variantName]) return true;
                return options[variantName] === variantValue;
              }
            )
          ) {
            variantsStyleList.push(compoundVariant.style);
          }
        });

        return Bundle.cn(baseStyle, ...variantsStyleList);
      };

      return [variants, func] as const;
    }

    export function createComponent<
      ComponentType extends Element | React.ComponentType,
      ComponentAttributes extends Record<string, any>,
      VariantsDeclaration extends Types.VariantsDeclaration<
        VariantsDeclaration["variants"]
      >,
      PropTypes extends Record<string, any>
    >({
      debugName,
      Component: PassedComponent,
    }: {
      debugName: string;
      Component: React.ForwardRefRenderFunction<
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
        PassedComponent
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
