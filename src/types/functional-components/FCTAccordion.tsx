import { Opaque } from "../TGlobal";
import { IProps, IState } from "../../interfaces/functional-components/FCIAccordion";

export type CustomProps = Opaque<"Props", IProps>;
export type State = Opaque<"State", IState>;