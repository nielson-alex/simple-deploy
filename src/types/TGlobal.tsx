import { IProps } from "../interfaces/IGlobal";

export type Opaque<K, T> = T & { __TYPE__: K };
export type Props = Opaque<"Props", IProps>;