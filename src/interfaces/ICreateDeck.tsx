import { TCard } from "../types/TCreateDeck";

export interface IState {
    cards: TCard[];
    cardNum: number;
    currentCard: TCard;
    deckName: string;
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