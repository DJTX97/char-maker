import { useAtom } from "jotai";
import {
  altGreetStore,
  loreBookStore,
  lorebookType,
  primaryInputStore,
} from "../../data/PreparationStore";
import { character, charStore, imageStore } from "../../data/OutputStore";
import SectionButton from "../Micros/SectionButton";
import { useEffect, useState } from "react";
import { exportJson, exportPng } from "../../utils/scripts/exporters";

export default function Export() {
  const [primaryInputs] = useAtom(primaryInputStore);
  const [altGreets] = useAtom(altGreetStore);
  const [lorebook] = useAtom(loreBookStore);

  const [primaries, setPrimaries] = useState({});
  const [altGreetings, setAltGreetings] = useState<string[] | null>([]);
  const [lore, setLore] = useState<lorebookType | null>(null);

  const [image] = useAtom(imageStore);
  const [char, setChar] = useAtom(charStore);

  const [exportFormat, setExportFormat] = useState("png");

  //Prepare Primary Inputs
  useEffect(() => {
    setPrimaries(
      primaryInputs.reduce((acc: any, input) => {
        if (input.value) {
          if (input.id === "tags") {
            if (typeof input.value === "string") {
              acc[input.id] = input.value.split(",").map((tag) => tag.trim());
            } else {
              acc[input.id] = [...input.value];
            }
          } else {
            acc[input.id] = input.value;
          }
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
      setLore({
        name: lorebook.name,
        entries: lorebook.entries.map((entry) => {
          return {
            id: entry.id,
            keys:
              typeof entry.keys === "string"
                ? entry.keys.split(",").map((key) => key.trim())
                : [],
            secondary_keys:
              typeof entry.secondary_keys === "string"
                ? entry.secondary_keys.split(",").map((key) => key.trim())
                : [],
            comment: entry.comment,
            content: entry.content,
            constant: entry.constant,
            selective: entry.selective,
            insertion_order: entry.insertion_order,
            enabled: entry.enabled,
            position: entry.position,
            extensions: entry.extensions,
          };
        }),
      });
    } else {
      setLore(null);
    }
  }, [lorebook]);

  // Prepare char
  useEffect(() => {
    setChar({
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

  // useEffect(() => {
  //   console.log(character);
  // }, [character])

  // useEffect(() => {
  //   console.log(primaries)
  // }, [primaries])

  const handleExport = () => {
    if (exportFormat === "json") {
      exportJson(char);
    } else if (exportFormat === "png" && image) {
      exportPng(char, image);
    } else {
      alert("Invalid export format");
    }
  };

  return (
    <section className="flex flex-row-reverse sm:flex-col gap-5 w-full md:w-1/2">
      <select
        className="self-center sm:self-end p-3 rounded-lg bg-white"
        value={exportFormat}
        onChange={(event) => setExportFormat(event.target.value)}
      >
        <option value="png">PNG</option>
        <option value="json">JSON</option>
      </select>
      <div className="flex justify-center h-1/2">
        <SectionButton name="Export Character" handler={handleExport} />
      </div>
    </section>
  );
}
