import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { POSTS, CATEGORIES } from "../../../lib/blogpost";
import { BlogReaderModal } from "./BlogReaderModal";
import { CategoryPill } from "./CategoryPill";
import { FeaturedCard } from "./FeaturedCard";
import { BlogCard } from "./BlogCard";
import { Post } from "@/types/blog";



export default function BlogSection() {


  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);


  const handleRead = useCallback((post: Post) => setSelectedPost(post), []);
  const handleClose = useCallback(() => setSelectedPost(null), []);


  const featured = POSTS.find((p) => p.featured)!;
  const rest = POSTS.filter((p) => !p.featured);
  const filtered = activeCategory === "All" ? rest : rest.filter((p) => p.category === activeCategory);
  const showFeatured = activeCategory === "All" || activeCategory === featured.category;


  return (

    <>


      <BlogReaderModal post={selectedPost} onClose={handleClose} />


      <section id="blog" className="relative py-12 sm:py-20 bg-[#050505] noise overflow-hidden">


        <div className="pointer-events-none absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[130px] opacity-25" style={{ background: "radial-gradient(circle, #F59E0B 0%, #D97706 45%, transparent 70%)" }} />
        <div className="pointer-events-none absolute top-1/3 -right-20 w-[550px] h-[550px] rounded-full blur-[140px] opacity-20" style={{ background: "radial-gradient(circle, #FB923C 0%, #EA580C 45%, transparent 70%)" }} />
        <div className="pointer-events-none absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" style={{ background: "radial-gradient(circle, #EAB308 0%, #B45309 45%, transparent 70%)" }} />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.14]" />
        <div className="pointer-events-none absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.5) 50%, transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_90%)]" />


        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 space-y-16">
          <div className="text-center space-y-4">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-amber-400 text-xs font-bold tracking-widest uppercase" style={{ background: "rgba(245,158,11,0.08)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Latest Thinking
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05]">
                Ideas Worth{" "}
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Reading</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-xl mx-auto text-white/40 text-base sm:text-lg leading-relaxed">
                Craft notes, strategic perspectives, and stories from the people shaping tomorrow's digital world.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2.5">
              {CATEGORIES.map((cat) => (
                <CategoryPill key={cat} label={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)} />
              ))}
            </div>
          </Reveal>

          {showFeatured && <FeaturedCard post={featured} onRead={handleRead} />}

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
              >
                {filtered.map((post, i) => (
                  <BlogCard key={post.id} post={post} index={i} onRead={handleRead} />
                ))}
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-24 text-white/25 text-sm">
                No posts in this category yet. Check back soon!
              </motion.div>
            )}
          </AnimatePresence>

          <Reveal delay={0.1}>
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white/50 text-sm font-medium hover:text-amber-400 transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.03)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.06)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
              >
                Load More Articles
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
          </Reveal>

          
        </div>
      </section>
    </>
  );
}