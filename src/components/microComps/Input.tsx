import { useState, useEffect, useRef } from "react";


interface InputProps {
  id: string;
  name?: string;
  category?: string;
  val: string;
  changeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  width?: string; //width value based on tailwind syntax
}

export default function Input({ id, name, val, category, changeHandler, width }: InputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Autosize textarea to fit content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [val]);

  return (
    <div className="w-full flex flex-col gap-3">
      {name && <div className="text-2xl font-semibold">{name}</div>}
      <textarea
        id={id}
        ref={textareaRef}
        rows={1}
        placeholder={category && category}
        value={val}
        onChange={changeHandler}
        className={`${width && width} p-2 rounded-lg resize-none overflow-hidden`}
      />
    </div>
  );
}

