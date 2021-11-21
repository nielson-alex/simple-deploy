import { TCard, TDeck } from "../types/TDecks";

export interface IState {
    decks: TDeck[];
    colSize: string;
    device: string;
}

export interface IDeck {
    _id: any;
    creator: string;
    deckName: string;
    cards: TCard[];
}

export interface ICard {
    _id: any;
    chinese: string;
    deckName: string;
    english: string;
    number: number;
    pinyin: string;
}