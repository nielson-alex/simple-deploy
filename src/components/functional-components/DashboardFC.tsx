import { FC, forwardRef, useRef, RefObject } from "react";
// import Accordion from "react-bootstrap/Accordion";
// import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import {
    FCIDesktopGroup,
    FCIDesktopLink,
    FCIDesktopSignoutLink,
    FCIMobileGroup,
    FCIMobileLink
} from "../../interfaces/functional-components/FCIDashboard";
import AccordionFC from "../../components/functional-components/AccordionFC";
import "../../css/DashboardCSS.css";                            /* CSS */

export const DesktopGroupFC: FC<FCIDesktopGroup> = ({ text, children }) =>
    <AccordionFC title={`${text}`}>
        <h2 className={`dashboard--side-menu-h2 ${text === "Beta" ? "beta" : ""}`}>{text}</h2>
        <div>
            {children}
        </div>
    </AccordionFC>

export const DesktopLinkFC: FC<FCIDesktopLink> = ({ to, text, ref, icon/*, props */ }) =>
    <div className="accordion">
        <AccordionFC title="Collapsible Item #1">
            <div>
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
                skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid.
            </div>
        </AccordionFC>
    </div>;

export const DesktopSignoutLinkFC: FC<FCIDesktopSignoutLink> = ({ text, onClick }) =>
    <div className="row">
        <Link
            to=""
            id="dashboard--side-menu-collapse"
            className={`dashboard--side-menu-h2 ${text === "Beta" ? "beta" : ""} eqx-dash-sign-out`}
        >
            {/* <div className="col-1">
                    <p><i className={icon} /></p>
                </div> */}
            <div className="col-12 dLinkText" onClick={onClick}>
                {text}
            </div>
        </Link>
    </div>

export const MobileGroupFC: FC<FCIMobileGroup> = forwardRef(({ keyNum, text, condition, children, handleClick }, ref) => {
    const mobileGroup: RefObject<any> = useRef(ref);
    const menuClick2: () => void = (): void => {
        let { current } = mobileGroup as RefObject<any>;
        console.log("current:", current);
        // this.setState({
        //     clickedNavIcon: true
        // });

        // if (this.state.navMenuOpen === false) {
        //     current.classList.add("mobile-nav-options-cont");
        //     current.classList.remove("mobile-hide-nav-options-cont");

        //     this.setState({
        //         navMenuOpen: !this.state.navMenuOpen
        //     });
        // } else {
        //     current.classList.add("mobile-hide-nav-options-cont");
        //     current.classList.remove("mobile-nav-options-cont");

        //     this.setState({
        //         navMenuOpen: !this.state.navMenuOpen
        //     });
        // }
    }

    return (
        <AccordionFC title="Test">
            <h2 className={`dashboard--mobile-menu-h2 ${text === "Beta" ? "beta" : ""}`} ref={ref as RefObject<any>}>{text}</h2>
            <div ref={ref as RefObject<any>}>
                {children}
            </div>
        </AccordionFC>
    );
});

export const MobileLinkFC: FC<FCIMobileLink> = forwardRef(({ to, text, icon, onClick, condition }, ref) => {
    const mobileLink: RefObject<HTMLDivElement> = useRef(null);
    const showRef: () => void = (): void => {
        console.log("ref:", mobileLink);
    }

    return (
        <div ref={ref as RefObject<any>}>
            <h2 id="mobile-nav-option"  /* onClick={onClick} */ ref={ref as RefObject<any>}>
                {/* <i className={icon} /> */}
                <Link className="item" to={`/dashboard/${to}`} ref={ref as RefObject<any>}>
                    <p id="mobile-nav-option-text" ref={ref as RefObject<any>}>{text}</p>
                </Link>
            </h2>
        </div>
    );
});