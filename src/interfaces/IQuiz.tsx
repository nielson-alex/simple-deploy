import { TCard } from "../types/TQuiz";

export interface IState {
    answer: {
        correct: boolean;
        text: string;
    };
    cards: TCard[];
    currentCard: TCard;
    quizMode: number;
    quizCompleted: boolean;
    quizStarted: boolean;
    showHint: boolean;
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
    timesAnsweredCorrectly?: number;
}