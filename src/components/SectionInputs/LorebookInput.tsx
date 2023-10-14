import { useState } from "react";
import { useAtom } from "jotai";
import { loreBookStore } from "../../data/PreparationStore";
import { LoreBookEntry } from "../../interfaces/V2CharSchema";
import Input from "../Micros/Input";

interface LorebookInputProps {
  id: {
    keys: string;
    secondary_keys: string;
    comment: string;
    content: string;
    position: string;
    constant: string;
  };
  index?: number;
  name?: string;
  inputable: LoreBookEntry;
}

export default function LorebookInput({
  id,
  name,
  inputable,
}: LorebookInputProps) {
  const [, setLorebook] = useAtom(loreBookStore);

  const [checkbox, setCheckbox] = useState(inputable.constant);

  const handleValueChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    ID: string
  ) => {
    //Get property identifier from ID
    const identifier = ID.split("-")[0];

    //Store inputs accordingly
    if (ID === id.constant) {
      setCheckbox(prev => !prev);
      setLorebook((prev) => {
        return {
          ...prev,
          entries: prev.entries.map((loreEntry) => {
            if (loreEntry.id === inputable.id) {
              return {
                ...loreEntry,
                [identifier]: (event.target as HTMLInputElement).checked,
              };
            }
            return loreEntry;
          }),
        };
      })
    } else {
      setLorebook((prev) => {
        return {
          ...prev,
          entries: prev.entries.map((loreEntry) => {
            if (loreEntry.id === inputable.id) {
              return { ...loreEntry, [identifier]: event.target.value };
            }
            return loreEntry;
          }),
        };
      });
    }
  };

  // useEffect(() => {
  //   console.log(checkbox);
  // }, [checkbox])

  // useEffect(() => {
  //   console.log(lorebook.entries);
  //   console.log(inputable)
  // }, [inputable]);
  return (
    <div className="flex flex-col gap-5">
      <div className="text-2xl font-semibold">{name}</div>
      <div className="flex flex-col sm:flex-row gap-10">
        <div className="flex flex-col gap-5 mt-10">
          <div className="flex items-center gap-3 font-semibold">
            <input
              type="checkbox"
              className="ml-2 scale-[1.6]"
              id={id.constant}
              checked={checkbox}
              onChange={(event) => handleValueChange(event, id.constant)}
            />
            <div>Constant</div>
          </div>
          <select
            className="p-3 rounded-lg bg-white"
            id={id.position}
            value={inputable.position}
            onChange={(event) => handleValueChange(event, id.position)}
          >
            <option value="before_char">before character</option>
            <option value="after_char">after character</option>
          </select>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-col sm:flex-row gap-5">
            <Input
              id={id.keys}
              name="Primary Keys"
              nameSize="text-xl"
              val={inputable.keys}
              changeHandler={(event) => handleValueChange(event, id.keys)}
            />
            <Input
              id={id.secondary_keys}
              name="Secondary Keys"
              nameSize="text-xl"
              val={inputable.secondary_keys}
              changeHandler={(event) =>
                handleValueChange(event, id.secondary_keys)
              }
            />
          </div>
          <div className="flex flex-col">
            <Input
              id={id.content}
              name="Content"
              nameSize="text-xl"
              val={inputable.content}
              changeHandler={(event) => handleValueChange(event, id.content)}
            />
            <Input
              id={id.comment}
              name="Comment"
              nameSize="text-xl"
              val={inputable.comment}
              changeHandler={(event) => handleValueChange(event, id.comment)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
