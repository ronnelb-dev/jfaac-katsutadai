import { memo } from "react";

// ─── Preaching data (replace with real data / API fetch) ─────────────────────
const PREACHINGS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80",
    title: "Walking in the Light of His Promise",
    description:
      "An encouraging message on how God's promises sustain us through life's darkest seasons, drawing from the life of Abraham and the faithfulness of God across generations.",
    pastor: "Pastor Kenji Watanabe",
    date: "February 16, 2025",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80",
    title: "The Fruit of a Spirit-Led Life",
    description:
      "Exploring Galatians 5 and what it truly means to be filled with the Holy Spirit — not just in moments of worship, but in the everyday rhythms of family, work, and community.",
    pastor: "Pastor Maria Santos",
    date: "February 9, 2025",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80",
    title: "Rebuilt: Lessons from Nehemiah",
    description:
      "From the rubble of Jerusalem's walls to the restoration of a people's identity — Nehemiah's story speaks powerfully to anyone who feels broken and is wondering if God can rebuild what has fallen.",
    pastor: "Pastor Kenji Watanabe",
    date: "February 2, 2025",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

// ─── Play icon ───────────────────────────────────────────────────────────────
const PlayIcon = memo(() => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M8 5v14l11-7L8 5z" />
  </svg>
));

// ─── Pastor / calendar icon ───────────────────────────────────────────────────
const PastorIcon = memo(() => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="h-3.5 w-3.5 shrink-0"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
));

const CalendarIcon = memo(() => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="h-3.5 w-3.5 shrink-0"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
));

// ─── Single preaching card ───────────────────────────────────────────────────
const PreachingCard = memo(({ preaching }) => {
  const { image, title, description, pastor, date, youtubeUrl } = preaching;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100/60">
      {/* ── Thumbnail ── */}
      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch "${title}" on YouTube`}
        className="relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
      >
        <div className="aspect-video overflow-hidden bg-slate-200">
          <img
            src={image}
            alt={`Thumbnail for "${title}"`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600/90 text-white shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500">
            <PlayIcon />
          </span>
        </div>

        {/* "Watch on YouTube" badge */}
        <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          YouTube
        </span>
      </a>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col p-6">
        {/* Meta: pastor + date */}
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <PastorIcon />
            {pastor}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarIcon />
            {date}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-lg font-bold leading-snug text-slate-800 transition-colors duration-200 group-hover:text-emerald-700">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-3">
          {description}
        </p>

        {/* Watch CTA */}
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch "${title}" on YouTube`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-emerald-500 hover:shadow-md hover:shadow-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          <PlayIcon />
          Watch Video
        </a>
      </div>
    </article>
  );
});

// ─── RecentPreaching ─────────────────────────────────────────────────────────
function RecentPreaching({
  preachings = PREACHINGS,
  viewAllUrl = "https://www.youtube.com/channel/UCTnlPOw2fIqo7uaM7bujbiA",
}) {
  return (
    <section
      aria-labelledby="preaching-heading"
      className="bg-slate-50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Recent Preaching
          </span>
          <h2
            id="preaching-heading"
            className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl"
          >
            Watch Our Latest Preaching
          </h2>
          <div className="mt-4 h-1 w-12 rounded-full bg-emerald-500" />
          <p className="mt-5 max-w-xl text-base text-slate-500">
            Missed a Sunday? Catch up on our most recent messages and be
            encouraged in your walk with God.
          </p>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {preachings.map((preaching) => (
            <PreachingCard key={preaching.id} preaching={preaching} />
          ))}
        </div>

        {/* ── View All button ── */}
        <div className="mt-12 flex justify-center">
          <a
            href={viewAllUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border-2 border-emerald-600 px-8 py-3 text-sm font-bold uppercase tracking-widest text-emerald-700 transition-all duration-300 hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M23.5 6.2a2.94 2.94 0 00-2.07-2.08C19.68 3.5 12 3.5 12 3.5s-7.68 0-9.43.62A2.94 2.94 0 00.5 6.2 30.1 30.1 0 000 12a30.1 30.1 0 00.5 5.8 2.94 2.94 0 002.07 2.08C4.32 20.5 12 20.5 12 20.5s7.68 0 9.43-.62a2.94 2.94 0 002.07-2.08A30.1 30.1 0 0024 12a30.1 30.1 0 00-.5-5.8zM9.75 15.5v-7l6 3.5-6 3.5z" />
            </svg>
            View All Preaching
          </a>
        </div>
      </div>
    </section>
  );
}

export default memo(RecentPreaching);
