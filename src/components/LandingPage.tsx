import { PureComponent } from "react";
import { Props } from "../types/TGlobal";
import { State } from "../types/TLandingPage";
import logo from "../logo.svg";

class LandingPage extends PureComponent<Props, State> {
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
            this.updateWindowDimensions();
        }
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
                <></>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <div className="container">
                    <div className="row">
                        <h1 className={`col${this.state.colSize}-12 center-text`}>Welcome</h1>
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