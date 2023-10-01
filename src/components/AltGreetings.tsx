import Input from "./Input";
import { useAtom } from "jotai/react";
import { altGreetStore } from "../data/MainStore";

export default function AltGreetings() {
  const [altGreets, setAltGreets] = useAtom(altGreetStore);

  const addAltGreet = () => {
    setAltGreets((prev: string[]) => [...prev, ""]);
  };

  const removeAltGreet = () => {};

  return (
    <div className="pt-12">
      <div className="flex flex-col gap-10">
        {altGreets.map((item, index) => (
          <div key={index} className="flex gap-5">
            <Input id={`Alternative Greeting ${index + 1}`} val={item} />
            <div className="flex items-center">
              <button
                className="h-14 bg-gray-800 text-white"
                onClick={removeAltGreet}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={addAltGreet}
          className="mt-5 p-5 rounded-xl bg-gray-800 text-xl text-white"
        >
          Add Alternate Greetings
        </button>
      </div>
    </div>
  );
}
