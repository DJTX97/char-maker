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
    value: string;
}

const mainInputs: MainInputType[] = MainInputs
export const mainInputStore = atom(mainInputs);

const altGreets: AltGreetType[] = [];
export const altGreetStore = atom(altGreets);

const entries: LoreBookEntry[] = [];
export const entryStore = atom(entries);

const lorebook = {
  entries,
  name: "",
}
export const loreBookStore = atom(lorebook);

const metadata: MetadataInputType[] = Metadata;
export const metadataStore = atom(metadata);

const char: V2CharSchema = {
  spec: "chara_card_v2",
  spec_version: "2.0",
  data: {
    avatar: "none",
    name: "",
    description: "",
    personality: "",
    mes_example: "",
    scenario: "",
    first_mes: "",
    alternate_greetings: [],
    character_book: {
      entries: [],
      name: "",
    },
    creator: "",
    character_version: "",
    tags: [],
    creator_notes: "",
    system_prompt: "",
    post_history_instructions: "",
    extensions: {},
  }
}
