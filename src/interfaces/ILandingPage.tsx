import { TAnimal } from "../types/TLandingPage";

export interface IState {
    animals: TAnimal[];
    colSize: string;
    device: string;
}

export interface IAnimal {
    _id: any;
    breed: string;
    description: string;
    imageUrl: string;
    name: string;
    price: number;
    sex: string;
    species: string;
}