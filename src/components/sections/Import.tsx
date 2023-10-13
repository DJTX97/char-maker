import { useDropzone } from "react-dropzone";
import { useAtom } from "jotai";
import { fileStore } from "../../data/PreparationStore";
import { imageStore, imageURLStore } from "../../data/OutputStore";
import { handleJSON, handlePNG } from "../../utils/scripts/fileHandlers";
import { useEffect, useState } from "react";

const acceptedFileTypes = ["application/json", "image/png"];

export default function Import() {
  const [imageURL, setImageURL] = useAtom(imageURLStore);
  const [imageInput, setImageInput] = useAtom(imageStore);
  const [fileInput, setFileInput] = useAtom(fileStore);

  const handleFile = async (file: any) => {
    if (file) {
      if (file.type === "application/json") {
        setImageURL(null);
        handleJSON(file, setFileInput);
      } else if (file.type === "image/png") {
        setImageURL(URL.createObjectURL(file));
        handlePNG(file, setFileInput, setImageInput);
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

  // useEffect(() => {
  //   console.log(fileInput);
  // }, [fileInput]);

  return (
    <section
      {...getRootProps()}
      className={`${
        imageURL && "self-center"
      } h-96 border-4 rounded-xl border-violet-800 ${
        isDragActive ? "bg-violet-300" : "bg-violet-400"
      } hover:bg-violet-300 cursor-pointer`}
    >
      <input className="h-full" {...getInputProps()} />
      <div className="flex flex-col justify-center items-center h-full text-2xl font-semibold select-none">
        {!imageURL && "Drag & Drop file here!"}
        {imageURL && (
          <img
            src={imageURL}
            alt="Preview"
            className="object-fill h-full rounded-lg"
          />
        )}
      </div>
    </section>
  );
}
