import { useEffect, useRef, useState } from "react";
import { ID_TrackedPrefixes } from "../../configs/StaticInputConfigs.json";

interface InputProps {
  id: string;
  name?: string;
  nameSize?: string; //font size based on tailwind syntax
  placeholder?: string;
  val: string;
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
  const [tokenizer, setTokenizer] = useState(false);

  // Set tokenizer based on ID_TrackedPrefixes
  useEffect(() => {
    const shouldSetTokenizer = ID_TrackedPrefixes.some((prefix) =>
      id.includes(prefix)
    );
    setTokenizer(shouldSetTokenizer);
  }, [id]);

  // Autosize textarea to fit content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [val]);

  useEffect(() => {
    //console.log(tokenizer);
    console.log(id);
  }, [id]);

  return (
    <div className="w-full flex flex-col gap-3">
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
      {tokenizer && <div className="self-end">0 Tokens</div>}
    </div>
  );
}
