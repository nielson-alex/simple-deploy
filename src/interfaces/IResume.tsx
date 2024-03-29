import { TWorkExperience } from "../types/TResume";

export interface IState {
    workExperience: TWorkExperience[];
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