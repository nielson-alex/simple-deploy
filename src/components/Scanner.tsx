import { PureComponent, MouseEvent } from "react";
import QrReader from "react-qr-reader";
import { Props } from "../types/TGlobal";
import { State } from "../types/TScanner";
import "../css/GlobalCSS.css";
import "../css/CounterCSS.css";

class Scanner extends PureComponent<Props, State> {
    _isMounted: boolean = false;

    constructor(props: Props) {
        super(props);
        this.state = {
            count: 0
        } as State;

        this.decrement = this.decrement.bind(this);
        this.increment = this.increment.bind(this);
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

    increment(e: MouseEvent<HTMLButtonElement>): void {
        const name: string = e.currentTarget.name;

        this.setState((prevState: State) => ({
            ...prevState,
            [name]: this.state.count - 1
        }));
    }

    decrement(e: MouseEvent<HTMLButtonElement>): void {
        const name: string = e.currentTarget.name;

        this.setState((prevState: State) => ({
            ...prevState,
            [name]: this.state.count + 1
        }));
    }


    render(): JSX.Element {
        const mobileRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className="container">
                    <div className="row">
                        <h1 className={`col${this._determineColSize()}-12 center-text`}>Counter</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this._determineColSize()}-12`}>
                            <hr />
                        </div>
                    </div>

                    <QrReader
                        className={`labor-tracking--qr-${this._determineDevice()}`}
                        delay={300}
                        facingMode="user" // user or environment
                        onError={(): null => null}
                        onScan={(code: string | null): void | null => code !== null
                            ? console.log("code:", code)
                            : null
                        }
                        showViewFinder={true}
                    />

                    <div className="row">
                        <button
                            className={`col${this._determineColSize()}-3 middle-align btn btn-secondary`}
                            onClick={(e: MouseEvent<HTMLButtonElement>): void => this.decrement(e)}
                        >-</button>
                        <label className={`col${this._determineColSize()}-1`}>{this.state.count}</label>
                        <button
                            className={`col${this._determineColSize()}-3 middle-align btn btn-secondary`}
                            onClick={(e: MouseEvent<HTMLButtonElement>): void => this.increment(e)}
                        >+</button>
                    </div>
                </div>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className="container">
                    <div className="row">
                        <h1 className={`col${this._determineColSize()}-12 center-text`}>Counter</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this._determineColSize()}-12`}>
                            <hr />
                        </div>
                    </div>

                    <QrReader
                        className={`labor-tracking--qr-${this._determineDevice()}`}
                        delay={300}
                        facingMode="user" // user or environment
                        onError={(): null => null}
                        onScan={(code: string | null): void | null => code !== null
                            ? console.log("code:", code)
                            : null
                        }
                        showViewFinder={true}
                    />

                    <div className="row">
                        <button
                            className={`col${this._determineColSize()}-3 middle-align btn btn-secondary`}
                            onClick={(e: MouseEvent<HTMLButtonElement>): void => this.decrement(e)}
                        >-</button>
                        <label className={`col${this._determineColSize()}-1`}>{this.state.count}</label>
                        <button
                            className={`col${this._determineColSize()}-3 middle-align btn btn-secondary`}
                            onClick={(e: MouseEvent<HTMLButtonElement>): void => this.increment(e)}
                        >+</button>
                    </div>
                </div>
            )
        }

        return this._determineDevice() === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}

export default Scanner;