import { TWorkExperience } from "../types/TEnvironmentTesting";
import { TAnimal } from "../types/TAnimals";

export interface IState {
    entries: any[];
    workExperience: TWorkExperience[];
}

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

export interface IWorkExperience {
    companyName: string;
    startMM: string;
    startMMMM: string;
    startYY: number;
    startYYYY: number;
    title: string;
    responsibilities: string[];
}