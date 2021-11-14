import { TAnimal } from "../types/TCollection";

export interface IState {
    animals: TAnimal[];
    featuredAnimal: TAnimal;
    showDetailsModal: boolean;
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