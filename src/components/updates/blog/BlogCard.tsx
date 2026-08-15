import { motion } from "motion/react";
import { Clock, Calendar, Tag, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Post } from "@/types/blog";

export function BlogCard({ post, index, onRead }: { post: Post; index: number; onRead: (p: Post) => void }) {
    return (
        <Reveal delay={index * 0.07}>
            <article
                id={`blog-post-${post.id}`}
                onClick={() => onRead(post)}
                className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer h-full transition-all duration-500"
                style={{ background: "rgba(255,255,255,0.02)", boxShadow: "0 0 0 1px rgba(255,255,255,0.04)" }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(245,158,11,0.18), 0 20px 60px rgba(0,0,0,0.4)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.03)";
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                }}
            >
                <div className="relative overflow-hidden aspect-[16/9] shrink-0">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-lg text-amber-400 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md" style={{ background: "rgba(0,0,0,0.65)" }}>
                            {post.category}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col flex-1 p-5 sm:p-6 space-y-4">
                    <div className="flex items-center gap-3 text-white/30 text-xs">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                        <span className="w-px h-3 bg-white/10" />
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug tracking-tight line-clamp-2 group-hover:text-amber-50 transition-colors duration-300">
                        {post.title}
                    </h3>

                    <p className="text-white/40 text-sm leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 2).map((t) => (
                            <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-amber-400 text-[10px] font-semibold tracking-widest uppercase" style={{ background: "rgba(245,158,11,0.08)" }}>
                                <Tag className="w-2.5 h-2.5" />
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <div className="flex items-center gap-2.5">
                            <img src={post.authorAvatar} alt={post.author} className="w-7 h-7 rounded-full object-cover" style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }} />
                            <div>
                                <p className="text-white text-xs font-semibold leading-none">{post.author}</p>
                                <p className="text-white/30 text-[10px] mt-0.5">{post.authorRole}</p>
                            </div>
                        </div>
                        <motion.span whileHover={{ x: 3 }} className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                            Read <ChevronRight className="w-3.5 h-3.5" />
                        </motion.span>
                    </div>
                </div>
            </article>
        </Reveal>
    );
}