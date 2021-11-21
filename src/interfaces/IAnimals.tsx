import { TAnimal } from "../types/TAnimals";

export interface IState {
    animals: TAnimal[];
    featuredAnimal: TAnimal;
    colSize: string;
    device: string;
}

export interface IAnimal {
    _id: any;
    age: number;
    breed: string;
    description: string;
    imageUrl: string;
    name: string;
    price: number;
    sex: string;
    species: string;
}