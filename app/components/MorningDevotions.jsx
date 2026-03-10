import { memo, useCallback } from "react";

// ─── Default devotion data (passed via props or used as fallback) ────────────
export const defaultDevotion = {
  date: new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
  title: "Walking in the Light of His Word",
  body: "Each morning is a fresh gift from God — an opportunity to realign our hearts with His purpose and step forward in faith. No matter what yesterday held, His mercies are new every morning, and His grace is sufficient for every need we carry into today.",
  verse: {
    text: "Your word is a lamp to my feet and a light to my path.",
    reference: "Psalm 119:105 (ESV)",
  },
  author: "Pastor Kenji Watanabe",
  readTime: "3 min read",
};

// ─── Decorative cross icon ───────────────────────────────────────────────────
const CrossIcon = memo(() => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
    <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
  </svg>
));

// ─── MorningDevotions ────────────────────────────────────────────────────────
function MorningDevotions({ devotion = defaultDevotion, onReadMore }) {
  const handleReadMore = useCallback(() => {
    if (onReadMore) onReadMore(devotion);
  }, [onReadMore, devotion]);

  return (
    <section
      aria-labelledby="devotion-heading"
      className="bg-white py-6"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="mb-4 flex flex-col items-center text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            <CrossIcon />
            Morning Devotions
          </span>
          <h2 id="devotion-heading" className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
            Start Your Day with God
          </h2>
          <div className="mt-4 h-1 w-12 rounded-full bg-emerald-500" />
        </div>

        {/* ── Two-column grid ── */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* Left — devotion content */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-600">
              {devotion.date}
            </p>
            <h3 className="mb-5 text-2xl font-bold leading-snug text-slate-800 sm:text-3xl">
              {devotion.title}
            </h3>
            <p className="mb-8 text-base leading-relaxed text-slate-600">
              {devotion.body}
            </p>

            {/* Author + read time */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CrossIcon />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">{devotion.author}</p>
                <p className="text-xs text-slate-400">{devotion.readTime}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReadMore}
              className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-600 px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-emerald-700 transition-all duration-300 hover:bg-emerald-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              Read Full Devotion
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Right — highlighted Bible verse card */}
          <div className="relative">
            {/* Decorative background blob */}
            <div className="absolute -inset-4 rounded-3xl bg-emerald-50 opacity-60" aria-hidden="true" />

            <figure className="relative rounded-2xl bg-white p-8 shadow-lg shadow-emerald-100 border border-emerald-100">
              {/* Green left accent */}
              <div className="absolute left-0 top-8 bottom-8 w-1 rounded-full bg-emerald-500" aria-hidden="true" />

              <div className="pl-6">
                {/* Open quote */}
                <span className="block text-6xl font-serif leading-none text-emerald-200 select-none" aria-hidden="true">"</span>

                <blockquote className="mt-2 text-xl font-semibold leading-relaxed text-slate-700 sm:text-2xl">
                  {devotion.verse.text}
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-2">
                  <div className="h-px flex-1 bg-emerald-100" />
                  <cite className="text-sm font-bold not-italic text-emerald-600">
                    {devotion.verse.reference}
                  </cite>
                </figcaption>
              </div>
            </figure>

            {/* Decorative dots */}
            <div className="absolute -bottom-4 -right-4 grid grid-cols-3 gap-1.5 opacity-40" aria-hidden="true">
              {Array.from({ length: 9 }, (_, i) => (
                <div key={i} className="h-2 w-2 rounded-full bg-emerald-400" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(MorningDevotions);
