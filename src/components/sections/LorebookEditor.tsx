import { useState } from "react";
import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { loreBookStore } from "../../data/MainStore";
import { loreBookEntry } from "../../interfaces/CharCardSchema";
import LorebookInput from "../generalComps/LorebookInput";
import SectionButton from "../microComps/SectionButton";
import CleanupButton from "../microComps/CleanupButton";

export default function LorebookEditor() {
  const [entries, setEntries] = useAtom(loreBookStore);

  const [KEYS, setKEYS] = useState<string[]>([]);

  const [ID, setID] = useState({
    keys: `keys-${uuidv4()}`,
    secondary_keys: `secondary_keys-${uuidv4()}`,
    comment: `comment-${uuidv4()}`,
    content: `content-${uuidv4()}`,
  });

  const [counter, setCounter] = useState(1);

  const newEntry = {
    id: counter, //dynamic starting from 1
    keys: [],
    secondary_keys: [],
    comment: "",
    content: "",
    constant: false, // default false
    selective: true,
    insertion_order: 0,
    enabled: true,
    position: "before_char", //default: before_char, other: after_char
    extensions: {
      position: 0,
      exclude_recursion: false,
      display_index: counter - 1, //dynamic starting from 0
      probability: 100,
      useProbability: true,
    },
  };

  const addEntry = () => {
    setCounter((prev) => prev + 1);
    setKEYS([...KEYS, uuidv4()]);
    setEntries([...entries, newEntry]);
  };

  const removeEntry = (index: number) => {
    let newEntries = [...entries];
    const newKEYS = [...KEYS];

    newEntries.splice(index, 1);
    newKEYS.splice(index, 1);

    newEntries = newEntries.map((item, i) => {
      item.id = i + 1;
      item.extensions.display_index = i;
      return item;
    });

    setKEYS(newKEYS);
    setEntries(newEntries);

    setCounter((prev) => prev - 1);
  };

  const emptyStore = () => {
    setEntries([]);
  };

  return (
    <section>
      <div className="flex justify-between mb-10 text-4xl font-semibold">
        <div>Lorebook</div>
        <CleanupButton cleanupMethod={emptyStore} />
      </div>
      <div className="flex flex-col gap-20">
        {entries.map((item: loreBookEntry, index: number) => {
          return (
            <div key={KEYS[index]} className="relative">
              <LorebookInput
                id={ID}
                index={index}
                name={`Entry ${index + 1}`}
                inputable={item}
              />

              <div className="absolute top-0 right-0 flex items-center">
                <button
                  onClick={() => removeEntry(index)}
                  className="p-3 rounded-full bg-black hover:bg-gray-600 text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <SectionButton
        destinations={entries}
        handler={addEntry}
        name="Add Entry"
      />
    </section>
  );
}
