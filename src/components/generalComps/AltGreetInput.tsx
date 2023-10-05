import { useState } from "react";
import { useAtom } from "jotai";
import { altGreetStore } from "../../data/MainStore";
import Input from "../microComps/Input";

interface AltGreetProps {
  id: string;
  name?: string;
}

export default function AltGreetInput({ id, name }: AltGreetProps) {
  const [altGreets, setAltGreets] = useAtom(altGreetStore);

  const [textareaValue, setTextareaValue] = useState("");

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //Persist event.target to access it asynchronously and keep state in sync with the actual data
    event.persist();
    const newValue = event.target.value;
    setTextareaValue(newValue);

    if (altGreets.map((altGreet) => altGreet.id).includes(id)) {
      setAltGreets((prevAltGreets) =>
        prevAltGreets.map((altGreet) =>
          altGreet.id === id ? { ...altGreet, value: newValue } : altGreet
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
