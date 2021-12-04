import { User } from "../types/TGlobal";
import { TDeck } from "../types/TDecks";

export interface IProps {
    user: User
}

export interface IUser {
    _id: string;
    email: string;
    decks: TDeck[];
    first_name: string;
    last_name: string;
}