import { memo } from "react";

// ─── Page content data ────────────────────────────────────────────────────────
const CHURCH = {
  name:    "JFAAC Katsutadai",
  tagline: "Jesus for All, Alliance Church",
  address: {
    floor:   "４Ｆ, 1 Chome-４-20 Katsutadai",
    city:    "Yachiyo-shi, Chiba",
    country: "Japan, 276-0023",
  },
  mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.4!2d140.0553!3d35.7183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60187d1c1234abcd%3A0x1234567890abcdef!2sKatsutadai%2C%20Yachiyo%2C%20Chiba%20276-0023%2C%20Japan!5e0!3m2!1sen!2sjp!4v1234567890",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Katsutadai,Yachiyo-shi,Chiba,Japan",
};

const SERVICE_TIMES = [
  { day: "Sunday",  time: "10:30 AM", label: "Main Worship Service",  note: "Bilingual — Filipino & Japanese", featured: true  },
  { day: "Sunday",  time: "9:00 AM",  label: "Sunday School",         note: "Children & Youth program",        featured: false },
  { day: "Friday",  time: "7:00 PM",  label: "Prayer & Bible Study",  note: "Mid-week fellowship",             featured: false },
];

const WHAT_TO_EXPECT = [
  "Free parking available nearby",
  "5-minute walk from Katsutadai Station",
  "Warm welcome team at the entrance",
  "Children's ministry during service",
  "Bilingual worship & message",
];

const CONTACTS = [
  {
    id:    1,
    type:  "phone",
    label: "Mobile / WhatsApp",
    value: "+81-90-1234-5678",
    href:  "tel:+819012345678",
    note:  "Available Mon – Sat, 9 AM – 6 PM",
  },
  {
    id:    2,
    type:  "email",
    label: "General Inquiries",
    value: "info@gracechurch.jp",
    href:  "mailto:info@gracechurch.jp",
    note:  "We respond within 24–48 hours",
  },
  {
    id:    3,
    type:  "email",
    label: "Prayer & Support",
    value: "support@gracechurch.jp",
    href:  "mailto:support@gracechurch.jp",
    note:  "For prayer requests & pastoral care",
  },
];

// ─── Inline SVG icons ─────────────────────────────────────────────────────────
const PhoneIcon = memo(() => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
));

const EmailIcon = memo(() => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
));

const LocationIcon = memo(() => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
));

const ClockIcon = memo(() => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
));

const DirectionsIcon = memo(() => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
));

const CheckIcon = memo(() => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
));

const ArrowIcon = memo(() => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
));

const CrossIcon = memo(() => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
  </svg>
));

// ─── Reusable atoms ───────────────────────────────────────────────────────────
const SectionPill = memo(({ children }) => (
  <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
    {children}
  </span>
));

const AccentLine = memo(() => (
  <div className="mt-4 h-1 w-12 rounded-full bg-emerald-500" aria-hidden="true" />
));

const GroupDivider = memo(({ icon, label }) => (
  <div className="mb-4 flex items-center gap-3">
    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
      {icon}
    </span>
    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</p>
    <div className="h-px flex-1 bg-slate-200" />
  </div>
));

// ─── ServiceTimeRow ───────────────────────────────────────────────────────────
const ServiceTimeRow = memo(({ service }) => (
  <div
    className={[
      "group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-5 transition-all duration-300",
      service.featured
        ? "border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50/60 shadow-sm"
        : "border-slate-100 bg-white hover:border-emerald-200 hover:shadow-sm",
    ].join(" ")}
  >
    {/* Featured left accent bar */}
    {service.featured && (
      <div className="absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-emerald-500" aria-hidden="true" />
    )}

    <div className={[
      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
      service.featured ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
    ].join(" ")}>
      <ClockIcon />
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-xl font-extrabold text-slate-800">{service.time}</p>
        {service.featured && (
          <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white">Main</span>
        )}
      </div>
      <p className="text-sm font-semibold text-slate-700">{service.day} — {service.label}</p>
      <p className="mt-0.5 text-xs text-slate-400">{service.note}</p>
    </div>
  </div>
));

// ─── ContactCard ──────────────────────────────────────────────────────────────
const ContactCard = memo(({ contact }) => (
  <a
    href={contact.href}
    className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
    style={{ borderLeftWidth: "4px", borderLeftColor: "#10b981" }}
  >
    {/* Shimmer sweep on hover */}
    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-emerald-50/70 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />

    {/* Icon */}
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-emerald-200">
      {contact.type === "phone" ? <PhoneIcon /> : <EmailIcon />}
    </div>

    {/* Text */}
    <div className="relative flex-1 min-w-0">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{contact.label}</p>
      <p className="mt-0.5 truncate text-sm font-bold text-slate-800 transition-colors duration-200 group-hover:text-emerald-700">
        {contact.value}
      </p>
      <p className="mt-0.5 text-xs text-slate-400">{contact.note}</p>
    </div>

    {/* Arrow */}
    <div className="relative mt-1 text-slate-300 transition-colors duration-200 group-hover:text-emerald-500">
      <ArrowIcon />
    </div>
  </a>
));

// ─── VisitUs ──────────────────────────────────────────────────────────────────
function VisitUs() {
  return (
    <main aria-labelledby="visit-page-heading">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700">
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-10"
          aria-hidden="true"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        {/* Diagonal bottom slice */}
        <div className="absolute -bottom-1 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 72" fill="none" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
            <path d="M0 72V36L720 0L1440 36V72H0Z" fill="white" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 pb-28 pt-20 text-center sm:pb-36 sm:pt-28">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25">
            <CrossIcon />
          </div>
          <SectionPill>We'd love to meet you</SectionPill>
          <h1
            id="visit-page-heading"
            className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Visit Our Church
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-emerald-100 sm:text-lg">
            Whether it's your very first Sunday or you're finding your way back — our doors are open, and you are warmly expected.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SECTION 1 — LOCATION + MAP
      ══════════════════════════════════════ */}
      <section aria-labelledby="location-heading" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-4 flex flex-col items-center text-center">
            <SectionPill>Getting Here</SectionPill>
            <h2 id="location-heading" className="mt-4 text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
              Find Us in Katsutadai
            </h2>
            <AccentLine />
            <p className="mt-5 max-w-xl text-base text-slate-500">
              We meet every Sunday in the heart of Yachiyo-shi. Here's everything you need to plan your visit.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">

            {/* Left — location details */}
            <div className="flex flex-col gap-8">

              {/* Address card */}
              <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50/50 p-7 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                    <LocationIcon />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">{CHURCH.tagline}</p>
                    <p className="text-base font-extrabold text-slate-800">{CHURCH.name}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-white px-5 py-4">
                  <p className="text-sm font-semibold text-slate-700">{CHURCH.address.floor}</p>
                  <p className="text-sm text-slate-500">{CHURCH.address.city}</p>
                  <p className="text-sm text-slate-500">{CHURCH.address.country}</p>
                </div>

                <a
                  href={CHURCH.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-emerald-500 hover:shadow-md hover:shadow-emerald-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                >
                  <DirectionsIcon />
                  Get Directions on Google Maps
                </a>
              </div>

              {/* Service times */}
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-100" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Service Schedule</h3>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>
                <div className="flex flex-col gap-3">
                  {SERVICE_TIMES.map((s) => (
                    <ServiceTimeRow key={s.label} service={s} />
                  ))}
                </div>
              </div>

              {/* What to expect */}
              <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
                <h3 className="mb-4 text-base font-bold text-slate-800">What to Expect</h3>
                <ul className="space-y-3" aria-label="What to expect on your visit">
                  {WHAT_TO_EXPECT.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — sticky map */}
            <div className="sticky top-24">
              <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/60">
                <div className="relative h-80 bg-emerald-50 sm:h-[420px] lg:h-[500px]">
                  <iframe
                    title="JFAAC Katsutadai on Google Maps"
                    src={CHURCH.mapSrc}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                {/* Map footer */}
                <div className="flex items-center justify-between bg-slate-800 px-6 py-4">
                  <div>
                    <p className="text-xs font-bold text-white">{CHURCH.name}</p>
                    <p className="text-xs text-slate-400">{CHURCH.address.city}, Japan</p>
                  </div>
                  <a
                    href={CHURCH.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold text-white transition-colors duration-200 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800"
                  >
                    Open Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle section separator */}
      <div className="mx-auto max-w-5xl px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" aria-hidden="true" />
      </div>

      {/* ══════════════════════════════════════
          SECTION 2 — CONTACT INFORMATION
      ══════════════════════════════════════ */}
      <section aria-labelledby="contact-heading" className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">

            {/* Left — copy + reassurance */}
            <div>
              <SectionPill>Reach Out</SectionPill>
              <h2
                id="contact-heading"
                className="mt-4 text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl"
              >
                We're Here to{" "}
                <span className="text-emerald-600">Help</span>
              </h2>
              <AccentLine />

              <p className="mt-6 text-base leading-relaxed text-slate-500">
                Whether you have a question before your first visit, need prayer, or just want to connect — we'd love to hear from you. Our team is ready and glad to respond.
              </p>

              <ul className="mt-8 space-y-4" aria-label="Contact assurances">
                {[
                  { icon: <PhoneIcon />, text: "We respond to calls and messages promptly" },
                  { icon: <EmailIcon />, text: "Emails answered within 24–48 hours" },
                  { icon: <CrossIcon />, text: "Prayer requests handled with full confidentiality" },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      {icon}
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              {/* Scripture callout */}
              <figure className="mt-10 rounded-2xl border-l-4 border-emerald-500 bg-white px-6 py-5 shadow-sm">
                <blockquote className="text-sm font-medium italic leading-relaxed text-slate-700">
                  "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you."
                </blockquote>
                <figcaption className="mt-2 text-xs font-bold not-italic text-emerald-600">— Matthew 7:7</figcaption>
              </figure>

              {/* Office hours */}
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <ClockIcon />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Office Hours</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                    Monday – Friday: 9:00 AM – 5:00 PM JST<br />
                    Saturday: 10:00 AM – 2:00 PM JST<br />
                    Sunday: Available before &amp; after service
                  </p>
                </div>
              </div>
            </div>

            {/* Right — contact cards */}
            <div className="flex flex-col gap-8">

              {/* Phone group */}
              <div>
                <GroupDivider icon={<PhoneIcon />} label="Phone" />
                <div className="flex flex-col gap-3">
                  {CONTACTS.filter((c) => c.type === "phone").map((c) => (
                    <ContactCard key={c.id} contact={c} />
                  ))}
                </div>
              </div>

              {/* Email group */}
              <div>
                <GroupDivider icon={<EmailIcon />} label="Email" />
                <div className="flex flex-col gap-3">
                  {CONTACTS.filter((c) => c.type === "email").map((c) => (
                    <ContactCard key={c.id} contact={c} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CLOSING WARM INVITE
      ══════════════════════════════════════ */}
      <section aria-label="Closing invitation" className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">

          {/* Pulsing cross ring */}
          <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center" aria-hidden="true">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-100 opacity-60" style={{ animationDuration: "3s" }} />
            <div className="absolute inset-2 rounded-full bg-emerald-100" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md">
              <CrossIcon />
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">
            Not sure what to expect?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-500">
            We completely understand. Taking that first step into a new church community can feel like a big deal. Send us a message first — we'll walk you through everything and make sure you feel ready and welcome before you ever arrive.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:info@gracechurch.jp"
              className="inline-flex items-center gap-2.5 rounded-full bg-emerald-600 px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <EmailIcon />
              Send Us a Message
            </a>
            <a
              href="tel:+819012345678"
              className="inline-flex items-center gap-2.5 rounded-full border-2 border-emerald-200 px-7 py-3.5 text-sm font-bold text-emerald-700 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <PhoneIcon />
              Call Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default memo(VisitUs);