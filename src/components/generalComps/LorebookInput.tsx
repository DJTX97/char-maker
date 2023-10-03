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
    <div className="flex flex-col gap-5 w-full">
      <div className="text-2xl font-semibold">{name}</div>
      <div className="flex gap-5">
        <Input
          id={uuidv4()}
          name={"Primary Keys"}
          nameSize="text-xl"
          val=""
          changeHandler={() => {}}
        />
        <Input
          id={uuidv4()}
          name={"Secondary Keys"}
          nameSize="text-xl"
          val=""
          changeHandler={() => {}}
        />
      </div>
      <div className="flex flex-col gap-5">
        <Input
          id={uuidv4()}
          name={"Content"}
          nameSize="text-xl"
          val=""
          changeHandler={() => {}}
        />
        <Input
          id={uuidv4()}
          name={"Comment"}
          nameSize="text-xl"
          val=""
          changeHandler={() => {}}
        />
      </div>
    </div>
  );
}
