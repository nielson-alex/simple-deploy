import { Opaque } from "../types/TGlobal";
import { IState, IWorkExperience } from "../interfaces/IResume";

export type State = Opaque<"State", IState>;
export type TWorkExperience = Opaque<"workExperience", IWorkExperience>;