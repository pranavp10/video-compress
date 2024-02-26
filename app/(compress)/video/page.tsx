"use client";

import { useEffect, useRef, useState } from "react";
import DropZone from "~/components/DropZone";
import { acceptedVideoFiles } from "~/utils/formats";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { toast } from "sonner";
import { FileActions } from "~/global";
import bytesToSize from "~/utils/bytesToSize";
import { Switch } from "~/components/ui/switch";
import { Dropdown } from "~/components/ui/dropdown";
import { BadgeCheck, XCircle } from "lucide-react";
import { Progress } from "~/components/ui/progress";
import convertFile from "~/utils/convert";

type Status = "notStarted" | "converted" | "converting";

const Page = () => {
  const [videoFile, setVideoFile] = useState<FileActions>();
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<Status>("notStarted");
  const [videoSettings, setVideoSettings] = useState({
    quality: "high",
    videoType: "mp4",
  });
  const timeConsumedRef = useRef<HTMLParagraphElement | null>(null);
  const ffmpegRef = useRef(new FFmpeg());

  const handleUpload = (file: File) => {
    setVideoFile({
      fileName: file.name,
      fileSize: file.size,
      from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
      to: videoSettings.videoType,
      fileType: file.type,
      file,
      isError: false,
    });
  };

  const compress = async () => {
    if (!videoFile) return;
    try {
      setStatus("converting");
      ffmpegRef.current.on("progress", ({ progress: completion, time }) => {
        const percentage = completion * 100;
        const transcodeTime = time / 100000;
        if (timeConsumedRef?.current && Math.floor(transcodeTime))
          timeConsumedRef.current.textContent = `${Math.floor(
            transcodeTime
          )} sec`;
        setProgress(percentage);
      });
      const { url, output } = await convertFile(ffmpegRef.current, videoFile);
      setVideoFile({
        ...videoFile,
        url,
        output,
      });
      setStatus("converted");
    } catch (err) {
      toast.error("Error Compressing Video");
    }
  };

  const load = async () => {
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.load({
      coreURL: await toBlobURL(
        `${process.env.NEXT_PUBLIC_URL}/download/ffmpeg-core.js`,
        "text/javascript"
      ),
      wasmURL: await toBlobURL(
        `${process.env.NEXT_PUBLIC_URL}/download/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
  };

  const loadWithToast = () => {
    toast.promise(load, {
      loading: "Downloading necessary packages from FFmpeg for offline use.",
      success: () => {
        return "All necessary file downloaded";
      },
      error: "Error loading FFmpeg packages",
    });
  };

  const download = () => {
    if (!videoFile?.url) return;
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = videoFile.url;
    console.log(videoFile.output);
    a.download = videoFile.output;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(videoFile.url);
    document.body.removeChild(a);
  };

  useEffect(() => loadWithToast(), []);

  return (
    <div className="max-w-5xl mx-auto pt-32">
      <div className="grid grid-cols-8 gap-10 h-[calc(100dvh-180px)]">
        <div className="flex border rounded-3xl col-span-5 h-full w-full bg-gray-50/35">
          {videoFile ? (
            <video className="h-full w-full rounded-lg" controls>
              <source
                src={URL.createObjectURL(videoFile.file)}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <DropZone
              acceptedFiles={acceptedVideoFiles}
              handleUpload={handleUpload}
            />
          )}
        </div>
        <div className="flex border rounded-3xl col-span-3 h-full w-full bg-gray-50/35 p-4">
          <div className="flex flex-col gap-4 w-full">
            {videoFile && (
              <div className="bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 h-fit">
                <div className=" text-sm">
                  <div className="flex justify-between items-center border-b mb-2 pb-2">
                    <p className="">Fill Input</p>
                    <button
                      onClick={() => {
                        setVideoFile(undefined);
                        setStatus("notStarted");
                      }}
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
            )}
            <div className=" bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 h-fit">
              <div className=" text-sm">
                <div className="flex justify-between items-center border-b mb-2 pb-2">
                  <p>Remove Audio</p>
                  <Switch />
                </div>
                <div className="flex justify-between items-center border-b mb-2 pb-2">
                  <p>Quality</p>
                  <Dropdown
                    onValueChange={(value: string) =>
                      setVideoSettings({ ...videoSettings, quality: value })
                    }
                    value={videoSettings.quality}
                    list={[
                      { label: "Ultra", value: "ultra" },
                      { label: "High", value: "high" },
                      { label: "Medium", value: "medium" },
                      { label: "Low", value: "low" },
                    ]}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <p>Formate</p>
                  <Dropdown
                    value={videoSettings.videoType}
                    onValueChange={(value: string) =>
                      setVideoSettings({ ...videoSettings, videoType: value })
                    }
                    list={[
                      { label: "mp4", value: "mp4" },
                      { label: "webm", value: "webm" },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-100 border border-gray-200 rounded-2xl p-3 h-fit">
              {status === "converting" && (
                <div className="flex justify-between items-center gap-2 p-0.5">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <p>Compressing</p>
                      <p ref={timeConsumedRef}></p>
                    </div>
                    <Progress value={progress} />
                  </div>
                  <div>
                    <XCircle className="w-5 h-5 text-white" fill="#000" />
                  </div>
                </div>
              )}
              {status === "converted" && (
                <button
                  onClick={download}
                  type="button"
                  className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-950 to-zinc-950 rounded-lg text-white/90 px-3.5 py-2.5 relative text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-500 focus:ring-zinc-950 w-full"
                >
                  Download
                </button>
              )}
              {status === "notStarted" && (
                <button
                  onClick={compress}
                  type="button"
                  className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-950 to-zinc-950 rounded-lg text-white/90 px-3.5 py-2.5 relative text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-500 focus:ring-zinc-950 w-full"
                >
                  Compress
                </button>
              )}
            </div>
            {status === "converted" && (
              <div className="bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 h-fit">
                <div className="text-sm">
                  <div className="flex justify-between items-center border-b mb-2 pb-2">
                    <div className="flex items-center gap-1">
                      <p className="">Output File</p>
                      <BadgeCheck
                        className="text-white rounded-full"
                        fill="#000000"
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-950 to-zinc-950 rounded-lg text-white/90 px-2.5 py-1.5 relative text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-500 focus:ring-zinc-950 "
                    >
                      Open Downloads
                    </button>
                  </div>
                  <div className="flex justify-between items-center border-b mb-2 pb-2">
                    <p className="">File size</p>
                    <p className="">10mb</p>
                  </div>
                  <div className="flex justify-between items-center border-b mb-2 pb-2">
                    <p className="">Size reduced</p>
                    <p className="">13mb</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Time taken</p>
                    <p>10s</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
