import { useState } from "react";
import { useAtom } from "jotai";
import { primaryInputStore } from "../../data/PreparationStore";
import Input from "../MicroComps/Input";

interface MetadataInputProps {
  id: string;
  name?: string;
  value: string;
}

export default function PrimaryInput({ id, name, value }: MetadataInputProps) {
  const [, setPrimaryInputs] = useAtom(primaryInputStore);

  const [textareaValue, setTextareaValue] = useState(value);

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //Persist event.target to access it asynchronously and keep state in sync with the actual data
    event.persist();
    const newValue = event.target.value;
    setTextareaValue(newValue);

    setPrimaryInputs((prev) =>
      prev.map((input) => {
        if (input.id === id) {
          return {
            ...input,
            value: newValue,
          };
        } else {
          return input;
        }
      })
    );
  };

  // useEffect(() => {
  //   console.log(metaInputs);
  // }, [textareaValue]);

  return (
    <Input
      id={id}
      name={name}
      val={textareaValue}
      changeHandler={handleValueChange}
    />
  );
}
