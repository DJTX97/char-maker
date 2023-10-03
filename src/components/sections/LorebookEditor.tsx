import { v4 as uuidv4 } from "uuid";
import { useAtom } from "jotai";
import { loreBookStore } from "../../data/MainStore";
import { loreBookEntry } from "../../interfaces/CharCardSchema";
import LorebookInput from "../generalComps/LorebookInput";
import SectionButton from "../generalComps/SectionButton";
import { useEffect, useState } from "react";

export default function LorebookEditor() {
  const [loreEntries, setLoreEntries] = useAtom(loreBookStore);
  const [entryCount, setEntryCount] = useState(0);

  const handleAddLoreEntry = () => {
    setEntryCount((prev) => prev + 1);
    setLoreEntries((prevLoreEntries: loreBookEntry[]) => [
      ...prevLoreEntries,
      {
        id: entryCount,
        keys: [],
        secondary_keys: [],
        comment: "",
        content: "",
        constant: false,
        selective: false,
        insertion_order: 0,
        enabled: true,
        position: "",
        extensions: {
          position: 0,
          exclude_recursion: false,
          display_index: entryCount,
          probability: 100,
          useProbability: true,
        },
      },
    ]);
  };

  useEffect(() => {
    console.log(loreEntries);
  }, [loreEntries]);
  return (
    <section>
      <div className="mb-10 text-4xl font-semibold">Lorebook Editor</div>
      <div className="flex flex-col gap-10">
        {loreEntries.map((loreEntry, index) => {
          return (
            <LorebookInput
              key={uuidv4()}
              id={uuidv4()}
              name={`Entry ${index + 1}`}
              inputable={loreEntry}
            />
          );
        })}
      </div>
      <SectionButton handler={handleAddLoreEntry} name="Add Lore Entry" />
    </section>
  );
}
