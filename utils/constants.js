export const IDLE = Symbol("IDLE");
export const FETCHING = Symbol("FETCHING");
export const ERROR = Symbol("ERROR");
export const IS_SERVER = typeof window === "undefined";
export const IS_BROWSER = !IS_SERVER;
