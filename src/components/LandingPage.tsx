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
                <div className="container">
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 landing-page-title-h1 center-text`}>
                            Info About This App
                        </h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-11`}>
                            <Link to="/dashboard/environment-testing">View Resume</Link>
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
            return (
                <div className="container">
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 center-text`}>
                            App Production Info
                        </h1>
                        <hr />
                    </div>

                    <div className="row">
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

        return this.state.device === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}

export default LandingPage;