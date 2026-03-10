import { memo, useState, useCallback } from "react";

// ─── Official JFAAC Statement of Faith articles ───────────────────────────────
const ARTICLES = [
  {
    id:        "I",
    title:     "The Triune God",
    description:
      "There is one God, who is infinitely perfect, existing eternally in three persons: Father, Son, and Holy Spirit.",
    scripture: "Deuteronomy 6:4; Matthew 28:19; 2 Corinthians 13:14",
  },
  {
    id:        "II",
    title:     "The Lord Jesus Christ",
    description:
      "Jesus Christ is true God and true man. He was conceived by the Holy Spirit and born of the Virgin Mary. He died upon the cross, the Just for the unjust, as a substitutionary sacrifice, and all who believe in Him are justified on the ground of His shed blood. He arose from the dead according to the Scriptures. He is now at the right hand of the Majesty on high as our great High Priest. He will come again to establish His kingdom of righteousness and peace.",
    scripture: "John 1:1, 14; Luke 1:35; 1 Peter 3:18; Romans 5:9; 1 Corinthians 15:4; Hebrews 4:14–16; Acts 1:11",
  },
  {
    id:        "III",
    title:     "The Holy Spirit",
    description:
      "The Holy Spirit is a Divine Person, sent to indwell, guide, teach, empower the believer, and convince the world of sin, of righteousness, and of judgment.",
    scripture: "John 16:7–14; Acts 1:8; Romans 8:9–11; Ephesians 1:13–14",
  },
  {
    id:        "IV",
    title:     "The Holy Scriptures",
    description:
      "The Old and New Testaments, inerrant as originally given, were verbally inspired by God and are a complete revelation of His will for the salvation of men. They constitute the divine and only rule of Christian faith and practice.",
    scripture: "2 Timothy 3:16–17; 2 Peter 1:20–21; Psalm 119:105; John 17:17",
  },
  {
    id:        "V",
    title:     "The Nature of Man and Eternal Destiny",
    description:
      "Man was originally created in the image and likeness of God; he fell through disobedience, incurring thereby both physical and spiritual death. All men are born with a sinful nature, are separated from the life of God, and can be saved only through the atoning work of the Lord Jesus Christ. The portion of the impenitent and unbelieving is existence forever in conscious torment; and that of the believer, in everlasting joy and bliss.",
    scripture: "Genesis 1:26–27; Romans 3:23; 5:12; Ephesians 2:1–3; Revelation 20:15; John 3:16",
  },
  {
    id:        "VI",
    title:     "Salvation",
    description:
      "Salvation has been provided through Jesus Christ for all men; and those who repent and believe in Him are born again of the Holy Spirit, receive the gift of eternal life, and become the children of God.",
    scripture: "John 3:16–17; Acts 2:38; Romans 10:9–10; Titus 3:4–7; 1 John 5:11–13",
  },
  {
    id:        "VII",
    title:     "Sanctification and the Fullness of the Holy Spirit",
    description:
      "It is the will of God that each believer should be filled with the Holy Spirit and be sanctified wholly, being separated from sin and the world and fully dedicated to the will of God, thereby receiving power for holy living and effective service. This is both a crisis and a progressive experience wrought in the life of the believer subsequent to conversion.",
    scripture: "1 Thessalonians 5:23–24; Ephesians 5:18; Acts 1:8; Romans 12:1–2; 2 Corinthians 7:1",
  },
  {
    id:        "VIII",
    title:     "Divine Healing",
    description:
      "Provision is made in the redemptive work of the Lord Jesus Christ for the healing of the mortal body. Prayer for the sick and anointing with oil are taught in the Scriptures and are privileges for the Church in this present age.",
    scripture: "Isaiah 53:4–5; Matthew 8:16–17; James 5:14–15; Mark 16:17–18",
  },
  {
    id:        "IX",
    title:     "The Church",
    description:
      "The Church consists of all those who believe in the Lord Jesus Christ, are redeemed through His blood, and are born again of the Holy Spirit. Christ is the Head of the Body, the Church, which has been commissioned by Him to go into all the world as a witness, preaching the Gospel to all nations. The local church is a body of believers in Christ who are joined together for the worship of God, for edification through the Word of God, for prayer, fellowship, the proclamation of the Gospel, and observance of the ordinances of baptism and the Lord's Supper.",
    scripture: "Ephesians 1:22–23; Matthew 28:18–20; Acts 2:41–47; 1 Corinthians 11:23–26",
  },
  {
    id:        "X",
    title:     "The Resurrection",
    description:
      "There shall be a bodily resurrection of the just and the unjust; for the former, a resurrection unto life; for the latter, a resurrection unto judgment.",
    scripture: "John 5:28–29; 1 Corinthians 15:20–23; Revelation 20:11–15; Daniel 12:2",
  },
  {
    id:        "XI",
    title:     "The Second Coming of Christ",
    description:
      "The second coming of the Lord Jesus Christ is imminent and will be personal, visible, and premillennial. This is the believer's blessed hope and is a vital truth which is an incentive to holy living and faithful service.",
    scripture: "1 Thessalonians 4:13–17; Titus 2:13; Acts 1:11; Revelation 20:1–6",
  },
];

// First 6 go left, last 5 go right
const LEFT_ARTICLES  = ARTICLES.slice(0, 6);  // I – VI
const RIGHT_ARTICLES = ARTICLES.slice(6);     // VII – XI

// ─── Chevron icon ─────────────────────────────────────────────────────────────
const ChevronIcon = memo(({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
      open ? "rotate-180 text-emerald-600" : "text-slate-400"
    }`}
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
));

// ─── Single accordion item ────────────────────────────────────────────────────
const AccordionItem = memo(({ article, isOpen, onToggle }) => (
  <div
    className={[
      "overflow-hidden rounded-2xl border transition-all duration-300",
      isOpen
        ? "border-emerald-300 shadow-md shadow-emerald-100/60"
        : "border-slate-200 bg-white hover:border-emerald-200 hover:shadow-sm",
    ].join(" ")}
  >
    {/* Trigger */}
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`panel-${article.id}`}
      id={`trigger-${article.id}`}
      className={[
        "flex w-full items-center gap-3 px-4 py-4 text-left transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-inset",
        isOpen ? "bg-gradient-to-r from-emerald-50 to-teal-50/60" : "bg-white",
      ].join(" ")}
    >
      {/* Roman numeral badge */}
      <span
        className={[
          "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-black transition-colors duration-200",
          isOpen
            ? "border-emerald-600 bg-emerald-600 text-white"
            : "border-emerald-300 text-emerald-700",
        ].join(" ")}
        aria-hidden="true"
      >
        {article.id}
      </span>

      {/* Title */}
      <span
        className={`flex-1 text-sm font-bold tracking-tight transition-colors duration-200 sm:text-base ${
          isOpen ? "text-emerald-800" : "text-slate-800"
        }`}
      >
        {article.title}
      </span>

      <ChevronIcon open={isOpen} />
    </button>

    {/* Collapsible panel — CSS grid-rows trick, no JS height calc */}
    <div
      id={`panel-${article.id}`}
      role="region"
      aria-labelledby={`trigger-${article.id}`}
      className={[
        "grid transition-all duration-500 ease-in-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      ].join(" ")}
    >
      <div className="overflow-hidden">
        <div className="relative border-t border-emerald-100 bg-white px-5 py-5">
          {/* Left accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-bl-2xl bg-emerald-500"
            aria-hidden="true"
          />
          <p className="text-sm leading-7 text-slate-600">{article.description}</p>
          <p className="mt-4 text-xs italic text-slate-400">
            <span className="not-italic font-semibold text-emerald-600">Scripture: </span>
            {article.scripture}
          </p>
        </div>
      </div>
    </div>
  </div>
));

// ─── StatementOfFaith ─────────────────────────────────────────────────────────
function StatementOfFaith() {
  // One open at a time — null means all closed
  const [openId, setOpenId] = useState(null);

  const handleToggle = useCallback((id) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <main aria-labelledby="sof-main-heading">

      {/* ── Page header ── */}
      <header className="bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1
            id="sof-main-heading"
            className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl"
          >
            Statement of Faith
          </h1>
          <p className="mt-2 text-xl font-semibold text-slate-400 sm:text-2xl">
            Jesus For All Alliance Church
          </p>

          <div className="mt-6 flex items-center gap-4" aria-hidden="true">
            <div className="h-px flex-1 bg-slate-200" />
            <div className="h-1 w-16 rounded-full bg-emerald-500" />
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="mt-6 text-base leading-8 text-slate-600">
            The official Statement of Faith of Jesus For All Alliance Church — Katsutadai. These scripturally grounded convictions are the foundation of our worship, fellowship, and mission. Select any article below to read it in full.
          </p>
        </div>
      </header>

      {/* ── Two-column accordion ─────────────────────────────────────────────────
          Mobile  (< md): single column, all 11 articles stacked
          Desktop (md+):  two columns side-by-side
                          Left  → Articles I – VI   (6 items)
                          Right → Articles VII – XI  (5 items)
          This cuts the visual page length nearly in half on desktop.
      ── */}
      <div className="bg-slate-50 py-6">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <p className="mb-4 text-right text-xs font-semibold text-slate-400">
            {ARTICLES.length} articles of faith — tap to expand
          </p>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:items-start md:gap-4">

            {/* Left column — Articles I – VI */}
            <div className="flex flex-col gap-3">
              {LEFT_ARTICLES.map((article) => (
                <AccordionItem
                  key={article.id}
                  article={article}
                  isOpen={openId === article.id}
                  onToggle={() => handleToggle(article.id)}
                />
              ))}
            </div>

            {/* Right column — Articles VII – XI */}
            <div className="flex flex-col gap-3">
              {RIGHT_ARTICLES.map((article) => (
                <AccordionItem
                  key={article.id}
                  article={article}
                  isOpen={openId === article.id}
                  onToggle={() => handleToggle(article.id)}
                />
              ))}
            </div>

          </div>
        </div>
      </div>

    </main>
  );
}

export default memo(StatementOfFaith);