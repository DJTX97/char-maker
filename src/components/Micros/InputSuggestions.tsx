import { useEffect, useState } from "react";

interface Suggestion {
  label: string;
  value: string;
}

interface InputSuggestionsProps {
  val: string;
  scrollHeight: number;
  rowsNum: number;
}

const suggestions: Suggestion[] = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

export const InputSuggestions = ({
  val,
  scrollHeight,
  rowsNum,
}: InputSuggestionsProps) => {
  const rowLength = val.length / rowsNum;

  const position = {
    x: val.slice(0, val.length / rowsNum).lastIndexOf("@") / 2 / rowsNum,
    y: scrollHeight + 40,
  };

  return (
    <>
      {val.endsWith("@") && (
        <ul
          className={`absolute z-10 p-2 rounded-lg bg-white border border-black`}
          style={{ left: `${position.x}rem`, top: `${position.y}px` }}
        >
          {suggestions.map((suggestion) => (
            <li key={suggestion.value}>{suggestion.label}</li>
          ))}
        </ul>
      )}
    </>
  );
};
