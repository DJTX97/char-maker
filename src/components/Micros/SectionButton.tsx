import { useEffect, useRef, useState } from "react";

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
  const prevLengthRef = useRef(0); //track previous length of destinations array
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    handler();
  };

  useEffect(() => {
    if (destinations) {
      if (destinations.length > prevLengthRef.current) {
        const scrollDest = document.getElementById(name);

        if (scrollDest && clicked) {
          const addedItemsHeight = destinations.length - prevLengthRef.current;
          const scrollOffset = -400; // adjust the scroll offset value as needed

          scrollDest.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });

          window.scrollTo({
            top: scrollDest.offsetTop + addedItemsHeight * scrollOffset,
            behavior: "smooth",
          });
        }
      }
      prevLengthRef.current = destinations.length; // update previous length to current length
    }
    return () => {
      setClicked(false);
    };
  }, [destinations?.length]);

  //scroll to top on re-render
  useEffect(() => {
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <button
      id={name}
      onClick={handleClick}
      className={`p-5 rounded-xl bg-black hover:bg-gray-600 text-xl text-white`}
    >
      {name}
    </button>
  );
}
