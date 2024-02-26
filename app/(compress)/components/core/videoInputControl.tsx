import React from "react";
import { Switch } from "~/components/ui/switch";
import { Dropdown } from "~/components/ui/dropdown";
import { VideoInputSettings } from "~/global";

type VideoControlDetailsProps = {
  videoSettings: VideoInputSettings;
  onVideoSettingsChange: (value: string) => void;
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
          onValueChange={onVideoSettingsChange}
          value={videoSettings.quality}
          list={quality}
        />
      </div>
      <div className="flex justify-between items-center">
        <p>Formate</p>
        <Dropdown
          value={videoSettings.videoType}
          onValueChange={onVideoSettingsChange}
          list={formate}
        />
      </div>
    </div>
  </div>
);

const quality = [
  { label: "Ultra", value: "ultra" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

const formate = [
  { label: "mp4", value: "mp4" },
  { label: "webm", value: "webm" },
];
