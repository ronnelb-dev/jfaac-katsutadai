import { lazy, Suspense, memo } from "react";

// ─── Eagerly loaded (above the fold) ────────────────────────────────────────
import Navigation from "../components/NavigationHeader";
import Footer from "../components/Footer";
import VisitUs from "../components/VisitUs";

// ─── Route meta ──────────────────────────────────────────────────────────────
export function meta() {
  return [
    { title: "Visit Us at JFAAC Katsutadai" },
    {
      name: "description",
      content:
        "Visit us every Sunday at 10:30 AM in Katsutadai, Yachiyo-shi, Chiba, Japan. A welcoming community built on faith, love, and the Word of God.",
    },
  ];
}


// ─── Visit page ────────────────────────────────────────────────────────────────
export default function Visit() {
  return (
    <main id="main-content">
      <Navigation />
      <VisitUs />
      <Footer />
    </main>
  );
}
