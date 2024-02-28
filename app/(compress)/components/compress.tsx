"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import { acceptedVideoFiles } from "~/utils/formats";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { toast } from "sonner";
import convertFile from "~/utils/convert";
import { VideoDisplay } from "./core/videoDisplay";
import { CustomDropZone } from "./core/customDropZone";
import { VideoInputDetails } from "./core/videoInputDetails";
import { VideoInputControl } from "./core/videoInputControl";
import { VideoOutputDetails } from "./core/videoOutputDetails";
import { VideoCompressProgress } from "./core/videoCompressProgress";
import { VideoTrim } from "./core/videoTrim";
import {
  FileActions,
  QualityType,
  VideoFormats,
  VideoInputSettings,
} from "~/types";
import { VideoTwitterCompress } from "./core/videoTwitterCompress";

const CompressVideo = () => {
  const [videoFile, setVideoFile] = useState<FileActions>();
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<
    "notStarted" | "converted" | "converting"
  >("notStarted");
  const [videoSettings, setVideoSettings] = useState<VideoInputSettings>({
    quality: QualityType.Hight,
    videoType: VideoFormats.MP4,
    customEndTime: 0,
    customStartTime: 0,
    removeAudio: false,
    twitterCompressionCommand: false,
  });
  const timeConsumedRef = useRef<HTMLParagraphElement | null>(null);
  const ffmpegRef = useRef(new FFmpeg());

  const handleUpload = (file: File) => {
    setVideoFile({
      fileName: file.name,
      fileSize: file.size,
      from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
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
      const { url, output, outputBlob } = await convertFile(
        ffmpegRef.current,
        videoFile,
        videoSettings
      );
      setVideoFile({
        ...videoFile,
        url,
        output,
        outputBlob,
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => loadWithToast(), []);

  return (
    <>
      <div className="flex border rounded-3xl col-span-5 h-80 md:h-full w-full bg-gray-50/35">
        {videoFile ? (
          <VideoDisplay videoUrl={URL.createObjectURL(videoFile.file)} />
        ) : (
          <CustomDropZone
            acceptedFiles={acceptedVideoFiles}
            handleUpload={handleUpload}
          />
        )}
      </div>
      <div className="flex border rounded-3xl col-span-3 h-full w-full bg-gray-50/35 p-4">
        <div className="flex flex-col gap-4 w-full">
          {videoFile && (
            <>
              <VideoInputDetails
                onClear={() => window.location.reload()}
                videoFile={videoFile}
              />
              <VideoTrim
                onVideoSettingsChange={setVideoSettings}
                videoSettings={videoSettings}
              />
            </>
          )}
          <VideoInputControl
            onVideoSettingsChange={setVideoSettings}
            videoSettings={videoSettings}
          />
          <div className="bg-gray-100 border border-gray-200 rounded-2xl p-3 h-fit">
            {status === "converting" && (
              <VideoCompressProgress
                progress={progress}
                timeConsumedRef={timeConsumedRef}
              />
            )}

            {(status === "notStarted" || status === "converted") && (
              <button
                onClick={compress}
                type="button"
                className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-950 to-zinc-950 rounded-lg text-white/90 px-3.5 py-2.5 relative text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-500 focus:ring-zinc-950 w-full"
              >
                Compress
              </button>
            )}
          </div>
          {status === "converted" && videoFile && (
            <VideoOutputDetails
              timeTaken={timeConsumedRef.current?.textContent || "-"}
              videoFile={videoFile}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CompressVideo;
