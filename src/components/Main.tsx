import { inputs } from "../configs/MainInputs.json";
import Input from "./Input";

export default function Main() {
  return (
    <div>
      <div className="flex flex-col gap-5 px-40">
        {inputs.map((input, index) => (
          <Input key={index} id={input} />
        ))}
      </div>
    </div>
  );
}
