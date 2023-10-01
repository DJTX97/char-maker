import { MainInputs } from "../configs/MainInputs.json";
import AltGreetings from "./AltGreetings";
import Input from "./Input";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { mainInputStore } from "../data/MainStore";

export default function Main() {

  const [mainInputs, setMainInputs] = useAtom(mainInputStore);

  // useEffect(() => {
  //   console.log(mainInputs);
  // }, [mainInputs]);

  return (
    <div className="px-40">
      <div className="flex flex-col gap-5">
        {MainInputs.map((input, index) => (
          <Input key={index} id={input} />
        ))}
      </div>
      <AltGreetings />
    </div>
  );
}
