import { memo, useEffect, useRef, useState, useCallback } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICE_SCHEDULE = [
  {
    id: 1, day: "Sunday", time: "9:00 AM",
    label: "Sunday School",
    description: "Age-appropriate Bible classes for children (ages 4–12), teens, and adults. Curriculum is bilingual — Filipino and Japanese.",
    location: "4F Main Hall — East Room",
    contact: "education@jfaac-katsutadai.org",
  },
  {
    id: 2, day: "Sunday", time: "10:30 AM",
    label: "Main Worship Service",
    description: "Our primary Sunday gathering featuring bilingual worship, expository preaching, and Holy Communion on the first Sunday of each month.",
    location: "4F Main Sanctuary",
    contact: "info@jfaac-katsutadai.org",
    featured: true,
  },
  {
    id: 3, day: "Friday", time: "7:00 PM",
    label: "Prayer Meeting",
    description: "A dedicated mid-week prayer gathering where the congregation intercedes for one another, the church, the community, and the nations. All are welcome.",
    location: "4F Prayer Room",
    contact: "prayer@jfaac-katsutadai.org",
  },
];

const MINISTRIES = [
  {
    id:          "youth",
    icon:        "youth",
    color:       "emerald",
    name:        "Youth Fellowship",
    tagline:     "Raising the Next Generation",
    description: "A vibrant community for teens and young adults (ages 13–25) to grow in faith, build genuine friendships, and discover their calling in Christ.",
    schedule:    "Every Saturday · 4:00 PM – 6:00 PM",
    location:    "4F Youth Room, JFAAC Katsutadai",
    contact:     { label: "Youth Pastor Jun", value: "+81-90-2345-6789", href: "tel:+819023456789" },
    email:       { label: "Email", value: "youth@jfaac-katsutadai.org", href: "mailto:youth@jfaac-katsutadai.org" },
    highlights:  ["Bible study & discipleship", "Monthly outreach events", "Annual youth camp", "Worship & creative arts"],
  },
  {
    id:          "women",
    icon:        "women",
    color:       "teal",
    name:        "Women's Fellowship",
    tagline:     "Grace, Strength & Sisterhood",
    description: "A nurturing space for women of all ages to grow spiritually, support one another through life's seasons, and serve the church and community together.",
    schedule:    "Every 2nd & 4th Saturday · 2:00 PM – 4:00 PM",
    location:    "4F Fellowship Room, JFAAC Katsutadai",
    contact:     { label: "Sister Maria", value: "+81-90-3456-7890", href: "tel:+819034567890" },
    email:       { label: "Email", value: "women@jfaac-katsutadai.org", href: "mailto:women@jfaac-katsutadai.org" },
    highlights:  ["Women's Bible study", "Prayer & intercession", "Community service projects", "Annual women's retreat"],
  },
  {
    id:          "men",
    icon:        "men",
    color:       "emerald",
    name:        "Men's Fellowship",
    tagline:     "Iron Sharpens Iron",
    description: "A brotherhood where men are equipped to lead with integrity in their homes, workplaces, and community — grounded in God's Word and accountable to one another.",
    schedule:    "Every 1st & 3rd Saturday · 7:00 AM – 9:00 AM",
    location:    "4F Conference Room, JFAAC Katsutadai",
    contact:     { label: "Bro. Kenji", value: "+81-90-4567-8901", href: "tel:+819045678901" },
    email:       { label: "Email", value: "men@jfaac-katsutadai.org", href: "mailto:men@jfaac-katsutadai.org" },
    highlights:  ["Men's devotional & prayer", "Leadership mentorship", "Family strengthening workshops", "Annual men's retreat"],
  },
];

const GGM = {
  name:        "GGM — Growth Group Meeting",
  tagline:     "Bringing the Church to the Community",
  description: "GGM (Growth Group Meeting) is our community cell group network — small gatherings of people held in homes and community centers across Yachiyo-shi. These intimate groups are where discipleship truly happens: where people are known by name, pray for each other, and live out the Gospel in everyday life.",
  schedule:    "Every Wednesday · 7:00 PM – 9:00 PM",
  note:        "Locations rotate monthly. Contact your nearest GGM leader or the church office to find the group closest to you.",
  contact:     { label: "GGM Coordinator", value: "+81-90-5678-9012", href: "tel:+819056789012" },
  email:       { label: "Email", value: "ggm@jfaac-katsutadai.org", href: "mailto:ggm@jfaac-katsutadai.org" },
  locations: [
    { area: "Katsutadai Central",  leader: "Bro. Tanaka",  day: "Wednesday", time: "7:00 PM" },
    { area: "Yachiyodai",          leader: "Sis. Reyes",   day: "Wednesday", time: "7:30 PM" },
    { area: "Miyamae",             leader: "Bro. Santos",  day: "Thursday",  time: "7:00 PM" },
    { area: "Mutsumi",             leader: "Sis. Nakamura",day: "Wednesday", time: "7:00 PM" },
  ],
};

const UPCOMING_EVENTS = [
  {
    id:          1,
    date:        { month: "MAR", day: "16", year: "2025" },
    title:       "Church Anniversary Sunday Service",
    category:    "Worship",
    description: "A special Sunday service celebrating 27 years of God's faithfulness to JFAAC Katsutadai. Guest speaker, special music, and a church-wide lunch to follow.",
    time:        "10:30 AM – 2:00 PM",
    location:    "4F Main Sanctuary, JFAAC Katsutadai",
    contact:     "info@jfaac-katsutadai.org",
    featured:    true,
  },
  {
    id:          2,
    date:        { month: "MAR", day: "22", year: "2025" },
    title:       "Community Outreach Day — Yachiyo Station",
    category:    "Outreach",
    description: "Street evangelism, free refreshments, and Gospel literature distribution near Keisei Yachiyo-Chuo Station. Volunteers needed — sign up at the information desk.",
    time:        "10:00 AM – 1:00 PM",
    location:    "Keisei Yachiyo-Chuo Station, Yachiyo-shi",
    contact:     "outreach@jfaac-katsutadai.org",
    featured:    false,
  },
  {
    id:          3,
    date:        { month: "APR", day: "5", year: "2025" },
    title:       "Good Friday Prayer & Worship Night",
    category:    "Prayer",
    description: "An evening of solemn reflection, responsive prayer, and worship as we remember the suffering and death of our Lord Jesus Christ on the cross.",
    time:        "6:30 PM – 9:00 PM",
    location:    "4F Main Sanctuary",
    contact:     "info@jfaac-katsutadai.org",
    featured:    false,
  },
  {
    id:          4,
    date:        { month: "APR", day: "7", year: "2025" },
    title:       "Easter Sunday Celebration",
    category:    "Worship",
    description: "Celebrate the resurrection of Jesus Christ with us! Special music, testimonies, and a message of hope. All are welcome — bring a friend.",
    time:        "10:30 AM",
    location:    "4F Main Sanctuary",
    contact:     "info@jfaac-katsutadai.org",
    featured:    true,
  },
  {
    id:          5,
    date:        { month: "MAY", day: "17", year: "2025" },
    title:       "Youth Annual Camp Registration Opens",
    category:    "Youth",
    description: "Registration opens for the annual JFAAC Youth Camp at Chiba Seaside Park. Limited slots available — early bird discounts for the first 20 registrants.",
    time:        "Registration starts 9:00 AM",
    location:    "Online & Information Desk",
    contact:     "youth@jfaac-katsutadai.org",
    featured:    false,
  },
];

const COMPLETED_EVENTS = [
  {
    id:       1,
    date:     "January 5, 2025",
    title:    "New Year Sunday Service & Prayer Dedication",
    category: "Worship",
    summary:  "Over 180 members gathered to dedicate the new year to God. The service featured worship, testimonies, and a corporate prayer of commitment for 2025.",
    image:    "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&q=75",
  },
  {
    id:       2,
    date:     "January 25, 2025",
    title:    "Men's Leadership Summit",
    category: "Men's Fellowship",
    summary:  "A full-day discipleship workshop for 45 men of the church, covering servant leadership, family stewardship, and prayer. Facilitated by Pastor Kenji Watanabe.",
    image:    "https://images.unsplash.com/photo-1438232992991-995b671e4437?w=600&q=75",
  },
  {
    id:       3,
    date:     "February 8, 2025",
    title:    "Women's Valentines Gathering",
    category: "Women's Fellowship",
    summary:  "A joyful afternoon of fellowship, worship, and devotional sharing for the women of JFAAC. Theme: \"Loved by God.\" Attended by 60 women of all ages.",
    image:    "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=75",
  },
  {
    id:       4,
    date:     "February 23, 2025",
    title:    "GGM Leaders' Training & Equipping",
    category: "GGM",
    summary:  "Quarterly training for all 12 GGM cell group leaders focusing on small group facilitation, pastoral care, and evangelism in the community.",
    image:    "https://images.unsplash.com/photo-1609234656432-603f3f13c36d?w=600&q=75",
  },
];

// ─── Category color map ───────────────────────────────────────────────────────
const CATEGORY_COLORS = {
  Worship:         "bg-emerald-100 text-emerald-700",
  Outreach:        "bg-teal-100 text-teal-700",
  Prayer:          "bg-slate-100 text-slate-700",
  Youth:           "bg-green-100 text-green-700",
  "Men's Fellowship":   "bg-blue-50 text-blue-700",
  "Women's Fellowship": "bg-rose-50 text-rose-700",
  GGM:             "bg-amber-50 text-amber-700",
};

// ─── SVG Icon paths ───────────────────────────────────────────────────────────
const ICON_PATHS = {
  youth:    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />,
  women:    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
  men:      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />,
  clock:    <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
  location: <><path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>,
  phone:    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
  email:    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
  check:    <polyline points="20 6 9 17 4 12" />,
  arrow:    <polyline points="9 18 15 12 9 6" />,
  ggm:      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
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
const Icon = memo(({ type, className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {ICON_PATHS[type]}
  </svg>
));

const CrossIcon = memo(() => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
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

const SectionHeader = memo(({ pill, heading, accent, body, center = true }) => (
  <div className={`mb-12 flex flex-col ${center ? "items-center text-center" : ""}`}>
    <SectionPill>{pill}</SectionPill>
    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
      {heading}{" "}
      {accent && <span className="text-emerald-600">{accent}</span>}
    </h2>
    <AccentLine />
    {body && <p className={`mt-5 text-base text-slate-500 ${center ? "max-w-2xl" : "max-w-xl"}`}>{body}</p>}
  </div>
));

const CategoryBadge = memo(({ category }) => (
  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${CATEGORY_COLORS[category] || "bg-slate-100 text-slate-600"}`}>
    {category}
  </span>
));

// ─── Service schedule row ─────────────────────────────────────────────────────
const ServiceRow = memo(({ service }) => (
  <div className={[
    "group relative flex flex-col gap-4 overflow-hidden rounded-2xl border p-6 transition-all duration-300 sm:flex-row sm:items-start",
    "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-100/60",
    service.featured
      ? "border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50/60 shadow-sm"
      : "border-slate-100 bg-white shadow-sm hover:border-emerald-200",
  ].join(" ")}>
    {service.featured && (
      <div className="absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-emerald-500" aria-hidden="true" />
    )}

    {/* Time badge */}
    <div className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl ${service.featured ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700"}`}>
      <span className="text-xs font-bold uppercase tracking-widest opacity-75">{service.day.slice(0, 3)}</span>
      <span className="text-sm font-black leading-tight">{service.time.split(" ")[0]}</span>
      <span className="text-xs opacity-75">{service.time.split(" ")[1]}</span>
    </div>

    {/* Info */}
    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h3 className="text-base font-bold text-slate-800">{service.label}</h3>
        {service.featured && (
          <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white">Main Service</span>
        )}
      </div>
      <p className="text-sm leading-6 text-slate-500 mb-3">{service.description}</p>
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-400">
        <span className="flex items-center gap-1.5"><Icon type="location" className="h-3.5 w-3.5" />{service.location}</span>
        <span className="flex items-center gap-1.5"><Icon type="email" className="h-3.5 w-3.5" />{service.contact}</span>
      </div>
    </div>
  </div>
));

// ─── Ministry card ────────────────────────────────────────────────────────────
const MinistryCard = memo(({ ministry, index }) => {
  const [ref, visible] = useReveal(0.08);
  return (
    <article
      ref={ref}
      aria-labelledby={`ministry-${ministry.id}`}
      className={[
        "group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-700 ease-out",
        "hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/60",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      ].join(" ")}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Card header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-600 px-6 py-7">
        <div className="pointer-events-none absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "16px 16px" }}
          aria-hidden="true" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
            <Icon type={ministry.icon} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-200">{ministry.tagline}</p>
            <h3 id={`ministry-${ministry.id}`} className="text-lg font-extrabold text-white">{ministry.name}</h3>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-5 text-sm leading-7 text-slate-500 flex-1">{ministry.description}</p>

        {/* Schedule + location */}
        <div className="mb-5 space-y-2.5 rounded-xl bg-slate-50 p-4">
          <p className="flex items-start gap-2.5 text-sm text-slate-600">
            <Icon type="clock" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong className="font-semibold text-slate-700">Schedule:</strong> {ministry.schedule}</span>
          </p>
          <p className="flex items-start gap-2.5 text-sm text-slate-600">
            <Icon type="location" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span><strong className="font-semibold text-slate-700">Location:</strong> {ministry.location}</span>
          </p>
        </div>

        {/* Highlights */}
        <ul className="mb-5 space-y-1.5" aria-label="Ministry highlights">
          {ministry.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2.5 text-xs text-slate-500">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Icon type="check" className="h-2.5 w-2.5" />
              </span>
              {h}
            </li>
          ))}
        </ul>

        {/* Contact */}
        <div className="mt-auto space-y-2 border-t border-slate-100 pt-4">
          <a href={ministry.contact.href} className="group/link flex items-center gap-2.5 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-700">
            <Icon type="phone" className="h-4 w-4 text-emerald-500" />
            <span>{ministry.contact.label}: {ministry.contact.value}</span>
          </a>
          <a href={ministry.email.href} className="group/link flex items-center gap-2.5 text-sm text-slate-500 transition-colors hover:text-emerald-700">
            <Icon type="email" className="h-4 w-4 text-emerald-400" />
            <span>{ministry.email.value}</span>
          </a>
        </div>
      </div>
    </article>
  );
});

// ─── GGM location row ─────────────────────────────────────────────────────────
const GGMLocationRow = memo(({ loc, index }) => (
  <div className={[
    "flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-white px-5 py-4 transition-all duration-300 hover:border-emerald-200 hover:shadow-sm",
    "opacity-0 animate-none",
  ].join(" ")}>
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 text-xs font-black">
        {index + 1}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-800">{loc.area}</p>
        <p className="text-xs text-slate-400">Led by {loc.leader}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-xs font-semibold text-emerald-600">{loc.day}</p>
      <p className="text-sm font-bold text-slate-700">{loc.time}</p>
    </div>
  </div>
));

// ─── Upcoming event card ──────────────────────────────────────────────────────
const UpcomingEventCard = memo(({ event, index }) => {
  const [ref, visible] = useReveal(0.08);
  return (
    <article
      ref={ref}
      aria-labelledby={`event-${event.id}`}
      className={[
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-700 ease-out",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100/60",
        event.featured ? "border-emerald-300" : "border-slate-100 hover:border-emerald-200",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      ].join(" ")}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Top accent */}
      <div className={`h-1 bg-gradient-to-r from-emerald-500 to-teal-500 ${event.featured ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity duration-300"}`} aria-hidden="true" />

      <div className="flex flex-1 flex-col p-6">
        {/* Date + category */}
        <div className="mb-4 flex items-start justify-between gap-3">
          {/* Date block */}
          <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest leading-none">{event.date.month}</span>
            <span className="text-2xl font-black leading-tight">{event.date.day}</span>
          </div>
          <CategoryBadge category={event.category} />
        </div>

        {/* Title */}
        <h3 id={`event-${event.id}`} className="mb-2 text-base font-bold leading-snug text-slate-800 group-hover:text-emerald-700 transition-colors duration-200">
          {event.title}
        </h3>

        <p className="mb-4 flex-1 text-sm leading-7 text-slate-500">{event.description}</p>

        {/* Meta */}
        <div className="space-y-1.5 text-xs text-slate-400">
          <p className="flex items-center gap-2"><Icon type="clock" className="h-3.5 w-3.5 text-emerald-400" />{event.time}</p>
          <p className="flex items-start gap-2"><Icon type="location" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />{event.location}</p>
          <p className="flex items-center gap-2"><Icon type="email" className="h-3.5 w-3.5 text-emerald-400" />{event.contact}</p>
        </div>
      </div>
    </article>
  );
});

// ─── Completed event row ──────────────────────────────────────────────────────
const CompletedEventRow = memo(({ event, index }) => {
  const [ref, visible] = useReveal(0.08);
  return (
    <div
      ref={ref}
      className={[
        "group flex gap-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-700 ease-out",
        "hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-100/50",
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6",
      ].join(" ")}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Thumbnail */}
      <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-36">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <CategoryBadge category={event.category} />
          <span className="text-xs text-slate-400">{event.date}</span>
        </div>
        <h3 className="mb-1.5 text-sm font-bold text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors duration-200">
          {event.title}
        </h3>
        <p className="text-xs leading-5 text-slate-500 line-clamp-2">{event.summary}</p>
      </div>
    </div>
  );
});

// ─── MinistriesEvents page ────────────────────────────────────────────────────
function MinistriesEvents() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const handleTab = useCallback((tab) => setActiveTab(tab), []);

  return (
    <main aria-labelledby="ministries-page-heading">

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700">
        <div className="pointer-events-none absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          aria-hidden="true" />
        <div className="absolute -bottom-1 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 72" fill="none" preserveAspectRatio="none" className="w-full h-14 sm:h-20">
            <path d="M0 72V36L720 0L1440 36V72H0Z" fill="white" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 pb-28 pt-20 text-center sm:pb-36 sm:pt-28">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25">
            <CrossIcon />
          </div>
          <SectionPill>Get Involved</SectionPill>
          <h1 id="ministries-page-heading" className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ministries &amp;{" "}
            <span className="text-emerald-300">Events</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-emerald-100 sm:text-lg">
            There is a place for every person in the life of this church. Explore our ministries, programs, and upcoming events — and find where you belong.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          SERVICE SCHEDULE
      ══════════════════════════════════════════════════ */}
      <section aria-labelledby="schedule-heading" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            pill="Weekly Schedule"
            heading="Our Church"
            accent="Service Schedule"
            body="Join us for worship, prayer, and study throughout the week. All services are open to everyone — first-time visitors are warmly welcomed."
          />
          <div className="flex flex-col gap-4">
            {SERVICE_SCHEDULE.map((s) => <ServiceRow key={s.id} service={s} />)}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="mx-auto max-w-5xl px-8" aria-hidden="true">
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
      </div>

      {/* ══════════════════════════════════════════════════
          MINISTRIES
      ══════════════════════════════════════════════════ */}
      <section aria-labelledby="ministries-heading" className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            pill="Fellowships"
            heading="Ministry"
            accent="Fellowships"
            body="Our fellowships are the heartbeat of community life at JFAAC. Each group is designed to disciple, equip, and connect a specific part of our congregation."
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {MINISTRIES.map((m, i) => <MinistryCard key={m.id} ministry={m} index={i} />)}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="mx-auto max-w-5xl px-8" aria-hidden="true">
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
      </div>

      {/* ══════════════════════════════════════════════════
          GGM SECTION
      ══════════════════════════════════════════════════ */}
      <section aria-labelledby="ggm-heading" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-start">

            {/* Left — info */}
            <div>
              <SectionPill>Cell Groups</SectionPill>
              <h2 id="ggm-heading" className="mt-4 text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
                {GGM.name}
              </h2>
              <p className="mt-1 text-base font-semibold text-emerald-600">{GGM.tagline}</p>
              <AccentLine />

              <p className="mt-6 text-base leading-8 text-slate-600">{GGM.description}</p>

              {/* Schedule + note */}
              <div className="mt-6 space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
                <p className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <Icon type="clock" className="h-5 w-5 text-emerald-500" />
                  {GGM.schedule}
                </p>
                <p className="text-xs leading-6 text-slate-500">{GGM.note}</p>
              </div>

              {/* Contact */}
              <div className="mt-6 space-y-3">
                <a href={GGM.contact.href}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:text-emerald-700">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon type="phone" />
                  </div>
                  {GGM.contact.label}: {GGM.contact.value}
                </a>
                <a href={GGM.email.href}
                  className="flex items-center gap-3 text-sm text-slate-500 transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:text-emerald-700">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon type="email" />
                  </div>
                  {GGM.email.value}
                </a>
              </div>
            </div>

            {/* Right — location table */}
            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-400">
                Active GGM Locations
              </h3>
              <div className="space-y-3">
                {GGM.locations.map((loc, i) => (
                  <GGMLocationRow key={loc.area} loc={loc} index={i} />
                ))}
              </div>

              {/* Join CTA */}
              <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 p-6 text-center shadow-lg shadow-emerald-200/60">
                <div className="mb-3 flex justify-center text-white">
                  <Icon type="ggm" className="h-8 w-8" />
                </div>
                <p className="mb-1 text-base font-bold text-white">Find Your GGM Group</p>
                <p className="mb-4 text-xs leading-5 text-emerald-100">
                  Not sure which group is closest to you? Reach out and we'll help you find your community.
                </p>
                <a href="mailto:ggm@jfaac-katsutadai.org"
                  className="inline-block rounded-full bg-white px-6 py-2.5 text-sm font-bold text-emerald-700 transition-all duration-300 hover:bg-emerald-50 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-600">
                  Contact GGM Coordinator
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="mx-auto max-w-5xl px-8" aria-hidden="true">
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
      </div>

      {/* ══════════════════════════════════════════════════
          EVENTS (Tabbed: Upcoming / Completed)
      ══════════════════════════════════════════════════ */}
      <section aria-labelledby="events-heading" className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionHeader
            pill="Church Calendar"
            heading="Events &amp;"
            accent="Gatherings"
            body="Stay connected with what's happening at JFAAC Katsutadai — from special services and outreach days to fellowship celebrations."
          />

          {/* Tab switcher */}
          <div className="mb-10 flex justify-center" role="tablist" aria-label="Events filter">
            {[
              { key: "upcoming",  label: "Upcoming Events",  count: UPCOMING_EVENTS.length  },
              { key: "completed", label: "Completed Events", count: COMPLETED_EVENTS.length },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                role="tab"
                aria-selected={activeTab === key}
                onClick={() => handleTab(key)}
                className={[
                  "relative flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
                  "first:rounded-l-full last:rounded-r-full border",
                  activeTab === key
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-500 hover:border-emerald-300 hover:text-emerald-700",
                ].join(" ")}
              >
                {label}
                <span className={`rounded-full px-2 py-0.5 text-xs font-black ${activeTab === key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                  {count}
                </span>
              </button>
            ))}
          </div>

          {/* Upcoming events grid */}
          {activeTab === "upcoming" && (
            <div
              role="tabpanel"
              aria-label="Upcoming events"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {UPCOMING_EVENTS.map((e, i) => (
                <UpcomingEventCard key={e.id} event={e} index={i} />
              ))}
            </div>
          )}

          {/* Completed events list */}
          {activeTab === "completed" && (
            <div
              role="tabpanel"
              aria-label="Completed events"
              className="flex flex-col gap-4 max-w-4xl mx-auto"
            >
              {COMPLETED_EVENTS.map((e, i) => (
                <CompletedEventRow key={e.id} event={e} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CLOSING CTA
      ══════════════════════════════════════════════════ */}
      <section aria-label="Get involved call to action" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="relative mx-auto mb-8 flex h-16 w-16 items-center justify-center" aria-hidden="true">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-100 opacity-50" style={{ animationDuration: "3s" }} />
            <div className="absolute inset-1.5 rounded-full bg-emerald-100" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md">
              <CrossIcon />
            </div>
          </div>
          <h2 className="mb-3 text-2xl font-extrabold text-slate-800 sm:text-3xl">
            Ready to Get <span className="text-emerald-600">Involved?</span>
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-base leading-7 text-slate-500">
            Whether you're joining a fellowship, attending your first GGM, or volunteering for an event — we'd love to connect with you and help you find your place.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="/visit"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
              <CrossIcon />
              Visit Us This Sunday
            </a>
            <a href="mailto:info@jfaac-katsutadai.org"
              className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-200 px-7 py-3.5 text-sm font-bold text-emerald-700 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
              <Icon type="email" />
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}

export default memo(MinistriesEvents);