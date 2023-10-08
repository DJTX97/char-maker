import MainInputs from "../Sections/MainInputs";
import AltGreetings from "../Sections/AltGreetings";
import LorebookEditor from "../Sections/LorebookEditor";
import Metadata from "../Sections/Metadata";

export default function Main() {
  return (
    <main className="flex flex-col gap-32 px-40">
      <MainInputs />
      <AltGreetings />
      <LorebookEditor />
      <Metadata />
    </main>
  );
}
