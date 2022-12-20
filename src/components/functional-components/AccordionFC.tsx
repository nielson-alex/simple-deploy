import { FC, useState, useEffect, useRef } from "react";
import { Opaque } from "../../types/TGlobal";
import "../../css/functional-components/AccordionFCCSS.css";

interface ICollapse {
    height: string | number;
    transition: string;
}

interface IShow {
    overflowY: string;
    height: string | number;
    transition: string;
}

type TCollapse = Opaque<"collapse", ICollapse>;
type TShow = Opaque<"show", IShow>;

interface IAccordion {
    children: any;
    className?: string;
    id?: string;
    title: string;
    device: string,
    menuClick?: () => void;
}
// Accordion component
export const AccordionFC: FC<IAccordion> = ({ children, className, id, title, device, menuClick }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(0);
    const bodyRef = useRef(null);

    // Get the collapsed body height
    useEffect(() => {
        if (bodyRef !== null && bodyRef.current !== null) {
            // const elementHeight = bodyRef.current.clientHeight;
            // setHeight(elementHeight);
        }
    }, []);

    // inline style
    const collapse: ICollapse = {
        height: 0,
        transition: "height .3s ease"
    } as TCollapse;

    const show: IShow = {
        textAlign: "left",
        overflowY: "auto",
        height: "auto",
        // height: `${height}px`,
        overflowX: "hidden",
        transition: "height .3s ease",
        device: device
    } as TShow;

    if (device === "mobile") {
        return (
            <div id={id}>
                <div>
                    <h2>
                        <button
                            type="button"
                            aria-expanded="true"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {title}
                        </button>
                    </h2>
                </div>
                <div
                    style={isOpen ? show : collapse}
                    onClick={(): void => {
                        setIsOpen(!isOpen);

                        if (menuClick !== undefined) {
                            menuClick();
                        }
                    }}>
                    <div
                        onClick={(): void => {
                            setIsOpen(!isOpen);

                            if (menuClick !== undefined) {
                                menuClick();
                            }
                        }}
                        ref={bodyRef}
                    >
                        <div onClick={(): void => {
                            setIsOpen(!isOpen);

                            if (menuClick !== undefined) {
                                menuClick();
                            }
                        }}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div id={id} className={`card ${className}`}>
                <div className="card-header">
                    <h2 className="mb-0">
                        <button
                            className={`btn btn-link ${className} w100 accordion--header-button-${device}`}
                            type="button"
                            aria-expanded="true"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {title}
                        </button>
                    </h2>
                </div>
                <div
                    style={isOpen ? show : collapse}
                    onClick={(): void => {
                        setIsOpen(!isOpen);

                        if (menuClick !== undefined) {
                            menuClick();
                        }
                    }}>
                    <div
                        // className="card-body"
                        onClick={(): void => {
                            setIsOpen(!isOpen);

                            if (menuClick !== undefined) {
                                menuClick();
                            }
                        }}
                        ref={bodyRef}
                    >
                        <div onClick={(): void => {
                            setIsOpen(!isOpen);

                            if (menuClick !== undefined) {
                                menuClick();
                            }
                        }}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccordionFC;