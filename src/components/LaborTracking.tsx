import { PureComponent } from "react";
import { Props } from "../types/TGlobal";
import { State } from "../types/TLaborTracking";
import "../css/GlobalCSS.css";
import "../css/LaborTrackingCSS.css";

export default class LaborTracking extends PureComponent<Props, State> {
    _isMounted: boolean;

    constructor(props: Props) {
        super(props);
        this.state = {
            colSize: "",
            device: ""
        } as State;

        this._isMounted = false;
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
                <></>
            );
        }

        const desktopRender: () => JSX.Element = (): JSX.Element => {
            return (
                <></>
            );
        }

        return this.state.device === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}