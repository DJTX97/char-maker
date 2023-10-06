import { SetStateAction } from "react";
import { loreBookEntry } from "../../interfaces/CharCardSchema";
import { altGreetType } from "../../data/MainStore";

interface CleanupButtonProps {
  cleanupMethod: () => void;
}

export default function CleanupButton({ cleanupMethod }: CleanupButtonProps) {
  const handleEmptyBin = () => {
    cleanupMethod();
  };

  return (
    <button
      onClick={handleEmptyBin}
      className="p-3 rounded-full bg-black hover:bg-gray-600 text-xl text-white"
    >
      DELETE
    </button>
  );
}
