import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Props } from "../types/TGlobal";
import { State } from "../types/TLandingPage";
import "../css/GlobalCSS.css";
import "../css/LandingPageCSS.css";

class LandingPage extends PureComponent<Props, State> {
    _isMounted: boolean = false;

    constructor(props: Props) {
        super(props);
        this.state = {
            colSize: "",
            device: "mobile"
        } as State;

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount(): void {
        this._isMounted = true;

        if (this._isMounted === true) {
            window.addEventListener("reize", this.updateWindowDimensions);
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
                <div className="container">
                    <div className="row">
                        <h1 id="landing-page-title-h1" className={`col${this.state.colSize}-12 center-text`}>Green Thumb</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-12`}>
                            <hr />
                        </div>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-5 center-text middle-align`}>
                            <Link to="/dashboard/my-collection">
                                <p className="landing-page-link">
                                    My collection
                                </p>
                            </Link>
                        </div>

                        <div className={`col${this.state.colSize}-5 center-text middle-align`}>
                            <Link to="/dashboard/profile">
                            <p className="landing-page-link">
                                    Profile
                                </p>
                            </Link>

                        </div>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-5 center-text middle-align`}>
                            <Link to="/dashboard/scanner-js">
                            <p className="landing-page-link">
                                    Scan Plant
                                </p>
                            </Link>
                        </div>

                        <div className={`col${this.state.colSize}-5 center-text middle-align`}>
                        <Link to="/dashboard/scanner-js">
                            <p className="landing-page-link">
                                    Scan Plant
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className="container">
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 center-text`}></h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-12`}>
                            <hr />
                        </div>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-5 center-text middle-align`}>
                            My collection
                        </div>

                        <div className={`col${this.state.colSize}-5 center-text middle-align`}>
                            Profile
                        </div>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-5 center-text middle-align`}>
                            Scan Plant
                        </div>

                        <div className={`col${this.state.colSize}-5 center-text middle-align`}>

                        </div>
                    </div>
                </div>
            );
        }

        return this.state.device === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}

export default LandingPage;