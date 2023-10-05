import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAtom } from "jotai";
import { useLocalStorage } from "../../utils/customHooks/useLocalStorage";
import { loreBookStore } from "../../data/MainStore";
import { loreBookEntry } from "../../interfaces/CharCardSchema";
import Input from "../microComps/Input";

interface LorebookInputProps {
  id: {
    keys: string;
    secondary_keys: string;
    comment: string;
    content: string;
  };
  index: number;
  name?: string;
  inputable: loreBookEntry;
}

export default function LorebookInput({
  id,
  index,
  name,
  inputable,
}: LorebookInputProps) {
  const [loreEntries, setLoreEntries] = useAtom(loreBookStore);

  //const [entry, setEntry] = useState(inputable);
  const [inputs, setInputs] = useState({
    keys: "",
    secondary_keys: "",
    comment: "",
    content: "",
  });

  const handlePrimaryKeyChanges = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.persist();
    const newValue = event.target.value;
    setInputs((prev) => ({ ...prev, keys: newValue }));

    //setEntry((prev) => ({ ...prev, keys: newValue.split(",") }));

    // setLoreEntries((prev) => {
    //   return prev.map((loreEntry) => {
    //     if (loreEntry.id === entry.id) {
    //       return entry;
    //     }
    //     return loreEntry;
    //   });
    // })

    setLoreEntries((prev) => {
      return prev.map((loreEntry) => {
        if (loreEntry.id === inputable.id) {
          return { ...loreEntry, keys: newValue.split(",") };
        }
        return loreEntry;
      });
    });
  };

  // useEffect(() => {
  //   const primaryKeys = inputs.keys.split(",");
  //   setEntry((prev) => ({ ...prev, keys: primaryKeys }));
  // }, [inputs]);

  // useEffect(() => {
  //   setLoreEntries((prev) => {
  //     return prev.map((loreEntry) => {
  //       if (loreEntry.id === entry.id) {
  //         return entry;
  //       }
  //       return loreEntry;
  //     });
  //   });
  // }, [inputs]);

  // useEffect(() => {
  //   console.log(inputable);
  // }, Object.values(inputable));

  useEffect(() => {
    console.log(loreEntries);
  }, [inputable, loreEntries.length]);
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="text-2xl font-semibold">{name}</div>
      <div className="flex gap-5">
        <Input
          id={id.keys}
          name={"Primary Keys"}
          nameSize="text-xl"
          val={inputs.keys}
          changeHandler={handlePrimaryKeyChanges}
        />
        <Input
          id={id.secondary_keys}
          name={"Secondary Keys"}
          nameSize="text-xl"
          val={inputs.secondary_keys}
          changeHandler={() => {}}
        />
      </div>
      <div className="flex flex-col gap-5">
        <Input
          id={id.content}
          name={"Content"}
          nameSize="text-xl"
          val={inputs.content}
          changeHandler={() => {}}
        />
        <Input
          id={id.comment}
          name={"Comment"}
          nameSize="text-xl"
          val={inputs.comment}
          changeHandler={() => {}}
        />
      </div>
    </div>
  );
}
