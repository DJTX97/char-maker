import { atom } from "jotai";
import { MainInputs, AltGreetings } from "../configs/MainInputs.json";

export interface mainInputType {
    id: string;
    name: string;
    value: string;
}

export interface altGreetType {
    id: string;
    name: string;
    value: string;
}

const mainInputs: mainInputType[] = MainInputs
export const mainInputStore = atom(mainInputs);

const altGreets: altGreetType[] = AltGreetings
export const altGreetStore = atom(altGreets);

export const inputValue = atom("");
