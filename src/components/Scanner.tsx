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
            count: 0,
            colSize: "",
            device: ""
        } as State;

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.decrement = this.decrement.bind(this);
        this.increment = this.increment.bind(this);
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
                        <h1 className={`col${this.state.colSize}-12 center-text`}>Counter</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-12`}>
                            <hr />
                        </div>
                    </div>

                    <QrReader
                        className={`labor-tracking--qr-${this.state.device}`}
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
                            className={`col${this.state.colSize}-3 middle-align btn btn-secondary`}
                            onClick={(e: MouseEvent<HTMLButtonElement>): void => this.decrement(e)}
                        >-</button>
                        <label className={`col${this.state.colSize}-1`}>{this.state.count}</label>
                        <button
                            className={`col${this.state.colSize}-3 middle-align btn btn-secondary`}
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
                        <h1 className={`col${this.state.colSize}-12 center-text`}>Counter</h1>
                    </div>

                    <div className="row">
                        <div className={`col${this.state.colSize}-12`}>
                            <hr />
                        </div>
                    </div>

                    <QrReader
                        className={`labor-tracking--qr-${this.state.device}`}
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
                            className={`col${this.state.colSize}-3 middle-align btn btn-secondary`}
                            onClick={(e: MouseEvent<HTMLButtonElement>): void => this.decrement(e)}
                        >-</button>
                        <label className={`col${this.state.colSize}-1`}>{this.state.count}</label>
                        <button
                            className={`col${this.state.colSize}-3 middle-align btn btn-secondary`}
                            onClick={(e: MouseEvent<HTMLButtonElement>): void => this.increment(e)}
                        >+</button>
                    </div>
                </div>
            )
        }

        return this.state.device === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}

export default Scanner;