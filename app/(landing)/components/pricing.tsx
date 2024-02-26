import { Check } from "lucide-react";
import React from "react";

const Pricing = () => (
  <div className="px-6 lg:px-0">
    <div className="flex flex-col md:flex-row border justify-between rounded-xl p-3 items-center">
      <div className="p-6">
        <p className="mb-3 text-xl md:text-3xl font-semibold">
          Pricing? We Reimagined It
        </p>
        <p className="text-gray-500 mb-6 text-sm md:text-base">
          Free forever, open-source video & image compression.
          <br className="hidden md:block" />
          Own your data, deploy anywhere.
        </p>
        <div className="grid sm:grid-cols-2">
          {pricing.map(({ id, name }) => (
            <div key={id} className="flex gap-2 mb-3 ">
              <Check className="w-4 text-black" />
              <p className="text-gray-500 text-sm">{name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100  shadow-sm border text-center border-gray-200 rounded-2x p-10 rounded-2xl md:w-1/3 w-full">
        <p className="font-semibold text-lg">Free,Forever</p>
        <div className="flex items-end justify-center pt-4 pb-8">
          <span className="text-4xl font-semibold">$0</span>
          <div className="text-gray-500">/month</div>
        </div>
        <a
          href="/compress"
          className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-950 to-zinc-950 rounded-lg text-white/90 px-3.5 py-2.5 relative text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-500 focus:ring-zinc-950 w-full flex text-center justify-center"
        >
          Compress Now
        </a>
        <p className="text-gray-500 pt-4 text-xs">
          All of our code base is free and
          <br />
          open source.
        </p>
      </div>
    </div>
  </div>
);

const pricing = [
  { id: 1, name: "Unlimited file size" },
  { id: 2, name: "Unlimited conversion minutes" },
  { id: 3, name: "Unlimited files at a time" },
  { id: 3, name: "No Ads" },
];
export default Pricing;
