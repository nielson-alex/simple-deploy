import { Opaque } from "../types/TGlobal";
import {
    IState,
    ICard,
    IDiacritics
} from "../interfaces/ICreateDeck";

export type State = Opaque<"State", IState>;
export type TCard = Opaque<"card", ICard>;
export type TDiacritics = Opaque<"diacritics", IDiacritics>;