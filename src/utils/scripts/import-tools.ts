import { OldFormatInputs } from "../../configs/StaticInputConfigs.json";
import { character } from "../../data/OutputStore";
import { getMetadata } from "meta-png";
import { b64DecodeUnicode } from "./encoders";

export const importJSON = async (file: any, setFileInput: any) => {
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
export const importPNG = async (
  file: any,
  fileInput: any,
  setFileInput: any,
  setImageInput: any
) => {
  //Read file
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  //Extract metadata
  const metadata = getMetadata(uint8Array, "chara");

  if (metadata && !fileInput) {
    //Decode metadata
    const decodedMetadata = b64DecodeUnicode(metadata);

    const fileContents = JSON.parse(decodedMetadata); //character data
    //console.log(fileContents);

    //Set image
    const base64Image = uint8Array.reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    );
    const image = `data:image/png;base64,${btoa(base64Image)}`; //character image
    setImageInput(image);

    //Set file input
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
  } else if (
    metadata &&
    fileInput &&
    confirm(
      "This file contains metadata. Press OK to import it or Cancel to skip.\nWARNING: This will overwrite existing input fields!"
    )
  ) {
    //Decode metadata
    const decodedMetadata = b64DecodeUnicode(metadata);

    const fileContents = JSON.parse(decodedMetadata); //character data
    //console.log(fileContents);

    //Set image
    const base64Image = uint8Array.reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    );
    const image = `data:image/png;base64,${btoa(base64Image)}`; //character image
    setImageInput(image);

    //Set file input
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
  } else {
    const base64Image = uint8Array.reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    );
    const image = `data:image/png;base64,${btoa(base64Image)}`; //character image
    setImageInput(image);
  }
};

export const convertJPG = async (file: any) => {
  return new Promise<File>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const convertedFile = new File(
              [blob],
              file.name.replace(".jpeg", ".png"),
              {
                type: "image/png",
              }
            );
            resolve(convertedFile);
          } else {
            reject(new Error("Failed to convert image to PNG."));
          }
        }, "image/png");
      };
      img.src = reader.result as string;
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};
