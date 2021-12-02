import { FC, useRef, RefObject } from "react";
import { AccordionFC as Accordion } from "../functional-components/AccordionFC";
import { Link } from "react-router-dom";
import {
    FCTDesktopSignoutLink,
    FCTGroup,
    FCTLink
} from "../../types/functional-components/FCTDashboard";
import "../../css/DashboardCSS.css";                            /* CSS */

export const DesktopSignoutLinkFC: FC<FCTDesktopSignoutLink> = ({ text, onClick }) =>
    <div className="row">
        <Link
            to=""
            id="eqx-dash--side-menu-collapse"
            className={`eqx-dash--side-menu-h2 ${text === "Beta" ? "beta" : ""} eqx-dash--sign-out`}
        >
            {/* <div className="col-1">
                    <p><i className={icon} /></p>
                </div> */}
            <div className="col-12 eqx-dash--dLinkText" onClick={onClick}>
                {text}
            </div>
        </Link>
    </div>

export const GroupFC: FC<FCTGroup> = ({
    condition,      // mobile 
    keyNum,         // mobile
    text,           // both
    children,       // both
    colSize,
    handleClick,    // mobile
    device          // both
}, ref) => {
    const mobileGroup: RefObject<any> = useRef(ref);
    const menuClick2: () => void = (): void => {
        let { current } = mobileGroup as RefObject<any>;
    }

    if (device === "mobile") {
        return (
            <Accordion id="eqx-dash--side-menu-collapse" title={text}>
                <div className={`col${colSize}-11 card custom-card-2 middle-align`}>
                    {children}
                </div>
            </Accordion>
        );
    } else {
        return (
            <Accordion id="eqx-dash--side-menu-collapse" title={text}>
                <div className={`colSize}-11 card custom-card-2 middle-align`}>
                    {children}
                </div>
            </Accordion>
        );
    }
}

export const LinkFC: FC<FCTLink> = ({
    children,       // mobile
    condition,      // mobile
    icon,           // desktop
    keynum,         // mobile
    ref,            // desktop
    text,           // both
    to,             // desktop
    handleClick,    // mobile
    device          // both
}) => {
    const mobileLink: RefObject<HTMLDivElement> = useRef(null);
    const showRef: () => void = (): void => {
        console.log("ref:", mobileLink);
    }

    if (device === "mobile") {
        return (
            <div className="row" onClick={handleClick} /* ref={ref} */>
                <Link
                    id="eqx-dash--mid-nav-option"
                    className="col-12 eqx-dash--dLink"
                    to={`/dashboard/${to}`}
                >
                    {/* <div className="col-1">
                        <p><i className={icon} /></p>
                    </div> */}
                    <div className="col-12 eqx-dash--dLinkText">
                        {text}
                    </div>
                    <hr />
                </Link>
            </div>
        );
    } else {
        return (
            <div /* ref={ref as RefObject<any>} */>
                <h2 className="eqx-dashboard--mobile-nav-option">
                    {/* <i className={icon} /> */}
                    <Link className="item" to={`/dashboard/${to}`} /* ref={ref as RefObject<any>} */>
                        <p id="eqx-dashboard--mobile-nav-option-text" /* ref={ref as RefObject<any>} */>{text}</p>
                    </Link>
                </h2>
            </div>
        );
    }
}