interface SectionButtonProps {
  name: string;
  handler: () => void;
}

export default function SectionButton({ handler, name }: SectionButtonProps) {
  return (
    <div className="flex justify-end">
      <button
        onClick={handler}
        className="mt-6 p-5 rounded-xl bg-black hover:bg-gray-600 text-xl text-white"
      >
        {name}
      </button>
    </div>
  );
}
