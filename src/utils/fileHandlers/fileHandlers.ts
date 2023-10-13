import { OldFormatInputs } from "../../configs/StaticInputConfigs.json";
import { character } from "../../data/OutputStore";
import EXIF from "exif-js";

export const handleJSON = async (file: any, setFileInput: any) => {
  let fileContents = await file.text();
  fileContents = JSON.parse(fileContents);
  if (fileContents.data) {
    setFileInput(fileContents);
  } else if (
    Object.keys(fileContents).some((key) => OldFormatInputs.includes(key))
  ) {
    setFileInput({
      spec: "chara_card_v2",
      spec_version: "2.0",
      data: {
        ...character.data,
        name: fileContents.char_name,
        description: fileContents.char_persona,
        scenario: fileContents.world_scenario,
        mes_example: fileContents.example_dialogue,
        first_mes: fileContents.char_greeting,
      },
    });
  } else {
    setFileInput({
      spec: "chara_card_v2",
      spec_version: "2.0",
      data: {
        ...fileContents,
      },
    });
  }
};

//NOTE: tEXT png chunk, base64 encoded data with "chara " prefix
export const handlePNG = async (file: any, setFileInput: any) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = () => {
    const RESULT = reader.result
    console.log(RESULT)
  };
};
