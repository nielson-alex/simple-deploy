import { Opaque } from "../types/TGlobal";
import {
    IState,
    ICard,
    INewCard
} from "../interfaces/IEditDeck";

export type State = Opaque<"State", IState>;
export type TCard = Opaque<"card", ICard>;
export type TNewCard = Opaque<"newCard", INewCard>;