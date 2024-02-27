import React from "react";

type VideoDisplayProps = {
  videoUrl: string;
};

export const VideoDisplay = ({ videoUrl }: VideoDisplayProps) => (
  <video
    id="compress-video-player"
    className="h-full w-full rounded-3xl"
    controls
  >
    <source src={videoUrl} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
);
