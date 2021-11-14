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
            window.addEventListener("resize", this.updateWindowDimensions);
            this.updateWindowDimensions();
        }
    }

    componentWillUnmount(): void {
        window.removeEventListener("resize", this.updateWindowDimensions);
        this._isMounted = false;
    }


    updateWindowDimensions(): void {
        if (window.innerWidth < 576) {
            this.setState({
                colSize: "",
                device: "mobile"
            });
        } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
            this.setState({
                colSize: "-sm",
                device: "mobile"
            });
        } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
            this.setState({
                colSize: "-md",
                device: "desktop"
            });
        } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
            this.setState({
                colSize: "-lg",
                device: "desktop"
            });
        } else if (window.innerWidth >= 1200) {
            this.setState({
                colSize: "-xl",
                device: "desktop"
            });
        }
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className="middle-align" style={{ margin: "0 auto", padding: "0", width: "96%" }}>
                    <div className="row">
                        <h1>Alex Nielson</h1>
                        
                        <h2 className={`col${this.state.colSize}-12 center-text`}>
                            React/TypeScript Single-Page Application
                        </h2>

                        <Link className={`col${this.state.colSize}-3 middle-align`} to="/dashboard/landing-page">
                            <img src={logo} className="App-logo middle-align" alt="logo" />
                        </Link>

                        <h3 className={`col${this.state.colSize}11 center-text`}>Click icon to enter</h3>
                    </div>
                </div>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className="middle-align" style={{ margin: "0 auto", padding: "0", width: "96%" }}>
                    <div className="row">
                        <h1>Alex Nielson</h1>
                        
                        <h2 className={`col${this.state.colSize}-12 center-text`}>
                            React/TypeScript Single-Page Application
                        </h2>

                        <Link className={`col${this.state.colSize}-3 middle-align`} to="/dashboard/landing-page">
                            <img src={logo} className="App-logo middle-align" alt="logo" />
                        </Link>

                        <h3 className={`col${this.state.colSize}11 center-text`}>Click icon to enter</h3>
                    </div>
                </div>
            );
        }

        return this.state.device === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}

export default Home;