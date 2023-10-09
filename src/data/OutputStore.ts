import { atom } from "jotai";
import { V2CharSchema, LoreBookEntry } from "../interfaces/V2CharSchema";
import { lorebookType } from "./PreparationStore";

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
  },
};

export const charStore = atom(character);

export const vitalStore = atom({});
export const greetingStore = atom<string[] | null>(null);
//export const loreStore = atom<lorebookType | null>(null);
export const metaStore = atom({});

