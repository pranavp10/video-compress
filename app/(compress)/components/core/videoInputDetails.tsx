import React from "react";
import { FileActions } from "~/global";
import { bytesToSize } from "~/utils/bytesToSize";

type VideoInputDetailsProps = {
  videoFile: FileActions;
  onClear: () => void;
};

export const VideoInputDetails = ({
  videoFile,
  onClear,
}: VideoInputDetailsProps) => (
  <div className="bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 h-fit">
    <div className=" text-sm">
      <div className="flex justify-between items-center border-b mb-2 pb-2">
        <p className="">Fill Input</p>
        <button
          onClick={onClear}
          type="button"
          className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-950 to-zinc-950 rounded-lg text-white/90 px-2.5 py-1.5 relative text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-500 focus:ring-zinc-950"
        >
          Clear
        </button>
      </div>
      <p className="border-b mb-2 pb-2">{videoFile?.fileName}</p>
      <div className="flex justify-between items-center">
        <p>File size</p>
        <p>{bytesToSize(videoFile.fileSize)}</p>
      </div>
    </div>
  </div>
);
