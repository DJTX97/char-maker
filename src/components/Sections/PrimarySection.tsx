import { useAtom } from "jotai";
import { fileStore, primaryInputStore } from "../../data/PreparationStore";
import PrimaryInput from "../SectionInputs/PrimaryInput";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import useUUID from "../../utils/customHooks/useUUID";
import SectionTitle from "../Micros/SectionTitle";

interface PrimarySectionProps {
  title?: string;
}

export default function PrimarySection({ title }: PrimarySectionProps) {
  const [file] = useAtom(fileStore);
  const [primaryInputs, setPrimaryInputs] = useAtom(primaryInputStore);
  //const [KEYS, setKEYS] = useState<string[]>([]);
  const keys = useUUID(primaryInputs.length);
  const [KEYS, setKEYS] = useState(keys);

  useEffect(() => {
    setKEYS(
      primaryInputs.map((input) => {
        return `${input.id}-${uuidv4()}`;
      })
    );
    if (file) {
      setPrimaryInputs((prev) =>
        prev.map((input) => {
          const value = (file.data as { [key: string]: any })[input.id];
          return {
            ...input,
            value: value !== undefined ? value : "", // handle the possibility of property not existing
          };
        })
      );
    }
  }, [file]);

  // useEffect(() => {
  //   console.log(KEYS);
  // }, [KEYS]);

  return (
    <section className="w-full">
      {title && (
        <div className="flex justify-between mb-10 text-4xl font-semibold">
          <SectionTitle title={title} />
        </div>
      )}
      <div className="flex flex-col gap-5">
        {!title
          ? primaryInputs
              .slice(0, primaryInputs.length / 2)
              .map((input, index) => (
                <PrimaryInput
                  key={KEYS[index]}
                  id={input.id}
                  name={input.name}
                  value={input.value}
                />
              ))
          : primaryInputs
              .slice(primaryInputs.length / 2, primaryInputs.length)
              .map((input, index) => (
                <PrimaryInput
                  key={KEYS[index + primaryInputs.length / 2]}
                  id={input.id}
                  name={input.name}
                  value={input.value}
                />
              ))}
      </div>
    </section>
  );
}
