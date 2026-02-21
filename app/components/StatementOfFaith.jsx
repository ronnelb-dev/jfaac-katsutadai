import { useState, memo, useCallback } from "react";

// ─── Belief data ──────────────────────────────────────────────────────────────
const BELIEFS = [
  {
    id:        1,
    icon:      "bible",
    title:     "The Holy Scriptures",
    summary:   "We believe the Bible is the inspired, infallible Word of God.",
    detail:    "We believe the Holy Bible, the Old and New Testaments, is the inspired Word of God, without error in the original writings, the complete revelation of His will for the salvation of men, and the divine and final authority for all Christian faith and life. (2 Timothy 3:16–17; 2 Peter 1:20–21)",
    verse:     { text: "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.", ref: "2 Timothy 3:16" },
  },
  {
    id:        2,
    icon:      "trinity",
    title:     "The Holy Trinity",
    summary:   "We believe in one God — Father, Son, and Holy Spirit.",
    detail:    "We believe in one God, Creator of all things, infinitely perfect, and eternally existing in three persons: Father, Son, and Holy Spirit. Each person of the Trinity is fully and equally God, sharing one divine nature, distinct in person and role but unified in will, purpose, and glory. (Matthew 28:19; 2 Corinthians 13:14)",
    verse:     { text: "Go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.", ref: "Matthew 28:19" },
  },
  {
    id:        3,
    icon:      "christ",
    title:     "Jesus Christ, Our Lord",
    summary:   "We believe in the deity, humanity, death, and resurrection of Jesus Christ.",
    detail:    "We believe that Jesus Christ is true God and true man, having been conceived by the Holy Spirit and born of the virgin Mary. He died on the cross as a sacrifice for our sins according to the Scriptures. On the third day He rose bodily from the dead, ascended to the right hand of the Father, and will personally return in power and glory. (John 1:1,14; 1 Corinthians 15:3–4)",
    verse:     { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", ref: "John 3:16" },
  },
  {
    id:        4,
    icon:      "spirit",
    title:     "The Holy Spirit",
    summary:   "We believe the Holy Spirit convicts, regenerates, and empowers believers.",
    detail:    "We believe that the ministry of the Holy Spirit is to glorify the Lord Jesus Christ, and during this age to convict men, regenerate the believing sinner, indwell, guide, instruct, and empower the believer for godly living and service. We affirm the present ministry of the Spirit and all the gifts He sovereignly distributes. (John 16:7–14; Acts 1:8; 1 Corinthians 12:4–11)",
    verse:     { text: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses... to the ends of the earth.", ref: "Acts 1:8" },
  },
  {
    id:        5,
    icon:      "salvation",
    title:     "Salvation by Grace",
    summary:   "We believe salvation is a gift of God, received through faith in Christ alone.",
    detail:    "We believe that the Lord Jesus Christ died for our sins and that all who believe in Him are declared righteous through His shed blood. Salvation is entirely by the grace of God through faith — not by works, ritual, or human effort. Every truly saved and born-again person is eternally secure in Christ. (Ephesians 2:8–9; Romans 3:23–24; John 10:28–29)",
    verse:     { text: "For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God.", ref: "Ephesians 2:8" },
  },
  {
    id:        6,
    icon:      "church",
    title:     "The Church",
    summary:   "We believe the Church is the body of Christ, called to worship and mission.",
    detail:    "We believe the Church consists of all who have been born again through faith in Christ. The local church is a community of believers committed to worship, the teaching of God's Word, the ordinances of baptism and the Lord's Supper, fellowship, and the Great Commission. Every believer is called to be an active, contributing member of a local church body. (Matthew 16:18; Ephesians 1:22–23; Hebrews 10:24–25)",
    verse:     { text: "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together.", ref: "Hebrews 10:24–25" },
  },
  {
    id:        7,
    icon:      "resurrection",
    title:     "Resurrection & Eternal Life",
    summary:   "We believe in the bodily resurrection of all people and life everlasting.",
    detail:    "We believe in the resurrection of both the saved and the lost — the saved unto eternal life in the presence of God, and the lost unto eternal separation from God. We believe in the personal, visible, and imminent return of the Lord Jesus Christ. This blessed hope purifies the believer and motivates faithful service. (1 Thessalonians 4:16–17; Revelation 20:11–15; John 5:28–29)",
    verse:     { text: "For the Lord himself will come down from heaven… and the dead in Christ will rise first.", ref: "1 Thessalonians 4:16" },
  },
  {
    id:        8,
    icon:      "mission",
    title:     "The Great Commission",
    summary:   "We believe every believer is sent to make disciples of all nations.",
    detail:    "We believe it is the obligation and privilege of every follower of Jesus Christ to witness and make disciples of all nations. Missions — both local and global — are at the heart of who we are as a church. JFAAC Katsutadai is committed to cross-cultural ministry, reflected in our multilingual, multinational congregation. (Matthew 28:18–20; Acts 1:8; Romans 10:14–15)",
    verse:     { text: "Therefore go and make disciples of all nations, baptizing them… and teaching them to obey everything I have commanded you.", ref: "Matthew 28:19–20" },
  },
];

// ─── SVG icon map ─────────────────────────────────────────────────────────────
const ICONS = {
  bible: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  ),
  trinity: (
    <>
      <circle cx="12" cy="5"  r="2.5" />
      <circle cx="5"  cy="17" r="2.5" />
      <circle cx="19" cy="17" r="2.5" />
      <path strokeLinecap="round" d="M12 7.5L5.5 15M12 7.5L18.5 15M7 17h10" />
    </>
  ),
  christ: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
  ),
  spirit: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c0 0-4 4-4 8s4 8 4 8M12 3c0 0 4 4 4 8s-4 8-4 8M3 11h18M5 7s2 2 7 2 7-2 7-2M5 15s2-2 7-2 7 2 7 2" />
  ),
  salvation: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  ),
  church: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9M12 3v4M10 5h4" />
    </>
  ),
  resurrection: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
  ),
  mission: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
};

// ─── BeliefCard ───────────────────────────────────────────────────────────────
const BeliefCard = memo(({ belief, isOpen, onToggle }) => {
  const { icon, title, summary, detail, verse } = belief;

  return (
    <div
      className={[
        "group rounded-2xl border bg-white transition-all duration-300",
        isOpen
          ? "border-emerald-300 shadow-lg shadow-emerald-100/60"
          : "border-slate-100 shadow-sm hover:border-emerald-200 hover:shadow-md",
      ].join(" ")}
    >
      {/* ── Accordion trigger ── */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`belief-body-${belief.id}`}
        className="flex w-full items-center gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-inset rounded-2xl"
      >
        {/* Icon */}
        <span
          className={[
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
            isOpen ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
          ].join(" ")}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
            {ICONS[icon]}
          </svg>
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-slate-800">{title}</p>
          <p className="mt-0.5 text-sm text-slate-500 line-clamp-1">{summary}</p>
        </div>

        {/* Chevron */}
        <span
          className={[
            "ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300",
            isOpen ? "bg-emerald-600 text-white rotate-180" : "bg-slate-100 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600",
          ].join(" ")}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {/* ── Accordion body ── */}
      <div
        id={`belief-body-${belief.id}`}
        role="region"
        aria-labelledby={`belief-trigger-${belief.id}`}
        className={[
          "overflow-hidden transition-all duration-500 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="px-6 pb-6">
          {/* Divider */}
          <div className="mb-5 h-px bg-emerald-100" />

          <p className="mb-5 text-sm leading-relaxed text-slate-600">{detail}</p>

          {/* Bible verse highlight */}
          <figure className="relative rounded-xl border-l-4 border-emerald-500 bg-emerald-50 px-5 py-4">
            <blockquote className="text-sm font-medium italic leading-relaxed text-slate-700">
              "{verse.text}"
            </blockquote>
            <figcaption className="mt-2 text-xs font-bold text-emerald-600 not-italic">
              — {verse.ref}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
});

// ─── StatementOfFaith ─────────────────────────────────────────────────────────
function StatementOfFaith({ beliefs = BELIEFS }) {
  const [openId, setOpenId] = useState(null);

  const handleToggle = useCallback((id) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      aria-labelledby="faith-heading"
      className="bg-slate-50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="mb-16 grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
              Our Beliefs
            </span>
            <h2 id="faith-heading" className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl lg:text-5xl">
              What We{" "}
              <span className="text-emerald-600">Stand For</span>
            </h2>
            <div className="mt-5 h-1 w-12 rounded-full bg-emerald-500" />
          </div>
          <p className="text-base leading-relaxed text-slate-500 lg:text-lg">
            Our Statement of Faith reflects the timeless truths of Scripture that have anchored the Christian church for centuries. These are the convictions we gather around, teach from, and live by as a community.
          </p>
        </div>

        {/* ── Two-column accordion grid ── */}
        <div className="grid gap-4 lg:grid-cols-2">
          {beliefs.map((belief) => (
            <BeliefCard
              key={belief.id}
              belief={belief}
              isOpen={openId === belief.id}
              onToggle={() => handleToggle(belief.id)}
            />
          ))}
        </div>

        {/* ── Closing affirmation banner ── */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 px-8 py-12 text-center shadow-xl shadow-emerald-200">
          {/* Decorative cross */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
              <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
            </svg>
          </div>

          <h3 className="mb-3 text-2xl font-extrabold text-white sm:text-3xl">
            These Truths Unite Us
          </h3>
          <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-emerald-100 sm:text-base">
            We welcome all who are seeking. Whether you are new to faith or have walked with God for decades, you are invited to explore these truths with us every Sunday.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/visit"
              className="inline-block rounded-full bg-white px-7 py-3 text-sm font-bold text-emerald-700 shadow-sm transition-all duration-300 hover:bg-emerald-50 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-600"
            >
              Join Us This Sunday
            </a>
            <a
              href="/about"
              className="inline-block rounded-full border-2 border-white/60 px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-600"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(StatementOfFaith);
