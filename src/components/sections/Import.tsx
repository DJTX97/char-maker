import { useDropzone } from "react-dropzone";
import { useAtom } from "jotai";
import { fileStore } from "../../data/PreparationStore";

const acceptedFileTypes = ["application/json", "image/png"];

export default function Import() {
  const [fileInput, setFileInput] = useAtom(fileStore);

  const handleFile = async (file: any) => {
    if (file) {
      if (file.type === "application/json") {
        let fileContents = await file.text();
        fileContents = JSON.parse(fileContents);
        setFileInput(fileContents);
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

  return (
    <div
      {...getRootProps()}
      className={`h-96 border-4 rounded-xl border-violet-800 ${
        isDragActive ? "bg-violet-300" : "bg-violet-400"
      } hover:bg-violet-300 cursor-pointer`}
    >
      <input className="h-full" {...getInputProps()} />
      <div className="flex flex-col justify-center items-center h-full text-2xl font-semibold select-none">
        Drag & Drop file here!
      </div>
    </div>
  );
}
