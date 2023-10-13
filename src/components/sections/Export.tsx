import { useAtom } from "jotai";
import { saveAs } from "file-saver";
import { addMetadataFromBase64DataURI } from 'meta-png'
import {
  altGreetStore,
  loreBookStore,
  lorebookType,
  primaryInputStore,
} from "../../data/PreparationStore";
import { charStore, imageStore, imageURLStore } from "../../data/OutputStore";
import SectionButton from "../MicroComps/SectionButton";
import { useEffect, useState } from "react";
import { b64EncodeUnicode } from "../../utils/scripts/encoders";
import { V2CharSchema } from "../../interfaces/V2CharSchema";

export default function Export() {
  const [primaryInputs] = useAtom(primaryInputStore);
  const [altGreets] = useAtom(altGreetStore);
  const [lorebook] = useAtom(loreBookStore);

  const [primaries, setPrimaries] = useState({});
  const [altGreetings, setAltGreetings] = useState<string[] | null>([]);
  const [lore, setLore] = useState<lorebookType | null>(null);

  const [image, setImage] = useAtom(imageStore);
  const [imageURL, setImageURL] = useAtom(imageURLStore);
  const [character, setCharacter] = useAtom(charStore);

  const [exportFormat, setExportFormat] = useState("png");

  //Prepare Primary Inputs
  useEffect(() => {
    setPrimaries(
      primaryInputs.reduce((acc: any, input) => {
        if (input.id === "tags") {
          if (typeof input.value === "string") {
            acc[input.id] = input.value.split(",").map((tag) => tag.trim());
          } else {
            acc[input.id] = [];
          }
        } else {
          acc[input.id] = input.value;
        }
        return acc;
      }, {})
    );
  }, [primaryInputs]);

  //Prepare alternative greetings
  useEffect(() => {
    if (altGreets.length > 0) {
      setAltGreetings(altGreets.map((altGreet) => altGreet.value));
    } else {
      setAltGreetings(null);
    }
  }, [altGreets]);

  //Prepare lore
  useEffect(() => {
    if (lorebook.entries.length > 0) {
      setLore(lorebook);
    } else {
      setLore(null);
    }
  }, [lorebook]);

  // Prepare char
  useEffect(() => {
    setCharacter({
      spec: "chara_card_v2",
      spec_version: "2.0",
      data: {
        ...character.data, //fix for weird typescript error
        ...primaries,
        avatar: "none",
        alternate_greetings: altGreetings,
        character_book: lore,
        extensions: {},
      },
    });
  }, [primaries, altGreetings, lore]);

  const exportCharacterAsPng = (characterData: V2CharSchema, image: string): string => {
    const stringifiedCharacterData = JSON.stringify(characterData)
    const dataOnBase64 = b64EncodeUnicode(stringifiedCharacterData)
    const imageToExportAsUrlData = addMetadataFromBase64DataURI(image, 'chara', dataOnBase64)
    return imageToExportAsUrlData
  }

  const handleExport = () => {
    if (exportFormat === "json") {
      const jsonCharacter = JSON.stringify(character);
      const blob = new Blob([jsonCharacter], { type: "application/json" });
      saveAs(blob, `${character.data.name}.V2.json`);
    } else if (exportFormat === "png" && image) {
      const imageToExport = exportCharacterAsPng(character, image)
      saveAs(imageToExport, `${character.data.name}.V2.png`);
    } else {
      alert("Invalid export format");
    }
  };

  return (
    <section className="flex flex-col h-40">
      <select
        className="self-end p-3 rounded-lg bg-white"
        value={exportFormat}
        onChange={(event) => setExportFormat(event.target.value)}
      >
        <option value="png">PNG</option>
        <option value="json">JSON</option>
      </select>
      <div className="flex justify-center">
        <SectionButton name="Export Character" handler={handleExport} />
      </div>
    </section>
  );
}
