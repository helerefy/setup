/** Serialized DOM node of one captured component state (see scripts in PORTING.md). */
export type MorphNode = {
  /** tag name */
  t: string;
  /** stable key among siblings, shared across states */
  k?: string;
  /** className */
  c?: string;
  /** inline style */
  s?: Record<string, string>;
  /** other attributes */
  a?: Record<string, string>;
  /** raw inner HTML (svg / style) */
  h?: string;
  ch?: (MorphNode | string)[];
  /** state metadata (not rendered) */
  nav?: number;
  name?: string;
};
