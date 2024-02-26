import { Check, FileVideo, PencilRuler } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function Home() {
  return (
    <>
      <div className="max-w-5xl mx-auto pt-32">
        <div className="h-20" />
        <div className="flex items-center gap-x-1.5 text-2 text-gray-600 border borer-gray-200 rounded-full px-3 py-1.5 mx-auto w-fit mb-8">
          <p className="">
            🎉 Free and open source on{" "}
            <span className="text-black font-medium">github -&gt;</span>
          </p>
        </div>
        <h1 className="text-center text-5xl lg:text-7xl font-semibold text-gray-900 text-balance">
          Compress Videos for Free. Forever
        </h1>
        <h2 className="text-lg max-w-xl mx-auto text-gray-500 max-w text-center mt-9">
          Say goodbye to bulky files! Crush video sizes by{" "}
          <span className="text-black font-medium">90%</span> with no quality
          loss, even offline. And the best part?{" "}
          <span className="text-black font-medium">It&apos;s free!</span>
        </h2>

        <div className="my-10 flex justify-center">
          <a
            href="/compress"
            className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-950 to-zinc-950 rounded-lg text-white/90 px-3.5 py-2.5 relative text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-500 focus:ring-zinc-950"
          >
            Compress Now
          </a>
        </div>
        <div className="pt-32">
          <div className="grid grid-cols-3 gap-x-4 gap-y-20 mx-auto">
            {features.map(({ description, title, icon }) => (
              <div
                key={description}
                className="text-center flex justify-center items-center flex-col gap-8"
              >
                {icon}
                <div>
                  <p className="font-medium pb-4">{title}</p>
                  <p className="text-gray-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-32">
          <div className="flex border justify-between rounded-xl p-3 items-center">
            <div className="p-6">
              <p className="mb-3 text-3xl font-semibold">
                Pricing? We Reimagined It
              </p>
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
        </div>
        <div className="pt-32">
          <p className="text-center font-semibold text-3xl">
            Frequently asked questions
          </p>
          <p className=" text-lg max-w-3xl mx-auto text-gray-500 max-w text-center mt-9 text-balance">
            Have a different question and can’t find the answer you’re looking
            for? Reach out to our support team by sending us an email and we’ll
            get back to you as soon as we can.
          </p>
          <div className="mt-16 border-t">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-6 text-lg text-black/70">
                  Is it accessible?
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 pb-6 text-black/70">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="py-6 text-lg text-black/70">
                  Is it styled?
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 pb-6">
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="hover:no-underline!">
                <AccordionTrigger className="py-6 text-lg text-black/70">
                  Is it animated?
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 pb-6">
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="pt-32 mb-32">
          <div className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-950 to-zinc-950 text-white/90 px-3.5 rounded-2xl py-20">
            <p className="font-semibold text-center text-3xl">
              Compress image and video today for Free
            </p>
            <p className="text-white/70 text-center max-w-2xl text-balance mx-auto mt-6">
              That&apos;s right, our video and image compression is free to use,
              forever! We&apos;re committed to open-source principles, meaning
              our code is freely available for you to inspect, modify, and even
              deploy on your own server if you prefer. This transparency ensures
              you always know what happens to your data and empowers you to take
              control.
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
        </div>
      </div>

      <footer className="py-20 px-6  sm:py-24 lg:px-8 bg-white">
        <div className="flex flex-col items-center mx-auto justify-center pb-10">
          <Link href="/" className="flex items-center gap-2">
            <svg
              className="w-10 h-10 rounded-xl"
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
            <p className="font-semibold text-xl">Compress</p>
          </Link>
          <p className="text-gray-500 pt-3 text-sm">
            Free Video and Image Compression
          </p>
        </div>
        <div className=" overflow-hidden ">
          <nav
            className="-mb-6 text-center sm:flex sm:justify-center sm:space-x-6"
            aria-label="Footer"
          >
            {navigation.main.map((item) => (
              <div key={item.name} className="pb-6">
                <a href={item.href} className="">
                  {item.name}
                </a>
              </div>
            ))}
          </nav>

          <p className="mt-4 text-center text-sm leading-5 text-gray-500">
            Mad with ❤️ by{" "}
            <a href="https://prolab.sh/" target="_blank" className="underline">
              prolab.sh
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

const navigation = {
  main: [
    { name: "About", href: "#" },
    { name: "Video", href: "#" },
    { name: "Image", href: "#" },
    { name: "Contact us", href: "#" },
  ],
};

const pricing = [
  { id: 1, name: "Unlimited file size" },
  { id: 2, name: "Unlimited conversion minutes" },
  { id: 3, name: "Unlimited files at a time" },
  { id: 3, name: "No Ads" },
];

const features = [
  {
    icon: (
      <PencilRuler className="bg-gray-200/70 p-2 rounded-lg text-gray-700 w-10 h-10" />
    ),
    title: "Feature 1",
    description: "this is a description and it can be use ed",
  },
  {
    icon: (
      <PencilRuler className="bg-gray-200/70 p-2 rounded-lg text-gray-700 w-10 h-10" />
    ),
    title: "Feature 1",
    description: "this is a description and it can be use ed",
  },
  {
    icon: (
      <PencilRuler className="bg-gray-200/70 p-2 rounded-lg text-gray-700 w-10 h-10" />
    ),
    title: "Feature 1",
    description: "this is a description and it can be use ed",
  },
  {
    icon: (
      <PencilRuler className="bg-gray-200/70 p-2 rounded-lg text-gray-700 w-10 h-10" />
    ),
    title: "Feature 1",
    description: "this is a description and it can be use ed",
  },
  {
    icon: (
      <PencilRuler className="bg-gray-200/70 p-2 rounded-lg text-gray-700 w-10 h-10" />
    ),
    title: "Feature 1",
    description: "this is a description and it can be use ed",
  },
  {
    icon: (
      <PencilRuler className="bg-gray-200/70 p-2 rounded-lg text-gray-700 w-10 h-10" />
    ),
    title: "Feature 1",
    description: "this is a description and it can be use ed",
  },
];
