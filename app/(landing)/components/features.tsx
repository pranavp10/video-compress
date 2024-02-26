import {
  Film,
  FlipVertical2,
  GitPullRequestArrow,
  Tangent,
  Users,
  WifiOff,
} from "lucide-react";
import React from "react";

const Features = () => (
  <div
    className="grid md:grid-cols-2  lg:grid-cols-3 gap-x-4 gap-y-20 mx-auto px-6 lg:px-0"
    id="features"
  >
    {features.map(({ description, title, icon }) => (
      <div
        key={description}
        className="text-center flex justify-center items-center flex-col gap-8"
      >
        {icon}
        <div>
          <p className="font-medium pb-4">{title}</p>
          <p className="text-gray-500 text-balance max-w-sm">{description}</p>
        </div>
      </div>
    ))}
  </div>
);

const features = [
  {
    icon: (
      <WifiOff className="bg-gray-200/50 p-3 rounded-lg text-gray-900 w-12 h-12" />
    ),
    title: "Offline Compression",
    description:
      "Compress videos anytime, anywhere, even without an internet connection. Maintain complete privacy with your files kept entirely offline.",
  },
  {
    icon: (
      <FlipVertical2 className="bg-gray-200/50 p-3 rounded-lg text-gray-900 w-12 h-12" />
    ),
    title: "Lossless Compression",
    description:
      "Shrink video sizes by up to 90% while preserving pristine image and audio quality. Enjoy smaller files without sacrificing visual fidelity.",
  },
  {
    icon: (
      <Film className="bg-gray-200/50 p-3 rounded-lg text-gray-900 w-12 h-12" />
    ),
    title: "Versatile Format Support",
    description:
      "Work with popular video formats like MP4 and WebM, ensuring compatibility across different devices and platforms.",
  },
  {
    icon: (
      <GitPullRequestArrow className="bg-gray-200/50 p-3 rounded-lg text-gray-900 w-12 h-12" />
    ),
    title: "Unleash Your Creativity",
    description:
      "Free and open-source software empowers you to customize the code, integrate the tool into your workflow, and contribute to its development.",
  },
  {
    icon: (
      <Tangent className="bg-gray-200/50 p-3 rounded-lg text-gray-900 w-12 h-12" />
    ),
    title: "Intuitive Interface",
    description:
      "Enjoy a user-friendly experience with a straightforward design, making video compression effortless for everyone, regardless of technical expertise.",
  },
  {
    icon: (
      <Users className="bg-gray-200/50 p-3 rounded-lg text-gray-900 w-12 h-12" />
    ),
    title: "Community-Driven Support",
    description:
      "Access a thriving community of users and developers for assistance, feedback, and ongoing improvements to the platform.",
  },
];

export default Features;
