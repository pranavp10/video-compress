import { BadgeCheck } from "lucide-react";
import { FileActions } from "~/types";
import { calculateBlobSize, reduceSize } from "~/utils/bytesToSize";

type VideoOutputDetailsProps = {
  videoFile: FileActions;
  timeTaken?: string;
};

export const VideoOutputDetails = ({
  videoFile,
  timeTaken,
}: VideoOutputDetailsProps) => {
  const outputFileSize = calculateBlobSize(videoFile.outputBlob);
  const sizeReduced = reduceSize(videoFile.fileSize, videoFile.outputBlob);

  const download = () => {
    if (!videoFile?.url) return;
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = videoFile.url;
    a.download = videoFile.output;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(videoFile.url);
    document.body.removeChild(a);
  };

  return (
    <div className="bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 h-fit">
      <div className="text-sm">
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <div className="flex items-center gap-1">
            <p className="">Output File</p>
            <BadgeCheck className="text-white rounded-full" fill="#000000" />
          </div>
          <button
            onClick={download}
            type="button"
            className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-950 to-zinc-950 rounded-lg text-white/90 px-2.5 py-1.5 relative text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-500 focus:ring-zinc-950 "
          >
            Download
          </button>
        </div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p>File size</p>
          <p>{outputFileSize}</p>
        </div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p className="">Size reduced</p>
          <p className="">{sizeReduced}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Time taken</p>
          <p>{timeTaken}</p>
        </div>
      </div>
    </div>
  );
};
