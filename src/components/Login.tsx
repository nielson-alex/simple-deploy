import { PureComponent, ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import { Link, Redirect } from "react-router-dom";
import { Props } from "../types/TGlobal";
import { State } from "../types/TLogin";
import { BR, HR } from "../components/functional-components/GlobalFC";
import "../css/GlobalCSS.css";
import "../css/LoginCSS.css";

export default class Login extends PureComponent<Props, State> {
    _isMounted: boolean;

    constructor(props: Props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: false,
        };

        this._isMounted = true;
        this._determineColSize = this._determineColSize.bind(this);
        this._determineDevice = this._determineDevice.bind(this);
        this.clear = this.clear.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.submit = this.submit.bind(this);
        this.submitOnEnter = this.submitOnEnter.bind(this);
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

    clear(): void {
        this.setState({
            email: "",
            password: ""
        });
    }

    handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const name: string = e.currentTarget.name;
        const value: string = e.currentTarget.value;

        this.setState((prevState: State) => ({
            ...prevState,
            [name]: value
        }));
    }

    handleFocus(e: FocusEvent<HTMLInputElement>): void {
        e.currentTarget.select();
    }

    submit(): void {
        let url: string = "#/dashboard/login";
        console.log("email:", this.state.email);
        console.log("password", this.state.password);
        
        fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/JSON; charset=UTF-8"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then((res: Response): Promise<Response> => res.json())
            .then((res: any): void => {
                const user = res.user;

                if (res.status === "Success") {
                    this.setState({
                        redirect: true
                    }, (): JSX.Element => {
                        document.cookie = `agn.connect.session=${user._id}; expires=${user.session.expiration}; first_name=${user.first_name}; last_name=${user.last_name}; email=${user.email}; isLoggedIn=${user.session.isLoggedIn}`
                        window.location.reload();
                        return <Redirect to="/dashboard/landing-page" />
                    });
                }
            })
    }

    submitOnEnter(e: KeyboardEvent<HTMLInputElement>): void {
        if (e.key === "Enter") {
            this.submit();
        }
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return this.state.redirect !== true
                ? (
                    <div className={`container container-${this._determineDevice()}`}>
                        <div className="row">
                            <h1 className={`col${this._determineColSize()}-12 page-title-h1-${this._determineDevice()} center-text`}>
                                Sign In
                            </h1>
                        </div>

                        <Link to="/dashboard">Back</Link>

                        <HR colSize={this._determineColSize()} />

                        {/* Email */}
                        <div className="row">
                            <label htmlFor="tbEmail" className={`col${this._determineColSize()}-11 middle-align`}>Email:</label>
                            <input
                                type="email"
                                id="tbEmail"
                                className={`col${this._determineColSize()}-11 middle-align`}
                                name="email"
                                onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                                onFocus={(e: FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
                                onKeyUp={(e: KeyboardEvent<HTMLInputElement>): void => this.submitOnEnter(e)}
                            />
                        </div>

                        {/* Password */}
                        <div className="row">
                            <label htmlFor="tbPassword" className={`col${this._determineColSize()}-11 middle-align`}>Password:</label>
                            <input
                                type="password"
                                id="tbPassword"
                                className={`col${this._determineColSize()}-11 middle-align`}
                                name="password"
                                onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                                onFocus={(e: FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
                                onKeyUp={(e: KeyboardEvent<HTMLInputElement>): void => this.submitOnEnter(e)}
                            />
                        </div>

                        <BR colSize={this._determineColSize()} />

                        {/* Submit button */}
                        <div className="row">
                            <button
                                className={`col${this._determineColSize()}-5 middle-align`}
                                onClick={this.submit}
                            >Submit</button>
                        </div>

                        <BR colSize={this._determineColSize()} />

                        {/* Clear button */}
                        <div className="row">
                            <button
                                className={`col${this._determineColSize()}-5 middle-align`}
                                onClick={this.clear}
                            >Clear Fields</button>
                        </div>

                        <HR colSize={this._determineColSize()} />

                        <p className="center-text">Don't have an account? <Link to="/dashboard/signup">Click here to create an account </Link></p>
                    </div>
                )
                : <Redirect to="/dashboard" />
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return this.state.redirect !== true
                ? (
                    <div className={`container container-${this._determineDevice()}`}>
                        <div className="row">
                            <h1 className={`col${this._determineColSize()}-12 page-title-h1-${this._determineDevice()} center-text`}>
                                Sign In
                            </h1>
                        </div>

                        <Link to="/dashboard">Back</Link>

                        <HR colSize={this._determineColSize()} />

                        {/* Email */}
                        <div className="row">
                            <label htmlFor="tbEmail" className={`col${this._determineColSize()}-11 middle-align`}>Email:</label>
                            <input
                                type="email"
                                id="tbEmail"
                                className={`col${this._determineColSize()}-11 middle-align`}
                                name="email"
                                onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                                onFocus={(e: FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
                                onKeyUp={(e: KeyboardEvent<HTMLInputElement>): void => this.submitOnEnter(e)}
                            />
                        </div>

                        {/* Password */}
                        <div className="row">
                            <label htmlFor="tbPassword" className={`col${this._determineColSize()}-11 middle-align`}>Password:</label>
                            <input
                                type="password"
                                id="tbPassword"
                                className={`col${this._determineColSize()}-11 middle-align`}
                                name="password"
                                onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                                onFocus={(e: FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
                                onKeyUp={(e: KeyboardEvent<HTMLInputElement>): void => this.submitOnEnter(e)}
                            />
                        </div>

                        <BR colSize={this._determineColSize()} />

                        {/* Submit button */}
                        <div className="row">
                            <button
                                className={`col${this._determineColSize()}-5 middle-align`}
                                onClick={this.submit}
                            >Submit</button>
                        </div>

                        <BR colSize={this._determineColSize()} />

                        {/* Clear button */}
                        <div className="row">
                            <button
                                className={`col${this._determineColSize()}-5 middle-align`}
                                onClick={this.clear}
                            >Clear Fields</button>
                        </div>

                        <HR colSize={this._determineColSize()} />

                        <p className="center-text">Don't have an account? <Link to="/dashboard/signup">Click here to create an account </Link></p>
                    </div>
                )
                : <Redirect to="/dashboard" />
        }

        return this._determineDevice() === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}