export interface loreBookEntry {
  id: number; // id starts at 1
  keys: string[];
  secondary_keys: string[];
  comment: string;
  content: string;
  constant: boolean; //default: true
  selective: boolean; //default: true
  insertion_order: number;
  enabled: boolean; //default: true
  position: string; //"before_char" or "after_char"
  extensions: {
    position: number; //default: 0
    exclude_recursion: boolean; //default: false
    display_index: number; //starts at 0 and increments by 1
    probability: number; //default: 100
    useProbability: boolean; //default: true
  };
}

export interface CharCardSchema {
  spec: string; // "chara_card_v2"
  spec_version: string; // "2.0"
  data: {
    avatar: string; //  default: "none"
    name: string;
    description: string;
    personality: string;
    mes_example: string;
    scenario: string;
    first_mes: string;
    alternate_greetings: string[];
    character_book: {
      entries: loreBookEntry[];
      name: string;
    };
    creator: string;
    character_version: string;
    tags: string[];
    creator_notes: string;
    system_prompt: string;
    post_history_instructions: string;
    extensions: object;
  };
}
