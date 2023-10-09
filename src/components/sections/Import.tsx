import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAtom } from "jotai";
import { altGreetStore, entryStore, worldNameStore } from "../../data/PreparationStore";
import { v4 as uuidv4 } from "uuid";
import { V2CharSchema } from "../../interfaces/V2CharSchema";

const acceptedFileTypes = ["application/json", "image/png"];

const Import = () => {
  const [file, setFile] = useState<any>(null);
  const [entries, setEntries] = useAtom(entryStore);
  const [worldName, setWorldName] = useAtom(worldNameStore);
  const [altGreets, setAltGreets] = useAtom(altGreetStore);

  const handleFile = async (file: any) => {
    if (file) {
      if (file.type.includes("json")) {
        let fileContents = await file.text();
        fileContents = JSON.parse(fileContents);
        setFile(fileContents);
      } else {
        alert("Wrong file type! Only JSON or PNG files are allowed.");
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      handleFile(file);
    },
  });

  const handleAddFileClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.click();
    fileInput.addEventListener("change", async (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        const fileList = Array.from(files);
        const file = fileList[0];
        handleFile(file);
      }
    });
  };

  useEffect(() => {
    if (file) {
      if (file.data.alternate_greetings) {
        const importedGreetings = file.data.alternate_greetings.map(
          (greet: string, index: number) => {
            return {
              id: `altgreet-${uuidv4()}`,
              name: `Alternative Greeting ${index + 1}`,
              value: greet,
            };
          }
        );
        setAltGreets(importedGreetings);
      }
      // if (file.data.character_book) {
      //   const importedLoreEntries = file.data.character_book.entries
      //   const importedLoreName = file.data.character_book.name;
      //   setEntries(importedLoreEntries);
      //   setWorldName(importedLoreName);
      // }
    }
    // console.log(file);
  }, [file]);

  useEffect(() => {
    console.log(altGreets);
  }, [altGreets]);

  return (
    <div {...getRootProps()} className="h-20 text-center">
      <input className="h-full" {...getInputProps()} />
      <div>
        <button onClick={handleAddFileClick}>Drop or Add file here!</button>
      </div>
    </div>
  );
};

export default Import;
