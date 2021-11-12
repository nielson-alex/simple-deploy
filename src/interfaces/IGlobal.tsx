import { User } from "../types/TGlobal";
export interface IProps {
    user: User
}

export interface IUser {
    id: number;
    active: number;
    department: number;
    email: string;
    employee: boolean;
    firstName: string;
    gid: number;
    lastName: string;
    loggedIn: boolean;
    username: string;
    sharedAccount: number;
}