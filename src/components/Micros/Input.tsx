import { useEffect, useRef } from "react";
import { useTokenizer } from "./hooks/useTokenizer";
import { InputSuggestions } from "./InputSuggestions";
// import { useAtom } from "jotai";
// import { fileStore } from "../../data/PreparationStore";

interface InputProps {
  id: string;
  name?: string;
  nameSize?: string; //font size based on tailwind syntax
  placeholder?: string;
  val: string | string[];
  changeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  width?: string; //width value based on tailwind syntax
}

export default function Input({
  id,
  name,
  nameSize = "text-2xl",
  placeholder = "",
  val,
  changeHandler,
  width = "",
}: InputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  //const [file] = useAtom(fileStore);

  const { tokenizer, tokenizedValue } = useTokenizer({ val, id });

  // Autosize textarea to fit content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [val]);

  useEffect(() => {
    console.log(textareaRef.current?.rows);
  }, [textareaRef.current?.rows]);

  return (
    <div className="relative w-full flex flex-col gap-4 left">
      {name && (
        <div className={`${nameSize} dark:text-white font-semibold`}>
          {name}
        </div>
      )}
      <textarea
        id={id}
        ref={textareaRef}
        rows={(val as string).split("\n").length}
        placeholder={placeholder}
        value={val}
        onChange={changeHandler}
        className={`${width} p-2 dark:bg-slate-700 dark:text-white rounded-lg resize-none overflow-hidden`}
      />
      <InputSuggestions
        val={val as string}
        scrollHeight={textareaRef.current?.scrollHeight as number}
      />
      {tokenizer && (
        <div className="self-end font-semibold dark:text-white">
          {val !== "" ? tokenizedValue.length : 0} Tokens
        </div>
      )}
    </div>
  );
}
