import { Opaque } from "../types/TGlobal";
import { IState, IRenderable } from "../interfaces/IDashboard";

export type State = Opaque<"State", IState>;
export type TRenderable = Opaque<"renderable", IRenderable>;