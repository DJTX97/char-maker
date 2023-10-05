import { useAtom } from "jotai/react";
import { altGreetStore, altGreetType } from "../../data/MainStore";
import { useEffect } from "react";
import SectionButton from "../generalComps/SectionButton";
import AltGreetInput from "../generalComps/AltGreetInput";

export default function AltGreetings() {
  const [altGreets, setAltGreets] = useAtom(altGreetStore);

  const handleAddGreet = () => {
    const greetIndex = altGreets.length + 1;
    setAltGreets((prevAltGreets: altGreetType[]) => [
      ...prevAltGreets,
      {
        id: Date.now().toString(),
        name: `Alternative Greeting ${greetIndex}`,
        value: "",
      },
    ]);
  };

  const handleRemoveGreet = (id: string) => {
    setAltGreets((prevAltGreets: altGreetType[]) =>
      prevAltGreets.filter((altGreet) => altGreet.id !== id)
    );
    // Rename greetings to "Alternative Greeting 1, 2, 3..." up to altGreet.length
    setAltGreets((prevAltGreets: altGreetType[]) => {
      return prevAltGreets.map((altGreet, i) => {
        altGreet.name = `Alternative Greeting ${i + 1}`;
        return altGreet;
      });
    });
  };

  useEffect(() => {
    console.log(altGreets);
  }, [altGreets]);

  //Keys must be UNIQUE for dynamically added/removed inputs to avoid key overlap. (DON'T USE THEIR INDEX!)
  return (
    <section>
      <div className="mb-10 text-4xl font-semibold">Alternative Greetings</div>
      <div className="flex flex-col gap-10">
        {altGreets.map((altGreet) => (
          <div className="flex gap-10" key={altGreet.id}>
            <AltGreetInput
              //key={altGreet.id}
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
      <SectionButton handler={handleAddGreet} name="Add Alternative Greeting" />
    </section>
  );
}
