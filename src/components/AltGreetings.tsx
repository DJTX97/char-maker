import { useState } from "react";
import Input from "./Input";

export default function AltGreetings() {
  const [altGreetCounter, setAltGreetCounter] = useState(0);

  const addAltGreet = () => {
    setAltGreetCounter((prev) => prev + 1);
  };

  const removeAltGreet = () => {
    setAltGreetCounter((prev) => prev - 1);
  };

  return (
    <div className="pt-12">
      <div className="flex flex-col gap-10">
        {Array.from({ length: altGreetCounter }).map((_, index) => (
          <div key={index} className="flex gap-5">
            <Input id={`Alternative Greeting ${index + 1}`} />
            <div className="flex items-center">
              <button className="h-14 bg-gray-800 text-white" onClick={removeAltGreet}>Remove</button>
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
