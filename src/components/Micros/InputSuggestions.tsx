import { useEffect, useState } from "react";

interface Suggestion {
  label: string;
  value: string;
}

interface InputSuggestionsProps {
  val: string;
  scrollHeight: number;
}

const suggestions: Suggestion[] = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

export const InputSuggestions = ({ val, scrollHeight }: InputSuggestionsProps) => {

const newLinesCount = val.split("\n").length

// useEffect(() => {
//   console.log(newLinesCount);
// }, [val]);

// useEffect(() => {
//   console.log(val.length);
// }, [val]);

  const position = {
    x: val.length <= 113 ? val.lastIndexOf("@") * 8.5 : val.lastIndexOf("@") * 8.5,
    y: scrollHeight + 10,
  };

  return (
    <>
      {val.endsWith("@") && (
        <ul
          className={`absolute z-10 p-2 rounded-lg bg-white border border-black`}
          style={{ left: position.x, top: position.y }}
        >
          {suggestions.map((suggestion) => (
            <li key={suggestion.value}>{suggestion.label}</li>
          ))}
        </ul>
      )}
    </>
  );
};
