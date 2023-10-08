//import { useEffect } from "react";
import { useAtom } from "jotai";
import { mainInputStore } from "../../data/MainStore";
import MainInput from "../GeneralComps/MainInput";

export default function MainInputs() {
  const [mainInputs] = useAtom(mainInputStore);

  // useEffect(() => {
  //   console.log(mainInputs);
  // }, [mainInputs]);

  return (
    <section className="flex flex-col gap-5">
      {mainInputs.map((input, index) => (
        <MainInput key={index} id={input.id} name={input.name} />
      ))}
    </section>
  );
}
