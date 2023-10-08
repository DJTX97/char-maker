export interface V1CharSchema {
  char_name: string;
  char_persona: string;
  world_scenario: string; //default empty
  char_greeting: string;
  example_dialogue: string;
  name: string; //identical to char_name
  description: string; //identical to char_persona
  personality: string;
  scenario: string;
  first_mes: string; //identical to char_greeting
  mes_example: string; //identical to example_dialogue
}
