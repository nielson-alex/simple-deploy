import { User } from "../types/TGlobal";
export interface IProps {
    user: User
}

export interface IUser {
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
}