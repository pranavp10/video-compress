import React from "react";
import { Switch } from "~/components/ui/switch";
import { Dropdown } from "~/components/ui/dropdown";
import { QualityType, VideoFormats, VideoInputSettings } from "~/types";

type VideoControlDetailsProps = {
  videoSettings: VideoInputSettings;
  onVideoSettingsChange: (value: VideoInputSettings) => void;
};

export const VideoInputControl = ({
  videoSettings,
  onVideoSettingsChange,
}: VideoControlDetailsProps) => (
  <div className="bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 h-fit">
    <div className="text-sm">
      <div className="flex justify-between items-center border-b mb-2 pb-2">
        <p>Remove Audio</p>
        <Switch />
      </div>
      <div className="flex justify-between items-center border-b mb-2 pb-2">
        <p>Quality</p>
        <Dropdown
          onValueChange={(value) => {
            const quality = value as QualityType;
            onVideoSettingsChange({ ...videoSettings, quality });
          }}
          value={videoSettings.quality}
          list={quality}
        />
      </div>
      <div className="flex justify-between items-center">
        <p>Formate</p>
        <Dropdown
          width="w-[160px]"
          value={videoSettings.videoType}
          onValueChange={(value) => {
            const videoType = value as VideoFormats;
            onVideoSettingsChange({ ...videoSettings, videoType });
          }}
          list={formate}
        />
      </div>
    </div>
  </div>
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
