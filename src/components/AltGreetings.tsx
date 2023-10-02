import Input from "./Input";
import { useAtom } from "jotai/react";
import { altGreetStore, altGreetType } from "../data/MainStore";
import { useEffect } from "react";

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
    <div className="pt-12">
      <div className="flex flex-col gap-10">
        {altGreets.map((altGreet) => (
          <div className="flex gap-5" key={altGreet.id}>
            <Input id={altGreet.id} inputable={altGreet} />
            <div className="flex items-center">
              <button
                onClick={() => handleRemoveGreet(altGreet.id)}
                className="p-3 bg-black text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={handleAddGreet}
          className="mt-5 p-5 rounded-xl bg-gray-800 text-xl text-white"
        >
          Add Alternate Greetings
        </button>
      </div>
    </div>
  );
}
