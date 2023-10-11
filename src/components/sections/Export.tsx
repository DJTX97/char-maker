import { useAtom } from "jotai";
import { saveAs } from "file-saver";
import {
  altGreetStore,
  loreBookStore,
  lorebookType,
  primaryInputStore,
} from "../../data/PreparationStore";
import { charStore } from "../../data/OutputStore";
import SectionButton from "../MicroComps/SectionButton";
import { useEffect, useState } from "react";

export default function Export() {
  const [primaryInputs] = useAtom(primaryInputStore);
  const [altGreets] = useAtom(altGreetStore);
  const [lorebook] = useAtom(loreBookStore);

  const [primaries, setPrimaries] = useState({});
  const [altGreetings, setAltGreetings] = useState<string[] | null>([]);
  const [lore, setLore] = useState<lorebookType | null>(null);

  const [character, setCharacter] = useAtom(charStore);

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

  useEffect(() => {
    console.log(character);
  }, [character]);

  // useEffect(() => {
  //   console.log(lorebook);
  //   console.log(lore);
  // }, [lore, lorebook]);

  const handleExport = () => {
    //console.log(character);
    const jsonCharacter = JSON.stringify(character);
    const blob = new Blob([jsonCharacter], { type: "application/json" });
    saveAs(blob, `${character.data.name}.V2.json`);
  };

  return (
    <section>
      <div className="flex justify-center">
        <SectionButton name="Export Character" handler={handleExport} />
      </div>
    </section>
  );
}
