import Hero from "./components/hero";
import Features from "./components/features";
import Pricing from "./components/pricing";
import Faq from "./components/faq";
import CTA from "./components/cta";
import Footer from "~/components/Footer";
import VideoDemo from "./components/videoDemo";

export default function Home() {
  return (
    <>
      <div className="max-w-5xl mx-auto pt-32 space-y-16 sm:space-y-32">
        <Hero />
        <VideoDemo />
        <Features />
        <Pricing />
        <Faq />
        <CTA />
      </div>
      <Footer />
    </>
  );
}
