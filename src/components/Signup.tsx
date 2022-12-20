import { PureComponent, ChangeEvent, FocusEvent } from "react";
import { Link } from "react-router-dom";
import { Props } from "../types/TGlobal";
import { State } from "../types/TSignup";
import { BR, HR } from "../components/functional-components/GlobalFC";
import "../css/GlobalCSS.css";
import "../css/SignupCSS.css";
import { generateMessage } from "../helpers/functions";

export default class Signup extends PureComponent<Props, State> {
    _isMounted: boolean;

    constructor(props: Props) {
        super(props);
        this.state = {
            email: "alexnielson90@gmail.com",
            firstName: "Alex",
            lastName: "Nielson",
            password: "123456",
        };

        this._isMounted = true;
        this.allFieldsValid = this.allFieldsValid.bind(this);
        this.clear = this.clear.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
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

    allFieldsValid(): boolean {
        let isValid: boolean = true;

        if (this.state.firstName === "") {
            generateMessage("error", "Please provide a first name");
            isValid = false;
        } else if (this.state.lastName === "") {
            generateMessage("error", "Please provide a last name");
            isValid = false;
        } else if (this.state.email === "") {
            generateMessage("error", "Please provide a valid email address");
            isValid = false;
        } else if (this.state.password === "") {
            generateMessage("error", "Please provide a password");
            isValid = false;
        }

        return isValid;
    }

    clear(): void {
        this.setState({
            email: "",
            firstName: "",
            lastName: "",
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
        if (this.allFieldsValid() === true) {
            fetch("/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON; charset=UTF-8"
                },
                body: JSON.stringify({
                    email: this.state.email,
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    password: this.state.password
                })
            })
                .then((res: Response): Promise<Response> => res.json())
                .then((res: any): void => {
                    if (res.status === "Success") {
                        generateMessage("success", "Account created");
                    }
                });
        }
    }

    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className={`container container-${this._determineDevice()}`}>
                    <div className="row">
                        <h1 className={`col${this._determineColSize()}-12 page-title-h1-${this._determineDevice()} center-text`}>
                            Create Account
                        </h1>
                    </div>

                    <Link to="/dashboard/login">Back</Link>

                    <HR colSize={this._determineColSize()} />

                    {/* First Name */}
                    <div className="row">
                        <label htmlFor="tbFirstName" className={`col${this._determineColSize()}-11 middle-align`}>First Name:</label>
                        <input
                            type="text"
                            id="tbFirstName"
                            className={`col${this._determineColSize()}-11 middle-align`}
                            name="firstName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                            onFocus={(e: FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
                        />
                    </div>

                    {/* Last Name */}
                    <div className="row">
                        <label htmlFor="tbLastName" className={`col${this._determineColSize()}-11 middle-align`}>Last Name:</label>
                        <input
                            type="text"
                            id="tbLastName"
                            className={`col${this._determineColSize()}-11 middle-align`}
                            name="lastName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                            onFocus={(e: FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
                        />
                    </div>

                    {/* Email */}
                    <div className="row">
                        <label htmlFor="tbEmail" className={`col${this._determineColSize()}-11 middle-align`}>Email:</label>
                        <input
                            type="text"
                            id="tbEmail"
                            className={`col${this._determineColSize()}-11 middle-align`}
                            name="email"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                            onFocus={(e: FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
                        />
                    </div>

                    {/* Password */}
                    <div className="row">
                        <label htmlFor="tbPassword" className={`col${this._determineColSize()}-11 middle-align`}>Password:</label>
                        <input
                            type="text"
                            id="tbPassword"
                            className={`col${this._determineColSize()}-11 middle-align`}
                            name="password"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                            onFocus={(e: FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
                        />
                    </div>

                    <div className="row">
                        <div className={`col${this._determineColSize()}-11`}>
                            <br />
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="row">
                        <button
                            className={`col${this._determineColSize()}-5 middle-align`}
                            onClick={this.submit}
                        >Submit</button>
                    </div>

                    <div className="row">
                        <div className={`col${this._determineColSize()}-11`}>
                            <br />
                        </div>
                    </div>

                    {/* Clear button */}
                    <div className="row">
                        <button
                            className={`col${this._determineColSize()}-5 middle-align`}
                            onClick={this.clear}
                        >Clear Fields</button>
                    </div>
                </div>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className={`container container-${this._determineDevice()}`}>
                    <div className="row">
                        <h1 className={`col${this._determineColSize()}-12 page-title-h1-${this._determineDevice()} center-text`}>
                            Create Account
                        </h1>
                    </div>

                    <Link to="/dashboard/login">Back</Link>

                    <HR colSize={this._determineColSize()} />

                    {/* First Name */}
                    <div className="row">
                        <label htmlFor="tbFirstName" className={`col${this._determineColSize()}-11 middle-align`}>First Name:</label>
                        <input
                            type="text"
                            id="tbFirstName"
                            className={`col${this._determineColSize()}-11 middle-align`}
                            name="firstName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                            onFocus={(e: FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
                        />
                    </div>

                    {/* Last Name */}
                    <div className="row">
                        <label htmlFor="tbLastName" className={`col${this._determineColSize()}-11 middle-align`}>Last Name:</label>
                        <input
                            type="text"
                            id="tbLastName"
                            className={`col${this._determineColSize()}-11 middle-align`}
                            name="lastName"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                            onFocus={(e: FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
                        />
                    </div>

                    {/* Email */}
                    <div className="row">
                        <label htmlFor="tbEmail" className={`col${this._determineColSize()}-11 middle-align`}>Email:</label>
                        <input
                            type="text"
                            id="tbEmail"
                            className={`col${this._determineColSize()}-11 middle-align`}
                            name="email"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                            onFocus={(e: FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
                        />
                    </div>

                    {/* Password */}
                    <div className="row">
                        <label htmlFor="tbPassword" className={`col${this._determineColSize()}-11 middle-align`}>Password:</label>
                        <input
                            type="text"
                            id="tbPassword"
                            className={`col${this._determineColSize()}-11 middle-align`}
                            name="password"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => this.handleChange(e)}
                            onFocus={(e: FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
                        />
                    </div>

                    <div className="row">
                        <div className={`col${this._determineColSize()}-11`}>
                            <br />
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="row">
                        <button
                            className={`col${this._determineColSize()}-5 middle-align`}
                            onClick={this.submit}
                        >Submit</button>
                    </div>

                    <div className="row">
                        <div className={`col${this._determineColSize()}-11`}>
                            <br />
                        </div>
                    </div>

                    {/* Clear button */}
                    <div className="row">
                        <button
                            className={`col${this._determineColSize()}-5 middle-align`}
                            onClick={this.clear}
                        >Clear Fields</button>
                    </div>
                </div>
            );
        }

        return this._determineDevice() === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}