import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useController, useForm } from "react-hook-form";
import { individualServices } from "../../data/service-pages";
import { featuredServices } from "../../data/services";
import { site } from "../../data/site";
import { submitForm } from "../../lib/submitForm";
import Button from "../ui/Button";
import Icon from "../ui/Icon";

const fullServiceOptions = individualServices.map((service) => ({
  label: service.navLabel,
  value: service.slug,
}));

const compactServiceOptions = featuredServices.map((service) => ({
  label: service.navLabel,
  value: service.slug,
}));

const timelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "1-3 months",
  "3-6 months",
  "Just exploring",
];

const confettiColors = [
  "#CC0066",
  "#FFC83D",
  "#EDE7F6",
  "#14101A",
  "#F45BA8",
];

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  services: [],
  budget: 5000,
  timeline: "",
  message: "",
};

function formatBudget(value) {
  const amount = Number(value) || 0;
  if (amount >= 50000) return "£50,000+";
  return `£${amount.toLocaleString("en-GB")}`;
}

function FieldError({ id, message }) {
  return (
    <AnimatePresence initial={false}>
      {message ? (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -4 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden pt-1.5 text-[11.5px] font-medium text-pink-dark"
        >
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

function ConfettiBurst() {
  const reducedMotion = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => {
        const angle = (index / 34) * Math.PI * 2;
        const distance = 70 + (index % 7) * 17;
        return {
          id: index,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 38,
          rotate: 140 + (index % 9) * 58,
          delay: (index % 6) * 0.025,
          color: confettiColors[index % confettiColors.length],
          round: index % 3 === 0,
        };
      }),
    []
  );

  if (reducedMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0.5 }}
          animate={{
            opacity: [1, 1, 0],
            x: piece.x,
            y: piece.y,
            rotate: piece.rotate,
            scale: 1,
          }}
          transition={{
            duration: 1.45,
            delay: piece.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`absolute left-1/2 top-[38%] h-2.5 w-1.5 ${
            piece.round ? "rounded-full" : "rounded-[1px]"
          }`}
          style={{ backgroundColor: piece.color }}
        />
      ))}
    </div>
  );
}

export default function EnquiryForm({
  compact = false,
  source = "contact",
  headingId,
  onDone,
}) {
  const uid = useId().replace(/:/g, "");
  const reducedMotion = useReducedMotion();
  const headingRef = useRef(null);
  const successRef = useRef(null);
  const hasMounted = useRef(false);
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(null);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues,
  });

  const {
    field: servicesField,
    fieldState: { error: servicesError },
  } = useController({
    name: "services",
    control,
    rules: {
      validate: (value) =>
        (Array.isArray(value) && value.length > 0) ||
        "Choose at least one service.",
    },
  });

  const steps = compact
    ? [
        { label: "About you", fields: ["name", "email", "phone"] },
        { label: "Your project", fields: ["services", "message"] },
      ]
    : [
        { label: "About you", fields: ["name", "email", "phone"] },
        { label: "What you need", fields: ["services"] },
        { label: "Budget & brief", fields: ["timeline", "message"] },
      ];

  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;
  const budget = watch("budget");
  const serviceOptions = compact ? compactServiceOptions : fullServiceOptions;
  const selectedServices = Array.isArray(servicesField.value)
    ? servicesField.value
    : [];

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  useEffect(() => {
    if (success) successRef.current?.focus();
  }, [success]);

  const toggleService = (value) => {
    const next = selectedServices.includes(value)
      ? selectedServices.filter((item) => item !== value)
      : [...selectedServices, value];
    servicesField.onChange(next);
    if (servicesError) trigger("services");
  };

  const handleNext = async () => {
    const valid = await trigger(currentStep.fields, { shouldFocus: true });
    if (valid) setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const handleBack = () => {
    if (step === 0) return;
    setStep((current) => Math.max(current - 1, 0));
  };

  const handleStartAnother = () => {
    reset(defaultValues);
    setStep(0);
    setSuccess(null);
    setFormError("");
  };

  const onSubmit = async (values) => {
    setFormError("");
    try {
      const result = await submitForm({
        ...values,
        formVersion: compact ? "compact" : "full",
        source,
      });
      setSuccess(result);
    } catch {
      setFormError(
        "Something went wrong. Please try again or email us directly."
      );
    }
  };

  const fieldId = (name) => `${uid}-${name}`;
  const errorId = (name) => `${uid}-${name}-error`;
  const invalidClass = (name) =>
    errors[name] ? "!border-pink/60 shadow-[0_0_0_4px_rgba(204,0,102,0.08)]" : "";

  if (success) {
    const firstName = success.payload?.name?.split(" ")[0] || "there";

    return (
      <div
        role="status"
        aria-live="polite"
        className="relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden px-2 py-8 text-center"
      >
        <ConfettiBurst />

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.8, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-pink text-cream shadow-pink"
        >
          <Icon name="Check" className="h-7 w-7" strokeWidth={2.6} />
        </motion.div>

        <p className="mt-6 font-hand text-2xl text-pink">message received</p>
        <h2
          id={headingId}
          ref={successRef}
          tabIndex={-1}
          className="mt-2 max-w-md font-display text-3xl font-semibold leading-tight tracking-tight outline-none"
        >
          Thanks, {firstName}. Your enquiry is in.
        </h2>
        <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-ink/65">
          We'll look at what you've shared and come back within one working day.
          If it is urgent, call {site.phone}.
        </p>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-cream px-4 py-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink/65">
          Reference {success.reference}
        </span>

        <div className="mt-7 flex w-full flex-col justify-center gap-2.5 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon="RefreshCw"
            onClick={handleStartAnother}
          >
            Send another
          </Button>
          {onDone ? (
            <Button type="button" size="sm" icon="ArrowRight" onClick={onDone}>
              Back to the site
            </Button>
          ) : (
            <Button href={site.phoneHref} size="sm" icon="Phone">
              Call us
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-pink">
          Project enquiry
        </p>
        <h2
          id={headingId}
          ref={headingRef}
          tabIndex={-1}
          className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight outline-none sm:text-4xl"
        >
          {compact ? "Tell us the short version." : "Start a project."}
        </h2>
        <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-ink/65">
          A few quick questions so we can come back with something useful, not a
          generic sales deck.
        </p>
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/65">
          <span>
            Step {step + 1} of {steps.length}
          </span>
          <span>{currentStep.label}</span>
        </div>
        <div
          role="progressbar"
          aria-label="Enquiry progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink/10"
        >
          <motion.span
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="block h-full rounded-full bg-pink"
          />
        </div>
        <div className="mt-3 flex gap-2">
          {steps.map((item, index) => (
            <span
              key={item.label}
              className={`h-1 flex-1 rounded-full transition-colors ${
                index <= step ? "bg-pink/50" : "bg-ink/10"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-7 flex flex-1 flex-col"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={reducedMotion ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: -14 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            {step === 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="field-label" htmlFor={fieldId("name")}>
                    Full name
                  </label>
                  <input
                    id={fieldId("name")}
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    className={`field-input ${invalidClass("name")}`}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? errorId("name") : undefined}
                    {...register("name", {
                      required: "Please add your name.",
                      minLength: {
                        value: 2,
                        message: "That name looks a little short.",
                      },
                    })}
                  />
                  <FieldError
                    id={errorId("name")}
                    message={errors.name?.message}
                  />
                </div>

                <div>
                  <label className="field-label" htmlFor={fieldId("email")}>
                    Email address
                  </label>
                  <input
                    id={fieldId("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={`field-input ${invalidClass("email")}`}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? errorId("email") : undefined
                    }
                    {...register("email", {
                      required: "Please add your email.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "That email doesn't look right.",
                      },
                    })}
                  />
                  <FieldError
                    id={errorId("email")}
                    message={errors.email?.message}
                  />
                </div>

                <div>
                  <label className="field-label" htmlFor={fieldId("phone")}>
                    Phone number
                  </label>
                  <input
                    id={fieldId("phone")}
                    type="tel"
                    autoComplete="tel"
                    placeholder="07700 900000"
                    className={`field-input ${invalidClass("phone")}`}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone ? errorId("phone") : undefined
                    }
                    {...register("phone", {
                      required: "Please add a number we can reach you on.",
                      pattern: {
                        value: /^[+()\d\s-]{7,}$/,
                        message: "That phone number doesn't look right.",
                      },
                    })}
                  />
                  <FieldError
                    id={errorId("phone")}
                    message={errors.phone?.message}
                  />
                </div>
              </div>
            ) : null}

            {step === 1 ? (
              <fieldset
                aria-describedby={
                  servicesError ? errorId("services") : undefined
                }
              >
                <legend className="text-[15px] font-semibold tracking-tight text-ink">
                  Which services are you interested in?
                </legend>
                <p className="mt-1.5 text-[12px] leading-relaxed text-ink/65">
                  Pick as many as you like. We'll help you work out the right
                  mix.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {serviceOptions.map((option) => {
                    const selected = selectedServices.includes(option.value);
                    return (
                      <motion.button
                        key={option.value}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleService(option.value)}
                        whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-colors ${
                          selected
                            ? "border-pink bg-pink text-cream shadow-pink"
                            : "border-ink/15 bg-cream text-ink/70 hover:border-pink/40 hover:text-pink"
                        }`}
                      >
                        <motion.span
                          initial={false}
                          animate={{
                            width: selected ? 13 : 0,
                            opacity: selected ? 1 : 0,
                          }}
                          className="inline-flex overflow-hidden"
                          aria-hidden="true"
                        >
                          <Icon name="Check" className="h-3 w-3" strokeWidth={3} />
                        </motion.span>
                        {option.label}
                      </motion.button>
                    );
                  })}
                </div>
                <FieldError
                  id={errorId("services")}
                  message={servicesError?.message}
                />

                {compact ? (
                  <div className="mt-6">
                    <label className="field-label" htmlFor={fieldId("message")}>
                      Tell us a little about the project
                    </label>
                    <textarea
                      id={fieldId("message")}
                      rows={5}
                      placeholder="What are you building, and what does success look like?"
                      className={`field-input resize-none ${invalidClass(
                        "message"
                      )}`}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? errorId("message") : undefined
                      }
                      {...register("message", {
                        required: "Please tell us a little about the project.",
                        minLength: {
                          value: 10,
                          message: "A few more details would help.",
                        },
                      })}
                    />
                    <FieldError
                      id={errorId("message")}
                      message={errors.message?.message}
                    />
                  </div>
                ) : null}
              </fieldset>
            ) : null}

            {step === 2 ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-end justify-between gap-4">
                    <label
                      className="field-label !mb-0"
                      htmlFor={fieldId("budget")}
                    >
                      Indicative budget
                    </label>
                    <output
                      htmlFor={fieldId("budget")}
                      className="font-display text-xl font-semibold tracking-tight text-pink"
                    >
                      {formatBudget(budget)}
                    </output>
                  </div>
                  <input
                    id={fieldId("budget")}
                    type="range"
                    min={1000}
                    max={50000}
                    step={500}
                    className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-ink/10 accent-pink"
                    aria-valuetext={formatBudget(budget)}
                    {...register("budget", { valueAsNumber: true })}
                  />
                  <div className="mt-1.5 flex justify-between text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/45">
                    <span>£1k</span>
                    <span>£25k</span>
                    <span>£50k+</span>
                  </div>
                </div>

                <div>
                  <label className="field-label" htmlFor={fieldId("timeline")}>
                    Timeline
                  </label>
                  <div className="relative">
                    <select
                      id={fieldId("timeline")}
                      className={`field-input appearance-none pr-10 ${invalidClass(
                        "timeline"
                      )}`}
                      aria-invalid={Boolean(errors.timeline)}
                      aria-describedby={
                        errors.timeline ? errorId("timeline") : undefined
                      }
                      {...register("timeline", {
                        required: "When would you like to get started?",
                      })}
                    >
                      <option value="">Choose a timeline</option>
                      {timelineOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <Icon
                      name="ChevronDown"
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
                    />
                  </div>
                  <FieldError
                    id={errorId("timeline")}
                    message={errors.timeline?.message}
                  />
                </div>

                <div>
                  <label className="field-label" htmlFor={fieldId("message")}>
                    Tell us a little about the project
                  </label>
                  <textarea
                    id={fieldId("message")}
                    rows={5}
                    placeholder="What are you building, and what does success look like?"
                    className={`field-input resize-none ${invalidClass(
                      "message"
                    )}`}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? errorId("message") : undefined
                    }
                    {...register("message", {
                      required: "Please tell us a little about the project.",
                      minLength: {
                        value: 10,
                        message: "A few more details would help.",
                      },
                    })}
                  />
                  <FieldError
                    id={errorId("message")}
                    message={errors.message?.message}
                  />
                </div>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {formError ? (
            <motion.p
              role="alert"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-5 overflow-hidden rounded-2xl border border-pink/20 bg-pink/[0.06] px-4 py-3 text-[12px] font-medium leading-relaxed text-pink-dark"
            >
              {formError}
            </motion.p>
          ) : null}
        </AnimatePresence>

        <div className="mt-auto flex flex-col-reverse gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[12px] font-semibold text-ink/65 transition-colors hover:bg-ink/[0.04] hover:text-ink"
            >
              <Icon name="ArrowLeft" className="h-3.5 w-3.5" />
              Back
            </button>
          ) : (
            <p className="text-[10.5px] leading-relaxed text-ink/65">
              No hard sell. Just a useful reply.
            </p>
          )}

          {step < steps.length - 1 ? (
            <Button
              type="button"
              onClick={handleNext}
              icon="ArrowRight"
              className="w-full sm:w-auto"
            >
              Continue
            </Button>
          ) : (
            <Button
              type="submit"
              icon="Send"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Sending..." : "Send enquiry"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
