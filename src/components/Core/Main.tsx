import MainInputs from "../Sections/MainInputs";
import AltGreetings from "../Sections/AltGreetings";
import LorebookEditor from "../Sections/LorebookEditor";
import Metadata from "../Sections/Metadata";
import Export from "../Sections/Export";
import Import from "../Sections/Import";

export default function Main() {
  return (
    <main className="flex flex-col gap-32 px-40">
      <Import />
      <MainInputs />
      <AltGreetings />
      <LorebookEditor />
      <Metadata />
      <Export />
    </main>
  );
}
