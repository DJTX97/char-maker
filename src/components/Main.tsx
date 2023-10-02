import MainInputs from "./sections/MainInputs";
import AltGreetings from "./sections/AltGreetings";
import LorebookEditor from "./sections/LorebookEditor";

export default function Main() {
  return (
    <main className="flex flex-col gap-20 px-40">
      <MainInputs />
      <AltGreetings />
      <LorebookEditor />
    </main>
  );
}
