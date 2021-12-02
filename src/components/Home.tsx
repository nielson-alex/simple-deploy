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
            showWarning: window.innerWidth >= 768 ? true : false,
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

            console.log("this.state.device:", this.state.device);

            if (this.state.device === "desktop") {
                this.setState({
                    showWarning: true
                });
            }
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
                <div className={`container container-${this.state.device}`}>
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 landing-page-title-h1 center-text`}>
                            Info About This App
                        </h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-11`}>
                            <Link to="/dashboard/landing-page">Enter Webapp</Link>
                        </div>

                        <div className={`col${this.state.colSize}-11 card custom-card middle-align`}>
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
                        <div className={`col${this.state.colSize}-11 card custom-card middle-align`}>
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
                        <div className={`col${this.state.colSize}-11 card custom-card middle-align`}>
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

                    <h4 className={`col${this.state.colSize}-9 middle-align center-text`}>This webapp is designed for mobile devices.</h4>

                    <BR colSize={this.state.colSize} />

                    <h4 className={`col${this.state.colSize}-9 middle-align center-text`}>
                        If you're viewing this app on a laptop or
                        desktop computer and would like the optimal viewing experience, enable mobile view in your browser
                        by pressing the F12 key and making sure the circled items in the image below are selected.
                    </h4>

                    <BR colSize={this.state.colSize} />

                    <img className={`col${this.state.colSize}-11 middle-align center-text`} src={instructions} alt="Instructions" />

                    <BR colSize={this.state.colSize} />

                    <h4 className={`col${this.state.colSize}-9 middle-align center-text`}>
                        You can still view the site on a computer without enabling mobile view, but understand the styling will not be optimized.
                    </h4>

                    <BR colSize={this.state.colSize} />

                    {/* Continue button */}
                    <button
                        className={`col${this.state.colSize}-3 middle-align center-text`}
                        onClick={(): void => this.setState({ showWarning: !this.state.showWarning })}
                    >Continue</button>
                </div>
                : <div className={`container container-${this.state.device}`}>
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 landing-page-title-h1 center-text`}>
                            Info About This App
                        </h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-11`}>
                            <Link to="/dashboard/landing-page">Enter Webapp</Link>
                        </div>

                        <div className={`col${this.state.colSize}-11 card custom-card middle-align`}>
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
                        <div className={`col${this.state.colSize}-11 card custom-card middle-align`}>
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
                        <div className={`col${this.state.colSize}-11 card custom-card middle-align`}>
                            <h4>Deployment</h4>
                            <ul>
                                <li>Heroku</li>
                                <li>GitHub</li>
                            </ul>
                        </div>
                    </div>
                </div>

        }

        return this.state.device === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}

export default Home;