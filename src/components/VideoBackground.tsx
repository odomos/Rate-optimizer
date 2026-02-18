export default function VideoBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <video className="h-full w-full object-cover" autoPlay muted loop playsInline>
        <source
          src="/videos/grok-video-508a5468-4fac-4484-a9cd-bdf669f90465.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
