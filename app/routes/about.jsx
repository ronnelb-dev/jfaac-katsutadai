import { lazy, Suspense, memo } from "react";

// ─── Eagerly loaded (above the fold) ────────────────────────────────────────
import Navigation from "../components/NavigationHeader";
import Footer from "../components/Footer";
import ChurchHistory from "../components/ChurchHistory";
import StatementOfFaith from "../components/StatementOfFaith";
import VisionMission from "../components/VisionMission";

// ─── Route meta ──────────────────────────────────────────────────────────────
export function meta() {
  return [
    { title: "About JFAAC Katsutadai — Jesus for All, Alliance Church" },
    {
      name: "description",
      content:
        "Join us every Sunday at 10:30 AM in Katsutadai, Yachiyo-shi, Chiba, Japan. A welcoming community built on faith, love, and the Word of God.",
    },
  ];
}


// ─── About page ────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <main id="main-content">
      <Navigation />
      <ChurchHistory />
      <StatementOfFaith />
      <VisionMission />
      <Footer />
    </main>
  );
}
