import { Opaque } from "../types/TGlobal";
import {
    IState,
    IAnimal
} from "../interfaces/ILandingPage";

export type State = Opaque<"State", IState>;
export type TAnimal = Opaque<"animal", IAnimal>;