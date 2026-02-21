import { useState, useEffect, useCallback, memo } from "react";
import { NavLink } from "react-router";

// ─── Slide data (swap URLs for real production images) ──────────────────────
export const defaultSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&q=80",
    title: "Welcome to JFAAC Katsutadai",
    subtitle: "A community built on faith, love, and the Word of God.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1600&q=80",
    title: "Jesus for All, Alliance Church",
    subtitle: "Every Sunday — come as you are, leave transformed.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&q=80",
    title: "Grow in Faith Together",
    subtitle: "Worship · Community · Discipleship · Service",
  },
];

// ─── Sub-components (memoized) ───────────────────────────────────────────────

const SlideIndicators = memo(({ count, active, onSelect }) => (
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
    {Array.from({ length: count }, (_, i) => (
      <button
        key={i}
        onClick={() => onSelect(i)}
        aria-label={`Go to slide ${i + 1}`}
        aria-current={i === active ? "true" : undefined}
        className={[
          "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
          i === active
            ? "w-8 h-2.5 bg-emerald-400"
            : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80",
        ].join(" ")}
      />
    ))}
  </div>
));

const NavButton = memo(({ direction, onClick }) => (
  <button
    onClick={onClick}
    aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
    className={[
      "absolute top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center",
      "rounded-full bg-black/25 text-white backdrop-blur-sm",
      "transition-all duration-200 hover:bg-emerald-600/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
      direction === "prev" ? "left-4 sm:left-8" : "right-4 sm:right-8",
    ].join(" ")}
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-5 w-5" aria-hidden="true">
      {direction === "prev"
        ? <polyline points="15 18 9 12 15 6" />
        : <polyline points="9 18 15 12 9 6" />}
    </svg>
  </button>
));

// ─── HeroSection ─────────────────────────────────────────────────────────────
const AUTOPLAY_INTERVAL = 5500;

function HeroSection({ slides = defaultSlides }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);

  const goTo     = useCallback((i) => setCurrent(i), []);
  const goPrev   = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), [slides.length]);
  const goNext   = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [slides.length]);

  // Auto-play with cleanup
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, goNext]);

  return (
    <section
      aria-label="Hero carousel"
      className="relative h-[92vh] min-h-[560px] max-h-[860px] overflow-hidden bg-slate-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Slides ── */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== current}
          className={[
            "absolute inset-0 transition-opacity duration-1000",
            i === current ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <img
            src={slide.image}
            alt=""
            role="presentation"
            className="h-full w-full object-cover object-center"
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        </div>
      ))}

      {/* ── Slide content ── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          {/* Accent line */}
          <div className="mx-auto mb-5 h-1 w-16 rounded-full bg-emerald-400" />

          <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg">
            {slides[current].title}
          </h1>
          <p className="mb-8 text-lg text-white/85 sm:text-xl font-light tracking-wide drop-shadow">
            {slides[current].subtitle}
          </p>

          <NavLink
            to="/visit"
            className="inline-block rounded-full bg-emerald-500 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:bg-emerald-400 hover:scale-105 hover:shadow-emerald-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            Join Us This Sunday
          </NavLink>
        </div>
      </div>

      {/* ── Controls ── */}
      <NavButton direction="prev" onClick={goPrev} />
      <NavButton direction="next" onClick={goNext} />
      <SlideIndicators count={slides.length} active={current} onSelect={goTo} />

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60V30C240 0 480 60 720 40C960 20 1200 50 1440 30V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

export default memo(HeroSection);
