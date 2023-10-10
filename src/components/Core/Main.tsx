import AltGreetings from "../Sections/AltGreetings";
import LorebookEditor from "../Sections/LorebookEditor";
import Export from "../Sections/Export";
import Import from "../Sections/Import";
import PrimarySection from "../Sections/PrimarySection";

export default function Main() {
  return (
    <main className="flex flex-col gap-32 px-40">
      <Import />
      <PrimarySection />
      <AltGreetings />
      <LorebookEditor />
      <PrimarySection title="Metadata" />
      <Export />
    </main>
  );
}
