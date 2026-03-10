import { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router";

// ─── Navigation items config ────────────────────────────────────────────────
const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Ministries & Events", path: "/ministries-events" },
  { label: "Support Us", path: "/support-us" },
];

// ─── Active/inactive link class helpers ─────────────────────────────────────
const desktopLinkClass = ({ isActive }) =>
  [
    "relative text-sm font-semibold tracking-wide uppercase transition-colors duration-200 pb-1",
    "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:rounded-full after:transition-all after:duration-300",
    isActive
      ? "text-green-700 after:w-full after:bg-green-600"
      : "text-slate-700 hover:text-green-700 after:w-0 hover:after:w-full after:bg-green-500",
  ].join(" ");

const mobileLinkClass = ({ isActive }) =>
  [
    "block w-full px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-colors duration-150",
    isActive
      ? "bg-green-50 text-green-700 border-l-4 border-green-600"
      : "text-slate-700 hover:bg-green-50 hover:text-green-700",
  ].join(" ");

// ─── Component ───────────────────────────────────────────────────────────────
export default function NavigationHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add shadow once user scrolls past the header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  return (
    // ── Sticky wrapper ────────────────────────────────────────────────────
    <header
      className={[
        "sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm",
        "transition-shadow duration-300",
        scrolled ? "shadow-md" : "border-b border-slate-100",
      ].join(" ")}
      role="banner"
    >
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* ── Logo / Brand ───────────────────────────────────────────── */}
          <NavLink
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded"
            aria-label="Go to homepage"
          >
            {/* Simple cross icon – replace with an <img> for a real logo */}
            <span className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm">
              <img
                src="/jfaac-logo.png"
                alt="JFAAC Katsutadai logo"
                className="h-10 w-10 rounded-full object-contain"
              />
            </span>
            <span className="text-base font-bold tracking-tight text-slate-800 leading-tight">
              JFAAC Katsutadai
              <br />
              <span className="text-green-600 text-xs font-semibold tracking-widest uppercase">
                Jesus for All, Alliance Church
              </span>
            </span>
          </NavLink>

          {/* ── Desktop navigation ─────────────────────────────────────── */}
          <nav
            className="hidden md:flex items-center gap-7"
            aria-label="Primary navigation"
          >
            <ul className="flex items-center gap-7" role="list">
              {navItems.map(({ label, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    end={path === "/"}
                    className={desktopLinkClass}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* CTA button */}
            <NavLink
              to="/visit-us"
              className="ml-2 rounded-full bg-green-600 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-colors duration-200 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              Visit Us
            </NavLink>
          </nav>

          {/* ── Mobile hamburger ───────────────────────────────────────── */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-green-50 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
          >
            {/* Animated hamburger / X icon */}
            <span className="sr-only">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile menu (slide-down) ──────────────────────────────────────── */}
      <div
        id="mobile-menu"
        role="region"
        aria-label="Mobile navigation"
        className={[
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="border-t border-slate-100 bg-white px-4 pb-5 pt-3">
          <ul className="flex flex-col gap-1" role="list">
            {navItems.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === "/"}
                  className={mobileLinkClass}
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile CTA */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <NavLink
              to="/support-us"
              onClick={closeMenu}
              className="block w-full rounded-full bg-green-600 py-3 text-center text-sm font-bold uppercase tracking-widest text-white shadow-sm transition-colors duration-200 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              Give Now
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
