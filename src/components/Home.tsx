import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { BR } from "./functional-components/GlobalFC";
import { Props } from "../types/TGlobal";
import { State } from "../types/THome";
import logo from "../logo.svg";
import instructions from "../media/images/instructions.png";
import "../css/GlobalCSS.css";
import "../css/HomeCSS.css";

class Home extends PureComponent<Props, State> {
    _isMounted: boolean = false;

    constructor(props: Props) {
        super(props);
        this.state = {
            showWarning: window.innerWidth >= 768 ? true : false
        } as State;

        this._determineColSize = this._determineColSize.bind(this);
        this._determineDevice = this._determineDevice.bind(this);
    }

    componentDidMount(): void {
        this._isMounted = true;

        if (this._isMounted === true) {
            if (this._determineDevice() === "desktop") {
                this.setState({
                    showWarning: true
                });
            }
        }
    }

    componentWillUnmount(): void {
        this._isMounted = false;
    }


    _determineColSize(): string {
        if (window.innerWidth >= 576 && window.innerWidth < 768) {
            return "-sm";
        } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
            return "-md";
        } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
            return "-lg";
        } else if (window.innerWidth >= 1200) {
            return "-xl";
        } else {
            return "";
        }
    }

    _determineDevice(): string {
        if (window.innerWidth >= 576 && window.innerWidth < 768) {
            return "mobile";
        } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
            return "mobile";
        } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
            return "desktop";
        } else if (window.innerWidth >= 1200) {
            return "desktop";
        } else {
            return "mobile";
        }
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className={`container container-${this._determineDevice()}`}>
                    <div className="row">
                        <h1 className={`col${this._determineColSize()}-12 page-title-h1-${this._determineDevice()} center-text`}>
                            Info About This App
                        </h1>
                    </div>

                    <div className="row">
                        <div className={`col${this._determineColSize()}-11`}>
                            <Link to="/dashboard/landing-page">Enter Webapp</Link>
                        </div>

                        <div className={`col${this._determineColSize()}-11`}>
                            <Link to="/dashboard/login">Sign In</Link>
                        </div>

                        <div className={`col${this._determineColSize()}-11 card custom-card middle-align`}>
                            <h4>Frontend Technologies</h4>
                            <ul>
                                <li>TypeScript</li>
                                <li>ReactJS</li>
                                <li>JavaScript</li>
                                <li>HTML</li>
                                <li>CSS</li>
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className={`col${this._determineColSize()}-11 card custom-card middle-align`}>
                            <h4>Backend Technologies</h4>
                            <ul>
                                <li>Node.js</li>
                                <li>Git</li>
                                <li>NoSQL (MongoDb)</li>
                                <li>SQL (PostgreSQL; not used in app)</li>
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className={`col${this._determineColSize()}-11 card custom-card middle-align`}>
                            <h4>Deployment</h4>
                            <ul>
                                <li>Heroku</li>
                                <li>GitHub</li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return this.state.showWarning === true
                ? <div style={{ margin: "0 auto", padding: "1rem 0", width: "98%", height: "100vh" }}>

                    <h4 className={`col${this._determineColSize()}-9 middle-align center-text`}>This webapp is designed for mobile devices.</h4>

                    <BR colSize={this._determineColSize()} />

                    <h4 className={`col${this._determineColSize()}-9 middle-align center-text`}>
                        If you're viewing this app on a laptop or
                        desktop computer and would like the optimal viewing experience, enable mobile view in your browser
                        by pressing the F12 key and making sure the circled items in the image below are selected.
                    </h4>

                    <BR colSize={this._determineColSize()} />

                    <img className={`col${this._determineColSize()}-11 middle-align center-text`} src={instructions} alt="Instructions" />

                    <BR colSize={this._determineColSize()} />

                    <h4 className={`col${this._determineColSize()}-9 middle-align center-text`}>
                        You can still view the site on a computer without enabling mobile view, but understand the styling will not be optimized.
                    </h4>

                    <BR colSize={this._determineColSize()} />

                    {/* Continue button */}
                    <button
                        className={`col${this._determineColSize()}-3 middle-align center-text`}
                        onClick={(): void => this.setState({ showWarning: !this.state.showWarning })}
                    >Continue</button>
                </div>
                : <div className={`container container-${this._determineDevice()}`}>
                    <div className="row">
                        <h1 className={`col${this._determineColSize()}-12 page-title-h1-${this._determineDevice()} center-text`}>
                            Info About This App
                        </h1>
                    </div>

                    <div className="row">
                        <div className={`col${this._determineColSize()}-11`}>
                            <Link to="/dashboard/landing-page">Enter Webapp</Link>
                        </div>

                        <div className={`col${this._determineColSize()}-11 card custom-card middle-align`}>
                            <h4>Frontend Technologies</h4>
                            <ul>
                                <li>TypeScript</li>
                                <li>ReactJS</li>
                                <li>JavaScript</li>
                                <li>HTML</li>
                                <li>CSS</li>
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className={`col${this._determineColSize()}-11 card custom-card middle-align`}>
                            <h4>Backend Technologies</h4>
                            <ul>
                                <li>Node.js</li>
                                <li>Git</li>
                                <li>NoSQL (MongoDb)</li>
                                <li>SQL (PostgreSQL; not used in app)</li>
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className={`col${this._determineColSize()}-11 card custom-card middle-align`}>
                            <h4>Deployment</h4>
                            <ul>
                                <li>Heroku</li>
                                <li>GitHub</li>
                            </ul>
                        </div>
                    </div>
                </div>
        }

        return this._determineDevice() === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}

export default Home;