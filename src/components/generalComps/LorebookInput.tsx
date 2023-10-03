import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAtom } from "jotai";
import { loreBookStore } from "../../data/MainStore";
import { loreBookEntry } from "../../interfaces/CharCardSchema";
import Input from "../microComps/Input";

interface LorebookInputProps {
  id: string;
  name?: string;
  inputable: loreBookEntry;
}

export default function LorebookInput({
  id,
  name,
  inputable,
}: LorebookInputProps) {
  const [loreEntries, setLoreEntries] = useAtom(loreBookStore);

  return (
    <div>
      <div>{name}</div>
      <div className="flex">
        <Input id={uuidv4()} name={"Primary Keys"} val="" changeHandler={() => {}} />
        <Input id={uuidv4()} name={"Secondary Keys"} val="" changeHandler={() => {}} />
      </div>
      <div className="flex flex-col">
        <Input id={uuidv4()} name={"Content"} val="" changeHandler={() => {}}/>
        <Input id={uuidv4()} name={"Comment"} val="" changeHandler={() => {}}/>
      </div>
    </div>
  );
}
