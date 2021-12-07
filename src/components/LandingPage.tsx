import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { BR } from "../components/functional-components/GlobalFC";
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
            console.log("this.props:", this.props);
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
                        <h1 className={`col${this.state.colSize}-12 landing-page--page-title-h1-${this.state.device} center-text`}>
                            Welcome, {this.props.user.first_name}
                        </h1>
                    </div>

                    {/* Sign In Link */}
                    <div className="row">
                        <Link to="/dashboard/login" className={`col${this.state.colSize}-11`}>Sign In</Link>
                    </div>

                    {/* Language Learning Link */}
                    <div className="row">
                        <Link to="/dashboard/language-learning/decks" className={`col${this.state.colSize}-11`}>Language Learning Flashcard App</Link>
                    </div>

                    {/* Resume Link */}
                    <div className="row">
                        <Link to="/dashboard/resume/resume" className={`col${this.state.colSize}-11`}>View Alex Nielson's Resume</Link>
                    </div>

                    <BR colSize={this.state.colSize} />

                    <div className="row">
                        <div className={`col${this.state.colSize}-11 card custom-card middle-align`}>
                            <p>While some features on this app are complete like reading from and saving to the server, please have patience
                                with the parts of the site that are incomplete.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className={`container container-${this.state.device}`}>
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 landing-page--page-title-h1-${this.state.device} center-text`}>
                            Welcome, {this.props.user.first_name}
                        </h1>
                    </div>

                    {/* Sign In Link */}
                    <div className="row">
                        <Link to="/dashboard/login" className={`col${this.state.colSize}-11`}>Sign In</Link>
                    </div>

                    {/* Language Learning Link */}
                    <div className="row">
                        <Link to="/dashboard/language-learning/decks" className={`col${this.state.colSize}-11`}>Language Learning Flashcard App</Link>
                    </div>

                    {/* Resume Link */}
                    <div className="row">
                        <Link to="/dashboard/resume/resume" className={`col${this.state.colSize}-11`}>View Alex Nielson's Resume</Link>
                    </div>

                    <BR colSize={this.state.colSize} />

                    <div className="row">
                        <div className={`col${this.state.colSize}-11 card custom-card middle-align`}>
                            <p>While some features on this app are complete like reading from and saving to the server, please have patience
                                with the parts of the site that are incomplete.
                            </p>
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