import { memo } from "react";

// ─── Service details ─────────────────────────────────────────────────────────
const SERVICE = {
  time:    "10:30 AM",
  day:     "Every Sunday",
  address: "４Ｆ, 1 Chome-４-20 Katsutadai, Yachiyo-shi, Chiba, Japan, 276-0023",
  phone:   "+81 47-000-0000",
  mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.4!2d140.0553!3d35.7183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60187d1c1234abcd%3A0x1234567890abcdef!2sKatsutadai%2C%20Yachiyo%2C%20Chiba%20276-0023%2C%20Japan!5e0!3m2!1sen!2sjp!4v1234567890",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Katsutadai,Yachiyo-shi,Chiba,Japan",
};

const INFO_ITEMS = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
    ),
    label: "Service Time",
    value: SERVICE.time,
    sub:   SERVICE.day,
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    ),
    label: "Our Address",
    value: "Katsutadai Church",
    sub:   SERVICE.address,
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
    label: "Contact",
    value: SERVICE.phone,
    sub:   "Mon – Fri, 9:00 AM – 5:00 PM",
  },
];

// ─── SundayServiceSection ─────────────────────────────────────────────────────
function SundayServiceSection() {
  return (
    <section
      aria-labelledby="service-heading"
      className="bg-white py-3 sm:py-3"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-3 inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Sunday Worship
          </span>
          <h2 id="service-heading" className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
            Join Us This Sunday
          </h2>
          <div className="mt-4 h-1 w-12 rounded-full bg-emerald-500" />
        </div>

        {/* ── Two-column layout ────────────────────────────────────────────────
            Mobile (<lg):  stacks vertically — cards on top, map below
            Desktop (lg+): side-by-side — cards column on left, map on right
        ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">

          {/* ── LEFT: info cards stacked vertically ── */}
          <div className="flex flex-col gap-4">
            {INFO_ITEMS.map(({ icon, label, value, sub }) => (
              <div
                key={label}
                className="group flex flex-row items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 transition-all duration-300 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-100"
              >
                {/* Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    {icon}
                  </svg>
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-emerald-600">
                    {label}
                  </p>
                  <p className="text-base font-bold text-slate-800">{value}</p>
                  <p className="mt-0.5 text-sm leading-snug text-slate-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── RIGHT: map + CTA ── */}
          <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-xl shadow-slate-100">
            {/* Map embed — fills remaining height on desktop */}
            <div className="relative h-56 bg-emerald-50 sm:h-72 lg:h-[calc(100%-72px)]">
              <iframe
                title="JFAAC Katsutadai location on Google Maps"
                src={SERVICE.mapSrc}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* CTA strip */}
            <div className="flex flex-col items-start justify-between gap-3 bg-emerald-600 px-6 py-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-bold text-white">Ready to visit us?</p>
                <p className="text-xs text-emerald-100">
                  We'd love to welcome you this Sunday at 10:30 AM.
                </p>
              </div>
              <a
                href={SERVICE.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-emerald-700 shadow-sm transition-all duration-300 hover:bg-emerald-50 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-600"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Get Directions
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default memo(SundayServiceSection);