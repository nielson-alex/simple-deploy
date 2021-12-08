import { PureComponent, createRef, RefObject } from "react";
// import OutsideClickHandler from "react-outside-click-handler";
import { Link, Redirect } from "react-router-dom";
import dashboardRoutes from "../dashboardRoutes";
import AccordionFC from "../components/functional-components/AccordionFC";
import {
    GroupFC,
    LinkFC,
    DesktopSignoutLinkFC
} from "./functional-components/DashboardFC";                   /* Functional components */
import { Props, User } from "../types/TGlobal";                 /* Types*/
import { State, TRenderable } from "../types/TDashboard";       /* Types */
import whiteLogo from "../images/Equinox icon white.png";       /* Images */
import "../css/GlobalCSS.css";
import "../css/DashboardCSS.css";                               /* CSS */
import eqxLogo from "../images/EquinoxLogoWideWhite.png";       /* Imported Media */
import { stringify } from "querystring";

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
            colSize: "",
            device: ""
        } as State;

        // if (props?.user) {
        //     if (props?.user !== undefined) {
        //         user = props?.user;
        //     }
        // }

        this._isMounted = false;
        this.mobileMenuIcon = createRef()
        this.navOptionsRowCont = createRef();
        this.mobileMenuIcon = createRef()
        this.navOptionsRowCont = createRef();

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

    async getUserBySession(): Promise<void> {
        let user: {
            _id: string;
            email: string;
            firstName: string;
            lastName: string;
        } = {
            _id: "",
            email: "",
            firstName: "",
            lastName: "",
        }

        let cookies = null;

        if (document.cookie) {
            const breakpoint = document.cookie.indexOf("=");

            cookies = {
                session: document.cookie.substr(breakpoint + 1, document.cookie.length - 1)
            };

            await fetch("/auth/get_user_by_session", {
                method: "GET",
                headers: {
                    "id": cookies.session
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.data) {
                        if (res.data[0]) {
                            return res?.data[0]
                        }
                    }
                })
                .then(res => {
                    user = {
                        _id: res._id,
                        email: res.email,
                        firstName: res.first_name,
                        lastName: res.last_name,
                    }

                    this.setState({
                        user: user
                    }, (): void => {

                    })
                })
        }
    }

    outsideClick = () => {
        let { current } = this.navOptionsRowCont
        if (this.state.navMenuOpen === false) {
            this.setState({ navMenuOpen: false });
        } else {
            current.classList.add(`dashboard--hide-nav-options-cont-${this.state.device}`);
            current.classList.remove(`dashboard--nav-options-cont-${this.state.device}`);
            setTimeout(() => {
                this.setState({ navMenuOpen: false });
            }, 100);
        }
    }

    signout: () => void = (): void => {
        function get_cookie(name: string) {
            return document.cookie.split(';').some(c => {
                return c.trim().startsWith(name + '=');
            });
        }

        if (get_cookie("agn.connect.session")) {
            document.cookie = "agn.connect.session=" +
                ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        }

        localStorage.removeItem("eqxState");
        window.location.replace("/login");
        window.location.reload();
        this.redirectToLanding();
    }

    menuClick: () => void = (): void => {
        let { current } = this.navOptionsRowCont as RefObject<any>;

        // this.setState({
        //     clickedNavIcon: true
        // });

        if (this.state.navMenuOpen === false) {
            current.classList.add(`dashboard--nav-options-cont-${this.state.device}`);
            current.classList.remove(`dashboard--hide-nav-options-cont-${this.state.device}`);

            this.setState({
                navMenuOpen: !this.state.navMenuOpen
            });
        } else {
            current.classList.add(`dashboard--hide-nav-options-cont-${this.state.device}`);
            current.classList.remove(`dashboard--nav-options-cont-${this.state.device}`);

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
                    <GroupFC keyNum="0" text="Home" device={this.state.device}>

                        {/* Home */}
                        <LinkFC text="Home" to="landing-page" handleClick={this.menuClick} colSize={this.state.colSize} device={this.state.device} />
                    </GroupFC>

                    {/* Resume Main */}
                    <GroupFC keyNum="0" text="Resume" device={this.state.device}>

                        {/* Resume */}
                        <LinkFC text="Alex Nielson's Resume" to="resume/resume" handleClick={this.menuClick} colSize={this.state.colSize} device={this.state.device} />
                    </GroupFC>

                    {/* Language Learning Main */}
                    <GroupFC keyNum="0" text="Language Learning" device={this.state.device}>
                        {/* Decks */}
                        <LinkFC text="Decks" to="language-learning/decks" handleClick={this.menuClick} colSize={this.state.colSize} device={this.state.device} />

                        {/* Create Deck */}
                        <LinkFC text="Create Deck" to="language-learning/create-deck" handleClick={this.menuClick} colSize={this.state.colSize} device={this.state.device} />
                    </GroupFC>

                    {/* Beta Main */}
                    <GroupFC keyNum="0" text="Beta" device={this.state.device}>

                        {/* Collection */}
                        <LinkFC text="Collection" to="testing/my-collection" handleClick={this.menuClick} colSize={this.state.colSize} device={this.state.device} />

                        {/* Environment Testing */}
                        <LinkFC text="Environment Testing" to="testing/environment-testing" handleClick={this.menuClick} colSize={this.state.colSize} device={this.state.device} />

                        {/* Labor Tracking */}
                        <LinkFC text="Labor Tracking" to="testing/labor-tracking" handleClick={this.menuClick} colSize={this.state.colSize} device={this.state.device} />
                    </GroupFC>
                </div>
            );
        }

        const createContainer: () => JSX.Element = (): JSX.Element => {
            if (this.state.device === "mobile") {
                return (
                    <div className="main-dash-container">

                        <nav id={`dashboard--top-nav-${this.state.device}`} className="center-text">
                            {/* <OutsideClickHandler onOutsideClick={this.outsideClick} > */}

                            {/* Hamburger icon */}
                            <h2 style={{ color: "white", width: "100%", padding: "0", margin: "0" }} onClick={this.menuClick}>☰</h2>

                            <div className={`dashboard--hide-nav-options-cont-${this.state.device}`} ref={this.navOptionsRowCont as any}>
                                {createGroups()}
                                <hr />

                                {/* Log out button (mobile) */}
                                <h2>
                                    <div
                                        className="item"
                                        onClick={(): void => {
                                            localStorage.removeItem("eqxState");
                                            this.setState({
                                                redirectToLogin: true
                                            });
                                        }}
                                    >
                                        <p id={`dashboard--nav-option-text-${this.state.device}`} onClick={this.signout}>Logout</p>
                                    </div>
                                </h2>
                            </div>

                            {/* </OutsideClickHandler> */}

                        </nav>
                        {dashboardRoutes(this.props.user)}
                    </div>
                )
            } else {
                return (
                    <div className="main-dash-container">
                        <div className="container-fluid">
                            <div className={`row`}>
                                <div className={this.state.desktopNavMinimized === false ? "px-1 dashboard--left-nav-section" : "px-1 dashboard--left-nav-section-minimized"}>
                                    {this.state.desktopNavMinimized === true
                                        ? <div className={`py-2 sticky-top flex-grow-1 dashboard--side-nav-${this.state.device}`}>
                                            <p
                                                className="dashboard--nav-button"
                                                onClick={(): void => {
                                                    this.setState({
                                                        desktopNavMinimized: !this.state.desktopNavMinimized
                                                    });
                                                }}
                                            >▶</p>
                                        </div>
                                        : <>
                                            <div
                                                className={`py-2 sticky-top flex-grow-1 dashboard--side-nav-${this.state.device}`}
                                                ref={this.mobileMenuIcon as any}
                                            >
                                                <p
                                                    className="dashboard--nav-button"
                                                    onClick={(): void => {
                                                        this.setState({
                                                            desktopNavMinimized: !this.state.desktopNavMinimized
                                                        });
                                                    }}
                                                >◀&nbsp;&nbsp;</p>

                                                {createGroups()}

                                                <div className="dashboard--divider-div" />

                                                {/* Sign Out (desktop) */}
                                                <DesktopSignoutLinkFC
                                                    text="Sign Out"
                                                    icon="dashboard--menu-icon fas fa-print"
                                                    colSize={this.state.colSize}
                                                    device={this.state.device}
                                                    onClick={this.signout}
                                                />
                                            </div>
                                        </>
                                    }
                                </div>
                                <div
                                    className={this.state.desktopNavMinimized === false
                                        ? "dashboard--right-content-section"
                                        : "dashboard--right-content-section-full-screen"
                                    }
                                    id="main"
                                >
                                    {dashboardRoutes(this.props.user)}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }

        // if (!user || user === undefined || user === null || user?.id < 0) {
        //     return <Redirect to="/login" />;
        // } else {

        return this.state.user._id !== ""
            ? createContainer()
            : <></>;
        // }
    }
}