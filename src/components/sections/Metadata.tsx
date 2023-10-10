//import { useEffect } from "react";
import { useAtom } from "jotai";
import { primaryInputStore } from "../../data/PreparationStore";
import PrimaryInput from "../GeneralComps/PrimaryInput";

export default function Metadata() {
  const [primaryInputs] = useAtom(primaryInputStore);

  return (
    <section>
      <div className="flex justify-between mb-10 text-4xl font-semibold">
        <div>Metadata</div>
        {/* <CleanupButton cleanupMethod={emptyStore} /> */}
      </div>
      <div className="flex flex-col gap-5">
        {primaryInputs
          .slice(primaryInputs.length / 2, primaryInputs.length)
          .map((input, index) => (
            <PrimaryInput key={index} id={input.id} name={input.name} />
          ))}
      </div>
    </section>
  );
}
