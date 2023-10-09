import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { mainInputStore } from "../../data/PreparationStore";
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

    setMainInputs((prevMainInputs) =>
      prevMainInputs.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
  };

  // useEffect(() => {
  //   console.log(mainInputs);
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
