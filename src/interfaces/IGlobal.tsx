import { User } from "../types/TGlobal";
export interface IProps {
    user: User
}

export interface IUser {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
}