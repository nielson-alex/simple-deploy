import { MouseEvent } from "react";

export interface FCIDesktopSignoutLink {
    icon?: string;
    text: string;
    onClick: (e: MouseEvent<HTMLButtonElement | HTMLElement>) => void
}

export interface FCIGroup {
    condition?: boolean;
    keyNum: string;
    children: any;
    text: string;
    colSize?: string;
    device: string;
    handleClick?: () => any;
}

export interface FCILink {
    children?: any;
    condition?: boolean;
    icon?: string;
    keynum?: string;
    ref?: any;
    text: string;
    to: string;
    device: string;
    handleClick?: () => any;
}