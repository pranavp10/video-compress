import Link from "next/link";
import React from "react";

const Footer = () => (
  <footer className="pb-6 pt-10 md:pb-10 md:pt-20 bg-white">
    <div className="flex flex-col items-center mx-auto justify-center">
      <Link href="/" className="flex items-center gap-2">
        <svg
          className="w-6 h-6"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width={80}
            height={80}
            rx={23}
            fill="url(#paint0_linear_4_22)"
          />
          <path
            d="M53.0876 61.1151C50.4995 61.4787 47.1242 61.4787 42.598 61.4787H38.4022C29.5015 61.4787 25.0511 61.4787 22.286 58.7136C19.521 55.9485 19.521 51.4981 19.521 42.5974V38.4016C19.521 29.5009 19.521 25.0505 22.286 22.2854C25.0511 19.5203 29.5015 19.5203 38.4022 19.5203H42.598C51.4987 19.5203 55.9491 19.5203 58.7142 22.2854C61.4793 25.0505 61.4793 29.5009 61.4793 38.4016V42.5974C61.4793 46.2284 61.4793 49.1188 61.2916 51.4563C61.234 52.1731 61.2052 52.5315 60.9419 52.6546C60.6786 52.7777 60.3778 52.5649 59.7761 52.1392L55.1855 48.8912"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M47.0042 41.3718C46.6139 42.7559 44.7694 43.7339 41.0805 45.69C37.5144 47.5809 35.7313 48.5263 34.2944 48.1463C33.7003 47.9892 33.159 47.6908 32.7225 47.2797C31.6667 46.2854 31.6667 44.357 31.6667 40.5C31.6667 36.643 31.6667 34.7146 32.7225 33.7203C33.159 33.3092 33.7003 33.0108 34.2944 32.8537C35.7313 32.4737 37.5144 33.4191 41.0805 35.31C44.7694 37.2661 46.6139 38.2441 47.0042 39.6282C47.1653 40.1995 47.1653 40.8005 47.0042 41.3718Z"
            stroke="white"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_4_22"
              x1="124.5"
              y1={-48}
              x2="3.00001"
              y2="76.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.383338" stopColor="#616161" />
              <stop offset={1} />
            </linearGradient>
          </defs>
        </svg>
        <p className="font-semibold">Compress</p>
      </Link>
      <p className="text-gray-500 pt-4 text-sm">
        No © 2024 Compress Videos for Free. Forever
      </p>
    </div>
    <div className="justify-center font-medium text-gray-600 text-sm divide-x-2 flex pt-10">
      <Link className="pr-3" href="/about">
        About
      </Link>
      <Link href="/video" className="px-3">
        Video Compression
      </Link>
    </div>
  </footer>
);

const navigation = {
  main: [
    { name: "About", href: "#" },
    { name: "Video", href: "#" },
    { name: "Contact us", href: "#" },
  ],
};

export default Footer;
