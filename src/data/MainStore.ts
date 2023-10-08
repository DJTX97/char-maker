import { atom } from "jotai";
import { V2CharSchema, LoreBookEntry } from "../interfaces/V2CharSchema";
import { MainInputs, Metadata } from "../configs/StaticInputs.json";

export interface MainInputType {
    id: string;
    name: string;
    value: string;
}

export interface AltGreetType {
    id: string;
    name: string;
    value: string;
}

export interface MetadataInputType {
    id: string;
    name: string;
    value: string | string[];
}

export interface lorebookType {
  entries: LoreBookEntry[];
  name: string;
}

const mainInputs: MainInputType[] = MainInputs
export const mainInputStore = atom(mainInputs);

const altGreets: AltGreetType[] = [];
export const altGreetStore = atom(altGreets);

const entries: LoreBookEntry[] = [];
export const entryStore = atom(entries);

const lorebook: lorebookType = {
  entries,
  name: "",
}
export const loreBookStore = atom(lorebook);

const metadata: MetadataInputType[] = Metadata;
export const metadataStore = atom(metadata);

export const charStore = atom({})
