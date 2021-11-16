import { Opaque } from "../types/TGlobal";
import {
    IState,
    IAnimal
} from "../interfaces/IAnimalDetails";

export type State = Opaque<"State", IState>;
export type TAnimal = Opaque<"animalDetails", IAnimal>;