import { useState } from "react";
import { useAtom } from "jotai";
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
  index?: number;
  name?: string;
  inputable: loreBookEntry;
}

export default function LorebookInput({
  id,
  name,
  inputable,
}: LorebookInputProps) {
  const [loreEntries, setLoreEntries] = useAtom(loreBookStore);

  const [inputs, setInputs] = useState({
    keys: "",
    secondary_keys: "",
    comment: "",
    content: "",
  });

  const handleValueChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    ID: string
  ) => {
    //Get property identifier from ID
    const identifier = ID.split("-")[0];

    //Persist event.target to access it asynchronously and keep state in sync with the actual data
    event.persist();
    const newValue = event.target.value;
    setInputs((prev) => ({ ...prev, [identifier]: newValue }));

    //Store the specific keys as arrays and the other inputs as strings
    if (ID === id.keys || ID === id.secondary_keys) {
      setLoreEntries((prev) => {
        return prev.map((loreEntry) => {
          if (loreEntry.id === inputable.id) {
            return { ...loreEntry, [identifier]: newValue.split(",") };
          }
          return loreEntry;
        });
      });
    } else {
      setLoreEntries((prev) => {
        return prev.map((loreEntry) => {
          if (loreEntry.id === inputable.id) {
            return { ...loreEntry, [identifier]: newValue };
          }
          return loreEntry;
        });
      });
    }
  };

  // useEffect(() => {
  //   console.log(loreEntries);
  // }, [inputable, loreEntries.length]);
  return (
    <div className="flex flex-col gap-5">
      <div className="text-2xl font-semibold">{name}</div>
      <div className="flex gap-10">
        <div>
          <select name="select" id="">
            <option value="before_char">before_char</option>
            <option value="after_char">after_char</option>
          </select>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <div className="flex gap-5">
            <Input
              id={id.keys}
              name="Primary Keys"
              nameSize="text-xl"
              val={inputs.keys}
              changeHandler={(event) => handleValueChange(event, id.keys)}
            />
            <Input
              id={id.secondary_keys}
              name="Secondary Keys"
              nameSize="text-xl"
              val={inputs.secondary_keys}
              changeHandler={(event) =>
                handleValueChange(event, id.secondary_keys)
              }
            />
          </div>
          <div className="flex flex-col gap-5">
            <Input
              id={id.content}
              name="Content"
              nameSize="text-xl"
              val={inputs.content}
              changeHandler={(event) => handleValueChange(event, id.content)}
            />
            <Input
              id={id.comment}
              name="Comment"
              nameSize="text-xl"
              val={inputs.comment}
              changeHandler={(event) => handleValueChange(event, id.comment)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
