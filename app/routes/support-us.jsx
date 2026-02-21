import { lazy, Suspense, memo } from "react";

// ─── Eagerly loaded (above the fold) ────────────────────────────────────────
import Navigation from "../components/NavigationHeader";
import Footer from "../components/Footer";
import SupportUs from "../components/SupportUs";

// ─── Route meta ──────────────────────────────────────────────────────────────
export function meta() {
  return [
    { title: "Support Us at JFAAC Katsutadai" },
    {
      name: "description",
      content:
        "Support us in Katsutadai, Yachiyo-shi, Chiba, Japan. A welcoming community built on faith, love, and the Word of God.",
    },
  ];
}


// ─── Visit page ────────────────────────────────────────────────────────────────
export default function Visit() {
  return (
    <main id="main-content">
      <Navigation />
      <SupportUs />
      <Footer />
    </main>
  );
}
