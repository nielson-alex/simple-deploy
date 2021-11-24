import { PureComponent, createRef, RefObject } from "react";
import { Link } from "react-router-dom";
// import OutsideClickHandler from "react-outside-click-handler";
import { Redirect } from "react-router-dom";
import dashboardRoutes from "../dashboardRoutes";
import AccordionFC from "./functional-components/AccordionFC";
import {
    DesktopGroupFC,
    DesktopLinkFC,
    DesktopSignoutLinkFC,
    MobileGroupFC,
    MobileLinkFC
} from "./functional-components/DashboardFC";                   /* Functional components */
import { Props, User } from "../types/TGlobal";                 /* Types*/
import { State, TRenderable } from "../types/TDashboard";       /* Types */
import whiteLogo from "../images/Equinox icon white.png";       /* Images */
import "../css/GlobalCSS.css";
import "../css/DashboardCSS.css";                               /* CSS */
import "../css/functional-components/AccordionFCCSS.css";
import eqxLogo from "../images/EquinoxLogoWideWhite.png";       /* Imported Media */

let user = {
    id: -1,
    active: 0,
    department: -1,
    email: "",
    employee: false,
    firstName: "",
    gid: -1,
    lastName: "",
    loggedIn: false,
    username: "",
    sharedAccount: 0
} as User;

const accounting: TRenderable = { gid: 1, departments: [101, 106, 116] } as TRenderable;
const accounts: TRenderable = { gid: 2, departments: [116, 114] } as TRenderable;
const beta: TRenderable = { gid: 0, departments: [999] } as TRenderable;
const hr: TRenderable = { gid: 1, departments: [106, 111, 116] } as TRenderable;
const fulfillment: TRenderable = { gid: 1, departments: [1, 2, 3, 101, 106, 116] } as TRenderable;
const main: TRenderable = { gid: 0, departments: [999] } as TRenderable;
const procurement: TRenderable = { gid: 0, departments: [1, 2, 3, 101, 106, 116, 146] } as TRenderable;
const production: TRenderable = { gid: 0, departments: [1, 2, 106, 116, 121, 126, 131, 136] } as TRenderable;
const test: TRenderable = { gid: 4, departments: [116] } as TRenderable;
const warehouse: TRenderable = { gid: 1, departments: [1, 2, 106, 116, 121, 126, 131, 136] } as TRenderable;

export default class Dashboard extends PureComponent<Props, State> {
    _isMounted: boolean = false;
    mobileMenuIcon = createRef()
    navOptionsRowCont = createRef();

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
            colSize: "",
            device: ""
        } as State;

        if (props?.user) {
            if (props?.user !== undefined) {
                user = props?.user;
            }
        }

        this.mobileMenuIcon = createRef()
        this.navOptionsRowCont = createRef();
    }

    componentDidMount(): void {
        this._isMounted = true;

        if (this._isMounted === true) {
            window.addEventListener("resize", this.updateWindowDimensions);
            this.updateWindowDimensions();
        }
    }

    componentWillUnmount(): void {
        this._isMounted = false;

        if (this._isMounted === false) {
            window.removeEventListener("resize", this.updateWindowDimensions);
        }
    }

    // Conditional rendering functions
    updateWindowDimensions: () => void = (): void => {
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

    signout: () => void = (): void => {
        // localStorage.removeItem("eqxState");
        // window.location.replace("/login");
        // window.location.reload();
    }

    menuClick: () => void = (): void => {
        let { current } = this.navOptionsRowCont as RefObject<any>;

        // this.setState({
        //     clickedNavIcon: true
        // });

        if (this.state.navMenuOpen === false) {
            current.classList.add("mobile-nav-options-cont");
            current.classList.remove("mobile-hide-nav-options-cont");

            this.setState({
                navMenuOpen: !this.state.navMenuOpen
            });
        } else {
            current.classList.add("mobile-hide-nav-options-cont");
            current.classList.remove("mobile-nav-options-cont");

            this.setState({
                navMenuOpen: !this.state.navMenuOpen
            });
        }
    }

    redirectToLanding: () => any = (): any => {
        if (this.state.redirectToLanding) {
            return <Redirect to="/dashboard/dash-landing-page-typescript" />;
        }
    }

    handleToggleNav: () => void = (): void => {
        this.setState({
            desktopNavVisible: !this.state.desktopNavVisible
        });
    }

    // Renders view for mobile devices
    mobileRender: () => JSX.Element = (): JSX.Element => {
        let bOrM: string = this.state.colSize === "xs" || this.state.colSize === "xs"
            ? "mini"
            : "big";

        return (
            <div className="main-dash-container">
                {this.redirectToLanding()}
                <nav id="mobile-top-nav" className="eqx-center-text">
                    <div
                        className={`showMobileIconCont-${bOrM}`}

                    >
                        <i className={`big inverted bars icon ${bOrM}`} />
                    </div>
                    <h2
                        className={`mobile-logo-image eqx-center-text eqx-dashboard-menu-icon-${this.state.device}`}
                        onClick={this.menuClick}
                    >☰</h2>
                    <div className="mobile-hide-nav-options-cont" ref={this.navOptionsRowCont as any}>
                        {/* <OutsideClickHandler onOutsideClick={() => console.log("")} /* onOutsideClick={this.outsideClick} /> */}

                        {/*============================== 
                        |         Test (mobile)         |
                        ==============================*/}
                        <div className="App2">
                            <div className="accordion">
                                {/* Testing /}
                                <AccordionFC title="Testing">
                                    <ul className="subnav-ul">
                                        <li className="subnav-ul-li">
                                            <Link to="/dashboard/testing/environment-testing">
                                                Environment Testing
                                            </Link>
                                        </li>
                                        <li className="subnav-ul-li">
                                            <Link to="/dashboard/testing/labor-tracking">
                                                Labor Tracking
                                            </Link>
                                        </li>
                                        <li className="subnav-ul-li">
                                            <Link to="/dashboard/testing/my-collection">
                                                My Collection
                                            </Link>
                                        </li>
                                    </ul>
                                </AccordionFC>
                    */}

                                {/* Language Learning */}
                                <AccordionFC title="Language Learning" menuClick={this.menuClick}>
                                    <ul className="subnav-ul">
                                        <li className="subnav-ul-li">
                                            <Link to="/dashboard/language-learning/decks">
                                                Decks
                                            </Link>
                                        </li>
                                        <li className="subnav-ul-li">
                                            <Link to="/dashboard/language-learning/create-deck">
                                                Create New Deck
                                            </Link>
                                        </li>
                                    </ul>
                                </AccordionFC>

                                {/* Resume */}
                                <AccordionFC title="Work Experience">
                                    <ul className="subnav-ul">
                                        <li className="subnav-ul-li">
                                            <Link to="/dashboard/resume/resume">
                                                Resume
                                            </Link>
                                        </li>
                                        <li className="subnav-ul-li">
                                            <Link to="/dashboard/resume/add-work-experience">
                                                Add Work Experience
                                            </Link>
                                        </li>
                                    </ul>
                                </AccordionFC>

                                {/* Shelter /}
                                <AccordionFC title="Shelter">
                                    <ul className="subnav-ul">
                                        <li className="subnav-ul-li">
                                            <Link to="/dashboard/shelter/animals">
                                                AGN Animal Shelter
                                            </Link>
                                        </li>
                                    </ul>
                                </AccordionFC>
                    */}
                            </div>
                        </div>

                        <h2 id="mobile-nav-option">
                            <i className="inverted green user circle outline icon" />
                            <div className="item" onClick={(): void => {
                                // localStorage.removeItem("eqxState");
                                // this.setState({
                                //     redirectToLogin: true
                                // });
                            }}>
                                {/* <p id="mobile-nav-option-text" onClick={this.signout}>Logout</p> */}
                            </div>
                        </h2>
                        {/* </OutsideClickHandler> */}
                    </div>
                </nav>

                <div className="fourteen wide column" id="mobile-main-content-cont">
                    {dashboardRoutes}
                </div>
            </div>
        );
    }

    // Renders view for tablets and computers
    desktopRender: () => JSX.Element = (): JSX.Element => {
        return (
            <div className="main-dash-container">
                <div className="container-fluid">
                    <div className={`row eqx-100vh`}>
                        <div className={this.state.desktopNavMinimized === false ? "px-1 left-nav-section" : "px-1 left-nav-section-minimized"}>
                            {this.state.desktopNavMinimized === true
                                ? <div className={`py-2 sticky-top flex-grow-1 eqx-dashboard-side-nav-${this.state.device}`}>
                                    <p
                                        className="eqx-dash-nav-button"
                                        onClick={(): void => {
                                            this.setState({
                                                desktopNavMinimized: !this.state.desktopNavMinimized
                                            });
                                        }}
                                    >▶</p>
                                </div>
                                : <>
                                    <div
                                        className={`py-2 sticky-top flex-grow-1 eqx-dashboard-side-nav-${this.state.device}`}
                                        ref={this.mobileMenuIcon as any}
                                    >
                                        <p
                                            className="eqx-dash-nav-button"
                                            onClick={(): void => {
                                                this.setState({
                                                    desktopNavMinimized: !this.state.desktopNavMinimized
                                                });
                                            }}
                                        >◀&nbsp;&nbsp;</p>
                                        <div className="flex-sm-column">

                                            {/*=============================== 
                                            |         Test (desktop)         |
                                            ===============================*/}
                                            {/*
                                            <DesktopGroupFC text="Test">
                                                {/*     -JavaScript- 
                                                    EnvironmentTestingJSClass (desktop) /}
                                                <DesktopLinkFC
                                                    to="beta/environment-testing-js-class"
                                                    text="Environment Testing (JavaScript)"
                                                    icon="menu-icon fas fa-print"
                                                />
                                            </DesktopGroupFC>

                                            <div className="eqx-dash-divider-div" />

                                            {/* Sign Out (desktop) /}
                                            <DesktopSignoutLinkFC
                                                text="Sign Out"
                                                icon="menu-icon fas fa-print"
                                                onClick={this.signout}
                                                /> 
                                                */}
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        <div
                            className={this.state.desktopNavMinimized === false
                                ? "right-content-section"
                                : "right-content-section-full-screen"
                            }
                            id="main"
                        >
                            {dashboardRoutes}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            // user.loggedIn === false
            // ? <Redirect to="/login" />
            // : 
            this.state.device === "mobile"
                ? this.mobileRender()
                : this.desktopRender()
        );
    }
}