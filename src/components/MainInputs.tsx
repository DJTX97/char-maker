import Input from "./Input";
import { useAtom } from "jotai";
import { mainInputStore } from "../data/MainStore";
import { useEffect } from "react";

export default function MainInputs() {
  const [mainInputs, setMainInputs] = useAtom(mainInputStore);

  useEffect(() => {
    console.log(mainInputs);
  }, [mainInputs]);


  return (
    <div className="flex flex-col gap-5">
      {mainInputs.map((input, index) => (
        <Input key={index} id={input.id} name={input.name} />
      ))}
    </div>
  );
}
