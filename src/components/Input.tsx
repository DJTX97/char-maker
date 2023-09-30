import { useState, useEffect, useRef } from "react";

interface InputProps {
  id: string;
}

export default function Input({ id }: InputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaValue, setTextareaValue] = useState("");

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
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
      <label htmlFor={id} className="text-2xl font-semibold">
        {id}
      </label>
      <textarea
        name={id}
        id={id}
        ref={textareaRef}
        rows={1}
        value={textareaValue}
        onChange={handleValueChange}
        className="p-2 rounded-lg resize-none overflow-hidden"
      />
    </div>
  );
}
