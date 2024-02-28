const VideoDemo = () => (
  <div className="px-6 relative">
    <video
      autoPlay
      loop
      playsInline
      className="h-full rounded-3xl w-full object-cover border-8 overflow-clip"
    >
      <source src="/demo.mp4" type="video/mp4" />
    </video>
  </div>
);

export default VideoDemo;
