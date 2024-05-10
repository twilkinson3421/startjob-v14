export type ReplaceStringPart<
  OriginalString extends string,
  NewString extends string
> = OriginalString extends `${infer Start}\{${string}\}${infer End}`
  ? `${Start}${NewString}${End}`
  : OriginalString;
