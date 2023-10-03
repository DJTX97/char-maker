import { v4 as uuidv4 } from "uuid";
import { useAtom } from "jotai";
import { loreBookStore } from "../../data/MainStore";
import { loreBookEntry } from "../../interfaces/CharCardSchema";
import LorebookInput from "../generalComps/LorebookInput";
import SectionButton from "../generalComps/SectionButton";
import { useEffect, useState } from "react";

export default function LorebookEditor() {
  const [loreEntries, setLoreEntries] = useAtom(loreBookStore);
  const [entryCount, setEntryCount] = useState(1);

  const handleAddLoreEntry = () => {
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
          display_index: entryCount - 1,
          probability: 100,
          useProbability: true,
        },
      },
    ]);
    setEntryCount((prev) => prev + 1);
  };

  const handleRemoveEntry = (index:number) => {
    setLoreEntries((prevEntries: loreBookEntry[]) =>
      prevEntries.filter((entry) => entry.id - 1 !== index)
    );
    setEntryCount(loreEntries.length);
    // Reset properties for all other items after deleting an entry
    setLoreEntries((prevEntries: loreBookEntry[]) => {
      return prevEntries.map((entry, i) => {
        entry.id = i + 1
        entry.extensions.display_index = i
        return entry;
      });
    });
  };

  useEffect(() => {
    console.log(loreEntries);
  }, [loreEntries]);
  return (
    <section>
      <div className="mb-10 text-4xl font-semibold">Lorebook Editor</div>
      <div className="flex flex-col gap-20">
        {loreEntries.map((loreEntry, index) => {
          const id = uuidv4();
          const name = `Entry ${index + 1}`;
          return (
            <div key={uuidv4()} className="flex items-start">
              <LorebookInput
                id={id}
                name={name}
                inputable={loreEntry}
              />
              <div className="flex items-center">
                <button
                  onClick={() => handleRemoveEntry(index)}
                  className="p-3 rounded-full bg-black hover:bg-gray-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <SectionButton handler={handleAddLoreEntry} name="Add Lore Entry" />
    </section>
  );
}
