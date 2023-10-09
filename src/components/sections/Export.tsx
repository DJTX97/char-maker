import { useAtom } from "jotai";
import { saveAs } from "file-saver";
import {
  mainInputStore,
  altGreetStore,
  loreBookStore,
  metadataStore,
} from "../../data/PreparationStore";
import {
  charStore,
  vitalStore,
  greetingStore,
  //loreStore,
  metaStore,
} from "../../data/OutputStore";
import SectionButton from "../MicroComps/SectionButton";
import { useEffect, useState } from "react";

export default function Export() {
  const [mainInputs] = useAtom(mainInputStore);
  const [altGreets] = useAtom(altGreetStore);
  const [lorebook] = useAtom(loreBookStore);
  const [metadata] = useAtom(metadataStore);

  // const [bio, setBio] = useAtom(vitalStore);
  // const [altGreetings, setAltGreetings] = useAtom(greetingStore);
  // const [meta, setMeta] = useAtom(metaStore);
  // const [character, setCharacter] = useAtom(charStore);

  const [bio, setBio] = useState({});
  const [altGreetings, setAltGreetings] = useState<string[] | null>([]);
  const [meta, setMeta] = useState({});
  const [character, setCharacter] = useAtom(charStore);

  // Prepare main inputs
  useEffect(() => {
    setBio(
      mainInputs.reduce((acc: any, input) => {
        acc[input.id] = input.value;
        return acc;
      }, {})
    );
  }, [mainInputs]);

  //Prepare alternative greetings
  useEffect(() => {
    if (altGreets.length > 0) {
      setAltGreetings(altGreets.map((altGreet) => altGreet.value));
    } else {
      setAltGreetings(null);
    }
  }, [altGreets]);

  // Prepare lore
  // useEffect(() => {
  //   if (lorebook && lorebook.entries.length > 0) {
  //     setLore(lorebook);
  //   } else {
  //     setLore(null);
  //   }
  // }, [Object.values(lorebook)]);

  // Prepare metadata
  useEffect(() => {
    setMeta(
      metadata.reduce((acc: any, input) => {
        acc[input.id] = input.value;
        return acc;
      }, {})
    );
  }, [metadata]);

  // Prepare char
  useEffect(() => {
    setCharacter({
      spec: "chara_card_v2",
      spec_version: "2.0",
      data: {
        ...character.data, //fix for weird typescript error
        ...bio,
        ...meta,
        avatar: "none",
        alternate_greetings: altGreetings,
        character_book: lorebook,
        extensions: {},
      },
    });
  }, [bio, altGreetings, lorebook, metadata]);

  useEffect(() => {
    console.log(character);
  }, [character]);
  

  const handleExport = () => {
    console.log(character);
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
