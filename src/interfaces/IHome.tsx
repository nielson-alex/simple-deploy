import { TAnimal } from "../types/THome";

export interface IState {
    featuredAnimal: TAnimal;
    colSize: string;
    device: string;
}

export interface IAnimal {
    id: string;
    age: number;
    breed: string;
    description: string;
    imageUrl: string;
    name: string;
    price: number;
    sex: string;
    species: string;
}