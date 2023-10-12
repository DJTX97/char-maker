import { useEffect } from "react";
import { useAtom } from "jotai";
import { loreBookStore } from "../../data/PreparationStore";
import { LoreBookEntry } from "../../interfaces/V2CharSchema";
import Input from "../MicroComps/Input";

interface LorebookInputProps {
  id: {
    keys: string;
    secondary_keys: string;
    comment: string;
    content: string;
    position: string;
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
  const [lorebook, setLorebook] = useAtom(loreBookStore);

  const handleValueChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    ID: string
  ) => {
    //Get property identifier from ID
    const identifier = ID.split("-")[0];

    //Store the specific keys as arrays and the other inputs as strings
    if (ID === id.keys || ID === id.secondary_keys) {
      setLorebook((prev) => {
        return {
          ...prev,
          entries: prev.entries.map((loreEntry) => {
            if (loreEntry.id === inputable.id) {
              return {
                ...loreEntry,
                [identifier]: event.target.value
                  .split(",")
                  .map((entry) => entry.trim()),
              };
            }
            return loreEntry;
          }),
        };
      });
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
  //   console.log(lorebook.entries);
  //   console.log(inputable)
  // }, [inputable]);
  return (
    <div className="flex flex-col gap-5">
      <div className="text-2xl font-semibold">{name}</div>
      <div className="flex gap-10">
        <div>
          <select
            name="select"
            id={id.position}
            value={inputable.position}
            onChange={(event) => handleValueChange(event, id.position)}
          >
            <option value="before_char">before character</option>
            <option value="after_char">after character</option>
          </select>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex gap-5">
            <Input
              id={id.keys}
              name="Primary Keys"
              nameSize="text-xl"
              val={inputable.keys.join(", ")}
              changeHandler={(event) => handleValueChange(event, id.keys)}
            />
            <Input
              id={id.secondary_keys}
              name="Secondary Keys"
              nameSize="text-xl"
              val={inputable.secondary_keys.join(", ")}
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