import { PureComponent } from "react";
import dashboardRoutes from "../dashboardRoutes";
import { Props } from "../types/TGlobal";
import { State } from "../types/TDashboard";
import { Link } from "react-router-dom";
import "../css/GlobalCSS.css";
import "../css/DashboardCSS.css";

class Dashboard extends PureComponent<Props, State> {
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
                <nav id="dash-nav">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/landing-page">Landing Page</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/counter">Counter</Link>
                        </li>
                    </ul>
                    {dashboardRoutes}
                </nav>
            );
        }

        return this.state.device === "mobile"
            ? mobileRender()
            : desktopRender();
    }
}

export default Dashboard;