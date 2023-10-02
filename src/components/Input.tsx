import { useState, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import {
  mainInputStore,
  mainInputType,
  altGreetStore,
} from "../data/MainStore";

interface InputProps {
  id: string;
  name?: string;
}

export default function Input({ id, name }: InputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [mainInputs, setMainInputs] = useAtom(mainInputStore);
  const [altGreets, setAltGreets] = useAtom(altGreetStore);

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //Persist event.target to access it asynchronously and keep state in sync with the actual data
    event.persist();
    const newValue = event.target.value;
    setTextareaValue(newValue);
    
    if (mainInputs.map(input => input.id).includes(id)) {
      setMainInputs(prevMainInputs =>
        prevMainInputs.map((input) =>
          input.id === id ? { ...input, value: newValue } : input
        )
      );
    } else if (altGreets.map(altGreet => altGreet.id).includes(id)) {
      setAltGreets(prevAltGreets =>
        prevAltGreets.map((altGreet) =>
          altGreet.id === id ? { ...altGreet, value: newValue } : altGreet
        )
      );
    }
  };

  

  // Autosize textarea to fit content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textareaValue]);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-2xl font-semibold">{name}</div>
      <textarea
        id={id}
        ref={textareaRef}
        rows={1}
        value={textareaValue}
        onChange={handleValueChange}
        className="p-2 rounded-lg resize-none overflow-hidden"
        required={id === "Name" || id === "Description" ? true : false}
      />
    </div>
  );
}
