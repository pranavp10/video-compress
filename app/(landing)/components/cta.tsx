import Link from "next/link";
import React from "react";

const CTA = () => (
  <div className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-950 to-zinc-950 text-white/90 px-3.5 rounded-2xl py-20">
    <p className="font-semibold text-center text-3xl">
      Compress video today for Free
    </p>
    <p className="text-white/70 text-center max-w-2xl text-balance mx-auto mt-6">
      That&apos;s right, our video compression is free to use, forever!
      We&apos;re committed to open-source principles, meaning our code is freely
      available for you to inspect, modify, and even deploy on your own server
      if you prefer. This transparency ensures you always know what happens to
      your data and empowers you to take control.
    </p>
    <div className="flex justify-center mt-9">
      <Link
        href="/compress"
        className="bg-white text-black py-2.5 font-medium text-sm px-6 rounded-lg"
      >
        Compress Now
      </Link>
    </div>
  </div>
);

export default CTA;
