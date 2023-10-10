//import { useEffect } from "react";
import { useAtom } from "jotai";
import { fileStore, primaryInputStore } from "../../data/PreparationStore";
import PrimaryInput from "../GeneralComps/PrimaryInput";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

interface PrimarySectionProps {
  title?: string;
}

export default function PrimarySection({ title }: PrimarySectionProps) {
  const [file, setFile] = useAtom(fileStore);
  const [primaryInputs, setPrimaryInputs] = useAtom(primaryInputStore);
  const [KEYS, setKEYS] = useState<string[]>([]);

  useEffect(() => {
    setKEYS(
      primaryInputs.map((_) => {
        return uuidv4();
      })
    );
    if (file) {
      setPrimaryInputs((prev) =>
        prev.map((input) => {
          return {
            ...input,
            value: file.data[input.id],
          };
        })
      );
    }
  }, [file]);

  return (
    <section>
      {title && (
        <div className="flex justify-between mb-10 text-4xl font-semibold">
          <div>{title}</div>
          {/* <CleanupButton cleanupMethod={emptyStore} /> */}
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
                  key={KEYS[index]}
                  id={input.id}
                  name={input.name}
                  value={input.value}
                />
              ))}
      </div>
    </section>
  );
}
