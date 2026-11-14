import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";
import { site } from "../data/site";
import EnquiryForm from "../components/forms/EnquiryForm";
import Reveal from "../components/animations/Reveal";
import Eyebrow from "../components/ui/Eyebrow";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import TornDivider from "../components/ui/TornDivider";

const addressQuery = encodeURIComponent(
  `${site.address.line1}, ${site.address.city}, ${site.address.postcode}, ${site.address.country}`
);
const mapEmbedUrl = `https://www.google.com/maps?q=${addressQuery}&output=embed`;
const mapLink = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;

const contactDetails = [
  {
    key: "phone",
    label: "Call us",
    value: site.phone,
    copyValue: site.phone,
    copyLabel: "phone number",
    note: "New business and general enquiries.",
    href: site.phoneHref,
    icon: "Phone",
    accent: "bg-pink/10 text-pink",
  },
  {
    key: "email",
    label: "Email us",
    value: site.email,
    copyValue: site.email,
    copyLabel: "email address",
    note: "We'll point you to the right person.",
    href: site.emailHref,
    icon: "Mail",
    accent: "bg-lilac text-ink",
  },
  {
    key: "address",
    label: "Visit us",
    value: site.address.line1,
    copyValue: `${site.address.line1}, ${site.address.city}, ${site.address.postcode}`,
    copyLabel: "address",
    note: `${site.address.city}, ${site.address.postcode}`,
    href: mapLink,
    external: true,
    icon: "MapPin",
    accent: "bg-sunshine text-ink",
  },
];

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    let copied = false;
    try {
      await navigator.clipboard.writeText(value);
      copied = true;
    } catch {
      copied = false;
    }
    if (copied) return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function ContactDetail({ item }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const handleCopy = async () => {
    try {
      await copyText(item.copyValue);
      setCopied(true);
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="group flex items-center gap-3.5 rounded-[1.4rem] border border-ink/10 bg-cream-50 p-4 transition-all duration-500 hover:border-pink/25 hover:shadow-soft sm:p-5">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${item.accent} transition-transform duration-500 group-hover:-rotate-6`}
      >
        <Icon name={item.icon} className="h-5 w-5" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-ink/65">
          {item.label}
        </p>
        <a
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
          className="mt-0.5 block break-words text-[15px] font-semibold leading-snug tracking-tight text-ink transition-colors hover:text-pink"
        >
          {item.value}
        </a>
        <p className="mt-0.5 text-[11.5px] text-ink/65">{item.note}</p>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={
          copied
            ? `${item.label} copied`
            : `Copy ${item.copyLabel || item.label.toLowerCase()}`
        }
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${
          copied
            ? "border-pink bg-pink text-cream"
            : "border-ink/10 bg-cream text-ink/45 hover:border-pink/30 hover:text-pink"
        }`}
      >
        <Icon
          name={copied ? "Check" : "Copy"}
          className="h-3.5 w-3.5"
          strokeWidth={2}
        />
      </button>
    </div>
  );
}

function MapEmbed() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-lilac shadow-lift">
      <iframe
        src={mapEmbedUrl}
        title={`Google Map showing ${site.address.line1}, ${site.address.city}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-[380px] w-full border-0 sm:h-[470px]"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <span className="absolute inset-0 -m-5 animate-ping rounded-full bg-pink/20" />
        <span className="relative flex flex-col items-center">
          <span className="mb-1.5 rounded-full bg-ink px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-cream shadow-soft">
            e2e HQ
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-cream bg-pink text-cream shadow-pink">
            <Icon name="MapPin" className="h-5 w-5" strokeWidth={2.4} />
          </span>
        </span>
      </div>

      <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-cream/40 bg-cream/95 p-4 shadow-soft backdrop-blur sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-[19rem]">
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-ink/65">
          Birmingham studio
        </p>
        <p className="mt-1 font-display text-lg font-semibold leading-tight tracking-tight">
          {site.address.line1}
        </p>
        <p className="mt-0.5 text-[12px] text-ink/65">
          {site.address.city}, {site.address.postcode}
        </p>
        <a
          href={mapLink}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-pink transition-colors hover:text-pink-dark"
        >
          Open in Google Maps
          <Icon name="ArrowUpRight" className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

function Breadcrumb() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-ink/65"
    >
      <Link to="/" className="transition-colors hover:text-pink">
        Home
      </Link>
      <span aria-hidden="true" className="text-ink/25">
        /
      </span>
      <span>Contact</span>
    </nav>
  );
}

export default function Contact() {
  usePageMeta({
    title: "Contact",
    description:
      "Start a project with e2e Cyber Solutions in Birmingham. Call 0121 271 0369, email info@e2ecybersolutions.com or visit 1204b Stratford Road, B28 8HN.",
  });

  return (
    <>
      <section className="relative overflow-hidden bg-cream pt-[92px] sm:pt-[104px]">
        <div
          className="pointer-events-none absolute inset-0 grid-lines opacity-70 mask-fade-b"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-36 top-16 h-[30rem] w-[30rem] rounded-full bg-radial-pink"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-radial-yellow opacity-60"
          aria-hidden="true"
        />

        <div className="container-x relative pb-16 pt-8 sm:pt-10 lg:pb-24 lg:pt-14">
          <Breadcrumb />

          <div className="mt-7 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14 xl:gap-20">
            <div className="lg:sticky lg:top-28">
              <Reveal y={16}>
                <Eyebrow tone="pink">Contact</Eyebrow>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="mt-5 font-display text-[clamp(2.85rem,6.4vw,5.3rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-ink">
                  Say hello.
                  <br />
                  Tell us what you're{" "}
                  <span className="text-pink">building.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink/65">
                  {site.contact.intro}
                </p>
              </Reveal>

              <div className="mt-8 space-y-2.5">
                {contactDetails.map((item, index) => (
                  <Reveal key={item.key} delay={0.12 + index * 0.04}>
                    <ContactDetail item={item} />
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.26}>
                <p className="mt-5 flex items-center gap-2 font-hand text-xl text-ink/65">
                  <Icon name="Sparkles" className="h-4 w-4 text-pink" />
                  free review, straight answers, no jargon
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.08} y={30}>
              <div className="rounded-[2rem] border border-ink/10 bg-cream-50 p-5 shadow-lift sm:p-7 lg:p-8">
                <EnquiryForm source="contact-page" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative border-y border-ink/[0.06] bg-cream-100 section-pad">
        <div className="container-x">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Reveal y={16}>
                <Eyebrow tone="pink">Come say hello</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                  Find us in{" "}
                  <span className="text-pink">Birmingham.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[13.5px] leading-relaxed text-ink/65">
                Pop in for a coffee, a chat or a proper look at what you're
                working on. The kettle is usually on.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-9">
            <MapEmbed />
          </Reveal>
        </div>
      </section>

      <section className="relative bg-cream section-pad">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <Reveal y={16}>
                <Eyebrow tone="pink">What happens next</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-4xl leading-[1.03] tracking-[-0.04em] sm:text-5xl">
                  No mystery.
                  <br />
                  <span className="text-pink">No hard sell.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-ink/65">
                  Three simple steps from first message to a clear
                  recommendation.
                </p>
              </Reveal>
              <Reveal delay={0.14} className="mt-8">
                <div className="rounded-[1.75rem] bg-ink p-6 text-cream">
                  <p className="font-hand text-2xl text-sunshine">
                    rather just talk?
                  </p>
                  <a
                    href={site.phoneHref}
                    className="mt-2 block font-display text-2xl font-semibold tracking-tight transition-colors hover:text-pink-mid"
                  >
                    {site.phone}
                  </a>
                  <p className="mt-2 text-[12px] text-cream/65">
                    Ask for new accounts.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:gap-0">
              {site.contact.next.map((step, index) => (
                <Reveal
                  key={step.step}
                  delay={index * 0.07}
                  className="h-full"
                >
                  <div className="flex h-full flex-col rounded-[1.5rem] border border-ink/10 bg-cream-50 p-6 lg:rounded-none lg:border-0 lg:border-t lg:border-ink/15 lg:bg-transparent lg:px-5 lg:pt-5 lg:first:pl-0 lg:last:pr-0">
                    <span className="font-hand text-2xl text-pink">
                      {step.step}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink/65">
                      {step.text}
                    </p>
                    {index < site.contact.next.length - 1 ? (
                      <span className="mt-auto hidden pt-6 text-ink/20 lg:block">
                        <Icon name="ArrowRight" className="h-4 w-4" />
                      </span>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-pink py-12 text-cream sm:py-14">
        <TornDivider
          className="absolute inset-x-0 -top-[29px] h-8 text-pink"
          variant={4}
        />
        <div className="container-x flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-hand text-2xl text-sunshine">let's talk</p>
            <p className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Prefer to talk it through?
            </p>
          </div>
          <a
            href={site.phoneHref}
            className="font-display text-4xl font-semibold tracking-[-0.04em] transition-colors hover:text-sunshine sm:text-5xl"
          >
            {site.phone}
          </a>
          <Button href={site.emailHref} variant="cream" icon="Mail">
            {site.email}
          </Button>
        </div>
      </section>
    </>
  );
}
