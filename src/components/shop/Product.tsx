import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { FloatingDots } from "@/components/ui/floating-dots";


/* ────────────────────────────────────────────────────────────
   TYPES
──────────────────────────────────────────────────────────── */
type CompanyId = "exmedia" | "exedu" | "exbot" | "extechnology";
type FilterId = CompanyId | "all";
type Product = {
    id: string;
    name: string;
    company: CompanyId;
    companyLabel: string;
    price: number;
    image: string;
};

type Theme = {
    gradient: string;
    glow: string;
    text: string;
    soft: string;
    dot: string;
};

/* ────────────────────────────────────────────────────────────
   DATA
   Swap in real products/images — everything else (grid, filters,
   card mechanics, colors) scales automatically.
──────────────────────────────────────────────────────────── */
const PRODUCTS: Product[] = [
    {
        id: "media-hoodie",
        name: "EX Media Oversized Hoodie",
        company: "exmedia",
        companyLabel: "EX Media",
        price: 2299,
        image: "https://picsum.photos/seed/exmedia-hoodie/700/860",
    },
    {
        id: "media-poster",
        name: "Studio Grain Poster Print",
        company: "exmedia",
        companyLabel: "EX Media",
        price: 599,
        image: "https://picsum.photos/seed/exmedia-poster/700/860",
    },
    {
        id: "edu-notebook",
        name: "Growth Mindset Notebook Kit",
        company: "exedu",
        companyLabel: "EX Edu",
        price: 449,
        image: "https://picsum.photos/seed/exedu-notebook/700/860",
    },
    {
        id: "edu-playbook",
        name: "Digital Marketing Playbook",
        company: "exedu",
        companyLabel: "EX Edu",
        price: 349,
        image: "https://picsum.photos/seed/exedu-playbook/700/860",
    },
    {
        id: "bot-pins",
        name: "EX Bot Enamel Pin Set",
        company: "exbot",
        companyLabel: "EX Bot",
        price: 399,
        image: "https://picsum.photos/seed/exbot-pins/700/860",
    },
    {
        id: "bot-deskmat",
        name: "Automation Desk Mat",
        company: "exbot",
        companyLabel: "EX Bot",
        price: 899,
        image: "https://picsum.photos/seed/exbot-deskmat/700/860",
    },
    {
        id: "tech-tee",
        name: "Tech Stack Graphic Tee",
        company: "extechnology",
        companyLabel: "EX Technology",
        price: 799,
        image: "https://picsum.photos/seed/extech-tee/700/860",
    },
    {
        id: "tech-cap",
        name: "Circuit Line Cap",
        company: "extechnology",
        companyLabel: "EX Technology",
        price: 549,
        image: "https://picsum.photos/seed/extech-cap/700/860",
    },
];

const COMPANY_THEME: Record<CompanyId, Theme> = {
    exmedia: {
        gradient: "from-red-500 via-rose-500 to-orange-400",
        glow: "rgba(244,63,94,0.34)",
        text: "text-red-300",
        soft: "bg-red-500/[0.10]",
        dot: "bg-red-400",
    },
    extechnology: {
        gradient: "from-violet-500 via-indigo-500 to-cyan-400",
        glow: "rgba(99,102,241,0.34)",
        text: "text-indigo-300",
        soft: "bg-indigo-500/[0.10]",
        dot: "bg-cyan-400",
    },
    exedu: {
        gradient: "from-purple-500 via-violet-500 to-fuchsia-400",
        glow: "rgba(168,85,247,0.34)",
        text: "text-purple-300",
        soft: "bg-purple-500/[0.10]",
        dot: "bg-fuchsia-400",
    },
    exbot: {
        gradient: "from-emerald-500 via-green-500 to-teal-400",
        glow: "rgba(16,185,129,0.34)",
        text: "text-emerald-300",
        soft: "bg-emerald-500/[0.10]",
        dot: "bg-emerald-400",
    },
};

const FALLBACK_THEME = COMPANY_THEME.exmedia;
const getTheme = (company: CompanyId): Theme => COMPANY_THEME[company] ?? FALLBACK_THEME;

const FILTERS: { id: FilterId; label: string }[] = [
    { id: "all", label: "All Studios" },
    { id: "exmedia", label: "EX Media" },
    { id: "exedu", label: "EX Edu" },
    { id: "exbot", label: "EX Bot" },
    { id: "extechnology", label: "EX Technology" },
];

const HEADLINE_LINE_1 = ["Straight", "From", "The"];

/* ────────────────────────────────────────────────────────────
   MAIN SECTION
──────────────────────────────────────────────────────────── */

export default function ProductsSection() {
    const [filter, setFilter] = useState<FilterId>("all");

    const products = useMemo(
        () => (filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.company === filter)),
        [filter]
    );

    return (
        <section
            id="products"
            className="relative isolate overflow-hidden bg-[#0b0609] px-4 py-16 sm:px-8 sm:py-20"
        >
            <BackgroundDecor />

            <div className="mx-auto max-w-7xl">
                <SectionHeader />
                <FilterChips active={filter} onChange={setFilter} />

                <motion.div
                    layout
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
                >
                    <AnimatePresence mode="popLayout">
                        {products.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {products.length === 0 && (
                    <p className="py-16 text-center text-sm text-white/40">
                        No products in this studio yet — check back soon.
                    </p>
                )}
            </div>

            <style>{`
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }

        @keyframes sheen {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .sheen-text {
          background-size: 220% 100%;
          animation: sheen 6s linear infinite;
        }
      `}</style>
        </section>
    );
}

/* ────────────────────────────────────────────────────────────
   BACKGROUND DECOR
──────────────────────────────────────────────────────────── */

function BackgroundDecor() {
    return (
        <div className="pointer-events-none absolute inset-0 -z-10">
            {/* ambient color, sets the section's tone beneath the dots */}
            <div className="absolute left-1/2 top-0 h-[520px] w-[620px] -translate-x-1/2 rounded-full bg-fuchsia-600/[0.14] blur-[150px]" />
            <div className="absolute -left-[160px] top-[40%] h-[400px] w-[400px] rounded-full bg-purple-600/[0.11] blur-[140px]" />
            <div className="absolute -right-[160px] top-[60%] h-[440px] w-[440px] rounded-full bg-pink-500/[0.10] blur-[150px]" />

            <FloatingDots
                className="absolute inset-0"
                count={200}
                color="#ffffff"
                minRadius={0.8}
                maxRadius={2.2}
                minSpeed={0.15}
                maxSpeed={0.7}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0b0609_82%)]" />
        </div>
    );
}

/* ────────────────────────────────────────────────────────────
   SECTION HEADER — staggered word reveal + sheening gradient line
──────────────────────────────────────────────────────────── */

function SectionHeader() {
    return (
        <div className="mb-9 sm:mb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 shadow-[0_0_30px_rgba(217,70,239,.10)] backdrop-blur-xl"
            >
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-400" />
                </span>
                <ShoppingBag className="h-3.5 w-3.5 text-fuchsia-300" />
                <span className="text-xs font-medium tracking-wide text-white/65 sm:text-sm">
                    New Arrivals
                </span>
            </motion.div>

            <h2 className="max-w-2xl text-[clamp(2.2rem,6.5vw,4rem)] font-bold leading-[0.98] tracking-[-0.045em] text-white">
                <span className="flex flex-wrap gap-x-[0.28em]">
                    {HEADLINE_LINE_1.map((word, i) => (
                        <motion.span
                            key={word}
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.55, delay: i * 0.08 }}
                            className="inline-block"
                        >
                            {word}
                        </motion.span>
                    ))}
                </span>
                <motion.span
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: 0.3 }}
                    className="sheen-text inline-block bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text italic text-transparent"
                >
                    Studio Floor.
                </motion.span>
            </h2>

            <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-5 max-w-xl text-sm leading-relaxed text-white/45 sm:text-base sm:text-lg"
            >
                Prints, kits, and limited drops made by the same studios building
                everything else here — media, education, bots, and tech.
            </motion.p>
        </div>
    );
}

/* ────────────────────────────────────────────────────────────
   FILTER CHIPS
──────────────────────────────────────────────────────────── */

function FilterChips({
    active,
    onChange,
}: {
    active: FilterId;
    onChange: (id: FilterId) => void;
}) {
    return (
        <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-1 sm:mb-10 sm:flex-wrap">
            {FILTERS.map((f) => {
                const isActive = active === f.id;
                return (
                    <button
                        key={f.id}
                        onClick={() => onChange(f.id)}
                        className={`relative shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors duration-300 sm:text-sm ${isActive
                                ? "text-black"
                                : "border border-white/[0.12] bg-white/[0.03] text-white/55 hover:bg-white/[0.07] hover:text-white"
                            }`}
                    >
                        {isActive && (
                            <motion.span
                                layoutId="filter-pill"
                                className="absolute inset-0 rounded-full bg-white"
                                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                            />
                        )}
                        <span className="relative">{f.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

/* ────────────────────────────────────────────────────────────
   PRODUCT CARD
──────────────────────────────────────────────────────────── */

function ProductCard({ product, index }: { product: Product; index: number }) {
    const theme = getTheme(product.company);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            whileHover={{ y: -8 }}
            className="group relative"
        >
            {/* ambient glow, brand-colored, only visible on hover */}
            <div
                className="pointer-events-none absolute -inset-3 rounded-[32px] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                style={{ background: theme.glow }}
            />

            <div
                className="relative overflow-hidden rounded-[26px] transition-colors duration-500 group-hover:border-white/[0.16] sm:rounded-[28px]"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,.35)" }}
            >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#150a0e]">
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                    />

                    {/* diagonal light sweep on hover */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-[-16deg] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-[120%]" />

                    {/* legibility scrim for the caption */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* caption, sitting directly on the image */}
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                        {/* <div className="mb-1.5 flex items-center gap-1.5">
                            <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
                            <span className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${theme.text}`}>
                                {product.companyLabel}
                            </span>
                        </div> */}

                        <div className="flex items-end justify-between gap-3">
                            <h3 className="text-[15px] font-semibold leading-snug text-white sm:text-base">
                                {product.name}
                            </h3>
                            <span className="shrink-0 text-base font-bold text-white sm:text-lg">
                                ₹{product.price}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}