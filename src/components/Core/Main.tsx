import AltGreetings from "../Sections/AltGreetings";
import LorebookEditor from "../Sections/LorebookEditor";
import Export from "../Sections/Export";
import Import from "../Sections/Import";
import PrimarySection from "../Sections/PrimarySection";

export default function Main() {
  return (
    <main className="flex flex-col items-center gap-32 px-10 md:px-20 lg:px-40">
      <Import />
      <PrimarySection />
      <AltGreetings />
      <LorebookEditor />
      <PrimarySection title="Metadata" />
      <Export />
    </main>
  );
}
