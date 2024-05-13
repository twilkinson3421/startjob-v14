/**
 * Replaces matching strings between `{{` and `}}` with a specified value
 * @param str The string before replacement
 * @param key The string between `{{` and `}}` to be replaced
 * @param value The string to be inserted
 * @returns {string} The base string after replacement
 */
export function replace(str: string, key: string, value: string): string {
  return str.replace(new RegExp(`{{${key}}}`, "g"), value);
}

/**
 * Replace multiple different occurances of matching strings between `{{` and `}}`
 * @param str The string before replacement
 * @param targets An array of `{key, value}` representing the string to look for, and its replacement value
 * @returns {string} The base string after replacement
 */
export function replaceMutiple(
  str: string,
  targets: { key: string; value: string }[]
): string {
  return targets.reduce((str, { key, value }) => replace(str, key, value), str);
}

/**
 * Replaces any strings between `{{` and `}}` with a specified value
 * @param str The string before replacement
 * @param value The string to be inserted
 * @returns {string} The base string after replacement
 */
export function replaceAny(str: string, value: string): string {
  return str.replace(/{{(.*?)}}/g, value);
}
