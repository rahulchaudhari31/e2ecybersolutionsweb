import { useState } from "react";
import { motion } from "framer-motion";
import { site } from "../data/site";
import Icon from "./ui/Icon";
import Button from "./ui/Button";

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const getErrors = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please add your name.";
    if (!values.email.trim()) {
      next.email = "Please add your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "That email doesn't look right.";
    }
    if (!values.subject.trim()) next.subject = "Please add a subject.";
    if (!values.message.trim()) next.message = "Please tell us a little more.";
    return next;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const next = getErrors();
    setErrors(next);

    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    const subject = encodeURIComponent(
      `Website enquiry — ${values.subject.trim()}`
    );
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`
    );

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex min-h-[420px] flex-col items-center justify-center rounded-[2rem] border border-ink/10 bg-cream-50 p-8 text-center shadow-soft"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-pink text-cream">
          <Icon name="Check" className="h-6 w-6" strokeWidth={2.5} />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold">
          Your email app should be opening.
        </h3>
        <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-ink/65">
          If it doesn't, you can email us directly at{" "}
          <a
            href={site.emailHref}
            className="font-semibold text-pink underline underline-offset-4"
          >
            {site.email}
          </a>{" "}
          or call {site.phone}.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setValues(initialValues);
          }}
          className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink/65 transition-colors hover:text-pink"
        >
          <Icon name="ArrowLeft" className="h-3.5 w-3.5" />
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[2rem] border border-ink/10 bg-cream-50 p-5 shadow-soft sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            {site.contact.formTitle}
          </h2>
          <p className="mt-1.5 text-[12.5px] text-ink/65">
            {site.contact.formNote}
          </p>
        </div>
        <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink/10 text-pink sm:flex">
          <Icon name="Send" className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="name">
            Full name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={update}
            placeholder="Your name"
            className="field-input"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? (
            <p
              id="name-error"
              role="alert"
              className="mt-1.5 text-[11px] font-medium text-pink-dark"
            >
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label className="field-label" htmlFor="email">
            Email address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={update}
            placeholder="you@company.com"
            className="field-input"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p
              id="email-error"
              role="alert"
              className="mt-1.5 text-[11px] font-medium text-pink-dark"
            >
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="subject">
            Subject *
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            value={values.subject}
            onChange={update}
            placeholder="Website, marketing, branding…"
            className="field-input"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          />
          {errors.subject ? (
            <p
              id="subject-error"
              role="alert"
              className="mt-1.5 text-[11px] font-medium text-pink-dark"
            >
              {errors.subject}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="message">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            value={values.message}
            onChange={update}
            placeholder="Tell us about the project, the business and what you're trying to achieve."
            className="field-input resize-none"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message ? (
            <p
              id="message-error"
              role="alert"
              className="mt-1.5 text-[11px] font-medium text-pink-dark"
            >
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[28ch] text-[10.5px] leading-relaxed text-ink/65">
          We'll only use your details to reply to this enquiry.
        </p>
        <Button type="submit" icon="Send" className="w-full sm:w-auto">
          Send message
        </Button>
      </div>
    </form>
  );
}

