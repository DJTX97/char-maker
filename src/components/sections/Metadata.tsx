//import { useEffect } from "react";
import { useAtom } from "jotai";
import { metadataStore } from "../../data/MainStore";
import MetadataInput from "../generalComps/MetadataInput";

export default function Metadata() {
  const [metaInputs] = useAtom(metadataStore);

  // useEffect(() => {
  //   console.log(mainInputs);
  // }, [mainInputs]);

  return (
    <section>
      <div className="flex justify-between mb-10 text-4xl font-semibold">
        <div>Metadata</div>
        {/* <CleanupButton cleanupMethod={emptyStore} /> */}
      </div>
      <div className="flex flex-col gap-5">
        {metaInputs.map((input, index) => (
          <MetadataInput key={index} id={input.id} name={input.name} />
        ))}
      </div>
    </section>
  );
}
