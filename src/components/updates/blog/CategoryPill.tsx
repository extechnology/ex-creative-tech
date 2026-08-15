import { motion } from "motion/react";

export function CategoryPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${active
                    ? "text-[#050505] bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                    : "text-white/45 bg-white/[0.04] hover:text-white/80 hover:bg-white/[0.07]"
                }`}
        >
            {label}
        </motion.button>
    );
}