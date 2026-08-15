import { motion } from "motion/react";
import { ArrowUpRight, Clock, Calendar, Tag } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Post } from "@/types/blog";

export function FeaturedCard({ post, onRead }: { post: Post; onRead: (p: Post) => void }) {
    return (
        <Reveal>
            <article
                id={`blog-post-${post.id}`}
                onClick={() => onRead(post)}
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
                style={{
                    background: "linear-gradient(135deg, rgba(245,158,11,0.05) 0%, rgba(5,5,5,0.8) 60%)",
                    boxShadow: "0 0 0 1px rgba(245,158,11,0.08), 0 32px 64px rgba(0,0,0,0.5)",
                }}
            >
                <div
                    className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, transparent 60%)", boxShadow: "inset 0 0 0 1px rgba(245,158,11,0.2)" }}
                />

                <div className="grid lg:grid-cols-[1.15fr_0.85fr] min-h-[440px]">
                    <div className="relative overflow-hidden rounded-tl-3xl rounded-bl-3xl max-lg:rounded-tr-3xl max-lg:h-64">
                        <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]/80 hidden lg:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 to-transparent lg:hidden" />

                        <div
                            className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl"
                            style={{ background: "rgba(0,0,0,0.6)", boxShadow: "inset 0 0 0 1px rgba(245,158,11,0.25)" }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-amber-400 text-[10px] font-bold tracking-widest uppercase">Featured</span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between p-7 lg:p-10 lg:pl-8">
                        <div className="space-y-5">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="px-3 py-1 rounded-full text-amber-400 text-[10px] font-bold tracking-widest uppercase" style={{ background: "rgba(245,158,11,0.12)" }}>
                                    {post.category}
                                </span>
                                <span className="flex items-center gap-1 text-white/30 text-xs"><Calendar className="w-3 h-3" /> {post.date}</span>
                                <span className="flex items-center gap-1 text-white/30 text-xs"><Clock className="w-3 h-3" /> {post.readTime}</span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-[1.12] tracking-tight group-hover:text-amber-50 transition-colors duration-300">
                                {post.title}
                            </h2>

                            <p className="text-white/45 leading-relaxed text-sm sm:text-base line-clamp-4">{post.excerpt}</p>

                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((t) => (
                                    <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-amber-400 text-[10px] font-semibold tracking-widest uppercase" style={{ background: "rgba(245,158,11,0.08)" }}>
                                        <Tag className="w-2.5 h-2.5" />
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            <div className="flex items-center gap-3">
                                <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full object-cover" style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }} />
                                <div>
                                    <p className="text-white text-sm font-semibold leading-none">{post.author}</p>
                                    <p className="text-white/35 text-xs mt-1">{post.authorRole}</p>
                                </div>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[#050505] text-sm font-bold"
                                style={{ background: "linear-gradient(135deg, #F59E0B, #FB923C)", boxShadow: "0 0 20px rgba(245,158,11,0.35)" }}
                            >
                                Read Story
                                <ArrowUpRight className="w-4 h-4" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </article>
        </Reveal>
    );
}