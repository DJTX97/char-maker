import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { fileStore, loreBookStore } from "../../data/PreparationStore";
import LorebookInput from "../SectionInputs/LorebookInput";
import SectionButton from "../MicroComps/SectionButton";
import CleanupButton from "../MicroComps/CleanupButton";
import Input from "../MicroComps/Input";
import { LoreBookEntry } from "../../interfaces/V2CharSchema";

export default function LorebookEditor() {
  const [file, setFile] = useAtom(fileStore);
  const [lorebook, setLorebook] = useAtom(loreBookStore);
  const [KEYS, setKEYS] = useState<string[]>([]);

  const [ID, setID] = useState({
    keys: `keys-${uuidv4()}`,
    secondary_keys: `secondary_keys-${uuidv4()}`,
    comment: `comment-${uuidv4()}`,
    content: `content-${uuidv4()}`,
    position: `position-${uuidv4()}`,
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
    //setEntries([...Entries, newEntry]);

    setLorebook((prev) => {
      return {
        ...prev,
        entries: [...prev.entries, newEntry],
      };
    });
  };

  const removeEntry = (index: number) => {
    let newEntries = lorebook.entries;
    const newKEYS = [...KEYS];

    newEntries.splice(index, 1);
    newKEYS.splice(index, 1);

    newEntries = newEntries.map((item, i) => {
      item.id = i + 1;
      item.extensions.display_index = i;
      return item;
    });

    setKEYS(newKEYS);
    setLorebook({
      ...lorebook,
      entries: newEntries,
    });

    setCounter((prev) => prev - 1);
  };

  const emptyStore = () => {
    setLorebook({
      entries: [],
      name: "",
    });
  };

  const handleLoreName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLorebook({
      ...lorebook,
      name: event.target.value,
    });
  };

  useEffect(() => { 
    if (file) {
      setCounter(file.data.character_book.entries.length + 1);
      setKEYS(file.data.character_book.entries.map((_:LoreBookEntry) => uuidv4()));
      setLorebook(file.data.character_book);
    }
  }, [file]);

  // useEffect(() => {
  //   console.log(lorebook);
  // }, [lorebook]);

  return (
    <section>
      <div className="flex justify-between mb-10 text-4xl font-semibold">
        <div>Lorebook</div>
        <CleanupButton cleanupMethod={emptyStore} />
      </div>
      <Input
        id="lorebook"
        placeholder="Enter world name..."
        val={lorebook.name}
        changeHandler={handleLoreName}
      />
      <div className="flex flex-col gap-20 mt-20">
        {lorebook?.entries.map((item, index) => {
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
      <div className="flex justify-end">
        <SectionButton
          destinations={lorebook.entries}
          handler={addEntry}
          name="Add Entry"
        />
      </div>
    </section>
  );
}
