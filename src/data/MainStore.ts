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

// Some data may not be properly initialized on first render which causes the schema to throw a typescript error (workaround: set type to 'object')
const character: V2CharSchema = {
  spec: "chara_card_v2", // "chara_card_v2"
  spec_version: "2.0", // "2.0"
  data: {
    avatar: "none", //  default: "none"
    name: "",
    description: "",
    personality: "",
    mes_example: "",
    scenario: "",
    first_mes: "",
    alternate_greetings: [], //should be an array
    character_book: {
      entries: [],
      name: "",
    },
    creator: "",
    character_version: "",
    tags: [], //should be an array
    creator_notes: "",
    system_prompt: "",
    post_history_instructions: "",
    extensions: {},
  }
}
export const charStore = atom(character);
