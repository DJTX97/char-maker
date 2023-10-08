import { useAtom } from "jotai";
import { saveAs } from "file-saver";
import {
  mainInputStore,
  altGreetStore,
  loreBookStore,
  metadataStore,
  charStore,
} from "../../data/MainStore";
import SectionButton from "../MicroComps/SectionButton";
import { useEffect, useState } from "react";
import { V2CharSchema } from "../../interfaces/V2CharSchema";

export default function Export() {
  const [mainInputs] = useAtom(mainInputStore);
  const [altGreets] = useAtom(altGreetStore);
  const [lorebook] = useAtom(loreBookStore);
  const [metadata] = useAtom(metadataStore);

  const [bio, setBio] = useState<object>({});
  const [altGreetings, setAltGreetings] = useState<string[]>([]);
  const [meta, setMeta] = useState<object>({});
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
    setAltGreetings(altGreets.map((altGreet) => altGreet.value));
  }, [altGreets]);

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

  // useEffect(() => {
  //   console.log(character);
  // }, [character]);

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
