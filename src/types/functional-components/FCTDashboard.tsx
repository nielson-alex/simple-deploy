import { Opaque } from "../../types/TGlobal";
import {
    FCIDesktopSignoutLink,
    FCIGroup,
    FCILink
} from "../../interfaces/functional-components/FCIDashboard";

export type FCTDesktopSignoutLink = Opaque<"desktopSignoutLink", FCIDesktopSignoutLink>;
export type FCTGroup = Opaque<"group", FCIGroup>;
export type FCTLink = Opaque<"link", FCILink>;