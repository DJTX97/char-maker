import { OldFormatInputs } from "../../configs/StaticInputConfigs.json";
import { character } from "../../data/OutputStore";
import { getMetadata } from "meta-png";
import { b64DecodeUnicode } from "../../utils/scripts/encoders";

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
export const handlePNG = async (file: any, setFileInput: any, setImageInput: any) => {
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const metadata = getMetadata(uint8Array, "chara");
  if (metadata === undefined)
    throw new Error(
      "Invalid character card, Png image does not contain metadata"
    );
  const decodedMetadata = b64DecodeUnicode(metadata);

  const fileContents = JSON.parse(decodedMetadata); //character data
  console.log(fileContents);

  const base64Image = uint8Array.reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  );
  const image = `data:image/png;base64,${btoa(base64Image)}`; //character image
  setImageInput(image);
  
  
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
