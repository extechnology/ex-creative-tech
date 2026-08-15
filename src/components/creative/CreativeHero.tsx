import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const PALETTE = { a: "#ffffff", b: "#c9c9d1", c: "#6b6b76", bg: "#050505" } as const;

export default function CreativeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    const bar = barRef.current;
    if (!v || !bar || !v.duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    v.currentTime = ratio * v.duration;
    setProgress(ratio * 100);
  };

  return (
    <section
      id="top"
      data-palette=""
      data-palette-a={PALETTE.a}
      data-palette-b={PALETTE.b}
      data-palette-c={PALETTE.c}
      data-palette-bg={PALETTE.bg}
      className="relative h-[100svh] w-full overflow-hidden noise"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/vidssave.com Cinematic Watch Product Video Commercial Example _ Rolex Timex Omega Samsung Apple Jewelry Amazon Ad 1080p.mp4"
        autoPlay
        muted
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Contrast overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,black_90%)]" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Content — hero title + description */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-5 text-center sm:px-8">
        <div className="mx-auto w-[min(1200px,94vw)]">
          <Reveal delay={0.1}>
            <h1 className="font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-[1.25] tracking-tight max-w-7xl mx-auto text-center">
              <span className="block sm:whitespace-nowrap">
                Great Businesses Don’t Follow Trends
              </span>

              <span className="block text-gray-200 mt-1.5 sm:whitespace-nowrap">
                They Create Ideas That Become Trends.
              </span>
            </h1>
          </Reveal>

          <Reveal
            delay={0.3}
            className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/60 sm:mt-6 sm:text-base md:text-lg"
          >
            Redefine through exmedia – extechnology – exbot – exedu
          </Reveal>
        </div>
      </div>

      {/* Video player controls */}
      <div className="absolute inset-x-4 bottom-5 z-20 sm:inset-x-8 sm:bottom-8 md:inset-x-auto md:right-8 md:w-[380px]">
        <div className="glass flex items-center gap-3 rounded-full px-3 py-2 sm:gap-4 sm:px-4 sm:py-2.5">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 sm:h-9 sm:w-9"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 translate-x-0.5" />}
          </button>

          <div
            ref={barRef}
            onClick={seek}
            className="relative h-1 flex-1 cursor-pointer overflow-hidden rounded-full bg-white/15"
          >
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white sm:h-9 sm:w-9"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-white/40 md:block">
        Scroll · Enter the ecosystem
      </div>
    </section>
  );
}
