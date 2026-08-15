import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const PALETTE = { a: "#ffffff", b: "#c9c9d1", c: "#6b6b76", bg: "#050505" } as const;

const PILLARS = ["Creative", "Digital", "Learning", "Connectivity"];

export default function HomeHero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video || !video.duration) return;
        setProgress((video.currentTime / video.duration) * 100);
    };

    const seek = (event: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current;
        const bar = barRef.current;
        if (!video || !bar || !video.duration) return;

        const rect = bar.getBoundingClientRect();
        const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);

        video.currentTime = ratio * video.duration;
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
            className="noise relative flex h-[100svh] min-h-[680px] w-full items-center justify-center overflow-hidden bg-[#050505]"
        >
            {/* BACKGROUND VIDEO */}
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

            {/* CINEMATIC OVERLAYS */}
            <div className="absolute inset-0 bg-black/45" />

            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse 70% 65% at 50% 48%,
            rgba(255,255,255,0.075) 0%,
            rgba(255,255,255,0.025) 28%,
            rgba(0,0,0,0.18) 58%,
            rgba(0,0,0,0.72) 100%)`,
                }}
            />

            <div className="absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black via-black/60 to-transparent" />

            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(90deg,
            rgba(0,0,0,0.58) 0%,
            transparent 27%,
            transparent 73%,
            rgba(0,0,0,0.50) 100%)`,
                }}
            />

            <div className="grid-bg absolute inset-0 opacity-[0.075]" />

            {/* CENTER HERO CONTENT */}
            <div className="relative z-10 flex w-full items-center justify-center px-5 sm:px-8 lg:px-12 sm:pt-10">

                <div className="mx-auto flex w-full max-w-[1250px] flex-col items-center text-center">
                    {/* PILLARS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-8 flex flex-wrap items-center justify-center sm:mb-9 md:mb-10"
                    >
                        {PILLARS.map((pillar, index) => (
                            <motion.div
                                key={pillar}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="flex items-center"
                            >
                                {index !== 0 && (
                                    <span aria-hidden className="mx-3 h-3 w-px bg-white/20 sm:mx-4 md:mx-5" />
                                )}

                                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.28em] text-white/65 sm:text-[10px] md:text-xs">
                                    <span
                                        aria-hidden
                                        className="h-1.5 w-1.5 rounded-full"
                                        style={{ backgroundColor: "#ffffff", boxShadow: "0 0 10px rgba(255,255,255,0.8)" }}
                                    />
                                    {pillar}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* MAIN HEADING */}
                    <motion.h1
                        initial={{ opacity: 0, y: 45, scale: 0.97, filter: "blur(14px)" }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1.15, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="hero-shimmer-text relative w-full max-w-[1180px] text-center font-semibold leading-[1.02] tracking-[-0.055em] text-2xl sm:text-3xl md:text-4xl lg:text-7xl"
                    >
                        Come Together To Transform Ideas Into Impactful Solutions.
                    </motion.h1>

                    {/* DESCRIPTION */}
                    <motion.p
                        initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.9, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-7 max-w-[780px] text-center text-sm leading-7 text-white/55 sm:mt-8 sm:text-base sm:leading-8 md:text-lg"
                    >
                        Empowering businesses, professionals, and communities to create, connect, automate, and grow in a constantly evolving digital world.
                    </motion.p>

                    {/* DECORATIVE CENTER LINE */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-8 flex items-center gap-4 sm:mt-10"
                    >
                        <span className="h-px w-12 bg-gradient-to-r from-transparent to-white/25 sm:w-16" />
                        <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: "#ffffff", boxShadow: "0 0 14px rgba(255,255,255,0.9)" }}
                        />
                        <span className="h-px w-12 bg-gradient-to-l from-transparent to-white/25 sm:w-16" />
                    </motion.div>
                </div>
            </div>

            {/* VIDEO CONTROLS */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-4 bottom-5 z-20 sm:inset-x-8 sm:bottom-8 md:inset-x-auto md:right-8 md:w-[340px]"
            >
                <div className="glass flex items-center gap-3 rounded-full bg-black/25 px-3 py-2 backdrop-blur-xl sm:gap-4 sm:px-4 sm:py-2.5">
                    <button
                        type="button"
                        onClick={togglePlay}
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-105 hover:bg-white/90 active:scale-95 sm:h-9 sm:w-9"
                    >
                        {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 translate-x-0.5" />}
                    </button>

                    <div
                        ref={barRef}
                        onClick={seek}
                        role="slider"
                        aria-label="Video progress"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={progress}
                        tabIndex={0}
                        className="group relative h-1 flex-1 cursor-pointer overflow-hidden rounded-full bg-white/15"
                    >
                        <div className="absolute inset-y-0 left-0 rounded-full bg-white/25 blur-[3px]" style={{ width: `${progress}%` }} />
                        <div className="relative h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
                    </div>

                    <button
                        type="button"
                        onClick={toggleMute}
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white active:scale-95 sm:h-9 sm:w-9"
                    >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                </div>
            </motion.div>

            {/* TEXT SHIMMER */}
            <style>{`
        .hero-shimmer-text {
          background: linear-gradient(
            100deg,
            #e8e8ea 0%,
            #e8e8ea 40%,
            #ffffff 48%,
            #ffffff 52%,
            #e8e8ea 60%,
            #e8e8ea 100%
          );
          background-size: 250% 100%;
          background-position: 150% 50%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: heroTextShimmer 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes heroTextShimmer {
          0% { background-position: 150% 50%; }
          35% { background-position: -50% 50%; }
          100% { background-position: -50% 50%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-shimmer-text {
            animation: none;
            background-position: 50% 50%;
          }
        }
      `}</style>
        </section>
    );
}