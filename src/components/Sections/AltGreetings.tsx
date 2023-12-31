import { useAtom } from "jotai/react";
import {
  altGreetStore,
  AltGreetType,
  fileStore,
} from "../../data/PreparationStore";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import SectionButton from "../Micros/SectionButton";
import AltGreetInput from "../SectionInputs/AltGreetInput";
import CleanupButton from "../Micros/CleanupButton";
import SectionTitle from "../Micros/SectionTitle";

export default function AltGreetings() {
  const [file] = useAtom(fileStore);
  const [altGreets, setAltGreets] = useAtom(altGreetStore);

  const handleAddGreet = () => {
    const greetIndex = altGreets.length + 1;
    setAltGreets((prevAltGreets: AltGreetType[]) => [
      ...prevAltGreets,
      {
        id: `altgreet-${uuidv4()}`,
        name: `Alternative Greeting ${greetIndex}`,
        value: "",
      },
    ]);
  };

  const handleRemoveGreet = (id: string) => {
    setAltGreets((prevAltGreets: AltGreetType[]) =>
      prevAltGreets.filter((altGreet) => altGreet.id !== id)
    );
    // Rename greetings to "Alternative Greeting 1, 2, 3..." up to altGreet.length
    setAltGreets((prevAltGreets: AltGreetType[]) => {
      return prevAltGreets.map((altGreet, i) => {
        altGreet.name = `Alternative Greeting ${i + 1}`;
        return altGreet;
      });
    });
  };

  const emptyStore = () => {
    setAltGreets([]);
  };

  useEffect(() => {
    if (file?.data.alternate_greetings) {
      setAltGreets(
        file.data.alternate_greetings.map((greet: string, index: number) => {
          return {
            id: `altgreet-${uuidv4()}`,
            name: `Alternative Greeting ${index + 1}`,
            value: greet,
          };
        })
      );
    } else {
      setAltGreets([]);
    }
  }, [file]);

  // useEffect(() => {
  //   console.log(altGreets);
  // }, [altGreets]);

  //Keys must be UNIQUE for dynamically added/removed inputs to avoid key overlap. (DON'T USE THEIR INDEX!)
  return (
    <section className="w-full">
      <div className="flex justify-between mb-10 text-4xl font-semibold">
        <SectionTitle title="Alternative Greetings" />
        <CleanupButton cleanupMethod={emptyStore} />
      </div>
      <div className="flex flex-col gap-10">
        {altGreets.map((altGreet) => (
          <div className="relative flex sm:gap-10" key={altGreet.id}>
            <AltGreetInput
              id={altGreet.id}
              name={altGreet.name}
              value={altGreet.value}
            />
            <div className="flex items-center">
              <button
                onClick={() => handleRemoveGreet(altGreet.id)}
                className="absolute -top-2 right-0 sm:static p-3 rounded-full bg-black hover:bg-gray-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <SectionButton
          destinations={altGreets}
          handler={handleAddGreet}
          name="Add Greeting"
        />
      </div>
    </section>
  );
}
