import { Opaque } from "../types/TGlobal";
import { IState, IWorkExperience } from "../interfaces/IEnvironmentTesting";
import { IAnimal } from "../interfaces/IAnimalDetails";

export type State = Opaque<"State", IState>;
export type TAnimal = Opaque<"animal", IAnimal>;
export type TWorkExperience = Opaque<"workExperience", IWorkExperience>;