import { Opaque } from "../types/TGlobal";
import {
    IState
} from "../interfaces/IAnimalDetails";

export type State = Opaque<"State", IState>;