import { atom } from "jotai";
import { MainInputs } from "../configs/MainInputs.json";

const mainInputs = Object.fromEntries(MainInputs.map((key) => [key, ""]));
export const mainInputStore = atom(mainInputs);

const altGreets: string[] = [];
export const altGreetStore = atom(altGreets);
