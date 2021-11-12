import { PureComponent } from "react";
import { Props } from "../types/TGlobal";
import { State } from "../types/TAnimals";
import "../css/GlobalCSS.css";
import "../css/AnimalsCSS.css";

export default class Animals extends PureComponent<Props, State> {
    _isMounted: boolean = false;

    constructor(props: Props) {
        super(props);
        this.state = {

        } as State;
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <>
                    <div className="row">
                        <p className={`col${this.state.colSize}-6 middle-align`}>{this.state.featuredAnimal.name !== ""
                            ? `Meet ${this.state.featuredAnimal.name}, the ${this.state.featuredAnimal.age}-year-old ${this.state.featuredAnimal.breed}!`
                            : "Press the button to be assigned a pet"}
                        </p>
                    </div>
                </>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <></>
            );
        }

        return this.state.device === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}