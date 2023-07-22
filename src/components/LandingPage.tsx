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
        this.state = {} as State;

        this._determineColSize = this._determineColSize.bind(this);
        this._determineDevice = this._determineDevice.bind(this);
    }

    componentDidMount(): void {
        this._isMounted = true;
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
                        <h1 className={`col${this._determineColSize()}-12 landing-page--page-title-h1-${this._determineDevice()} center-text`}>
                            Welcome, {this.props.user.first_name}
                        </h1>
                    </div>

                    {/* Sign In Link */}
                    <div className="row">
                        <Link to="/dashboard/login" className={`col${this._determineColSize()}-11`}>Sign In</Link>
                    </div>

                    {/* Language Learning Link */}
                    <div className="row">
                        <Link to="/dashboard/language-learning/decks" className={`col${this._determineColSize()}-11`}>Language Learning Flashcard App</Link>
                    </div>

                    {/* Resume Link */}
                    <div className="row">
                        <Link to="/dashboard/resume/resume" className={`col${this._determineColSize()}-11`}>View Alex Nielson's Resume</Link>
                    </div>

                    <BR colSize={this._determineColSize()} />

                    <div className="row">
                        <div className={`col${this._determineColSize()}-11 card custom-card middle-align`}>
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
                <div className={`container container-${this._determineDevice()}`}>
                    <div className="row">
                        <h1 className={`col${this._determineColSize()}-12 landing-page--page-title-h1-${this._determineDevice()} center-text`}>
                            Welcome, {this.props.user.first_name}
                        </h1>
                    </div>

                    {/* Sign In Link */}
                    <div className="row">
                        <Link to="/dashboard/login" className={`col${this._determineColSize()}-11`}>Sign In</Link>
                    </div>

                    {/* Language Learning Link */}
                    <div className="row">
                        <Link to="/dashboard/language-learning/decks" className={`col${this._determineColSize()}-11`}>Language Learning Flashcard App</Link>
                    </div>

                    {/* Resume Link */}
                    <div className="row">
                        <Link to="/dashboard/resume/resume" className={`col${this._determineColSize()}-11`}>View Alex Nielson's Resume</Link>
                    </div>

                    <BR colSize={this._determineColSize()} />

                    <div className="row">
                        <div className={`col${this._determineColSize()}-11 card custom-card middle-align`}>
                            <p>While some features on this app are complete like reading from and saving to the server, please have patience
                                with the parts of the site that are incomplete.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return this._determineDevice() === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}

export default LandingPage;