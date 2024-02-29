import React from "react";
import { Switch } from "~/components/ui/switch";
import { QualityType, VideoFormats, VideoInputSettings } from "~/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { motion } from "framer-motion";

type VideoControlDetailsProps = {
  videoSettings: VideoInputSettings;
  onVideoSettingsChange: (value: VideoInputSettings) => void;
  disable: boolean;
};

export const VideoInputControl = ({
  videoSettings,
  onVideoSettingsChange,
  disable,
}: VideoControlDetailsProps) => (
  <motion.div
    layout
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    transition={{ type: "tween" }}
    key="input"
    className="bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 h-fit"
  >
    <div className="text-sm">
      <div className="flex justify-between items-center border-b mb-2 pb-2">
        <p>Remove Audio</p>
        <Switch
          disabled={disable}
          onCheckedChange={(value: boolean) =>
            onVideoSettingsChange({ ...videoSettings, removeAudio: value })
          }
          checked={videoSettings.removeAudio}
        />
      </div>
      <div
        className={`flex justify-between items-center ${
          videoSettings.twitterCompressionCommand ? "" : "border-b mb-2 pb-2"
        }`}
      >
        <p>Compression for Twitter</p>
        <Switch
          disabled={disable}
          onCheckedChange={(value: boolean) =>
            onVideoSettingsChange({
              ...videoSettings,
              twitterCompressionCommand: value,
            })
          }
          checked={videoSettings.twitterCompressionCommand}
        />
      </div>
      {!videoSettings.twitterCompressionCommand && (
        <>
          <div className="flex justify-between items-center border-b mb-2 pb-2">
            <p>Quality</p>
            <Select
              disabled={disable}
              value={videoSettings.quality}
              onValueChange={(value: string) => {
                const quality = value as QualityType;
                onVideoSettingsChange({ ...videoSettings, quality });
              }}
            >
              <SelectTrigger className="w-[100px] text-sm">
                <SelectValue placeholder="Select Quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {quality.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between items-center">
            <p>Formate</p>
            <Select
              disabled={disable}
              value={videoSettings.videoType}
              onValueChange={(value: string) => {
                const videoType = value as VideoFormats;
                onVideoSettingsChange({ ...videoSettings, videoType });
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {formate.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  </motion.div>
);

const quality: { label: string; value: QualityType }[] = [
  { label: "High", value: QualityType.Hight },
  { label: "Medium", value: QualityType.Medium },
  { label: "Low", value: QualityType.Low },
];

const formate: { label: string; value: VideoFormats }[] = [
  { label: "MP4 (.mp4)", value: VideoFormats.MP4 },
  { label: "MKV (.mkv)", value: VideoFormats.MKV },
  { label: "AVI (.avi)", value: VideoFormats.AVI },
  { label: "MOV (.mov)", value: VideoFormats.MOV },
  { label: "FLV (.flv)", value: VideoFormats.FLV },
  { label: "WEBM (.webm)", value: VideoFormats.WEBM },
];
