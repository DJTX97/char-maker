import { useState, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { mainInputStore } from "../data/MainStore";

interface InputProps {
  id: string;
  val?: string;
}

export default function Input({ id, val }: InputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [mainInputs, setMainInputs] = useAtom(mainInputStore);

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
    setMainInputs((prev: any) => ({
      ...prev,
      [id]: event.target.value,
    }))
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
      <div className="text-2xl font-semibold">{id}</div>
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
