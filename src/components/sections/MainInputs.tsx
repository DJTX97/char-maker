//import { useEffect } from "react";
import { useAtom } from "jotai";
import { primaryInputStore } from "../../data/PreparationStore";
import PrimaryInput from "../GeneralComps/PrimaryInput";

export default function MainInputs() {
  const [primaryInputs] = useAtom(primaryInputStore);

  return (
    <section>
      <div className="flex flex-col gap-5">
        {primaryInputs
          .slice(0, primaryInputs.length / 2)
          .map((input, index) => (
            <PrimaryInput key={index} id={input.id} name={input.name} />
          ))}
      </div>
    </section>
  );
}
