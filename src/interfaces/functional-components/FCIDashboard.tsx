import React from "react";

export interface FCIDesktopGroup {
    children?: any | any[] | React.ReactNode | React.ReactNode[];
    text?: string;
}

export interface FCIDesktopLink {
    icon?: string;
    ref?: any;
    to?: string;
    text?: string;
}

export interface FCIDesktopSignoutLink {
    icon?: string;
    text?: string;
    onClick?: () => void;
}

export interface FCIMobileGroup {
    children?: FCIDesktopLink;
    condition?: boolean;
    keyNum: string;
    ref?: any;
    text?: string;
    handleClick?: () => void;
}

export interface FCIMobileLink {
    condition?: boolean;
    icon?: string;
    props?: any;
    ref?: any;
    text?: string;
    to?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}