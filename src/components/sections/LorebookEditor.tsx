import { v4 as uuidv4 } from "uuid";
import { useAtom } from "jotai";
import { loreBookStore } from "../../data/MainStore";
import { loreBookEntry } from "../../interfaces/CharCardSchema";
import LorebookInput from "../generalComps/LorebookInput";
import SectionButton from "../generalComps/SectionButton";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../utils/customHooks/useLocalStorage";

// {
//   id: 1, //dynamic from 1
//   keys: [],
//   secondary_keys: [],
//   comment: "",
//   content: "",
//   constant: false,
//   selective: false,
//   insertion_order: 0,
//   enabled: true,
//   position: "",
//   extensions: {
//     position: 0,
//     exclude_recursion: false,
//     display_index: 0, //dynamic from 0
//     probability: 100,
//     useProbability: true,
//   },
// }

export default function LorebookEditor() {
  const [entries, setEntries] = useAtom(loreBookStore);

  const [KEYS, setKEYS] = useState<string[]>([]);

  const [counter, setCounter] = useState(1);

  const [ID, setID] = useState({
    keys: `keys-${uuidv4()}`,
    secondary_keys: `secondary_keys-${uuidv4()}`,
    comment: `comment-${uuidv4()}`,
    content: `content-${uuidv4()}`,
  });

  const addEntry = () => {
    const newEntry = {
      id: counter,
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
        display_index: counter - 1, //dynamic from 0
        probability: 100,
        useProbability: true,
      },
    };
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
    })
    setEntries(newEntries);
    setKEYS(newKEYS);
    // setEntries((prev) => {

    //   return prev.map((item, i) => {
    //     item.id = i + 1;
    //     item.extensions.display_index = i;
    //     return item;
    //   });
    // });

    setCounter((prev) => prev - 1);
  };

  // useEffect(() => {
  //   console.log(entries);
  // }, [entries]);

  return (
    <section>
      <div className="flex justify-between mb-10 text-4xl font-semibold">
        <div>Lorebook</div>
        <button
          onClick={() => {}}
          className="p-3 rounded-full bg-black hover:bg-gray-600 text-xl text-white"
        >
          Save
        </button>
      </div>
      <div className="flex flex-col gap-20">
        {entries.map((item: loreBookEntry, index: number) => {
          //const KEY = uuidv4();
          return (
            <div key={KEYS[index]} className="relative">
              <LorebookInput
                id={ID}
                //key={KEY}
                index={index}
                name={`Entry ${index + 1}`}
                inputable={item}
              />

              <div className="absolute top-0 right-0 flex items-center">
                <button
                  onClick={() => removeEntry(index)}
                  className="p-3 rounded-full bg-black hover:bg-gray-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <SectionButton handler={addEntry} name="Add Lore Entry" />
    </section>
  );
}
