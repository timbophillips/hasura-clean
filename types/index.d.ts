// to make the file a module and avoid the TypeScript error
export {};

declare global {
  export type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;

  export interface JSONArray extends Array<JSONValue> {}
}
