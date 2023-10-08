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
    <section>
      <div className="flex justify-between mb-10 text-4xl font-semibold">
        <div>Bio</div>
        {/* <CleanupButton cleanupMethod={emptyStore} /> */}
      </div>
      <div className="flex flex-col gap-5">
        {mainInputs.map((input, index) => (
          <MainInput key={index} id={input.id} name={input.name} />
        ))}
      </div>
    </section>
  );
}
