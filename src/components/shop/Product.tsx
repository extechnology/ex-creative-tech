import { motion } from "motion/react";
import { FloatingDots } from "@/components/ui/floating-dots";

/* ────────────────────────────────────────────────────────────
   TYPES
──────────────────────────────────────────────────────────── */
type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
};

/* ────────────────────────────────────────────────────────────
   DATA
   Swap in real products/images — grid + card mechanics scale
   automatically to however many items are here.
──────────────────────────────────────────────────────────── */
const PRODUCTS: Product[] = [
    {
        id: "media-hoodie",
        name: "EX Media Oversized Hoodie",
        price: 2299,
        image: "https://picsum.photos/seed/exmedia-hoodie/700/860",
    },
    {
        id: "media-poster",
        name: "Studio Grain Poster Print",
        price: 599,
        image: "https://picsum.photos/seed/exmedia-poster/700/860",
    },
    {
        id: "edu-notebook",
        name: "Growth Mindset Notebook Kit",
        price: 449,
        image: "https://picsum.photos/seed/exedu-notebook/700/860",
    },
    {
        id: "edu-playbook",
        name: "Digital Marketing Playbook",
        price: 349,
        image: "https://picsum.photos/seed/exedu-playbook/700/860",
    },
    {
        id: "bot-pins",
        name: "EX Bot Enamel Pin Set",
        price: 399,
        image: "https://picsum.photos/seed/exbot-pins/700/860",
    },
    {
        id: "bot-deskmat",
        name: "Automation Desk Mat",
        price: 899,
        image: "https://picsum.photos/seed/exbot-deskmat/700/860",
    },
    {
        id: "tech-tee",
        name: "Tech Stack Graphic Tee",
        price: 799,
        image: "https://picsum.photos/seed/extech-tee/700/860",
    },
    {
        id: "tech-cap",
        name: "Circuit Line Cap",
        price: 549,
        image: "https://picsum.photos/seed/extech-cap/700/860",
    },
];

const HEADLINE_WORDS = ["Products", "Can"];

/* ────────────────────────────────────────────────────────────
   MAIN SECTION
──────────────────────────────────────────────────────────── */

export default function ProductsSection() {
    return (
        <section
            id="products"
            className="relative isolate overflow-hidden bg-[#0b0609] px-4 py-14 sm:px-8 sm:py-20"
        >
            <BackgroundDecor />

            <div className="mx-auto max-w-7xl">
                <SectionHeader />

                <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
                    {PRODUCTS.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>

            <style>{`
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
        <div className="mb-8 sm:mb-12">
            <h2 className="flex flex-nowrap items-baseline gap-x-[0.24em] whitespace-nowrap text-[clamp(1.6rem,7.2vw,4rem)] font-bold leading-[0.98] tracking-[-0.045em] text-white">
                {HEADLINE_WORDS.map((word, i) => (
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
                <motion.span
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: 0.22 }}
                    className="sheen-text inline-block bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text italic text-transparent"
                >
                    Deliver.
                </motion.span>
            </h2>

            <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-5 max-w-xl text-sm leading-relaxed text-white/45 sm:text-base sm:text-lg"
            >
                Prints, kits, and limited drops made by the same studios building
                everything else here.
            </motion.p>
        </div>
    );
}

/* ────────────────────────────────────────────────────────────
   PRODUCT CARD
──────────────────────────────────────────────────────────── */

function ProductCard({ product, index }: { product: Product; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
            whileHover={{ y: -8 }}
            className="group relative"
        >
            {/* ambient glow on hover */}
            <div className="pointer-events-none absolute -inset-3 rounded-[32px] bg-fuchsia-500/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60" />

            <div
                className="relative overflow-hidden rounded-[20px] transition-colors duration-500 group-hover:border-white/[0.16] sm:rounded-[28px]"
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

                    {/* caption: name + price only */}
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                        <h3 className="text-[13px] font-semibold leading-snug text-white sm:text-base">
                            {product.name}
                        </h3>
                        <span className="mt-1 block text-sm font-bold text-white sm:text-lg">
                            ₹{product.price}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}