import { IProps, IUser } from "../interfaces/IGlobal";

export type Opaque<K, T> = T & { __TYPE__: K };
export type Props = Opaque<"Props", IProps>;
export type User = Opaque<"User", IUser>;