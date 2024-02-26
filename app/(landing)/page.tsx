import Hero from "./components/hero";
import Features from "./components/features";
import Pricing from "./components/pricing";
import FrequentQue from "./components/FrequentQue";
import CTA from "./components/cta";
import Footer from "~/components/Footer";

export default function Home() {
  return (
    <>
      <div className="max-w-5xl mx-auto pt-32 space-y-32">
        <Hero />
        <Features />
        <Pricing />
        <FrequentQue />
        <CTA />
      </div>
      <Footer />
    </>
  );
}
