import { TAnimal } from "../types/THome";

export interface IState {
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