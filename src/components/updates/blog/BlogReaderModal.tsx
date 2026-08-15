import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
    Clock,
    Calendar,
    Tag,
    X,
    BookOpen,
    Share2,
    Bookmark,
    ArrowUpRight,
} from "lucide-react";

import { Post } from "@/types/blog";
import { renderMarkdown } from "./RenderMarkdown";

interface BlogReaderModalProps {
    post: Post | null;
    onClose: () => void;
}

export function BlogReaderModal({
    post,
    onClose,
}: BlogReaderModalProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    /*
     * Lock the background page while the reader is open.
     *
     * The article panel handles its own native scrolling.
     */
    useEffect(() => {
        if (!post) return;

        const scrollY = window.scrollY;
        const html = document.documentElement;
        const body = document.body;

        const previousStyles = {
            htmlOverflow: html.style.overflow,
            bodyOverflow: body.style.overflow,
            bodyPosition: body.style.position,
            bodyTop: body.style.top,
            bodyWidth: body.style.width,
        };

        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.width = "100%";

        return () => {
            html.style.overflow = previousStyles.htmlOverflow;
            body.style.overflow = previousStyles.bodyOverflow;
            body.style.position = previousStyles.bodyPosition;
            body.style.top = previousStyles.bodyTop;
            body.style.width = previousStyles.bodyWidth;

            window.scrollTo(0, scrollY);
        };
    }, [post]);

    /*
     * Close with Escape.
     */
    useEffect(() => {
        if (!post) return;

        const handleKeyboard = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyboard);

        return () => {
            window.removeEventListener("keydown", handleKeyboard);
        };
    }, [post, onClose]);

    /*
     * Reset article scroll position whenever a different post opens.
     */
    useEffect(() => {
        if (!post) return;

        requestAnimationFrame(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = 0;
            }
        });
    }, [post]);

    /*
     * Force wheel scrolling directly onto the article panel.
     *
     * This fixes the issue where the scrollbar can be dragged,
     * but mouse-wheel / trackpad scrolling does not move the article.
     */
    const handleArticleWheel = (
        event: React.WheelEvent<HTMLDivElement>
    ) => {
        const container = scrollRef.current;

        if (!container) return;

        event.preventDefault();

        container.scrollTop += event.deltaY;
    };

    if (typeof document === "undefined") {
        return null;
    }

    return createPortal(
        <AnimatePresence>
            {post && (
                <>
                    {/* BACKDROP */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[90] overscroll-none bg-black/85 backdrop-blur-xl"
                        onClick={onClose}
                    />

                    {/* READER */}
                    <motion.div
                        key="sheet"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 32,
                            stiffness: 280,
                        }}
                        className="fixed inset-x-0 bottom-0 top-16 z-[95] flex h-[calc(100dvh-4rem)] min-h-0 flex-col overflow-hidden rounded-t-[28px] isolate overscroll-none sm:top-10 sm:h-[calc(100dvh-2.5rem)]"
                        style={{
                            background:
                                "radial-gradient(120% 100% at 50% 0%, #151008 0%, #0a0806 38%, #050505 75%)",
                        }}
                    >
                        {/* TOP GLOW */}
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />

                        {/* AMBIENT GLOW */}
                        <div className="pointer-events-none absolute -top-24 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-amber-500/[0.07] blur-[120px]" />

                        <div className="pointer-events-none absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-amber-600/[0.035] blur-[140px]" />

                        {/* DRAG HANDLE */}
                        <div className="relative z-20 flex shrink-0 justify-center pb-1 pt-3">
                            <div className="h-1 w-12 rounded-full bg-white/15 transition-colors hover:bg-white/25" />
                        </div>

                        {/* TOP BAR */}
                        <div
                            className="relative z-20 flex shrink-0 items-center justify-between px-5 py-3 sm:px-7"
                            style={{
                                borderBottom:
                                    "1px solid rgba(255,255,255,0.055)",
                            }}
                        >
                            {/* LEFT */}
                            <div className="flex items-center gap-3">
                                {/* CULTURE PILL */}
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/[0.08] px-3 py-1.5 shadow-[0_0_25px_rgba(245,158,11,0.05)]">
                                    <BookOpen className="h-3 w-3 text-amber-400" />

                                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-400">
                                        {post.category}
                                    </span>
                                </div>

                                {/* READ TIME */}
                                <span className="hidden items-center gap-1.5 text-xs text-white/25 sm:flex">
                                    <Clock className="h-3 w-3" />
                                    {post.readTime}
                                </span>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    className="rounded-full p-2.5 text-white/35 transition-all duration-200 hover:bg-amber-400/[0.06] hover:text-amber-400 sm:p-2"
                                    aria-label="Share"
                                >
                                    <Share2 className="h-3.5 w-3.5" />
                                </button>

                                <button
                                    type="button"
                                    className="rounded-full p-2.5 text-white/35 transition-all duration-200 hover:bg-amber-400/[0.06] hover:text-amber-400 sm:p-2"
                                    aria-label="Bookmark"
                                >
                                    <Bookmark className="h-3.5 w-3.5" />
                                </button>

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="ml-1 rounded-full p-2.5 text-white/40 transition-all duration-200 hover:bg-white/[0.08] hover:text-white sm:p-2"
                                    aria-label="Close"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* MAIN BODY */}
                        <div className="relative z-10 flex min-h-0 min-w-0 w-full flex-1 flex-col overflow-hidden sm:flex-row">
                            {/* IMAGE PANEL */}
                            <div className="relative h-52 w-full shrink-0 overflow-hidden sm:h-full sm:w-1/2">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="absolute inset-0 h-full w-full scale-[1.01] object-cover transition-transform duration-[1.2s]"
                                />

                                {/* CINEMATIC OVERLAY */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/15 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-[#050505]" />

                                {/* BOTTOM DARKNESS */}
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#050505]/90 to-transparent" />

                                {/* MODERN AUTHOR CARD */}
                                <div className="group absolute bottom-6 left-5 right-5 hidden sm:block">
                                    <div className="relative overflow-hidden rounded-2xl bg-[#090909]/75 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:bg-[#0b0b0b]/85">
                                        {/* GRADIENT TINT */}
                                        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/[0.12] via-transparent to-white/[0.03]" />

                                        {/* TOP SHINE */}
                                        <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

                                        <div className="relative">
                                            {/* TAGS */}
                                            <div className="mb-4 flex flex-wrap gap-1.5">
                                                {post.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="inline-flex items-center gap-1 rounded-md bg-amber-400/[0.06] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-amber-300"
                                                    >
                                                        <Tag className="h-2.5 w-2.5" />
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* AUTHOR */}
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex min-w-0 items-center gap-3">
                                                    {/* AVATAR */}
                                                    <div className="relative shrink-0">
                                                        <div className="absolute inset-[-5px] rounded-full bg-amber-400/20 blur-md opacity-60 transition-opacity group-hover:opacity-100" />

                                                        <div className="relative h-11 w-11 rounded-full bg-gradient-to-br from-amber-300 via-amber-500/70 to-white/10 p-[2px]">
                                                            <img
                                                                src={post.authorAvatar}
                                                                alt={post.author}
                                                                className="h-full w-full rounded-full border-2 border-[#090909] object-cover"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* NAME */}
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-1.5">
                                                            <p className="truncate text-sm font-semibold leading-none text-white">
                                                                {post.author}
                                                            </p>

                                                            <div className="h-1 w-1 shrink-0 rounded-full bg-amber-400/60" />
                                                        </div>

                                                        <p className="mt-1 text-[10px] text-white/35">
                                                            {post.authorRole}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* ARROW */}
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.025] text-white/25 transition-all group-hover:text-amber-400">
                                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                                </div>
                                            </div>

                                            {/* DIVIDER */}
                                            <div className="my-4 h-px bg-white/[0.06]" />

                                            {/* METADATA */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-1.5 text-[10px] text-white/30">
                                                        <Calendar className="h-3 w-3 text-amber-400/60" />
                                                        {post.date}
                                                    </span>

                                                    <span className="flex items-center gap-1.5 text-[10px] text-white/30">
                                                        <Clock className="h-3 w-3 text-amber-400/60" />
                                                        {post.readTime}
                                                    </span>
                                                </div>

                                                <span className="text-[8px] uppercase tracking-[0.18em] text-white/20">
                                                    Author
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SCROLLABLE ARTICLE */}
                            <div
                                ref={scrollRef}
                                onWheel={handleArticleWheel}
                                className="relative h-full min-h-0 min-w-0 w-full flex-1 basis-0 overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y [scrollbar-color:rgba(245,158,11,0.25)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-amber-400/20 [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-amber-400/35"
                                style={{
                                    WebkitOverflowScrolling: "touch",
                                    overscrollBehavior: "contain",
                                    touchAction: "pan-y",
                                }}
                            >
                                <article className="w-full px-5 pb-[max(5rem,env(safe-area-inset-bottom))] pt-7 sm:px-10 sm:pb-[max(5rem,env(safe-area-inset-bottom))] sm:pt-12 lg:px-12 xl:px-14">
                                    {/* MOBILE AUTHOR */}
                                    <div
                                        className="mb-5 flex items-center gap-3 pb-5 sm:hidden"
                                        style={{
                                            borderBottom:
                                                "1px solid rgba(255,255,255,0.06)",
                                        }}
                                    >
                                        <div className="relative h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-amber-300 to-amber-600/20 p-[1.5px]">
                                            <img
                                                src={post.authorAvatar}
                                                alt={post.author}
                                                className="h-full w-full rounded-full border-2 border-[#090909] object-cover"
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-semibold text-white">
                                                {post.author}
                                            </p>

                                            <p className="mt-0.5 text-[10px] text-white/35">
                                                {post.authorRole}
                                            </p>
                                        </div>

                                        <div className="shrink-0 space-y-1 text-[9px] text-white/30">
                                            <p className="flex items-center justify-end gap-1">
                                                <Calendar className="h-2.5 w-2.5" />
                                                {post.date}
                                            </p>

                                            <p className="flex items-center justify-end gap-1">
                                                <Clock className="h-2.5 w-2.5" />
                                                {post.readTime}
                                            </p>
                                        </div>
                                    </div>

                                    {/* MOBILE TAGS */}
                                    <div className="mb-5 flex flex-wrap gap-1.5 sm:hidden">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center gap-1 rounded-md bg-amber-400/[0.06] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-amber-400"
                                            >
                                                <Tag className="h-2 w-2" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* TITLE */}
                                    <h1 className="mb-5 max-w-[900px] text-xl font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-2xl lg:text-[2rem]">
                                        {post.title}
                                    </h1>

                                    {/* EXCERPT */}
                                    <p
                                        className="mb-7 max-w-[900px] pl-4 text-sm font-medium leading-[1.8] text-amber-100/55 sm:text-[15px]"
                                        style={{
                                            borderLeft:
                                                "2px solid rgba(245,158,11,0.45)",
                                        }}
                                    >
                                        {post.excerpt}
                                    </p>

                                    {/* DIVIDER */}
                                    <div
                                        className="mb-7 h-px"
                                        style={{
                                            background:
                                                "linear-gradient(to right, rgba(255,255,255,0.08), rgba(255,255,255,0.02), transparent)",
                                        }}
                                    />

                                    {/* ARTICLE CONTENT */}
                                    <div className="w-full max-w-[72ch]">
                                        <div className="space-y-2.5">
                                            {renderMarkdown(post.content)}
                                        </div>
                                    </div>

                                    {/* FOOTER */}
                                    <div
                                        className="mt-12 flex max-w-[900px] flex-col items-start justify-between gap-4 pt-7 sm:flex-row sm:items-center"
                                        style={{
                                            borderTop:
                                                "1px solid rgba(255,255,255,0.06)",
                                        }}
                                    >
                                        <p className="text-xs text-white/25">
                                            Written by{" "}
                                            <span className="font-semibold text-amber-400">
                                                {post.author}
                                            </span>
                                        </p>

                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="inline-flex items-center gap-2 rounded-full border border-amber-400/10 bg-amber-400/[0.07] px-5 py-2.5 text-xs font-bold text-amber-400 transition-all duration-200 hover:border-amber-400/20 hover:bg-amber-400/[0.12]"
                                        >
                                            ← Back to Updates
                                        </button>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}