import { FC, useState, useEffect, RefObject, useRef } from "react";
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

// Accordion component
export const AccordionFC: FC<{ title: string, children: any, menuClick?: () => void }> = ({ title, children, menuClick }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(0);
    const bodyRef = useRef(null);

    // Get the collapsed body height
    useEffect(() => {
        if (bodyRef !== null && bodyRef.current !== null) {
            console.log("bodyRef.current:", bodyRef.current);
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
        overflowY: "auto",
        height: "200px",
        // height: `${height}px`,
        transition: "height .3s ease"
    } as TShow;

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="mb-0">
                    <button
                        className="btn btn-link w100"
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
                    className="card-body"
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

export default AccordionFC;