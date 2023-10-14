import { atom } from "jotai";
import { LoreBookEntry, V2CharSchema } from "../interfaces/V2CharSchema";
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

const lorebook = {
  entries: [],
  name: "",
};
export const loreBookStore = atom<lorebookType>(lorebook);

//const file: any = null;
export const fileStore = atom<V2CharSchema | null>(null);


