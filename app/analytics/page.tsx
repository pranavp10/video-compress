const Page = () => {
  return (
    <>
      <iframe
        plausible-embed=""
        src="https://plausible.prolab.sh/videocompress.prolab.sh?embed=true&theme=light&background=transparent"
        scrolling="no"
        frameBorder={0}
        loading="lazy"
        style={{ width: 1, minWidth: "100%", height: 1600 }}
      />
    </>
  );
};

export default Page;
