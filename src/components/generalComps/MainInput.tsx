import { useState } from "react";
import { useAtom } from "jotai";
import { mainInputStore } from "../../data/MainStore";
import Input from "../MicroComps/Input";

interface MainInputProps {
  id: string;
  name?: string;
}

export default function MainInput({ id, name }: MainInputProps) {
  const [mainInputs, setMainInputs] = useAtom(mainInputStore);

  const [textareaValue, setTextareaValue] = useState("");

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //Persist event.target to access it asynchronously and keep state in sync with the actual data
    event.persist();
    const newValue = event.target.value;
    setTextareaValue(newValue);

    if (mainInputs.map((input) => input.id).includes(id)) {
      setMainInputs((prevMainInputs) =>
        prevMainInputs.map((input) =>
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
