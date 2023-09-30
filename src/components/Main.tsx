import { inputs } from "../configs/MainInputs.json";
import AltGreetings from "./AltGreetings";
import Input from "./Input";

export default function Main() {
  return (
    <div className="px-40">
      <div className="flex flex-col gap-5">
        {inputs.map((input, index) => (
          <Input key={index} id={input} />
        ))}
      </div>
      <AltGreetings />
    </div>
  );
}
