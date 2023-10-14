import { useEffect, useRef, useState } from "react";
// import { useAtom } from "jotai";
// import { fileStore } from "../../data/PreparationStore";
import { ID_TrackedPrefixes } from "../../configs/StaticInputConfigs.json";
import llamaTokenizer from "llama-tokenizer-js";

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
  nameSize,
  placeholder,
  val,
  changeHandler,
  width,
}: InputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  //const [file] = useAtom(fileStore);
  const [tokenizer, setTokenizer] = useState(false);
  const [tokenizedValue, setTokenizedValue] = useState("");

  // Set tokenizer based on ID_TrackedPrefixes (runs only once, when the component is first rendered)
  useEffect(() => {
    const shouldSetTokenizer = ID_TrackedPrefixes.some((prefix) =>
      id.includes(prefix)
    );
    setTokenizer(shouldSetTokenizer);
  }, [id]);

  // Tokenize input
  useEffect(() => {
    if (val) {
      setTokenizedValue(llamaTokenizer.encode(val));
    }
  }, [val]);

  // Autosize textarea to fit content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [val]);

  // useEffect(() => {
  //   console.log(val);
  //   console.log(tokenizedValue);
  // }, [tokenizedValue]);

  return (
    <div className="w-full flex flex-col gap-4">
      {name && (
        <div className={`${nameSize ? nameSize : "text-2xl"} font-semibold`}>
          {name}
        </div>
      )}
      <textarea
        id={id}
        ref={textareaRef}
        rows={1}
        placeholder={placeholder ?? ""}
        value={val}
        onChange={changeHandler}
        className={`${
          width && width
        } p-2 rounded-lg resize-none overflow-hidden`}
      />
      {tokenizer && (
        <div className="self-end">
          {val !== "" ? tokenizedValue.length : 0} Tokens
        </div>
      )}
    </div>
  );
}
