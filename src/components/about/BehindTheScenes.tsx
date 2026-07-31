import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Maximize2 } from "lucide-react";

const GALLERY = [
  {
    id: 1,
    title: "Developer Coding & WebGL",
    subtitle: "High-throughput React & Canvas Shader Development",
    desc: "Our engineering squad crafting sub-10ms real-time WebGL canvas graphics and responsive design tokens.",
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80",
    colSpan: "col-span-1 md:col-span-8",
    height: "h-[300px] md:h-[380px]",
  },
  {
    id: 2,
    title: "Creative Workspace",
    subtitle: "Studio Headquarters",
    desc: "Open studio space designed for fluid team collaboration, brainstorming, and daily design reviews.",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
    colSpan: "col-span-1 md:col-span-4",
    height: "h-[300px] md:h-[380px]",
  },
  {
    id: 3,
    title: "Design Critique & Whiteboard",
    subtitle: "Mapping Component Architecture",
    desc: "Collaborative whiteboard design sessions breaking down user flows and design tokens before code.",
    src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1400&q=80",
    colSpan: "col-span-1 md:col-span-4",
    height: "h-[300px] md:h-[360px]",
  },
  {
    id: 4,
    title: "Coffee & Strategy Sessions",
    subtitle: "Fueling Breakthroughs",
    desc: "Informal team syncs discussing product strategy, micro-interactions, and visual direction over espresso.",
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80",
    colSpan: "col-span-1 md:col-span-4",
    height: "h-[300px] md:h-[360px]",
  },
  {
    id: 5,
    title: "Team Sync & All-Hands",
    subtitle: "Cross-Disciplinary Alignment",
    desc: "Bi-weekly design and engineering syncs aligning product delivery schedules and release milestones.",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
    colSpan: "col-span-1 md:col-span-4",
    height: "h-[300px] md:h-[360px]",
  },
];

export default function BehindTheScenes() {
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY)[0] | null>(null);

  return (
    <section className="py-12 md:py-16 px-5 lg:px-8 max-w-7xl mx-auto text-white relative">
      {/* Header with scroll reveal animation */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 md:mb-14">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="block text-xs font-mono tracking-[0.25em] uppercase text-red-400"
        >
          Studio Life
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans"
        >
          Behind The Scenes.
        </motion.h2>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
        {GALLERY.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
            onClick={() => setSelectedImage(item)}
            className={`${item.colSpan} relative rounded-2xl overflow-hidden cursor-pointer group shadow-2xl`}
          >
            <div className={`relative ${item.height} w-full overflow-hidden rounded-2xl`}>
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-purple-300">
                  {item.subtitle}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  {item.title}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full-Screen Lightbox Modal with z-[99999] */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#0a0b10] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] border border-white/15 my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-xl hover:scale-110 active:scale-95"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="h-[320px] sm:h-[480px] w-full relative">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-transparent to-transparent" />
              </div>

              {/* Modal Details */}
              <div className="p-6 sm:p-10 space-y-3">
                <span className="text-xs font-mono tracking-widest uppercase text-purple-400">
                  {selectedImage.subtitle}
                </span>
                <h3 className="text-2xl sm:text-4xl font-bold text-white font-sans tracking-tight">
                  {selectedImage.title}
                </h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal max-w-2xl">
                  {selectedImage.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
