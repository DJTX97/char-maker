import AltGreetings from "../SectionComps/AltGreetings";
import LorebookEditor from "../SectionComps/LorebookEditor";
import Export from "../SectionComps/Export";
import Import from "../SectionComps/Import";
import PrimarySection from "../SectionComps/PrimarySection";

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
