import { Opaque } from "../types/TGlobal";
import { IState, ICard, IDeck } from "../interfaces/IDecks";

export type State = Opaque<"State", IState>;
export type TCard = Opaque<"card", ICard>;
export type TDeck = Opaque<"deck", IDeck>;