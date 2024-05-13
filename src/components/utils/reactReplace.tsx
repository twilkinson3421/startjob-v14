import { FC } from "react";
import reactStringReplace from "react-string-replace";

/**
 * Replaces matching strings between `{{{` and `}}}` with a component which receives the string within the braces as a prop `match`, and the index as a prop `i`.
 */
export function reactReplace({
  str,
  match,
  component,
}: {
  str: string;
  match: string;
  component: FC<{ match: string; i: number }>;
}) {
  const Component = component;
  return reactStringReplace(
    str,
    new RegExp(`{{{${match}}}}`, "g"),
    (match: string, i: number) => <Component key={i} {...{ match, i }} />
  );
}

/**
 * Replaces any string between `{{{` and `}}}` with a component which receives the string within the braces as a prop `match`, and the index as a prop `i`.
 */
export function reactReplaceAny({
  str,
  component,
}: {
  str: string;
  component: FC<{ match: string; i: number }>;
}) {
  const Component = component;
  return reactStringReplace(str, /{{{(.*?)}}}/g, (match: string, i: number) => (
    <Component key={i} {...{ match, i }} />
  ));
}
