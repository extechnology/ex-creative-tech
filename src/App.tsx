import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";

/* ── Lazy-loaded pages ─────────────────────────────────────── */
const HomePage    = lazy(() => import("@/pages/HomePage"));
const AboutPage   = lazy(() => import("@/pages/AboutPage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));

/* ── Fullscreen loading fallback ───────────────────────────── */
function PageLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]">
      <div className="font-display text-white text-6xl tracking-tight">
        EX<span className="text-white/30">/</span>
      </div>
      <div className="mt-8 w-40 h-px bg-white/10 overflow-hidden rounded-full relative">
        <div
          className="absolute inset-y-0 left-0 w-1/3 bg-white/60 rounded-full"
          style={{ animation: "shimmer 1.4s ease-in-out infinite" }}
        />
      </div>
    </div>
  );
}

/* ── 404 ───────────────────────────────────────────────────── */
function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] px-4 text-center">
      <div className="font-display text-[18vw] text-white/[0.04] leading-none select-none">404</div>
      <div className="-mt-8">
        <h1 className="font-display text-5xl text-white mb-3">Page not found</h1>
        <p className="text-white/50 text-sm mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium rounded-full px-6 py-2.5 bg-white text-black hover:opacity-90 transition"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

/* ── Router ────────────────────────────────────────────────── */
export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/"         element={<HomePage />} />
          <Route path="/about"    element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact"  element={<ContactPage />} />
          <Route path="*"         element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
