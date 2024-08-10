import { useEffect, useState } from "react";
import { ID_TrackedPrefixes } from "../../../configs/StaticInputConfigs.json";
import llamaTokenizer from "llama-tokenizer-js";

type TokenizerArgs = {
  val: string | string[];
  id: string;
};

export const useTokenizer = ({ val, id }: TokenizerArgs) => {
  const [tokenizer, setTokenizer] = useState(false);
  const [tokenizedValue, setTokenizedValue] = useState("");

  // Set tokenizer based on ID_TrackedPrefixes (runs only once, when the component is first rendered)
  useEffect(() => {
    const shouldSetTokenizer = ID_TrackedPrefixes.some((prefix) =>
      id.includes(prefix)
    );
    setTokenizer(shouldSetTokenizer);
  }, [id]);

  // Tokenize input
  useEffect(() => {
    if (val) {
      setTokenizedValue(llamaTokenizer.encode(val));
    }
  }, [val]);

  return {
    tokenizer,
    tokenizedValue,
  }
};
