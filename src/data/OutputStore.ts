import { atom } from "jotai";
import { V2CharSchema } from "../interfaces/V2CharSchema";

// Some data may not be properly initialized on first render which causes the schema to throw a typescript error (workaround: set type to 'object')
export const character: V2CharSchema = {
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
    // character_book: {
    //   entries: [],
    //   name: "",
    // },
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

export const imageURLStore = atom<string | null>(null);

export const imageStore = atom<string>("");
