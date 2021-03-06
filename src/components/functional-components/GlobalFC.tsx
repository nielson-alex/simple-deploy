import { FC } from "react";

export const BR: FC<{ colSize: string }> = ({ colSize }) => {
    return (
        <div className="row">
            <div className={`col${colSize}-12`}>
                <br />
            </div>
        </div>
    );
}

export const HR: FC<{ colSize: string }> = ({ colSize }) => {
    return (
        <div className="row">
            <div className={`col${colSize}-11 middle-align`}>
                <hr />
            </div>
        </div>
    );
}