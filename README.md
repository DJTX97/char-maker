
# AI Char Maker

This is a character editor for chat-style LLM frontend interfaces. It enables users to create character personas by filling the given fields and it provides the option to export them as JSON files or as character cards (PNG images embedded with JSON data). The primary reason for creating this tool is the lack of standalone alternatives which support the newer V2 card format. You can check it out [here](https://char-maker.vercel.app/).


## Technologies

- Vite.js
- React
- Tailwind

## Features

- responsive design
- V2 card format support
- import V1 cards and export them as V2 cards
- automatic conversion of JPEG images to PNG
- multiple greeting messages
- character lorebook editor
- character system prompt
- post history instructions (jailbreak)
- informative metadata (author, notes, tags)
- token counter (llama tokenizer)
- light and dark themes
## Planned

- support for GIF images
## Usage notes

This tool currently assumes you are using [SillyTavern](https://sillytavernai.com) or similar interfaces. If your frontend requires a particular kind of format, I cannot guarantee the compatibility.