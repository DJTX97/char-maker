import { useDropzone } from "react-dropzone";
import { useAtom } from "jotai";
import {
  altGreetStore,
  fileStore,
  primaryInputStore,
} from "../../data/PreparationStore";

const acceptedFileTypes = ["application/json", "image/png"];

export default function Import() {
  const [file, setFile] = useAtom(fileStore);

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

  return (
    <div {...getRootProps()} className="h-20 text-center">
      <input className="h-full" {...getInputProps()} />
      <div>
        <button onClick={handleAddFileClick}>Drop or Add file here!</button>
      </div>
    </div>
  );
}
