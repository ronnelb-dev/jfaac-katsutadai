import { useState, useCallback, memo } from "react";

// ─── Field config — drives the form map ─────────────────────────────────────
const FIELDS = [
  { id: "name",    label: "Your Name",          type: "text",     placeholder: "e.g. Yuki Tanaka",           required: true },
  { id: "email",   label: "Email Address",       type: "email",    placeholder: "you@example.com",            required: true },
  { id: "phone",   label: "Phone (optional)",    type: "tel",      placeholder: "+81 90-0000-0000",           required: false },
];

const EMPTY_FORM = { name: "", email: "", phone: "", request: "", consent: false };

// ─── Inline field error ──────────────────────────────────────────────────────
const FieldError = memo(({ message }) =>
  message ? (
    <p role="alert" className="mt-1.5 text-xs text-red-500 font-medium">
      {message}
    </p>
  ) : null
);

// ─── PrayerRequestSection ────────────────────────────────────────────────────
function PrayerRequestSection() {
  const [form,    setForm]    = useState(EMPTY_FORM);
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState("idle"); // idle | submitting | success

  // Generic change handler — avoids inline lambdas in JSX
  const handleChange = useCallback((e) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [id]: type === "checkbox" ? checked : value }));
    // Clear field error on change
    setErrors((prev) => (prev[id] ? { ...prev, [id]: undefined } : prev));
  }, []);

  const validate = useCallback((data) => {
    const errs = {};
    if (!data.name.trim())    errs.name    = "Name is required.";
    if (!data.email.trim())   errs.email   = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(data.email)) errs.email = "Enter a valid email.";
    if (!data.request.trim()) errs.request = "Please share your prayer request.";
    if (!data.consent)        errs.consent = "Please agree before submitting.";
    return errs;
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const errs = validate(form);
      if (Object.keys(errs).length) { setErrors(errs); return; }

      setStatus("submitting");
      // Simulate async submission (replace with real API call)
      setTimeout(() => {
        setStatus("success");
        setForm(EMPTY_FORM);
        setErrors({});
      }, 1200);
    },
    [form, validate]
  );

  const handleReset = useCallback(() => setStatus("idle"), []);

  return (
    <section
      aria-labelledby="prayer-heading"
      className="bg-emerald-50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">

          {/* ── Left — intro copy ── */}
          <div className="lg:pt-4">
            <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
              Prayer Ministry
            </span>
            <h2 id="prayer-heading" className="mb-5 text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
              We Believe in the<br />
              <span className="text-emerald-600">Power of Prayer</span>
            </h2>
            <div className="mb-6 h-1 w-12 rounded-full bg-emerald-500" />
            <p className="mb-6 text-base leading-relaxed text-slate-600">
              You are not alone in what you are carrying. Our prayer team is committed to lifting your needs before God — with compassion, confidentiality, and faith.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Submit your request below and our team will pray for you personally this week.
            </p>

            {/* Trust badges */}
            <ul className="mt-8 space-y-3" aria-label="Prayer ministry commitments">
              {["Held in complete confidence", "Prayed over by our pastoral team", "Responded to within 48 hours"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-3.5 w-3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right — form ── */}
          <div className="rounded-2xl bg-white p-8 shadow-lg shadow-emerald-100 border border-emerald-100">
            {status === "success" ? (
              /* ── Success state ── */
              <div className="flex flex-col items-center py-8 text-center" role="status" aria-live="polite">
                <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-8 w-8" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <h3 className="mb-2 text-xl font-bold text-slate-800">Prayer Request Received</h3>
                <p className="mb-6 text-sm text-slate-500">
                  Our prayer team will lift your request before God this week. You are loved.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} noValidate aria-label="Prayer request form">
                <h3 className="mb-6 text-lg font-bold text-slate-800">Share Your Prayer Request</h3>

                <div className="space-y-5">
                  {/* Text / email / tel fields */}
                  {FIELDS.map(({ id, label, type, placeholder, required }) => (
                    <div key={id}>
                      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-700">
                        {label}{required && <span className="ml-1 text-red-400" aria-hidden="true">*</span>}
                      </label>
                      <input
                        id={id}
                        type={type}
                        value={form[id]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required={required}
                        aria-required={required}
                        aria-describedby={errors[id] ? `${id}-error` : undefined}
                        aria-invalid={!!errors[id]}
                        className={[
                          "w-full rounded-xl border px-4 py-3 text-sm text-slate-700 placeholder-slate-400",
                          "transition-colors duration-200 outline-none",
                          "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
                          errors[id] ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50 hover:border-slate-300",
                        ].join(" ")}
                      />
                      <span id={`${id}-error`}>
                        <FieldError message={errors[id]} />
                      </span>
                    </div>
                  ))}

                  {/* Textarea */}
                  <div>
                    <label htmlFor="request" className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Your Prayer Request <span className="ml-1 text-red-400" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="request"
                      rows={4}
                      value={form.request}
                      onChange={handleChange}
                      placeholder="Please share what's on your heart..."
                      required
                      aria-required="true"
                      aria-describedby={errors.request ? "request-error" : undefined}
                      aria-invalid={!!errors.request}
                      className={[
                        "w-full resize-none rounded-xl border px-4 py-3 text-sm text-slate-700 placeholder-slate-400",
                        "transition-colors duration-200 outline-none",
                        "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
                        errors.request ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50 hover:border-slate-300",
                      ].join(" ")}
                    />
                    <span id="request-error">
                      <FieldError message={errors.request} />
                    </span>
                  </div>

                  {/* Consent checkbox */}
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
                        I consent to having my prayer request shared with the pastoral prayer team. My information will be kept confidential.
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
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
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
    </section>
  );
}

export default memo(PrayerRequestSection);
