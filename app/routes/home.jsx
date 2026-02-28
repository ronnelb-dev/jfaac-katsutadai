import { lazy, Suspense, memo } from "react";

// ─── Eagerly loaded (above the fold) ────────────────────────────────────────
import Navigation from "../components/NavigationHeader";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import MorningDevotions from "../components/MorningDevotions";
import PrayerRequestSection from "../components/PrayerRequestSection";
import RecentPreaching from "../components/RecentPreaching";
import ChurchHistory from "../components/ChurchHistory";
import StatementOfFaith from "../components/StatementOfFaith";

// ─── Lazily loaded (below the fold — reduces initial bundle) ─────────────────
const SundayServiceSection = lazy(
  () => import("../components/SundayServiceSection"),
);

// ─── Route meta ──────────────────────────────────────────────────────────────
export function meta() {
  return [
    { title: "JFAAC Katsutadai — Jesus for All, Alliance Church" },
    {
      name: "description",
      content:
        "Join us every Sunday at 10:30 AM in Katsutadai, Yachiyo-shi, Chiba, Japan. A welcoming community built on faith, love, and the Word of God.",
    },
  ];
}

// ─── Section-level loading fallback ──────────────────────────────────────────
const SectionLoader = memo(() => (
  <div
    role="status"
    aria-label="Loading section"
    className="flex items-center justify-center py-24 bg-white"
  >
    <div className="flex flex-col items-center gap-4">
      <svg
        className="h-10 w-10 animate-spin text-emerald-500"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-80"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      <span className="text-sm font-medium text-slate-400">Loading…</span>
    </div>
  </div>
));

// ─── Home page ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main id="main-content">
      <Navigation />
      <HeroSection />
      <MorningDevotions />
      <RecentPreaching />
      <Suspense fallback={<SectionLoader />}>
        <SundayServiceSection />
      </Suspense>
      <PrayerRequestSection />
      <ChurchHistory />
      <StatementOfFaith />
      <Footer />
    </main>
  );
}
