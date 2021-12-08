import { Opaque } from "../types/TGlobal";
import { IState, ICard } from "../interfaces/IExampleQuiz";

export type State = Opaque<"State", IState>;
export type TCard = Opaque<"card", ICard>;