import { useEffect, useRef } from "react";

interface SectionButtonProps {
  name: string;
  handler: () => void;
  destinations: object[];
}

export default function SectionButton({
  handler,
  name,
  destinations,
}: SectionButtonProps) {

  const prevLengthRef = useRef(0); //track previous length of destinations array
  useEffect(() => {
    if (destinations.length > prevLengthRef.current) {
      const scrollDest = document.getElementById(name);

      if (scrollDest) {
        scrollDest.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    }
    prevLengthRef.current = destinations.length; //update previous length to current length
  }, [destinations.length]);

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
