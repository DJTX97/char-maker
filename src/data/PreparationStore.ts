import { atom } from "jotai";
import { LoreBookEntry } from "../interfaces/V2CharSchema";
import { PrimaryInputs } from "../configs/StaticInputConfigs.json";

export interface PrimaryInputType {
  id: string;
  name: string;
  value: string;
}

export interface AltGreetType {
  id: string;
  name: string;
  value: string;
}

export interface lorebookType {
  entries: LoreBookEntry[];
  name: string;
}

const primaryInputs: PrimaryInputType[] = PrimaryInputs;
export const primaryInputStore = atom(primaryInputs);

const altGreets: AltGreetType[] = [];
export const altGreetStore = atom(altGreets);

// const entries: LoreBookEntry[] = [];
// export const entryStore = atom(entries);

// const worldName = "";
// export const worldNameStore = atom(worldName);

const lorebook = {
  entries: [],
  name: "",
};
export const loreBookStore = atom<lorebookType>(lorebook);

const file: any = null;
export const fileStore = atom(file);
