import { useState, memo, useCallback } from "react";

// ─── History milestone data ───────────────────────────────────────────────────
const MILESTONES = [
  {
    id:          1,
    year:        "1998",
    title:       "The Seed is Planted",
    pastor:      "Pastor Hiroshi Nakamura",
    description:
      "What began as a small prayer gathering of seven families in a rented apartment in Katsutadai grew into something none of them could have imagined. Pastor Hiroshi Nakamura, freshly returned from theological training in Manila, felt a clear calling to bring the Gospel to the quiet suburbs of Yachiyo-shi. Every Friday evening, living rooms became sanctuaries and kitchen tables became altars.",
    image:       "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=900&q=80",
    photos: [
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&q=70",
      "https://images.unsplash.com/photo-1438232992991-995b671e4437?w=400&q=70",
    ],
    accent:      "from-emerald-600 to-teal-500",
  },
  {
    id:          2,
    year:        "2003",
    title:       "A Home of Our Own",
    pastor:      "Pastor Hiroshi Nakamura",
    description:
      "After five years of faithful gathering, God provided a permanent meeting place on the 4th floor of a building in Katsutadai. The congregation — now over 60 members strong — pooled their resources and faith to furnish and dedicate the space. The doors opened on a rainy April Sunday, but inside, the warmth of community made it feel like the brightest day of the year.",
    image:       "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=900&q=80",
    photos: [
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&q=70",
      "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=400&q=70",
    ],
    accent:      "from-emerald-500 to-green-400",
  },
  {
    id:          3,
    year:        "2009",
    title:       "Growing Beyond Borders",
    pastor:      "Pastor Hiroshi Nakamura",
    description:
      "JFAAC launched its first community outreach programs — English conversation classes, after-school tutoring, and a monthly free meal for international students at nearby universities. These programs brought the church into everyday life, breaking down barriers and opening hearts. Membership grew past 150, reflecting both the Filipino diaspora community and Japanese neighbors who had found a spiritual home.",
    image:       "https://images.unsplash.com/photo-1609234656432-603f3f13c36d?w=900&q=80",
    photos: [
      "https://images.unsplash.com/photo-1609234656432-603f3f13c36d?w=400&q=70",
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&q=70",
    ],
    accent:      "from-teal-500 to-emerald-600",
  },
  {
    id:          4,
    year:        "2015",
    title:       "A New Generation Rises",
    pastor:      "Pastor Kenji Watanabe",
    description:
      "With Pastor Hiroshi's loving transition into an advisory role, Pastor Kenji Watanabe — a son of the congregation who had trained in both Japan and the Philippines — stepped into leadership. Under his vision, a vibrant youth ministry was established, Sunday worship was reimagined with a blend of contemporary and traditional elements, and the church began live-streaming services for members across Japan and abroad.",
    image:       "https://images.unsplash.com/photo-1438232992991-995b671e4437?w=900&q=80",
    photos: [
      "https://images.unsplash.com/photo-1438232992991-995b671e4437?w=400&q=70",
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&q=70",
    ],
    accent:      "from-green-500 to-emerald-400",
  },
  {
    id:          5,
    year:        "2024",
    title:       "Jesus for All — Today & Beyond",
    pastor:      "Pastor Kenji Watanabe",
    description:
      "Today, JFAAC Katsutadai stands as a multigenerational, multicultural family of faith — Filipinos, Japanese, and people from over a dozen nations worshipping together under one roof. With a growing online congregation, active prayer ministries, and a deep commitment to the community of Yachiyo-shi, the church looks to the future with the same faith that filled those first seven families in 1998: that Jesus is truly for all.",
    image:       "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=900&q=80",
    photos: [
      "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=400&q=70",
      "https://images.unsplash.com/photo-1609234656432-603f3f13c36d?w=400&q=70",
    ],
    accent:      "from-emerald-600 to-teal-400",
  },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox = memo(({ src, alt, onClose }) => (
  <div
    role="dialog"
    aria-modal="true"
    aria-label="Photo lightbox"
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
    onClick={onClose}
  >
    <button
      onClick={onClose}
      aria-label="Close photo"
      className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-5 w-5" aria-hidden="true">
        <line x1="18" y1="6" x2="6"  y2="18" />
        <line x1="6"  y1="6" x2="18" y2="18" />
      </svg>
    </button>
    <img
      src={src}
      alt={alt}
      onClick={(e) => e.stopPropagation()}
      className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
    />
  </div>
));

// ─── Photo strip ──────────────────────────────────────────────────────────────
const PhotoStrip = memo(({ photos, title, onOpen }) => (
  <div className="mt-5 flex gap-3">
    {photos.map((src, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onOpen(src, `${title} — photo ${i + 1}`)}
        aria-label={`View ${title} photo ${i + 1} enlarged`}
        className="group relative h-20 w-28 overflow-hidden rounded-xl border-2 border-transparent transition-all duration-200 hover:border-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:h-24 sm:w-36"
      >
        <img
          src={src}
          alt={`${title} — photo ${i + 1}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Zoom hint overlay */}
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/30">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="h-6 w-6 opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8"  x2="11" y2="14" />
            <line x1="8"  y1="11" x2="14" y2="11" />
          </svg>
        </span>
      </button>
    ))}
  </div>
));

// ─── Single milestone ─────────────────────────────────────────────────────────
const MilestoneCard = memo(({ milestone, index, onOpenPhoto }) => {
  const isEven = index % 2 === 0;
  const { year, title, pastor, description, image, photos, accent } = milestone;

  return (
    <div className="relative grid gap-0 lg:grid-cols-2">

      {/* ── Connecting line dot ── */}
      <div
        className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
        aria-hidden="true"
      >
        <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${accent} shadow-lg ring-4 ring-white`}>
          <span className="text-xs font-black text-white">{year.slice(-2)}</span>
        </div>
      </div>

      {/* ── Image side ── */}
      <div className={`relative overflow-hidden ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        <div className="aspect-[4/3] overflow-hidden bg-slate-200">
          <img
            src={image}
            alt={`${title} — ${year}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${isEven ? "lg:bg-gradient-to-r" : "lg:bg-gradient-to-l"} from-black/40 to-transparent`} />
        </div>

        {/* Year badge on image */}
        <div className={`absolute left-5 top-5 rounded-full bg-gradient-to-r ${accent} px-4 py-1.5 shadow-md`}>
          <span className="text-sm font-black text-white tracking-wide">{year}</span>
        </div>
      </div>

      {/* ── Content side ── */}
      <div className={`flex items-center bg-white ${isEven ? "lg:order-2" : "lg:order-1"}`}>
        <div className="px-8 py-10 lg:px-12 lg:py-14 xl:px-16">

          {/* Accent line */}
          <div className={`mb-5 h-1 w-10 rounded-full bg-gradient-to-r ${accent}`} />

          <h3 className="mb-2 text-2xl font-extrabold leading-snug tracking-tight text-slate-800 sm:text-3xl">
            {title}
          </h3>

          {/* Pastor tag */}
          <p className="mb-5 flex items-center gap-2 text-sm font-semibold text-emerald-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {pastor}
          </p>

          <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
            {description}
          </p>

          {/* Photo thumbnails */}
          <PhotoStrip photos={photos} title={title} onOpen={onOpenPhoto} />
        </div>
      </div>
    </div>
  );
});

// ─── ChurchHistory ────────────────────────────────────────────────────────────
function ChurchHistory({ milestones = MILESTONES }) {
  const [lightbox, setLightbox] = useState(null); // { src, alt } | null

  const openPhoto  = useCallback((src, alt) => setLightbox({ src, alt }), []);
  const closePhoto = useCallback(() => setLightbox(null), []);

  return (
    <section
      aria-labelledby="history-heading"
      className="bg-slate-50 py-20 sm:py-28"
    >
      {/* ── Section header ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Our Story
          </span>
          <h2 id="history-heading" className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
            A Journey of Faith
          </h2>
          <div className="mt-4 h-1 w-12 rounded-full bg-emerald-500" />
          <p className="mt-5 max-w-xl text-base text-slate-500">
            From a small prayer gathering to a thriving multicultural church family — here is the story God has been writing in Katsutadai since 1998.
          </p>
        </div>
      </div>

      {/* ── Timeline: alternating full-width blocks ── */}
      <div className="relative mx-auto max-w-7xl">

        {/* Vertical center line (desktop only) */}
        <div
          className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-emerald-200 via-emerald-400 to-emerald-200 lg:block"
          aria-hidden="true"
        />

        <div className="divide-y divide-slate-100 overflow-hidden shadow-sm ring-1 ring-slate-100 lg:divide-y-0 lg:rounded-3xl">
          {milestones.map((milestone, index) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              index={index}
              onOpenPhoto={openPhoto}
            />
          ))}
        </div>
      </div>

      {/* ── Closing faith statement ── */}
      <div className="mx-auto mt-20 max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-emerald-100 bg-white px-8 py-10 shadow-md shadow-emerald-50">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
              <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
            </svg>
          </div>
          <blockquote className="text-lg font-semibold italic text-slate-700 sm:text-xl">
            "The best chapters of our story are still being written — and you are invited to be part of them."
          </blockquote>
          <p className="mt-3 text-sm font-semibold text-emerald-600">— Pastor Kenji Watanabe</p>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closePhoto} />
      )}
    </section>
  );
}

export default memo(ChurchHistory);
