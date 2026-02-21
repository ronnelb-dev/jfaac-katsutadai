import { lazy, Suspense, memo } from "react";

// ─── Eagerly loaded (above the fold) ────────────────────────────────────────
import Navigation from "../components/NavigationHeader";
import Footer from "../components/Footer";
import MinistriesEvents from "../components/Ministriesevents";

// ─── Route meta ──────────────────────────────────────────────────────────────
export function meta() {
  return [
    { title: "Ministries & Events at JFAAC Katsutadai" },
    {
      name: "description",
      content:
        "Explore our ministries and events in Katsutadai, Yachiyo-shi, Chiba, Japan. A welcoming community built on faith, love, and the Word of God.",
    },
  ];
}


// ─── Visit page ────────────────────────────────────────────────────────────────
export default function Visit() {
  return (
    <main id="main-content">
      <Navigation />
      <MinistriesEvents />
      <Footer />
    </main>
  );
}
