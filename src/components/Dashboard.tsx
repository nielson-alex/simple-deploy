import { PureComponent, createRef, RefObject } from "react";
// import OutsideClickHandler from "react-outside-click-handler";
import dashboardRoutes from "../dashboardRoutes";
import {
    GroupFC,
    LinkFC,
} from "./functional-components/DashboardFC";                   /* Functional components */
import { Props } from "../types/TGlobal";                 /* Types*/
import { State } from "../types/TDashboard";       /* Types */
import "../css/GlobalCSS.css";
import "../css/DashboardCSS.css";                               /* CSS */

export default class DashboardTSClass extends PureComponent<Props, State> {
    _isMounted: boolean;
    mobileMenuIcon: RefObject<any>;
    navOptionsRowCont: RefObject<any>;

    constructor(props: Props) {
        super(props);

        this.state = {
            clickedNavIcon: false,
            desktopNavMinimized: false,
            desktopNavVisible: true,
            mobileNavVisible: true,
            navMenuOpen: false,
            redirectToLanding: false,
            redirectToLogin: false,
            user: {},
        } as State;

        this._isMounted = false;
        this._determineColSize = this._determineColSize.bind(this);
        this._determineDevice = this._determineDevice.bind(this);
        this.mobileMenuIcon = createRef()
        this.navOptionsRowCont = createRef();
        this.mobileMenuIcon = createRef()
        this.navOptionsRowCont = createRef();
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

    outsideClick = () => {
        let { current } = this.navOptionsRowCont
        if (this.state.navMenuOpen === false) {
            this.setState({ navMenuOpen: false });
        } else {
            current.classList.add(`dashboard--hide-nav-options-cont-${this._determineDevice()}`);
            current.classList.remove(`dashboard--nav-options-cont-${this._determineDevice()}`);
            setTimeout(() => {
                this.setState({ navMenuOpen: false });
            }, 100);
        }
    }

    menuClick: () => void = (): void => {
        let { current } = this.navOptionsRowCont as RefObject<any>;

        // this.setState({
        //     clickedNavIcon: true
        // });

        if (this.state.navMenuOpen === false) {
            current.classList.add(`dashboard--nav-options-cont-${this._determineDevice()}`);
            current.classList.remove(`dashboard--hide-nav-options-cont-${this._determineDevice()}`);

            this.setState({
                navMenuOpen: !this.state.navMenuOpen
            });
        } else {
            current.classList.add(`dashboard--hide-nav-options-cont-${this._determineDevice()}`);
            current.classList.remove(`dashboard--nav-options-cont-${this._determineDevice()}`);

            this.setState({
                navMenuOpen: !this.state.navMenuOpen
            });
        }
    }

    redirectToLanding: () => any = (): any => {
        // if (this.state.redirectToLanding) {
        // return <Redirect to="/dashboard" />;
        // }
    }

    handleToggleNav: () => void = (): void => {
        this.setState({
            desktopNavVisible: !this.state.desktopNavVisible
        });
    }

    render() {
        const createGroups: () => JSX.Element = (): JSX.Element => {
            return (
                <div className="accordion">
                    {/* Home */}
                    <GroupFC keyNum="0" text="Home" device={this._determineDevice()}>

                        {/* Home */}
                        <LinkFC text="Decks" to="language-learning/decks" handleClick={this.menuClick} colSize={this._determineColSize()} device={this._determineDevice()} />
                    </GroupFC>

                    {/* Language Learning Main */}
                    <GroupFC keyNum="2" text="Language Learning" device={this._determineDevice()}>
                        {/* Decks */}
                        <LinkFC text="Decks" to="language-learning/decks" handleClick={this.menuClick} colSize={this._determineColSize()} device={this._determineDevice()} />

                        {/* Create Deck */}
                        <LinkFC text="Create Deck" to="language-learning/create-deck" handleClick={this.menuClick} colSize={this._determineColSize()} device={this._determineDevice()} />
                    </GroupFC>
                </div>
            );
        }

        // if (!user || user === undefined || user === null || user?.id < 0) {
        //     return <Redirect to="/login" />;
        // } else {

        // return this.state.user._id !== ""
        //     ? createContainer()
        //     : <></>;
        // // }

        return (
            <div>
                <div className="dashboard--right-content-section">
                    {dashboardRoutes(this.props.user)}
                </div>
                <div className="dashboard--left-nav-section">
                    <div className="accordion">
                        {createGroups()}
                    </div>
                </div>
            </div>
        );
    }
}