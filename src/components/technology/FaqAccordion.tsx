import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "What services does EX-Creative Technology specialize in?",
    a: "We specialize in end-to-end digital product design, WebGL/3D visual experiences, high-performance React/Next.js frontend development, and comprehensive brand design systems.",
  },
  {
    q: "How fast can you kick off a new agency project?",
    a: "Typically within 5 to 7 business days following our discovery call and scoping alignment. We dedicate focused engineering and design sprints to every client project.",
  },
  {
    q: "Do you work with startups as well as enterprise teams?",
    a: "Yes! We work with venture-backed Seed and Series A/B startups seeking product market fit as well as established global tech enterprises looking to overhaul their digital flagships.",
  },
  {
    q: "What is your typical project timeline?",
    a: "Most website redesigns and product builds take 4 to 8 weeks depending on scope, custom WebGL interactive shaders, and API integration requirements.",
  },
  {
    q: "How do you handle ongoing maintenance and product scaling?",
    a: "We offer monthly design & engineering retainer squads to continuously ship new features, monitor web performance metrics, and optimize conversion funnels.",
  },
];

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-12 md:py-16 px-5 lg:px-8 max-w-4xl mx-auto text-white relative overflow-hidden">
      {/* Rich Glowing Background Blur (matching red/purple theme) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-red-600/20 via-purple-600/20 to-blue-600/15 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-3 mb-10 md:mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="block text-xs font-mono tracking-[0.25em] uppercase text-red-400"
        >
          Got Questions?
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans"
        >
          Frequently Asked Questions.
        </motion.h2>
      </div>

      {/* Accordion List (NO CARD BORDER as requested) */}
      <div className="relative z-10 space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="rounded-2xl sm:rounded-3xl bg-[#0b0c12]/90 backdrop-blur-xl shadow-xl overflow-hidden transition-colors duration-300 hover:bg-[#10121c]"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-lg sm:text-2xl font-semibold text-white pr-4 font-sans leading-snug">
                  {faq.q}
                </span>
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                  {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 text-sm sm:text-base text-white/65 leading-relaxed font-normal">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
