import { TCard, TNewCard } from "../types/TEditDeck";

export interface IState {
    cards: TCard[];
    chinese: string;
    creator: string;
    deckName: string;
    english: string;
    newCard: TNewCard;
    pinyin: string;
    showNewCard: boolean;
    colSize: string;
    device: string;
}

export interface ICard {
    _id?: any;
    chinese: string;
    deckName: string;
    english: string;
    number: number;
    pinyin: string;
    timesAnsweredCorrectly?: number;
}

export interface INewCard {
    english: string;
    chinese: string;
    pinyin: string;
}