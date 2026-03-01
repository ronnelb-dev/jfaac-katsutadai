import { useState, useCallback, memo } from "react";

// ─── Field config ─────────────────────────────────────────────────────────────
const FIELDS = [
  {
    id: "name",
    label: "Your Name",
    type: "text",
    placeholder: "e.g. Yuki Tanaka",
    required: true,
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    required: true,
  },
  {
    id: "phone",
    label: "Phone (optional)",
    type: "tel",
    placeholder: "+81 90-0000-0000",
    required: false,
  },
];

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  request: "",
  consent: false,
};

// ─── Inline field error ───────────────────────────────────────────────────────
const FieldError = memo(({ message }) =>
  message ? (
    <p role="alert" className="mt-1.5 text-xs font-medium text-red-500">
      {message}
    </p>
  ) : null,
);

// ─── PrayerRequestSection ─────────────────────────────────────────────────────
function PrayerRequestSection() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const toggleOpen = useCallback(() => setOpen((v) => !v), []);

  const handleChange = useCallback((e) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => (prev[id] ? { ...prev, [id]: undefined } : prev));
  }, []);

  const validate = useCallback((data) => {
    const errs = {};
    if (!data.name.trim()) errs.name = "Name is required.";
    if (!data.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(data.email))
      errs.email = "Enter a valid email.";
    if (!data.request.trim())
      errs.request = "Please share your prayer request.";
    if (!data.consent) errs.consent = "Please agree before submitting.";
    return errs;
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const errs = validate(form);
      if (Object.keys(errs).length) {
        setErrors(errs);
        return;
      }
      setStatus("submitting");
      setTimeout(() => {
        setStatus("success");
        setForm(EMPTY_FORM);
        setErrors({});
      }, 1200);
    },
    [form, validate],
  );

  const handleReset = useCallback(() => {
    setStatus("idle");
    setOpen(false);
  }, []);

  return (
    <section
      aria-labelledby="prayer-section-heading"
      className="bg-emerald-50 py-6 sm:py-6"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ══════════════════════════════════════════════════
            TOGGLE BUTTON — always visible, collapses everything
        ══════════════════════════════════════════════════ */}
        <button
          type="button"
          id="prayer-section-heading"
          onClick={toggleOpen}
          aria-expanded={open}
          aria-controls="prayer-panel"
          className={[
            "group flex w-full items-center justify-between gap-4 rounded-2xl border px-6 py-5 text-left",
            "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
            open
              ? "border-emerald-300 bg-white shadow-md shadow-emerald-100/60"
              : "border-emerald-200 bg-white hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-100/50",
          ].join(" ")}
        >
          <div className="flex items-center gap-4">
            {/* Icon */}
             <span
              className={[
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                open
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
              ].join(" ")}
              aria-hidden="true"
            >
              <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
                {/* Heroicons "hand-raised" — side view of an open raised hand */}
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M 15 3 C 13.355469 3 12 4.355469 12 6 L 12.015625 5.835938 L 11.03125 11.746094 L 9.140625 16.917969 C 9.105469 16.964844 9.0625 17 9 17 L 8 17 L 8 16 L 3 16 L 3 29 L 8 29 L 8 26 L 11.925781 26 C 13.570313 26 15.050781 25.203125 16 23.964844 C 16.949219 25.203125 18.429688 26 20.074219 26 L 24 26 L 24 29 L 29 29 L 29 16 L 24 16 L 24 17 L 23 17 C 22.9375 17 22.894531 16.964844 22.859375 16.917969 L 20.96875 11.746094 L 19.984375 5.835938 L 20 6 C 20 4.355469 18.644531 3 17 3 C 16.660156 3 16.3125 3.066406 16 3.226563 C 15.6875 3.066406 15.339844 3 15 3 Z M 14.964844 5.015625 C 14.984375 5.160156 15 5.488281 15 6 L 15 21.4375 C 14.722656 22.921875 13.445313 24 11.925781 24 L 8 24 L 8 19 L 9 19 C 9.785156 19 10.515625 18.574219 10.902344 17.890625 L 10.941406 17.816406 L 12.96875 12.253906 L 14 6.082031 L 14 6 C 14 5.449219 14.421875 5.035156 14.964844 5.015625 Z M 17.035156 5.015625 C 17.578125 5.035156 18 5.449219 18 6 L 18 6.082031 L 19.03125 12.253906 L 21.058594 17.816406 L 21.097656 17.890625 C 21.484375 18.574219 22.214844 19 23 19 L 24 19 L 24 24 L 20.074219 24 C 18.554688 24 17.277344 22.921875 17 21.4375 L 17 6 C 17 5.488281 17.015625 5.160156 17.035156 5.015625 Z M 5 18 L 6 18 L 6 27 L 5 27 Z M 26 18 L 27 18 L 27 27 L 26 27 Z" />
              </svg>
            </span>

            <div>
              <p
                className={`text-base font-bold transition-colors duration-200 ${open ? "text-emerald-700" : "text-slate-800"}`}
              >
                Share you Prayer Request
              </p>
              <p className="text-xs text-slate-400">
                {open
                  ? "Click to close"
                  : "Share a request · We believe in the power of prayer"}
              </p>
            </div>
          </div>

          {/* Chevron */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-5 w-5 shrink-0 transition-all duration-300 ${
              open
                ? "rotate-180 text-emerald-600"
                : "text-slate-300 group-hover:text-slate-400"
            }`}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* ══════════════════════════════════════════════════
            COLLAPSIBLE PANEL — intro copy + form
            Uses CSS grid-rows trick for smooth height animation.
        ══════════════════════════════════════════════════ */}
        <div
          id="prayer-panel"
          role="region"
          aria-labelledby="prayer-section-heading"
          className={[
            "grid transition-all duration-500 ease-in-out",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          ].join(" ")}
        >
          <div className="overflow-hidden">
            <div className="mt-4 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
              {/* ── Left — intro copy ── */}
              <div className="lg:pt-4">
                <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
                  We Believe in the
                  <br />
                  <span className="text-emerald-600">Power of Prayer</span>
                </h2>
                <div className="mb-6 h-1 w-12 rounded-full bg-emerald-500" />
                <p className="mb-6 text-base leading-relaxed text-slate-600">
                  You are not alone in what you are carrying. Our prayer team is
                  committed to lifting your needs before God — with compassion,
                  confidentiality, and faith.
                </p>
                <p className="text-base leading-relaxed text-slate-600">
                  Submit your request below and our team will pray for you
                  personally this week.
                </p>

                {/* Trust badges */}
                <ul className="mt-8 space-y-3" aria-label="Prayer commitments">
                  {[
                    "Held in complete confidence",
                    "Prayed over by our pastoral team",
                    "Responded to within 48 hours",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm font-medium text-slate-700"
                    >
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          className="h-3.5 w-3.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Right — form ── */}
              <div className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-lg shadow-emerald-100">
                {status === "success" ? (
                  /* Success state */
                  <div
                    className="flex flex-col items-center py-8 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        className="h-8 w-8"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <h3 className="mb-2 text-xl font-bold text-slate-800">
                      Prayer Request Received
                    </h3>
                    <p className="mb-6 text-sm text-slate-500">
                      Our prayer team will lift your request before God this
                      week. You are loved.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  /* Form */
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Prayer request form"
                  >
                    <h3 className="mb-6 text-lg font-bold text-slate-800">
                      Share Your Prayer Request
                    </h3>

                    <div className="space-y-5">
                      {FIELDS.map(
                        ({ id, label, type, placeholder, required }) => (
                          <div key={id}>
                            <label
                              htmlFor={id}
                              className="mb-1.5 block text-sm font-semibold text-slate-700"
                            >
                              {label}
                              {required && (
                                <span
                                  className="ml-1 text-red-400"
                                  aria-hidden="true"
                                >
                                  *
                                </span>
                              )}
                            </label>
                            <input
                              id={id}
                              type={type}
                              value={form[id]}
                              onChange={handleChange}
                              placeholder={placeholder}
                              required={required}
                              aria-required={required}
                              aria-describedby={
                                errors[id] ? `${id}-error` : undefined
                              }
                              aria-invalid={!!errors[id]}
                              className={[
                                "w-full rounded-xl border px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none",
                                "transition-colors duration-200",
                                "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
                                errors[id]
                                  ? "border-red-400 bg-red-50"
                                  : "border-slate-200 bg-slate-50 hover:border-slate-300",
                              ].join(" ")}
                            />
                            <span id={`${id}-error`}>
                              <FieldError message={errors[id]} />
                            </span>
                          </div>
                        ),
                      )}

                      {/* Textarea */}
                      <div>
                        <label
                          htmlFor="request"
                          className="mb-1.5 block text-sm font-semibold text-slate-700"
                        >
                          Your Prayer Request{" "}
                          <span
                            className="ml-1 text-red-400"
                            aria-hidden="true"
                          >
                            *
                          </span>
                        </label>
                        <textarea
                          id="request"
                          rows={4}
                          value={form.request}
                          onChange={handleChange}
                          placeholder="Please share what's on your heart..."
                          required
                          aria-required="true"
                          aria-describedby={
                            errors.request ? "request-error" : undefined
                          }
                          aria-invalid={!!errors.request}
                          className={[
                            "w-full resize-none rounded-xl border px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none",
                            "transition-colors duration-200",
                            "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
                            errors.request
                              ? "border-red-400 bg-red-50"
                              : "border-slate-200 bg-slate-50 hover:border-slate-300",
                          ].join(" ")}
                        />
                        <span id="request-error">
                          <FieldError message={errors.request} />
                        </span>
                      </div>

                      {/* Consent */}
                      <div>
                        <label className="flex cursor-pointer items-start gap-3">
                          <input
                            id="consent"
                            type="checkbox"
                            checked={form.consent}
                            onChange={handleChange}
                            aria-required="true"
                            aria-invalid={!!errors.consent}
                            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500"
                          />
                          <span className="text-xs leading-relaxed text-slate-500">
                            I consent to having my prayer request shared with
                            the pastoral prayer team. My information will be
                            kept confidential.
                          </span>
                        </label>
                        <FieldError message={errors.consent} />
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      aria-busy={status === "submitting"}
                      className="mt-6 w-full rounded-full bg-emerald-600 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-sm transition-all duration-300 hover:bg-emerald-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                    >
                      {status === "submitting" ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            />
                          </svg>
                          Submitting…
                        </span>
                      ) : (
                        "Submit Prayer Request"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(PrayerRequestSection);
