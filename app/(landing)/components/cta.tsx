import Link from "next/link";
import React from "react";

const CTA = () => (
  <div className="px-6 lg:px-0 pb-16 lg:pb-32">
    <div className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-950 to-zinc-950 text-white/90 px-3.5 rounded-2xl md:py-20 py-9">
      <p className="font-semibold text-center text-xl md:text-3xl">
        Compress video today for Free
      </p>
      <p className="text-white/70 text-center md:max-w-2xl mx-auto mt-6 text-sm text-balance md:text-base">
        That&apos;s right, our video compression is free to use, forever!
        We&apos;re committed to open-source principles, meaning our code is
        freely available for you to inspect, modify, and even deploy on your own
        server if you prefer.
      </p>
      <div className="flex justify-center mt-9">
        <Link
          href="/compress"
          className="bg-white text-black py-2.5 font-medium text-sm px-6 rounded-lg w-full md:w-auto text-center"
        >
          Compress Now
        </Link>
      </div>
    </div>
  </div>
);

export default CTA;
