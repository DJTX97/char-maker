import Input from "./Input";
import { useAtom } from "jotai/react";
import { altGreetStore, altGreetType } from "../data/MainStore";
import { useEffect, useState } from "react";

export default function AltGreetings() {
  const [altGreets, setAltGreets] = useAtom(altGreetStore);

  const handleAddAltGreet = () => {
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

  useEffect(() => {
    console.log(altGreets);
  }, [altGreets]);

  return (
    <div className="pt-12">
      <div className="flex flex-col gap-10">
        {altGreets.map((altGreet, index) => (
          <Input key={index} id={altGreet.id} name={altGreet.name} />
        ))}
      </div>
      <div>
        <button
          onClick={handleAddAltGreet}
          className="mt-5 p-5 rounded-xl bg-gray-800 text-xl text-white"
        >
          Add Alternate Greetings
        </button>
      </div>
    </div>
  );
}
