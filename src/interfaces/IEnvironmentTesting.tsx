import { TWorkExperience } from "../types/TEnvironmentTesting";

export interface IState {
    entries: any[];
    workExperience: TWorkExperience[];
    colSize: string;
    device: string;
}

export interface IWorkExperience {
    companyName: string;
    startMM: string;
    startMMMM: string;
    startYY:  number;
    startYYYY: number;
    title: string;
    responsibilities: string[]; 
}