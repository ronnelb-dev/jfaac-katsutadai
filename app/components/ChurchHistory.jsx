import { memo, useEffect, useRef, useState, useCallback } from "react";

// ─── Timeline data ────────────────────────────────────────────────────────────
const HISTORY = [
  {
    id:    1,
    year:  "1998",
    title: "A Seed of Faith is Planted",
    body:  "In the quiet suburban streets of Katsutadai, a small group of seven Filipino families gathered in a living room to pray. Pastor Hiroshi Nakamura, freshly returned from theological training in Manila, sensed a calling too strong to ignore. Those humble Friday night gatherings would become the first heartbeat of what is now JFAAC Katsutadai.",
    quote: "From the smallest seed, God grows the mightiest of trees.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=900&q=85",
    imageAlt: "Small prayer gathering representing the church's founding",
  },
  {
    id:    2,
    year:  "2000",
    title: "Our First Worship Gathering",
    body:  "Two years after the first prayer meeting, the congregation gathered for its inaugural public Sunday worship service. Word had spread quietly through the community, and over forty people arrived — Filipinos and Japanese neighbors alike — to sing, pray, and hear the Word together. That morning marked the birth of something eternal.",
    quote: "Where two or three gather in my name, there I am with them. — Matthew 18:20",
    image: "https://images.unsplash.com/photo-1438232992991-995b671e4437?w=900&q=85",
    imageAlt: "First public worship gathering of the congregation",
  },
  {
    id:    3,
    year:  "2003",
    title: "A Permanent Home",
    body:  "God provided. After years of gathering in rented spaces, the congregation secured its first permanent meeting place — a fourth-floor hall in the heart of Katsutadai. Members painted walls, carried chairs, and prayed over every corner. On the day of dedication, tears and laughter filled the room in equal measure.",
    quote: "Unless the Lord builds the house, those who build it labor in vain. — Psalm 127:1",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=900&q=85",
    imageAlt: "The church's first permanent building in Katsutadai",
  },
  {
    id:    4,
    year:  "2009",
    title: "Ministry Without Borders",
    body:  "As the congregation grew past 100 members, so did its vision. JFAAC launched English conversation classes, free community meals, and after-school tutoring for international students at nearby universities. The church had stopped being just a Sunday gathering — it had become a living, breathing presence in Yachiyo-shi.",
    quote: "Faith without works is dead. — James 2:26",
    image: "https://images.unsplash.com/photo-1609234656432-603f3f13c36d?w=900&q=85",
    imageAlt: "Community outreach programs in Yachiyo-shi",
  },
  {
    id:    5,
    year:  "2015",
    title: "A New Generation Rises",
    body:  "Pastor Kenji Watanabe — a son of the congregation who had trained in both Japan and the Philippines — stepped into leadership with fresh vision. Under his guidance, a vibrant youth ministry launched, Sunday worship was reimagined with bilingual elements, and the church began live-streaming services for members scattered across Japan.",
    quote: "Don't let anyone look down on you because you are young. — 1 Timothy 4:12",
    image: "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=900&q=85",
    imageAlt: "New pastoral leadership and youth ministry launch",
  },
  {
    id:    6,
    year:  "2023",
    title: "25 Years — Still Faithful",
    body:  "On a bright Sunday morning in 2023, the church gathered for its 25th anniversary celebration. Founding members, now grandparents, sat beside young families and university students who had found faith through the church's outreach. Tears, testimonies, and a renewed sense of calling filled the hall. The best chapters are still to be written.",
    quote: "His mercies are new every morning; great is your faithfulness. — Lamentations 3:23",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=900&q=85",
    imageAlt: "25th anniversary celebration of JFAAC Katsutadai",
  },
];

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref       = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const CrossIcon = memo(() => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
    <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
  </svg>
));

const QuoteIcon = memo(() => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 opacity-30" aria-hidden="true">
    <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.123.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.375c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.123.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.201-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
  </svg>
));

const ScrollArrow = memo(() => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
));

// ─── TimelineItem ─────────────────────────────────────────────────────────────
const TimelineItem = memo(({ item, index }) => {
  const [ref, visible] = useReveal(0.1);
  const isLeft = index % 2 === 0; // even → image left, text right (desktop)

  return (
    <div
      ref={ref}
      className={[
        "relative grid gap-8 transition-all duration-700 ease-out lg:grid-cols-2 lg:gap-16",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
      ].join(" ")}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* ── Image ── */}
      <div className={`relative ${isLeft ? "lg:order-1" : "lg:order-2"}`}>
        <div className="group relative overflow-hidden rounded-2xl shadow-xl shadow-slate-200/60">
          {/* Green glow on hover */}
          <div className="absolute inset-0 z-10 rounded-2xl ring-0 ring-emerald-400/0 transition-all duration-500 group-hover:ring-4 group-hover:ring-emerald-400/40" aria-hidden="true" />

          {/* Year badge — overlapping the image */}
          <div className="absolute left-4 top-4 z-20 rounded-full bg-emerald-600 px-4 py-1.5 shadow-lg shadow-emerald-900/30">
            <span className="text-sm font-black tracking-widest text-white">{item.year}</span>
          </div>

          <div className="aspect-[4/3] bg-slate-200">
            <img
              src={item.image}
              alt={item.imageAlt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Decorative dot cluster */}
        <div
          className={`absolute -bottom-4 grid grid-cols-3 gap-1.5 opacity-30 ${isLeft ? "-left-4" : "-right-4"}`}
          aria-hidden="true"
        >
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div
        className={[
          "flex flex-col justify-center",
          isLeft ? "lg:order-2" : "lg:order-1 lg:text-right",
        ].join(" ")}
      >
        {/* Year label (mobile only — desktop shows on image) */}
        <span className="mb-3 inline-block self-start rounded-full bg-emerald-100 px-3 py-1 text-xs font-black tracking-widest text-emerald-700 lg:hidden">
          {item.year}
        </span>

        {/* Accent line */}
        <div className={`mb-5 h-1 w-10 rounded-full bg-emerald-500 ${isLeft ? "" : "lg:ml-auto"}`} aria-hidden="true" />

        <h3 className="mb-4 text-2xl font-extrabold leading-snug tracking-tight text-slate-800 sm:text-3xl">
          {item.title}
        </h3>

        <p className="mb-6 text-base leading-relaxed text-slate-500">
          {item.body}
        </p>

        {/* Quote */}
        {item.quote && (
          <figure className={`relative rounded-xl border-l-4 border-emerald-500 bg-emerald-50 px-5 py-4 ${isLeft ? "" : "lg:border-l-0 lg:border-r-4 lg:text-right"}`}>
            <QuoteIcon />
            <blockquote className="mt-1 text-sm font-medium italic leading-relaxed text-slate-600">
              {item.quote}
            </blockquote>
          </figure>
        )}
      </div>

      {/* ── Center dot on the timeline line (desktop) ── */}
      <div
        className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
        aria-hidden="true"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 shadow-lg shadow-emerald-500/40 ring-4 ring-white">
          <div className="h-2.5 w-2.5 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
});

// ─── ScrollIndicator ──────────────────────────────────────────────────────────
const ScrollIndicator = memo(() => (
  <div className="flex flex-col items-center gap-1.5 text-white/60" aria-hidden="true">
    <span className="text-xs font-semibold uppercase tracking-widest">Scroll</span>
    <div className="animate-bounce">
      <ScrollArrow />
    </div>
  </div>
));

// ─── SectionHeader ────────────────────────────────────────────────────────────
const SectionHeader = memo(({ pill, heading, accent, body }) => (
  <div className="mb-20 flex flex-col items-center text-center">
    <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
      {pill}
    </span>
    <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl lg:text-5xl">
      {heading}{" "}
      {accent && <span className="text-emerald-600">{accent}</span>}
    </h2>
    <div className="mt-4 h-1 w-12 rounded-full bg-emerald-500" aria-hidden="true" />
    {body && <p className="mt-5 max-w-2xl text-base text-slate-500 sm:text-lg">{body}</p>}
  </div>
));

// ─── History ──────────────────────────────────────────────────────────────────
function History() {
  // Closing CTA reveal
  const [ctaRef, ctaVisible] = useReveal(0.2);

  return (
    <main aria-labelledby="history-page-heading">

      {/* ══════════════════════════════════════════════════════════════
          HERO — cinematic opening
      ══════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Hero introduction"
        className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-slate-900 px-4 text-center"
      >
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1800&q=80"
          alt=""
          role="presentation"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
        />

        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80" aria-hidden="true" />
        {/* Emerald tint wash */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/30 via-transparent to-teal-900/20" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl">
          {/* Cross emblem */}
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm">
            <CrossIcon />
          </div>

          {/* Pill */}
          <span className="mb-6 inline-block rounded-full border border-emerald-400/40 bg-emerald-500/20 px-5 py-2 text-xs font-bold uppercase tracking-widest text-emerald-300 backdrop-blur-sm">
            JFAAC Katsutadai · Est. 1998
          </span>

          {/* Main heading */}
          <h1
            id="history-page-heading"
            className="mb-6 text-5xl font-black leading-none tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Our Journey
            <br />
            <span className="text-emerald-400">of Faith</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            From a prayer gathering of seven families to a thriving, multicultural church community — this is the story God has been writing in Katsutadai since 1998.
          </p>

          {/* Scroll indicator */}
          <ScrollIndicator />
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
            <path d="M0 80V50C360 10 720 70 1080 30C1260 10 1380 40 1440 50V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          INTRO STATEMENT
      ══════════════════════════════════════════════════════════════ */}
      <section aria-label="Church introduction" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <figure>
            {/* Decorative open-quote */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-400">
              <QuoteIcon />
            </div>
            <blockquote className="text-xl font-semibold italic leading-relaxed text-slate-700 sm:text-2xl lg:text-3xl">
              "We did not build this church. God did — through ordinary people who were willing to say yes."
            </blockquote>
            <figcaption className="mt-5 text-sm font-bold not-italic text-emerald-600">
              — Pastor Hiroshi Nakamura, Founding Pastor
            </figcaption>
          </figure>

          <div className="mx-auto mt-10 h-px max-w-xs bg-gradient-to-r from-transparent via-emerald-200 to-transparent" aria-hidden="true" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TIMELINE
      ══════════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="timeline-heading"
        className="relative bg-slate-50 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionHeader
            pill="Milestones"
            heading="A Timeline of"
            accent="God's Faithfulness"
            body="Every year, every milestone, every face — part of a story that is still unfolding."
          />

          {/* Timeline container */}
          <div className="relative">

            {/* Vertical center line — desktop only */}
            <div
              className="absolute inset-y-0 left-1/2 hidden w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-gradient-to-b from-emerald-200 via-emerald-400 to-emerald-200 lg:block"
              aria-hidden="true"
            />

            {/* Items */}
            <div className="flex flex-col gap-24 lg:gap-32">
              {HISTORY.map((item, index) => (
                <TimelineItem key={item.id} item={item} index={index} />
              ))}
            </div>

            {/* End cap dot */}
            <div className="relative mt-16 hidden justify-center lg:flex" aria-hidden="true">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-500 shadow-lg shadow-emerald-300/50 ring-4 ring-white">
                <CrossIcon />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════════════════ */}
      <section aria-label="Church statistics" className="bg-emerald-600 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {[
              { value: "1998",  label: "Year Founded"        },
              { value: "25+",   label: "Years of Ministry"   },
              { value: "12+",   label: "Nations Represented" },
              { value: "200+",  label: "Lives Transformed"   },
            ].map(({ value, label }) => (
              <div key={label}>
                <dt className="text-3xl font-black text-white sm:text-4xl">{value}</dt>
                <dd className="mt-1 text-xs font-semibold uppercase tracking-widest text-emerald-200">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CLOSING CTA
      ══════════════════════════════════════════════════════════════ */}
      <section aria-label="Closing invitation" className="bg-white py-20 sm:py-28">
        <div
          ref={ctaRef}
          className={[
            "mx-auto max-w-3xl px-4 text-center transition-all duration-700 sm:px-6",
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          {/* Decorative pulsing cross */}
          <div className="relative mx-auto mb-10 flex h-20 w-20 items-center justify-center" aria-hidden="true">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-100 opacity-50" style={{ animationDuration: "3s" }} />
            <div className="absolute inset-2 rounded-full bg-emerald-100" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md">
              <CrossIcon />
            </div>
          </div>

          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
            The Story Continues —{" "}
            <span className="text-emerald-600">With You</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Every person who walks through our doors becomes part of the next chapter of this story. We believe yours is meant to be written here. We'd love to meet you this Sunday.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/visit"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              Join Us This Sunday
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-200 px-8 py-4 text-sm font-bold uppercase tracking-widest text-emerald-700 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              Learn More About Us
            </a>
          </div>

          {/* Final scripture */}
          <p className="mt-14 text-sm italic text-slate-400">
            "For I know the plans I have for you, declares the Lord — plans to prosper you and not to harm you, plans to give you hope and a future." — Jeremiah 29:11
          </p>
        </div>
      </section>
    </main>
  );
}

export default memo(History);