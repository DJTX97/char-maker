import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { primaryInputStore } from "../../data/PreparationStore";
import Input from "../MicroComps/Input";

interface MetadataInputProps {
  id: string;
  name?: string;
}

export default function PrimaryInput({ id, name }: MetadataInputProps) {
  const [primaryInputs, setPrimaryInputs] = useAtom(primaryInputStore);

  const [textareaValue, setTextareaValue] = useState("");

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //Persist event.target to access it asynchronously and keep state in sync with the actual data
    event.persist();
    const newValue = event.target.value;
    setTextareaValue(newValue);

    setPrimaryInputs((prev) =>
      prev.map(
        (input) => {
          if (input.id === id && id !== "tags") {
            return {
              ...input,
              value: newValue,
            };
          } else if (input.id === id && id === "tags") {
            return {
              ...input,
              value: newValue.split(",").map((tag) => tag.trim()),
            };
          } else {
            return input;
          }
        }
      )
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
