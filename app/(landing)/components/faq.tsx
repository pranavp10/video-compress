import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const Faq = () => (
  <div className="px-6 lg:px-0" id="faq">
    <p className="text-center font-semibold text-xl md:text-3xl">
      Frequently asked questions
    </p>
    <p className=" md:text-lg max-w-3xl mx-auto text-gray-500 text-center mt-4 md:mt-9 text-balance">
      Have a different question and can’t find the answer you’re looking for?
      Reach out to our support team by sending us an email and we’ll get back to
      you as soon as we can.
    </p>
    <div className="mt-8 md:mt-16 border-t">
      <Accordion type="single" collapsible className="w-full">
        {FAQ.map(({ description, title }) => (
          <AccordionItem value={title} key={title}>
            <AccordionTrigger className="md:py-6 md:text-lg text-black/70 text-left">
              {title}
            </AccordionTrigger>
            <AccordionContent className="text-gray-500 pb-6 text-black/70">
              {description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </div>
);

export default Faq;

const FAQ = [
  {
    title: "How Long Does It Take to Compress a Video?",
    description: (
      <div>
        <p className="text-gray-700">
          The time it takes to compress a video depends on several factors:
        </p>
        <ul className="list-disc pl-4 mt-2">
          <li className="text-gray-700">
            <b>Video size:</b> Larger videos naturally take longer to compress.
          </li>
          <li className="text-gray-700">
            <b>Desired compression level:</b> Aiming for a smaller file size
            typically requires more processing time.
          </li>
          <li className="text-gray-700">
            <b>Hardware capabilities:</b> Faster processors and more RAM will
            accelerate the compression process.
          </li>
        </ul>
        <p className="text-gray-700 mt-2">
          Therefore, it&apos;s difficult to provide a definitive answer without
          knowing these specifics. However, compression time can range from{" "}
          <b>seconds for short clips</b> on powerful computers to{" "}
          <b>hours for large video files</b> on slower machines.
        </p>
      </div>
    ),
  },
  {
    title: "Where are Compressed Videos Saved?",
    description: `When you compress a video using a web-based tool, the compressed version won't be saved directly on your computer unless you download it manually.`,
  },
  {
    title: "What types of videos can be compressed with this tool",
    description: `When you compress a video using a web-based tool, the compressed version won't be saved directly on your computer unless you download it manually.`,
  },
  {
    title: "What Video Formats Can be Compressed with this Tool",
    description:
      "This tool utilizes advanced video processing techniques to efficiently compress your videos while maintaining good quality. However, the specific details of these techniques are not publicly available due to various factors, including intellectual property protection and ensuring optimal performance",
  },
  {
    title:
      "Are There Compatibility Limitations with Different Operating Systems",
    description:
      "This tool is designed to be web-based, meaning it should function on most devices and operating systems as long as they have a modern web browser with internet access",
  },
  {
    title: "How is my data protected during the compression process",
    description:
      "Your data is safeguarded throughout the compression process because the tool operates offline and is open-source. This means that the video remains within your system, and all processing occurs locally in your browser.",
  },
  {
    title: "Are there any plans to add new features to the tool in the future",
    description:
      "Yes, we have plans to incorporate new features based on community needs. Additionally, we welcome pull requests, so if you have a specific feature in mind, you can contribute to the development. Alternatively, you can fork the repository and add features according to your requirements.",
  },
];
