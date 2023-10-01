interface CharCardSchema {
    spec: string,
    spec_version: string,
    data: {
      avatar: string,
      name: string,
      description: string,
      personality: string,
      mes_example: string,
      scenario: string,
      first_mes: string,
      alternate_greetings: string[],
      character_book: {
        entries: [
          {
            id: number,
            keys: string[],
            secondary_keys: string[],
            comment: string,
            content:string,
            constant: boolean,
            selective: boolean,
            insertion_order: number,
            enabled: boolean,
            position: string,
            extensions: {
              position: number,
              exclude_recursion: boolean,
              display_index: number,
              probability: number,
              useProbability: boolean
            }
          },  
        ],
        name: string
      },
      creator: string,
      character_version: string,
      tags: string[],
      creator_notes: string,
      system_prompt: string,
      post_history_instructions: string,
      extensions: {}
    }
  }