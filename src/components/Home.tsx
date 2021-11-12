import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Props } from "../types/TGlobal";
import { State } from "../types/THome";
import { generateMessage } from "../helpers/functions";
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
                        <h1 className={`col${this.state.colSize}-12 center-text`}>React/TypeScript Single-Page Application</h1>
                        <h3 className={`col${this.state.colSize}-12 center-text`}>Alex Nielson</h3>

                        <label>
                            <h3 className="inline-block">Languages (programming, markup, etc.):</h3>
                            <ul>
                                <li>TypeScript</li>
                                <li>JavaScript</li>
                                <li>HTML</li>
                                <li>CSS</li>
                            </ul>
                        </label>

                        <label>
                            <h3 className="inline-block">Libraries:</h3>
                            <ul>
                                <li>ReactTS</li>
                                <li>Node.js</li>
                            </ul>
                        </label>

                        <label>
                            <h3 className="inline-block">Databases:</h3>
                            <ul>
                                <li>NoSQL</li>
                                <li>PostgreSQL (not currently in use)</li>
                            </ul>
                        </label>

                        <label>
                            <h3 className="inline-block">Database client software:</h3>
                            <ul>
                                <li>MongoDb NoSQL Database</li>
                                <li>PgAdmin (not currently in use)</li>
                            </ul>
                        </label>

                        <label>
                            <h3 className="inline-block">Deployment:</h3>
                            <ul>
                                <li>Heroku</li>
                                <li>GitHub</li>
                            </ul>
                        </label>

                        <Link className={`col${this.state.colSize}-3 middle-align`} to="/dashboard/landing-page">
                            <img src={logo} className="App-logo middle-align" alt="logo" />
                            <p className="italic">Click the icon to enter</p>
                        </Link>
                    </div>

                    {/* 
                        <div className="row">
                            <p>Edit <code>src/App.tsx</code> and save to reload.</p> 
                        </div>        
                    

                        <div className="row">
                            <a
                                className={`col${this.state.colSize}-11 center-text middle-align App-link`}
                                href="https://reactjs.org"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Learn React
                            </a>
                        </div>
                    */}
                </div>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className="middle-align" style={{ margin: "0 auto", padding: "0", width: "96%" }}>
                    <div className="row">
                        <h3 className={`col${this.state.colSize}-12 center-text`}>React/TypeScript Single-Page Application</h3>
                        <Link className={`col${this.state.colSize}-3 middle-align`} to="/dashboard/landing-page">
                            <img src={logo} className="App-logo middle-align" alt="logo" />
                        </Link>
                        <h4 className={`col${this.state.colSize}-12 center-text`}>Alex Nielson</h4>
                    </div>

                    

                    {/* 
                    <div className="row">
                        <p>Edit <code>src/App.tsx</code> and save to reload.</p> 
                    </div>        
                */}

                    <div className="row">
                        <a
                            className={`col${this.state.colSize}-11 center-text middle-align App-link`}
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React
                        </a>
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