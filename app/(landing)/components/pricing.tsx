import { Check } from "lucide-react";
import React from "react";

const Pricing = () => (
  <div className="flex border justify-between rounded-xl p-3 items-center">
    <div className="p-6">
      <p className="mb-3 text-3xl font-semibold">Pricing? We Reimagined It</p>
      <p className="text-gray-500 max-w mb-6">
        Free forever, open-source video & image compression.
        <br />
        Own your data, deploy anywhere.
      </p>
      <div className="grid grid-cols-2">
        {pricing.map(({ id, name }) => {
          return (
            <div key={id} className="flex gap-2 mb-3 ">
              <Check className="w-4 text-black" />
              <p className="text-gray-500 text-sm">{name}</p>
            </div>
          );
        })}
      </div>
    </div>
    <div className="bg-gray-100  shadow-sm border text-center border-gray-200 rounded-2x p-10 rounded-2xl w-1/3">
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
);

const pricing = [
  { id: 1, name: "Unlimited file size" },
  { id: 2, name: "Unlimited conversion minutes" },
  { id: 3, name: "Unlimited files at a time" },
  { id: 3, name: "No Ads" },
];
export default Pricing;
