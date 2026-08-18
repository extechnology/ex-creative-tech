import { Outlet, useLocation } from "react-router-dom";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CompactFooter from "@/components/layout/CompactFooter";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ThemeSwapper } from "@/components/ThemeSwapper";
import ScrollProgress from "@/components/layout/ScrollProgress";

export default function RootLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="relative bg-[color:var(--color-background)] text-white overflow-x-hidden transition-colors duration-700">
      {/* Global utilities */}
      <SmoothScroll />
      <Cursor />
      <ThemeSwapper />
      <ScrollProgress />
      <Nav />

      {isHome ? (
        <>
          <main className="relative z-10 bg-[color:var(--color-background)] min-h-screen transition-colors duration-700 mb-[480px] sm:mb-[540px] lg:mb-[620px]">
            <Outlet />
          </main>

          {/* Fixed footer — rendered below main, appears as parallax reveal */}
          <Footer />
        </>
      ) : (
        <div className="relative z-10 bg-[color:var(--color-background)] min-h-screen flex flex-col justify-between transition-colors duration-700">
          <main className="flex-1 w-full">
            <Outlet />
          </main>

          {/* Sticky compact footer for all other pages */}
          <CompactFooter />
        </div>
      )}
    </div>
  );
}
