import { memo, useState, useCallback } from "react";

// ─── Service details ──────────────────────────────────────────────────────────
const SERVICE = {
  mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.4!2d140.0553!3d35.7183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60187d1c1234abcd%3A0x1234567890abcdef!2sKatsutadai%2C%20Yachiyo%2C%20Chiba%20276-0023%2C%20Japan!5e0!3m2!1sen!2sjp!4v1234567890",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Katsutadai,Yachiyo-shi,Chiba,Japan",
};

// ─── Service rows data ────────────────────────────────────────────────────────
const SERVICE_ROWS = [
  {
    id:       "main-service",
    day:      "SUN",
    time:     "10:30",
    period:   "AM",
    title:    "Sunday Worship Service",
    desc:     "Our primary Sunday gathering featuring bilingual worship, expository preaching, and Holy Communion on the first Sunday of each month.",
    location: "４Ｆ, 1 Chome-４-20 Katsutadai, Yachiyo-shi, Chiba, Japan",
    email:    "info@jfaac-katsutadai.org",
    featured: true,
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
    strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
    <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
    strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden="true">
    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const ChevronIcon = memo(({ open }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
    strokeLinecap="round" strokeLinejoin="round"
    className={`h-4 w-4 shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-emerald-500" : "text-slate-300"}`}
    aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
));

// ─── Service row — doubles as the map toggle trigger ─────────────────────────
const ServiceRow = memo(({ row, mapOpen, onToggle }) => (
  <div className="overflow-hidden rounded-2xl border border-emerald-300 bg-emerald-50/60 shadow-sm transition-all duration-300">

    {/* ── Clickable row header ── */}
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={mapOpen}
      aria-controls={`map-panel-${row.id}`}
      className="group flex w-full items-start gap-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-inset"
    >
      {/* Left green accent bar */}
      <div className="w-1 self-stretch rounded-tl-2xl bg-emerald-500" aria-hidden="true" />

      {/* Day / time block */}
      <div className="flex w-16 shrink-0 flex-col items-center justify-center self-stretch bg-emerald-600 py-5 text-white">
        <span className="text-xs font-bold uppercase leading-none tracking-widest opacity-80">{row.day}</span>
        <span className="mt-1 text-xl font-black leading-none tracking-tight">{row.time}</span>
        <span className="text-xs font-semibold leading-none opacity-70">{row.period}</span>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 px-5 py-4">
        <h3 className="mb-1.5 text-base font-bold text-slate-800">{row.title}</h3>
        <p className="mb-3 text-sm leading-6 text-slate-500">{row.desc}</p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <LocationIcon />
            {row.location}
          </span>
          <span className="flex items-center gap-1.5">
            <EmailIcon />
            {row.email}
          </span>
        </div>

        {/* Map toggle label */}
        <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
          <MapPinIcon />
          <span>{mapOpen ? "Hide map" : "View on Google Maps"}</span>
          <ChevronIcon open={mapOpen} />
        </div>
      </div>
    </button>

    {/* ── Collapsible map panel — CSS grid-rows trick ── */}
    <div
      id={`map-panel-${row.id}`}
      role="region"
      aria-label="Google Maps location"
      className={[
        "grid transition-all duration-500 ease-in-out",
        mapOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      ].join(" ")}
    >
      <div className="overflow-hidden">
        {/* Map iframe */}
        <div className="h-64 bg-emerald-50 sm:h-80 lg:h-96">
          <iframe
            title="JFAAC Katsutadai location on Google Maps"
            src={SERVICE.mapSrc}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        {/* Directions CTA */}
        <div className="flex flex-col items-start justify-between gap-3 bg-emerald-600 px-6 py-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold text-white">Ready to visit us?</p>
            <p className="text-xs text-emerald-100">We'd love to welcome you this Sunday at 10:30 AM.</p>
          </div>
          <a
            href={SERVICE.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-emerald-700 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-600"
          >
            <MapPinIcon />
            Get Directions
          </a>
        </div>
      </div>
    </div>

  </div>
));

// ─── SundayServiceSection ─────────────────────────────────────────────────────
function SundayServiceSection() {
  const [mapOpen, setMapOpen] = useState(false);
  const toggleMap = useCallback(() => setMapOpen((v) => !v), []);

  return (
    <section
      aria-labelledby="service-heading"
      className="bg-white py-3 sm:py-3"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-3 inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Sunday Worship
          </span>
          <h2 id="service-heading" className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
            Join Us This Sunday
          </h2>
          <div className="mt-4 h-1 w-12 rounded-full bg-emerald-500" />
        </div>

        {/* Service rows — each row owns its own map toggle */}
        <div className="flex flex-col gap-3">
          {SERVICE_ROWS.map((row) => (
            <ServiceRow
              key={row.id}
              row={row}
              mapOpen={mapOpen}
              onToggle={toggleMap}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default memo(SundayServiceSection);