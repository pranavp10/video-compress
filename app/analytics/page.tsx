import Script from "next/script";

const Page = () => {
  return (
    <>
      <iframe
        src="https://plausible.prolab.sh/videocompress.prolab.sh?embed=true&theme=light&background=transparent"
        scrolling="no"
        frameBorder={0}
        loading="lazy"
        style={{ width: 1, minWidth: "100%", height: 1600 }}
      />
      <Script
        async
        src="https://plausible.prolab.sh/videocompress.prolab.sh/js/embed.host.js"
      />
    </>
  );
};

export default Page;
