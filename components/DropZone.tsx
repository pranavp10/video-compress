"use client";
import { useState } from "react";
import ReactDropzone from "react-dropzone";
import { toast } from "sonner";

const DropZone = ({
  handleUpload,
  acceptedFiles,
  disabled,
}: {
  handleUpload: (files: File) => void;
  acceptedFiles: { [key: string]: string[] };
  disabled?: boolean;
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleHover = (): void => setIsHover(true);
  const handleExitHover = (): void => setIsHover(false);

  return (
    <ReactDropzone
      disabled={disabled}
      onDrop={(files: File[]) => {
        handleUpload(files[0]);
        handleExitHover();
      }}
      onDragEnter={handleHover}
      onDragLeave={handleExitHover}
      accept={acceptedFiles}
      onDropRejected={() => {
        handleExitHover();
        toast.error("Error uploading your file(s)", {
          description: "Allowed Files: Audio, Video and Images.",
          duration: 5000,
        });
      }}
      multiple={false}
      onError={() => {
        handleExitHover();
        toast.error("Error uploading your file(s)", {
          description: "Allowed Files: Audio, Video and Images.",
          duration: 5000,
        });
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={`${
            isHover ? "border-black bg-gray-100/80" : "border-default-gray"
          } flex justify-center items-center flex-col cursor-pointer w-full ${
            disabled ? "cursor-not-allowed" : ""
          }`}
        >
          <input {...getInputProps()} />
          <svg viewBox="0 0 24 24" className={"w-24 h-24 ml-4"} fill="none">
            <path
              d="M4.5 21.5L8.5 17.5M10.5 17.5L14.5 21.5M9.5 17.5L9.5 22.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 11.875C2 9.81261 2 8.78141 3.02513 8.1407C4.05025 7.5 5.70017 7.5 9 7.5H10C13.2998 7.5 14.9497 7.5 15.9749 8.1407C17 8.78141 17 9.81261 17 11.875V13.125C17 15.1874 17 16.2186 15.9749 16.8593C14.9497 17.5 13.2998 17.5 10 17.5H9C5.70017 17.5 4.05025 17.5 3.02513 16.8593C2 16.2186 2 15.1874 2 13.125V11.875Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M17 10.2495L17.1259 10.174C19.2417 8.90435 20.2996 8.26954 21.1498 8.57605C22 8.88257 22 9.89876 22 11.9312V13.0685C22 15.1009 22 16.1171 21.1498 16.4236C20.2996 16.7301 19.2417 16.0953 17.1259 14.8257L17 14.7501"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle
              cx="12.5"
              cy={5}
              r="2.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx={7}
              cy="4.5"
              r={3}
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <h3 className="text-center mt-5">
            Click to select video
            <br />
            or
            <br />
            drag video and Drop
          </h3>
        </div>
      )}
    </ReactDropzone>
  );
};

export default DropZone;
