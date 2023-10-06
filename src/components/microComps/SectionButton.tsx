import { useEffect } from "react";

interface SectionButtonProps {
  name: string;
  handler: () => void;
  destinations?: object[];
}

export default function SectionButton({
  handler,
  name,
  destinations,
}: SectionButtonProps) {
  
  useEffect(() => {
    if (destinations && destinations.length > 0) {
      const scrollDest = document.getElementById(name);

      if (scrollDest) {
        scrollDest.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    }
  }, [destinations]);

  //scroll to top on re-render
  // useEffect(() => {
  //   if (history.scrollRestoration) {
  //     history.scrollRestoration = "manual";
  //   } else {
  //     window.scrollTo(0, 0);
  //   }
  // }, []);

  return (
    <div className="flex justify-end" id={name}>
      <button
        onClick={handler}
        className="mt-6 p-5 rounded-xl bg-black hover:bg-gray-600 text-xl text-white"
      >
        {name}
      </button>
    </div>
  );
}
