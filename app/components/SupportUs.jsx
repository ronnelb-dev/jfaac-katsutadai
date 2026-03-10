import { memo, useEffect, useRef, useState } from "react";

// ─── Church projects data ─────────────────────────────────────────────────────
const PROJECTS = [
  {
    id:          1,
    icon:        "building",
    category:    "Facilities",
    title:       "Church Building Fund",
    description:
      "Our congregation currently meets on the 4th floor of a rented building in Katsutadai. We are trusting God to provide a permanent home where we can worship freely, serve our community, and expand our ministry for generations to come.",
    need:        "We still need new sound equipment, comfortable seating for 200+, a dedicated children's ministry room, and accessible facilities for elderly and disabled members.",
    funded:      62,
    goal:        "¥5,000,000",
    raised:      "¥3,100,000",
    urgent:      true,
  },
  {
    id:          2,
    icon:        "mission",
    category:    "Missions",
    title:       "Missionary Support",
    description:
      "We partner with and support missionaries serving in under-reached communities across Japan and Southeast Asia. Your giving directly funds their living expenses, ministry materials, language training, and travel — enabling them to focus fully on the work of the Gospel.",
    need:        "Monthly support for two active missionaries, translation materials, and outreach tools for rural Japanese communities.",
    funded:      45,
    goal:        "¥2,400,000 / year",
    raised:      "¥1,080,000",
    urgent:      false,
  },
  {
    id:          3,
    icon:        "community",
    category:    "Outreach",
    title:       "Community Outreach Program",
    description:
      "Our free English conversation classes, after-school tutoring, and monthly community meals are a vital bridge between the church and the people of Yachiyo-shi. These programs open doors for Gospel conversations and demonstrate the love of Christ in practical ways.",
    need:        "Funding for teaching materials, food supplies, venue costs, and expanded programming to serve more families.",
    funded:      78,
    goal:        "¥1,200,000 / year",
    raised:      "¥936,000",
    urgent:      false,
  },
  {
    id:          4,
    icon:        "youth",
    category:    "Next Generation",
    title:       "Youth & Children's Ministry",
    description:
      "The next generation of JFAAC Katsutadai needs to be grounded in God's Word, equipped for a complex world, and connected to a community of faith. We are investing in dedicated youth workers, curriculum, events, and a safe, welcoming space for young people.",
    need:        "Curriculum resources, youth camp sponsorships for underprivileged teens, and a dedicated youth worker salary.",
    funded:      33,
    goal:        "¥1,800,000 / year",
    raised:      "¥594,000",
    urgent:      true,
  },
];

// ─── Ways to give data ────────────────────────────────────────────────────────
const WAYS_TO_GIVE = [
  {
    id:    1,
    icon:  "bank",
    label: "Bank Transfer",
    body:  "Transfer directly to our church account. Please include your name and the project name in the reference field.",
    detail: "Bank: Japan Post Bank · Account: 10140-12345678",
  },
  {
    id:    2,
    icon:  "envelope",
    label: "Give in Person",
    body:  "Place your offering in an envelope during any Sunday service. Envelopes and offering boxes are available at the entrance.",
    detail: "Every Sunday at 10:30 AM · JFAAC Katsutadai",
  },
  {
    id:    3,
    icon:  "email",
    label: "Contact Us to Give",
    body:  "Have questions about giving or want to set up a recurring partnership? Reach out and our team will walk you through it.",
    detail: "support@jfaac-katsutadai.org",
  },
];

// ─── Icon SVG paths ───────────────────────────────────────────────────────────
const ICON_PATHS = {
  building: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9M12 3v3M10 4.5h4" />
    </>
  ),
  mission: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  community: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  ),
  youth: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  ),
  bank: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  ),
  envelope: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  ),
  email: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </>
  ),
  cross: null, // uses CrossIcon
};

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Shared atoms ─────────────────────────────────────────────────────────────
const CrossIcon = memo(() => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
  </svg>
));

const SvgIcon = memo(({ type, className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {ICON_PATHS[type]}
  </svg>
));

const SectionPill = memo(({ children }) => (
  <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
    {children}
  </span>
));

const AccentLine = memo(() => (
  <div className="mt-4 h-1 w-12 rounded-full bg-emerald-500" aria-hidden="true" />
));

// ─── Progress bar ─────────────────────────────────────────────────────────────
const FundingBar = memo(({ percent, raised, goal }) => (
  <div>
    <div className="mb-2 flex items-center justify-between text-xs font-semibold">
      <span className="text-emerald-700">Raised: {raised}</span>
      <span className="text-slate-400">Goal: {goal}</span>
    </div>
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-1000"
        style={{ width: `${percent}%` }}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${percent}% funded`}
      />
    </div>
    <p className="mt-1.5 text-right text-xs text-slate-400">{percent}% funded</p>
  </div>
));

// ─── Project card ─────────────────────────────────────────────────────────────
const ProjectCard = memo(({ project, index }) => {
  const [ref, visible] = useReveal(0.1);

  return (
    <article
      ref={ref}
      aria-labelledby={`project-title-${project.id}`}
      className={[
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-700 ease-out",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100/60",
        project.urgent ? "border-emerald-200" : "border-slate-100",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      ].join(" ")}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-500 ${project.urgent ? "opacity-100" : "opacity-0 transition-opacity duration-300 group-hover:opacity-100"}`} aria-hidden="true" />

      <div className="flex flex-1 flex-col p-7">

        {/* Category + urgent badge */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
              <SvgIcon type={project.icon} className="h-4.5 w-4.5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              {project.category}
            </span>
          </div>
          {project.urgent && (
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-600 ring-1 ring-amber-200">
              Urgent Need
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          id={`project-title-${project.id}`}
          className="mb-3 text-xl font-extrabold text-slate-800 transition-colors duration-200 group-hover:text-emerald-700"
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="mb-5 flex-1 text-sm leading-7 text-slate-500">
          {project.description}
        </p>

        {/* "What we still need" */}
        <div className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
            What We Still Need
          </p>
          <p className="text-xs leading-6 text-slate-600">{project.need}</p>
        </div>

        {/* Funding progress */}
        <FundingBar percent={project.funded} raised={project.raised} goal={project.goal} />

        {/* CTA */}
        <a
          href="#partner"
          className="mt-5 flex items-center justify-center gap-2 rounded-full bg-emerald-600 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-emerald-500 hover:shadow-md hover:shadow-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          <CrossIcon />
          Support This Project
        </a>
      </div>
    </article>
  );
});

// ─── Way to give card ─────────────────────────────────────────────────────────
const WayToGiveCard = memo(({ way }) => (
  <div className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-100/60">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white">
      <SvgIcon type={way.icon} />
    </div>
    <div>
      <h3 className="mb-1 text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors duration-200">
        {way.label}
      </h3>
      <p className="mb-2 text-sm leading-6 text-slate-500">{way.body}</p>
      <p className="text-xs font-semibold text-emerald-600">{way.detail}</p>
    </div>
  </div>
));

// ─── SupportUs page ───────────────────────────────────────────────────────────
function SupportUs() {
  const [headerRef, headerVisible] = useReveal(0.1);
  const [waysRef,   waysVisible]   = useReveal(0.1);
  const [ctaRef,    ctaVisible]    = useReveal(0.15);

  return (
    <main aria-labelledby="support-page-heading">

      {/* ══════════════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700">

        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-10"
          aria-hidden="true"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        {/* Bottom wave */}
        <div className="absolute -bottom-1 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 72" fill="none" preserveAspectRatio="none" className="w-full h-14 sm:h-20">
            <path d="M0 72V36L720 0L1440 36V72H0Z" fill="white" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 pb-28 pt-20 text-center sm:pb-36 sm:pt-28">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25">
            <CrossIcon />
          </div>

          <SectionPill>Partner With Us</SectionPill>

          <h1
            id="support-page-heading"
            className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Be a Partner in
            <br />
            <span className="text-emerald-300">Sharing the Gospel</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base text-emerald-100 sm:text-lg">
            Touching lives in Katsutadai, Japan — and beyond.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          INTRO & SCRIPTURE
      ══════════════════════════════════════════════════ */}
      <section
        ref={headerRef}
        aria-label="Support introduction"
        className={[
          "bg-white py-16 transition-all duration-700 ease-out sm:py-20",
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        ].join(" ")}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">

            {/* Copy */}
            <div>
              <SectionPill>Your Partnership Matters</SectionPill>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
                Every Gift{" "}
                <span className="text-emerald-600">Advances the Kingdom</span>
              </h2>
              <AccentLine />
              <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
                <p>
                  JFAAC Katsutadai is a faith-based, community-funded congregation. We have no large institutional budget — only the generous, prayerful support of people like you who believe that the Gospel is worth investing in.
                </p>
                <p>
                  When you partner with us financially, you are not just giving to a church organization — you are sowing into lives, families, and communities that are being transformed by the Word of God right here in Yachiyo-shi and across the nations.
                </p>
              </div>
            </div>

            {/* Scripture callout */}
            <figure className="relative rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <CrossIcon />
              </div>
              <blockquote className="text-lg font-semibold italic leading-8 text-slate-700">
                "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
              </blockquote>
              <figcaption className="mt-4 text-sm font-bold not-italic text-emerald-600">
                — 2 Corinthians 9:7
              </figcaption>
              {/* Decorative dot cluster */}
              <div className="absolute -bottom-3 -right-3 grid grid-cols-3 gap-1.5 opacity-30" aria-hidden="true">
                {Array.from({ length: 9 }, (_, i) => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                ))}
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="mx-auto max-w-5xl px-8" aria-hidden="true">
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
      </div>

      {/* ══════════════════════════════════════════════════
          CHURCH PROJECTS
      ══════════════════════════════════════════════════ */}
      <section aria-labelledby="projects-heading" className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-4 flex flex-col items-center text-center">
            <SectionPill>Church Projects</SectionPill>
            <h2 id="projects-heading" className="mt-4 text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
              Where Your Giving{" "}
              <span className="text-emerald-600">Makes a Difference</span>
            </h2>
            <AccentLine />
            <p className="mt-5 max-w-xl text-base text-slate-500">
              Below are the active projects your partnership directly supports. Every yen given is stewarded faithfully and reported openly to our congregation.
            </p>
          </div>

          {/* Project cards grid */}
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-2">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WAYS TO GIVE
      ══════════════════════════════════════════════════ */}
      <section
        ref={waysRef}
        aria-labelledby="ways-heading"
        className={[
          "bg-white py-20 transition-all duration-700 ease-out sm:py-28",
          waysVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-12 flex flex-col items-center text-center">
            <SectionPill>How to Give</SectionPill>
            <h2 id="ways-heading" className="mt-4 text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
              Ways to{" "}
              <span className="text-emerald-600">Partner With Us</span>
            </h2>
            <AccentLine />
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {WAYS_TO_GIVE.map((way) => (
              <WayToGiveCard key={way.id} way={way} />
            ))}
          </div>

          {/* Stewardship note */}
          <div className="mt-10 flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Our Commitment to Faithful Stewardship</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                All gifts are received with gratitude and stearded transparently. Financial reports are available to all church members. JFAAC Katsutadai is committed to accountability, integrity, and using every gift for its intended purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PARTNER CTA
      ══════════════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        id="partner"
        aria-label="Partner with us call to action"
        className={[
          "bg-slate-50 py-20 transition-all duration-700 ease-out sm:py-28",
          ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 shadow-2xl shadow-emerald-300/40">

            {/* Dot texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
              aria-hidden="true"
            />

            <div className="relative grid gap-12 px-8 py-14 sm:px-14 lg:grid-cols-2 lg:items-center">

              {/* Left — copy */}
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                  <CrossIcon />
                  Ready to Partner?
                </div>

                <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">
                  Partner With Us
                  <br />
                  <span className="text-emerald-300">in the Gospel</span>
                </h2>

                <p className="text-base leading-8 text-emerald-100">
                  Whether you give once or commit to monthly partnership, your contribution directly fuels the work of the Gospel in Katsutadai. No gift is too small — every seed planted in faith bears fruit in eternity.
                </p>

                {/* Impact list */}
                <ul className="mt-6 space-y-3" aria-label="Partnership impact">
                  {[
                    "¥3,000 / month — sponsors one family's outreach meals",
                    "¥10,000 / month — supports a missionary for two weeks",
                    "¥30,000 / month — equips an entire youth program for a month",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-emerald-100">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-white" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — action card */}
              <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm ring-1 ring-white/20">
                <h3 className="mb-2 text-xl font-bold text-white">Start Your Partnership</h3>
                <p className="mb-6 text-sm leading-6 text-emerald-100">
                  Contact us to set up your gift, ask questions, or learn more about how your support is being used.
                </p>

                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-bold text-emerald-700 shadow-sm transition-all duration-300 hover:bg-emerald-50 hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-700"
                  >
                    <CrossIcon />
                    Partner with Us
                  </a>

                  <a
                    href="mailto:support@jfaac-katsutadai.org"
                    className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/40 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-700"
                  >
                    Email Us a Question
                  </a>
                </div>

                <p className="mt-5 text-center text-xs text-emerald-200">
                  All partnerships are processed with full transparency and accountability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CLOSING SCRIPTURE
      ══════════════════════════════════════════════════ */}
      <section aria-label="Closing scripture" className="bg-white py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="mx-auto mb-5 h-px w-24 bg-gradient-to-r from-transparent via-emerald-300 to-transparent" aria-hidden="true" />
          <figure>
            <blockquote className="text-base font-medium italic leading-8 text-slate-500 sm:text-lg">
              "And my God will meet all your needs according to the riches of his glory in Christ Jesus."
            </blockquote>
            <figcaption className="mt-3 text-sm font-bold not-italic text-emerald-600">
              — Philippians 4:19
            </figcaption>
          </figure>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-emerald-300 to-transparent" aria-hidden="true" />
        </div>
      </section>

    </main>
  );
}

export default memo(SupportUs);