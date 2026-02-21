import { memo } from "react";
import { NavLink } from "react-router";

// ─── Footer data ─────────────────────────────────────────────────────────────

const BRAND = {
  name:    "JFAAC Katsutadai",
  tagline: "Jesus for All, Alliance Church",
  description:
    "A welcoming community in Yachiyo-shi, Chiba, rooted in the Word of God and dedicated to worship, discipleship, and service.",
};

const NAV_LINKS = [
  { label: "Home",                path: "/" },
  { label: "About Us",            path: "/about" },
  { label: "Ministries & Events", path: "/ministries" },
  { label: "Visit Us",            path: "/visit" },
  { label: "Support Us",          path: "/support" },
];

const SERVICE_INFO = [
  { icon: "clock",    primary: "Sunday Worship",    secondary: "10:30 AM — Every Sunday" },
  { icon: "location", primary: "Katsutadai Church", secondary: "４Ｆ, 1 Chome-４-20 Katsutadai, Yachiyo-shi, Chiba 276-0023, Japan" },
  { icon: "phone",    primary: "+81 47-000-0000",   secondary: "Mon – Fri, 9:00 AM – 5:00 PM" },
  { icon: "email",    primary: "info@jfaac.org",    secondary: "We'll respond within 48 hours" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href:  "https://facebook.com",
    icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
  },
  {
    label: "YouTube",
    href:  "https://youtube.com",
    icon: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" stroke="none" />
      </>
    ),
  },
  {
    label: "Instagram",
    href:  "https://instagram.com",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    label: "LINE",
    href:  "https://line.me",
    icon: <path d="M12 2C6.48 2 2 5.94 2 10.8c0 2.94 1.6 5.55 4.1 7.27-.16.57-.54 2.08-.62 2.4-.1.4.15.4.31.29.13-.09 1.98-1.31 2.79-1.84.44.06.89.08 1.35.08 5.52 0 10-3.94 10-8.8C20 5.94 17.52 2 12 2z" />,
  },
];

// ─── Info icon map ────────────────────────────────────────────────────────────
const iconPaths = {
  clock:    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />,
  location: <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />,
  phone:    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
  email:    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
};

const InfoIcon = memo(({ type }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0" aria-hidden="true">
    {iconPaths[type]}
  </svg>
));

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer aria-label="Site footer" className="bg-slate-900 text-slate-300">

      {/* ── Top wave divider ── */}
      <div className="overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 0V30C240 60 480 0 720 20C960 40 1200 10 1440 30V0H0Z" fill="white" />
        </svg>
      </div>

      {/* ── Main footer body ── */}
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">

          {/* ── Col 1: Brand (4 cols) ── */}
          <div className="lg:col-span-4">
            <NavLink
              to="/"
              className="inline-flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label="JFAAC Katsutadai homepage"
            >
              <img
                src="/jfaac-logo.png"
                alt="JFAAC Katsutadai logo"
                className="h-11 w-11 rounded-full object-contain"
              />
              <div className="leading-tight">
                <p className="text-base font-bold text-white">{BRAND.name}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                  {BRAND.tagline}
                </p>
              </div>
            </NavLink>

            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              {BRAND.description}
            </p>

            {/* Social links */}
            <ul className="mt-6 flex items-center gap-3" aria-label="Social media links">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${label} page`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-all duration-200 hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4" aria-hidden="true">
                      {icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 2: Quick Links (2 cols, offset) ── */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-emerald-400">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {NAV_LINKS.map(({ label, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      end={path === "/"}
                      className={({ isActive }) =>
                        [
                          "text-sm transition-colors duration-200 hover:text-emerald-400 focus-visible:outline-none focus-visible:text-emerald-400",
                          isActive ? "font-semibold text-emerald-400" : "text-slate-400",
                        ].join(" ")
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Col 3: Contact & Service Info (4 cols) ── */}
          <div className="lg:col-span-4 lg:col-start-9">
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-emerald-400">
              Contact & Services
            </h3>
            <ul className="space-y-4">
              {SERVICE_INFO.map(({ icon, primary, secondary }) => (
                <li key={primary} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                    <InfoIcon type={icon} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{primary}</p>
                    <p className="text-xs leading-snug text-slate-400">{secondary}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-slate-500">
              © {currentYear} JFAAC Katsutadai — Jesus for All, Alliance Church. All rights reserved.
            </p>
            <p className="text-xs italic text-slate-600">
              "For God so loved the world..." — John 3:16
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
