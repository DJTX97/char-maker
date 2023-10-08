import { atom } from "jotai";
import { loreBookEntry } from "../interfaces/CharCardSchema";
import { MainInputs } from "../configs/MainInputs.json";

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

const altGreets: altGreetType[] = [];
export const altGreetStore = atom(altGreets);

const entries: loreBookEntry[] = [];
export const entryStore = atom(entries);

const lorebook = {
  entries,
  name: "",
}
export const loreBookStore = atom(lorebook);
