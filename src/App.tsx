import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import PageLoader from "@/components/PageLoader";

/* ── Lazy-loaded pages ─────────────────────────────────────── */
const HomePage    = lazy(() => import("@/pages/HomePage"));
const TechnologyPage   = lazy(() => import("@/pages/Technology"));
const CompanyPage = lazy(() => import("@/pages/Company"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));



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
          <Route path="/technology"    element={<TechnologyPage />} />
          <Route path="/companies" element={<CompanyPage />} />
          <Route path="/contact"  element={<ContactPage />} />
          <Route path="*"         element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
