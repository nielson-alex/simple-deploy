import { FC } from "react";
import { AccordionFC as Accordion } from "../functional-components/AccordionFC";
import { Link } from "react-router-dom";
import {
    FCTDesktopSignoutLink,
    FCTGroup,
    FCTLink
} from "../../types/functional-components/FCTDashboard";
import "../../css/DashboardCSS.css";                            /* CSS */

export const DesktopSignoutLinkFC: FC<FCTDesktopSignoutLink> = ({ text, colSize, device, onClick }) => (
    <div className="row">
        <Link
            to=""
            id="dashboard--side-menu-collapse"
            className={`dashboard--side-menu-h2 ${text === "Beta" ? "beta" : ""} dashboard--sign-out`}
        >
            {/* <div className="col-1">
                    <p><i className={icon} /></p>
                </div> */}
            <div className={`col${colSize}-12 dashboard--dLinkText-${device}`} onClick={onClick}>
                {text}
            </div>
        </Link>
    </div>
);

export const GroupFC: FC<FCTGroup> = ({
    condition,      // mobile 
    keyNum,         // mobile
    text,           // both
    children,       // both
    colSize,
    device,          // both
    handleClick,    // mobile
}, ref) => {
    if (device === "mobile") {
        return (
            <Accordion id="dashboard--side-menu-collapse" title={text} device={device}>
                <div className={`col${colSize}-11 card custom-card-2 middle-align`}>
                    {children}
                </div>
            </Accordion>
        );
    } else {
        return (
            <Accordion id="dashboard--side-menu-collapse" title={text} device={device}>
                <div className={`colSize}-11 custom-card-2 middle-align`}>
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
    colSize,
    device          // both
}) => {
    if (device === "mobile") {
        return (
            <div className="row" onClick={handleClick}>
                <Link
                    id="dashboard--mid-nav-option"
                    className={`col-12 dashboard--dLink-${device}`}
                    to={`/dashboard/${to}`}
                >
                    <div className={`col${colSize}-12 dashboard--dLinkText-${device}`}>
                        {text}
                    </div>
                    <hr />
                </Link>
            </div>
        );
    } else {
        return (
            <div>
                <h2 className={`dashboard--nav-option-${device}`}>
                    <Link className={`item-${device}`} to={`/dashboard/${to}`}>
                        <p className={`dashboard--nav-option-text-${device}`}>{text}</p>
                    </Link>
                </h2>
            </div>
        );
    }
}