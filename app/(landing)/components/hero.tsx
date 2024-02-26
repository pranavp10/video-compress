import React from "react";

const Hero = () => (
  <div className="pt-10 md:pt-20 px-6 lg:px-0">
    <div className="flex items-center gap-x-1.5 text-2 text-gray-600 border borer-gray-200 rounded-full px-3 py-1.5 mx-auto w-fit mb-8">
      <p className="text-sm sm:text-base">
        🎉 Free and open source on{" "}
        <a
          className="text-black font-medium"
          href="https://github.com/pranavp10/videocompress"
          target="_blank"
        >
          github -&gt;
        </a>
      </p>
    </div>
    <h1 className="text-center text-4xl font-bold md:text-5xl lg:text-7xl lg lg:font-semibold text-gray-900 text-balance">
      Compress Videos for Free. Forever
    </h1>
    <h2 className="sm:text-lg max-w-xl mx-auto text-gray-500 max-w text-center mt-9">
      Say goodbye to bulky files! Crush video sizes by{" "}
      <span className="text-black font-medium">90%</span> with no quality loss,
      even offline. And the best part?{" "}
      <span className="text-black font-medium">It&apos;s free!</span>
    </h2>
  </div>
);

export default Hero;
