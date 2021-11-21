import { Opaque } from "../types/TGlobal";
import { IState, ICard } from "../interfaces/ICreateDeck";

export type State = Opaque<"State", IState>;
export type TCard = Opaque<"card", ICard>;