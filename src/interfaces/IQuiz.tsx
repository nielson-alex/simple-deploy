import { TCard } from "../types/TQuiz";

export interface IState {
    cards: TCard[];
    colSize: string;
    device: string;
}

export interface ICard {
    _id: any;
    chinese: string;
    deckName: string;
    english: string;
    number: number;
    pinyin: string;
}