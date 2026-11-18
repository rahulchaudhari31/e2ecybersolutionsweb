import { useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../../data/site";
import { footerNav, socialLinks } from "../../data/nav";
import Icon from "../ui/Icon";
import Button from "../ui/Button";
import TornDivider from "../ui/TornDivider";
import Reveal from "../animations/Reveal";
import SplitText from "../animations/SplitText";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const year = new Date().getFullYear();

  const handleNewsletter = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("Thanks — you're on the list.");
    setEmail("");
  };

  return (
    <footer className="relative bg-ink text-cream">
      <TornDivider
        className="absolute inset-x-0 -top-[29px] h-8 text-ink"
        variant={2}
      />

      <div className="container-x pb-8 pt-16 sm:pt-20">
        <div className="grid gap-10 border-b border-cream/10 pb-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/65">
              Your next move
            </p>
            <Link to="/contact" className="group mt-4 block">
              <SplitText
                as="h2"
                text="Let's build something loud."
                className="max-w-3xl font-display text-[clamp(2.7rem,6.4vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-cream"
                wordClassName="transition-colors duration-300 group-hover:text-pink-mid"
                stagger={0.038}
                amount={0.25}
              />
              <span className="mt-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/70 transition-colors group-hover:text-cream">
                Start the conversation
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-all duration-300 group-hover:border-pink group-hover:bg-pink">
                  <Icon
                    name="ArrowUpRight"
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </span>
            </Link>
          </div>

          <Reveal delay={0.1} y={20}>
            <div className="relative overflow-hidden rounded-[1.6rem] border border-cream/10 bg-cream/[0.04] p-6 sm:p-7">
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-pink/25 blur-3xl"
                aria-hidden="true"
              />
              <p className="relative font-hand text-2xl text-sunshine">
                Good things, occasionally.
              </p>
              <p className="relative mt-2 text-[13px] leading-relaxed text-cream/65">
                A short email with useful ideas, new work and the odd strong
                opinion. No noise.
              </p>
              <form onSubmit={handleNewsletter} className="relative mt-5">
                <label
                  htmlFor="footer-email"
                  className="text-[10px] font-bold uppercase tracking-[0.18em] text-cream/65"
                >
                  Email address
                </label>
                <div className="mt-2 flex items-center gap-2 rounded-full border border-cream/15 bg-ink/60 p-1.5 pl-4 transition-colors focus-within:border-pink">
                  <input
                    id="footer-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status) setStatus("");
                    }}
                    placeholder="you@company.com"
                    className="min-w-0 flex-1 bg-transparent py-2 text-[13px] text-cream placeholder:text-cream/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to the newsletter"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink text-cream transition-colors hover:bg-cream hover:text-ink"
                  >
                    <Icon name="Send" className="h-4 w-4" />
                  </button>
                </div>
                <p
                  id="newsletter-status"
                  aria-live="polite"
                  className="mt-2 min-h-[1.25rem] text-[11.5px] text-cream/65"
                >
                  {status || "One email a month. Unsubscribe any time."}
                </p>
              </form>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-14 pt-12 lg:grid-cols-[1.1fr_2fr]">
          <Reveal y={20}>
            <div>
              <Link
                to="/"
                aria-label={`${site.name} — home`}
                className="inline-flex items-baseline gap-2 font-display text-5xl font-extrabold tracking-tighter"
              >
                e2e
                <span
                  className="mb-2 h-3 w-3 rounded-full bg-pink"
                  aria-hidden="true"
                />
              </Link>
              <p className="mt-2 font-display text-2xl leading-tight text-cream/85 sm:text-3xl">
                Cyber Solutions.
              </p>
              <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-cream/65">
                {site.subTagline.toLowerCase()}. An integrated web development,
                marketing and creative agency with digital at its core.
              </p>

              <Button
                to="/contact"
                variant="pink"
                className="mt-7"
                icon="ArrowUpRight"
              >
                Start a project
              </Button>

              <div className="mt-9 space-y-3.5 text-[13.5px]">
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 text-cream/65 transition-colors hover:text-pink-mid"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/[0.06]">
                    <Icon name="Phone" className="h-3.5 w-3.5" />
                  </span>
                  {site.phone}
                </a>
                <a
                  href={site.emailHref}
                  className="flex items-center gap-3 break-all text-cream/65 transition-colors hover:text-pink-mid"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream/[0.06]">
                    <Icon name="Mail" className="h-3.5 w-3.5" />
                  </span>
                  {site.email}
                </a>
                <p className="flex items-start gap-3 text-cream/65">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream/[0.06]">
                    <Icon name="MapPin" className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    {site.address.line1}
                    <br />
                    {site.address.city}, {site.address.postcode}
                  </span>
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.services.map((group, index) => (
              <Reveal key={group.id} y={16} delay={index * 0.06}>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/65">
                    {group.label}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {group.services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          to={service.path}
                          className="text-[13px] text-cream/65 transition-colors hover:text-pink-mid"
                        >
                          {service.navLabel}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}

            <Reveal y={16} delay={footerNav.services.length * 0.06}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/65">
                  Agency
                </p>
                <ul className="mt-4 space-y-2">
                  {footerNav.company.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        className="text-[13px] text-cream/65 transition-colors hover:text-pink-mid"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-cream/65">
                  Social
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/65 transition-colors hover:border-pink hover:bg-pink hover:text-cream"
                    >
                      <Icon name={social.icon} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal y={14}>
          <div className="mt-14 flex flex-col gap-4 border-t border-cream/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11.5px] text-cream/65">
              © {year} {site.name}. All rights reserved.
            </p>
            <p className="font-hand text-xl text-cream/65">
              creative chaos, strategically executed.
            </p>
            <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream/65">
              <Link to="/services" className="transition-colors hover:text-cream">
                Services
              </Link>
              <Link to="/insights" className="transition-colors hover:text-cream">
                Insights
              </Link>
              <Link to="/contact" className="transition-colors hover:text-cream">
                Contact
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
