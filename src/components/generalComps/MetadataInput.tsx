import { useState } from "react";
import { useAtom } from "jotai";
import { metadataStore } from "../../data/MainStore";
import Input from "../MicroComps/Input";

interface MetadataInputProps {
  id: string;
  name?: string;
}

export default function MetadataInput({ id, name }: MetadataInputProps) {
  const [metaInputs, setMetaInputs] = useAtom(metadataStore);

  const [textareaValue, setTextareaValue] = useState("");

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //Persist event.target to access it asynchronously and keep state in sync with the actual data
    event.persist();
    const newValue = event.target.value;
    setTextareaValue(newValue);

    if (metaInputs.map((input) => input.id).includes(id)) {
      setMetaInputs((prevMetaInputs) =>
        prevMetaInputs.map((input) =>
          input.id === id ? { ...input, value: newValue } : input
        )
      );
    }
  };

  return (
    <Input
      id={id}
      name={name}
      val={textareaValue}
      changeHandler={handleValueChange}
    />
  );
}