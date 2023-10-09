import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { altGreetStore } from "../../data/PreparationStore";
import Input from "../MicroComps/Input";

interface AltGreetProps {
  id: string;
  name?: string;
}

export default function AltGreetInput({ id, name }: AltGreetProps) {
  const [altGreets, setAltGreets] = useAtom(altGreetStore);

  const [textareaValue, setTextareaValue] = useState("");

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
  };

  useEffect(() => {
    if (altGreets.map((altGreet) => altGreet.id).includes(id)) {
      setAltGreets((prevAltGreets) =>
        prevAltGreets.map((altGreet) =>
          altGreet.id === id ? { ...altGreet, value: textareaValue } : altGreet
        )
      );
    }
  }, [textareaValue]);

  return (
    <Input
      id={id}
      name={name}
      val={textareaValue}
      changeHandler={handleValueChange}
    />
  );
}
