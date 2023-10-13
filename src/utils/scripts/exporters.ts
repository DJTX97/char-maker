import { addMetadataFromBase64DataURI } from "meta-png";
import { V2CharSchema } from "../../interfaces/V2CharSchema";
import { b64EncodeUnicode } from "./encoders";
import saveAs from "file-saver";

export const exportJson = (characterData: V2CharSchema) => {
  const jsonCharacter = JSON.stringify(characterData);
  const blob = new Blob([jsonCharacter], { type: "application/json" });
  saveAs(blob, `${characterData.data.name}.V2.json`);
};

export const exportPng = (characterData: V2CharSchema, image: string) => {
  const stringifiedCharacterData = JSON.stringify(characterData);
  const dataOnBase64 = b64EncodeUnicode(stringifiedCharacterData);
  const imageToExportAsUrlData = addMetadataFromBase64DataURI(
    image,
    "chara",
    dataOnBase64
  );
  saveAs(imageToExportAsUrlData, `${characterData.data.name}.V2.png`);
};
