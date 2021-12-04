import { TCard, TDiacritics } from "../types/TCreateDeck";

export interface IState {
    cards: TCard[];
    cardNum: number;
    currentCard: TCard;
    deckName: string;
    diacritics: TDiacritics;
    redirect: boolean;
    colSize: string;
    device: string;
}

export interface ICard {
    chinese: string;
    deckName: string;
    english: string;
    number: number;
    pinyin: string;
}

export interface IDiacritics {
    a: string[];
    e: string[];
    i: string[];
    o: string[];
    u: string[];
    v: string[];
}