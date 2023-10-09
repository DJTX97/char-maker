import { atom } from "jotai";
import { LoreBookEntry } from "../interfaces/V2CharSchema";
import { MainInputs, Metadata } from "../configs/StaticInputConfigs.json";

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

const mainInputs: MainInputType[] = MainInputs;
export const mainInputStore = atom(mainInputs);

const altGreets: AltGreetType[] = [];
export const altGreetStore = atom(altGreets);

const entries: LoreBookEntry[] = [];
export const entryStore = atom(entries);

const worldName: string = "";
export const worldNameStore = atom(worldName);

const lorebook = null
export const loreBookStore = atom<lorebookType | null>(lorebook);

const metadata: MetadataInputType[] = Metadata;
export const metadataStore = atom(metadata);
