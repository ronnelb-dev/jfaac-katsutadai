import { memo } from "react";

// ─── Content data ─────────────────────────────────────────────────────────────
const VISION = {
  heading: "Our Vision",
  statement:
    "To be a Spirit-filled, Christ-centered community that transforms lives and communities through the power of the Gospel — reaching every nation, culture, and generation in Japan and beyond.",
  verse: {
    text: "Where there is no vision, the people perish.",
    ref:  "Proverbs 29:18 (KJV)",
  },
};

const MISSION = {
  heading: "Our Mission",
  statement:
    "To glorify God by making devoted followers of Jesus Christ through intentional worship, discipleship, fellowship, ministry, and evangelism — welcoming all people regardless of nationality, background, or story.",
  verse: {
    text: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.",
    ref:  "Matthew 28:19",
  },
};

const PILLARS = [
  {
    id:          1,
    icon:        "worship",
    color:       "bg-emerald-500",
    light:       "bg-emerald-50 text-emerald-700",
    label:       "Worship",
    description: "Exalting God with our whole hearts through Spirit-led, Word-grounded worship every Sunday and in our daily lives.",
  },
  {
    id:          2,
    icon:        "discipleship",
    color:       "bg-teal-500",
    light:       "bg-teal-50 text-teal-700",
    label:       "Discipleship",
    description: "Growing together in the knowledge of God through Bible study, mentorship, small groups, and intentional spiritual formation.",
  },
  {
    id:          3,
    icon:        "fellowship",
    color:       "bg-emerald-600",
    light:       "bg-emerald-50 text-emerald-800",
    label:       "Fellowship",
    description: "Building a genuine community of belonging where every person — Filipino, Japanese, or from anywhere in the world — is known and loved.",
  },
  {
    id:          4,
    icon:        "ministry",
    color:       "bg-green-500",
    light:       "bg-green-50 text-green-700",
    label:       "Ministry",
    description: "Equipping and releasing every believer to serve with their God-given gifts, both within the church and out in the community.",
  },
  {
    id:          5,
    icon:        "evangelism",
    color:       "bg-teal-600",
    light:       "bg-teal-50 text-teal-800",
    label:       "Evangelism",
    description: "Sharing the hope of Jesus Christ boldly and compassionately — in Katsutadai, across Japan, and to the ends of the earth.",
  },
  {
    id:          6,
    icon:        "prayer",
    color:       "bg-emerald-700",
    light:       "bg-emerald-50 text-emerald-900",
    label:       "Prayer",
    description: "Sustaining everything we do through a culture of persistent, faith-filled prayer — believing God moves when His people seek His face.",
  },
];

// ─── Icon paths ───────────────────────────────────────────────────────────────
const ICONS = {
  worship: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
  ),
  discipleship: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  ),
  fellowship: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  ),
  ministry: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  ),
  evangelism: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  prayer: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    </>
  ),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const PillarCard = memo(({ pillar }) => {
  const { icon, color, light, label, description } = pillar;

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/60">
      {/* Top accent line */}
      <div className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl ${color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} aria-hidden="true" />

      {/* Icon */}
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${light} transition-colors duration-300`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6" aria-hidden="true">
          {ICONS[icon]}
        </svg>
      </div>

      <h4 className="mb-2 text-base font-bold text-slate-800">{label}</h4>
      <p className="text-sm leading-relaxed text-slate-500">{description}</p>
    </div>
  );
});

const VerseCallout = memo(({ verse }) => (
  <figure className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50 px-5 py-4">
    <blockquote className="text-sm font-medium italic leading-relaxed text-slate-700">
      "{verse.text}"
    </blockquote>
    <figcaption className="mt-2 text-xs font-bold not-italic text-emerald-600">
      — {verse.ref}
    </figcaption>
  </figure>
));

const StatementBlock = memo(({ data, align = "left" }) => (
  <div className={`flex flex-col ${align === "right" ? "lg:items-end lg:text-right" : ""}`}>
    <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 self-start">
      {data.heading}
    </span>
    <p className="mb-6 text-base leading-relaxed text-slate-600 sm:text-lg">
      {data.statement}
    </p>
    <VerseCallout verse={data.verse} />
  </div>
));

// ─── VisionMission ────────────────────────────────────────────────────────────
function VisionMission() {
  return (
    <section
      aria-labelledby="vision-mission-heading"
      className="bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Who We Are
          </span>
          <h2
            id="vision-mission-heading"
            className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl lg:text-5xl"
          >
            Our Vision &{" "}
            <span className="text-emerald-600">Mission</span>
          </h2>
          <div className="mt-4 h-1 w-12 rounded-full bg-emerald-500" />
          <p className="mt-5 max-w-xl text-base text-slate-500">
            Everything we do — every service, every ministry, every act of kindness — flows from these two convictions.
          </p>
        </div>

        {/* ── Vision & Mission: two-column ── */}
        <div className="relative grid gap-0 overflow-hidden rounded-3xl border border-slate-100 shadow-lg shadow-slate-100 lg:grid-cols-2">

          {/* Vision — left */}
          <div className="relative flex flex-col justify-center bg-white px-8 py-12 sm:px-12 lg:py-16">
            {/* Big decorative letter */}
            <span className="absolute right-6 top-4 select-none text-8xl font-black text-emerald-50 lg:text-9xl" aria-hidden="true">V</span>

            <div className="relative z-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-200">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>

              <h3 className="mb-4 text-2xl font-extrabold text-slate-800 sm:text-3xl">
                Our Vision
              </h3>
              <p className="mb-6 text-base leading-relaxed text-slate-600">
                {VISION.statement}
              </p>
              <VerseCallout verse={VISION.verse} />
            </div>
          </div>

          {/* Divider — vertical on desktop, horizontal on mobile */}
          <div className="hidden lg:block absolute inset-y-8 left-1/2 w-px bg-gradient-to-b from-transparent via-emerald-200 to-transparent" aria-hidden="true" />
          <div className="block lg:hidden h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent mx-8" aria-hidden="true" />

          {/* Mission — right */}
          <div className="relative flex flex-col justify-center bg-emerald-50/60 px-8 py-12 sm:px-12 lg:py-16">
            {/* Big decorative letter */}
            <span className="absolute right-6 top-4 select-none text-8xl font-black text-emerald-100 lg:text-9xl" aria-hidden="true">M</span>

            <div className="relative z-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md shadow-teal-200">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </div>

              <h3 className="mb-4 text-2xl font-extrabold text-slate-800 sm:text-3xl">
                Our Mission
              </h3>
              <p className="mb-6 text-base leading-relaxed text-slate-600">
                {MISSION.statement}
              </p>
              <VerseCallout verse={MISSION.verse} />
            </div>
          </div>
        </div>

        {/* ── Five pillars ── */}
        <div className="mt-20">
          <div className="mb-10 flex flex-col items-center text-center">
            <h3 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">
              How We Live It Out
            </h3>
            <div className="mt-3 h-1 w-10 rounded-full bg-emerald-500" />
            <p className="mt-4 max-w-lg text-sm text-slate-500">
              Our vision and mission are expressed through six intentional commitments that shape everything from Sunday morning to Monday's workplace.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((pillar) => (
              <PillarCard key={pillar.id} pillar={pillar} />
            ))}
          </div>
        </div>

        {/* ── Closing CTA banner ── */}
        <div className="mt-16 grid gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-10 sm:p-14 lg:grid-cols-2 lg:items-center lg:gap-10">
          {/* Left copy */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
              </svg>
              Be Part of the Story
            </div>
            <h3 className="mb-3 text-2xl font-extrabold text-white sm:text-3xl">
              This mission needs you.
            </h3>
            <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
              Every person who walks through our doors — or tunes in from anywhere in the world — becomes part of what God is doing through JFAAC Katsutadai. We'd love for you to join us.
            </p>
          </div>

          {/* Right CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a
              href="/visit"
              className="flex-1 rounded-full bg-emerald-500 px-6 py-3.5 text-center text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-emerald-400 hover:shadow-md hover:shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Visit Us Sunday
            </a>
            <a
              href="/ministries"
              className="flex-1 rounded-full border-2 border-slate-600 px-6 py-3.5 text-center text-sm font-bold text-slate-300 transition-all duration-300 hover:border-emerald-500 hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Explore Ministries
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default memo(VisionMission);
