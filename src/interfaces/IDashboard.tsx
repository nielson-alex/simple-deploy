export interface IState {
    clickedNavIcon: boolean;
    desktopNavMinimized: boolean;
    desktopNavVisible: boolean;
    mobileNavVisible: boolean;
    navMenuOpen: boolean;
    redirectToLanding: boolean;
    redirectToLogin: boolean;
    user: any;
    colSize: string;
    device: string;
}

export interface IRenderable {
    departments: number[];
    gid: number;
}