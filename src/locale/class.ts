import { replace, replaceAny, replaceMutiple } from "@utils/replace";

export class LocalisedString extends String {
  constructor(value: string) {
    super(value);
  }

  public ersetz(key: string, value: string) {
    return new LocalisedString(replace(this.valueOf(), key, value));
  }

  public ersetzMultiple(targets: { key: string; value: string }[]) {
    return new LocalisedString(replaceMutiple(this.valueOf(), targets));
  }

  public ersetzAny(value: string) {
    return new LocalisedString(replaceAny(this.valueOf(), value));
  }
}
