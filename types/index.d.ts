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

  export type User = {
    id: number;
    username: string;
    password: string;
    role: string;
    group: string;
    __typename?: string;
    roles?: Array<string>;
    last_seen: Date;
    created_at: Date;
  };
}
