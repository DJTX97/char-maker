import { useAtom } from "jotai/react";
import { altGreetStore, AltGreetType } from "../../data/MainStore";
import { useEffect } from "react";
import SectionButton from "../MicroComps/SectionButton";
import AltGreetInput from "../GeneralComps/AltGreetInput";
import CleanupButton from "../MicroComps/CleanupButton";

export default function AltGreetings() {
  const [altGreets, setAltGreets] = useAtom(altGreetStore);

  const handleAddGreet = () => {
    const greetIndex = altGreets.length + 1;
    setAltGreets((prevAltGreets: AltGreetType[]) => [
      ...prevAltGreets,
      {
        id: Date.now().toString(),
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
  }

  useEffect(() => {
    console.log(altGreets);
  }, [altGreets]);

  //Keys must be UNIQUE for dynamically added/removed inputs to avoid key overlap. (DON'T USE THEIR INDEX!)
  return (
    <section>
      <div className="flex justify-between mb-10 text-4xl font-semibold">
        <div>Alternative Greetings</div>
        <CleanupButton cleanupMethod={emptyStore} />
      </div>
      <div className="flex flex-col gap-10">
        {altGreets.map((altGreet) => (
          <div className="flex gap-10" key={altGreet.id}>
            <AltGreetInput
              id={altGreet.id}
              name={altGreet.name}
            />
            <div className="flex items-center">
              <button
                onClick={() => handleRemoveGreet(altGreet.id)}
                className="p-3 rounded-full bg-black hover:bg-gray-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <SectionButton destinations={altGreets} handler={handleAddGreet} name="Add Greeting" />
    </section>
  );
}
