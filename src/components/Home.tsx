import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Props } from "../types/TGlobal";
import { State } from "../types/THome";
import logo from "../logo.svg";
import "../css/GlobalCSS.css";
import "../css/HomeCSS.css";

class Home extends PureComponent<Props, State> {
    _isMounted: boolean = false;

    constructor(props: Props) {
        super(props);
        this.state = {
            colSize: "",
            device: ""
        } as State;

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount(): void {
        this._isMounted = true;

        if (this._isMounted === true) {
            this.updateWindowDimensions();
        }
    }

    updateWindowDimensions(): void {

    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <></>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <Link className="btn btn-primary" to="/dashboard/landing-page">Enter</Link>
                        <button
                            onClick={async () => {
                                fetch("/get_location_groups")
                                    .then((res: any): any => res.json())
                                    .then((res: any): void => console.log("res:", res));
                            }}
                        >Click</button>
                        <p>
                            Edit <code>src/App.tsx</code> and save to reload.
                        </p>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React
                        </a>
                    </header>
                </div>
            );
        }

        return this.state.device === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}

export default Home;