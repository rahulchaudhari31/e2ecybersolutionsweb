import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import usePageMeta from "../../hooks/usePageMeta";
import { site } from "../../data/site";
import { servicePreviews } from "../../data/images";
import { Reveal, SplitText } from "../animations";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import ServiceCard from "../ui/ServiceCard";
import SectionHeading from "../ui/SectionHeading";
import TornDivider from "../ui/TornDivider";
import CtaSection from "../sections/CtaSection";

const tones = {
  pink: {
    panel: "bg-pink text-cream",
    chip: "bg-pink/10 text-pink",
    icon: "text-cream",
    on: "text-cream",
    muted: "text-cream/70",
    glow: "bg-radial-pink",
    line: "bg-cream/20",
  },
  lilac: {
    panel: "bg-lilac text-ink",
    chip: "bg-lilac text-ink",
    icon: "text-pink",
    on: "text-ink",
    muted: "text-ink/65",
    glow: "bg-[radial-gradient(circle_at_center,rgba(216,204,238,0.95),rgba(216,204,238,0)_70%)]",
    line: "bg-ink/15",
  },
  yellow: {
    panel: "bg-sunshine text-ink",
    chip: "bg-sunshine text-ink",
    icon: "text-ink",
    on: "text-ink",
    muted: "text-ink/65",
    glow: "bg-radial-yellow",
    line: "bg-ink/15",
  },
  sunshine: {
    panel: "bg-sunshine text-ink",
    chip: "bg-sunshine text-ink",
    icon: "text-ink",
    on: "text-ink",
    muted: "text-ink/65",
    glow: "bg-radial-yellow",
    line: "bg-ink/15",
  },
  cream: {
    panel: "bg-cream-200 text-ink",
    chip: "bg-cream-200 text-ink",
    icon: "text-pink",
    on: "text-ink",
    muted: "text-ink/65",
    glow: "bg-radial-yellow",
    line: "bg-ink/15",
  },
  ink: {
    panel: "bg-ink text-cream",
    chip: "bg-ink/[0.06] text-ink",
    icon: "text-sunshine",
    on: "text-cream",
    muted: "text-cream/70",
    glow: "bg-[radial-gradient(circle_at_center,rgba(20,16,26,0.2),rgba(20,16,26,0)_70%)]",
    line: "bg-cream/20",
  },
};

const previewByCategory = {
  "design-development": 3,
  "digital-marketing": 1,
  creative: 5,
};

function HeroArt({ service, tone, reducedMotion }) {
  return (
    <div
      className={`relative aspect-[4/4.35] overflow-hidden rounded-[2.2rem] ${tone.panel} shadow-lift`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-current" />
        <div className="absolute left-1/2 top-1/2 h-[56%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-current" />
        <div className="absolute inset-0 grid-lines-light" />
      </div>

      <span
        className={`absolute left-5 top-5 rounded-full border border-current/15 px-3 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.16em] ${tone.muted}`}
      >
        {service.isGroup ? "Group service" : "Specialist service"}
      </span>

      <motion.div
        animate={
          reducedMotion
            ? undefined
            : { y: [0, -10, 0], rotate: [-3, 2, -3] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative flex h-36 w-36 items-center justify-center rounded-[2rem] border border-current/15 bg-current/[0.06] backdrop-blur-sm sm:h-44 sm:w-44">
          <Icon
            name={service.icon}
            className={`h-16 w-16 sm:h-20 sm:w-20 ${tone.icon}`}
            strokeWidth={1.25}
          />
          <span
            className={`absolute -right-4 -top-4 flex h-11 w-11 items-center justify-center rounded-full ${tone.chip}`}
          >
            <Icon name="Sparkles" className="h-5 w-5" />
          </span>
        </div>
      </motion.div>

      <span
        className={`absolute bottom-5 left-5 font-hand text-2xl ${tone.on}`}
      >
        {service.note}
      </span>
      <span
        className={`absolute bottom-5 right-5 text-[9px] font-bold uppercase tracking-[0.18em] ${tone.muted}`}
      >
        e2e / {service.isGroup ? "collective" : "specialist"}
      </span>
    </div>
  );
}

function DeliverableList({ items }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.5,
            delay: (index % 2) * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-start gap-3 rounded-[1.15rem] border border-cream/10 bg-cream/[0.055] p-4"
        >
          <motion.span
            initial={{ scale: 0.4, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.35,
              delay: 0.08 + (index % 2) * 0.05,
              type: "spring",
              stiffness: 260,
              damping: 16,
            }}
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sunshine text-ink"
          >
            <Icon name="Check" className="h-3.5 w-3.5" strokeWidth={3} />
          </motion.span>
          <span className="text-[13.5px] leading-snug text-cream/85">
            {item}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

function FaqItem({ item, index, open, onToggle }) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="border-b border-ink/10">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-5 py-5 text-left"
        >
          <span className="flex gap-4">
            <span className="mt-0.5 font-hand text-xl text-pink">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-[1.15rem] font-semibold leading-snug tracking-tight text-ink sm:text-[1.3rem]">
              {item.q}
            </span>
          </span>
          <span
            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              open
                ? "border-pink bg-pink text-cream"
                : "border-ink/15 text-ink/65"
            }`}
          >
            <Icon name={open ? "Minus" : "Plus"} className="h-4 w-4" />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.22 },
            }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-9 pr-10 text-[14px] leading-relaxed text-ink/65">
              {item.a}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function ServicePage({ service }) {
  const [openFaq, setOpenFaq] = useState(0);
  const reducedMotion = useReducedMotion();
  const tone = tones[service.theme] || tones.cream;
  const preview = servicePreviews[previewByCategory[service.category] ?? 0];

  usePageMeta({
    title: service.title,
    description: service.meta,
  });

  return (
    <>
      <section className="relative overflow-hidden bg-cream pt-[72px] sm:pt-20">
        <div
          className="pointer-events-none absolute inset-0 grid-lines opacity-70 mask-fade-b"
          aria-hidden="true"
        />
        <div
          className={`pointer-events-none absolute -right-24 -top-16 h-[30rem] w-[30rem] rounded-full ${tone.glow}`}
          aria-hidden="true"
        />

        <div className="container-x relative pb-16 pt-12 sm:pt-16 lg:pb-24 lg:pt-20">
          <Reveal y={12}>
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
              <Link to="/services" className="transition-colors hover:text-pink">
                Services
              </Link>
              <span aria-hidden="true" className="text-ink/25">
                /
              </span>
              <span>{service.title}</span>
            </nav>
          </Reveal>

          <div className="mt-7 grid gap-10 lg:grid-cols-[1.16fr_0.84fr] lg:items-end lg:gap-16">
            <div>
              <Reveal y={16}>
                <Eyebrow tone="pink">{service.eyebrow}</Eyebrow>
              </Reveal>

              <SplitText
                as="h1"
                text={service.title}
                className="mt-5 font-display text-[clamp(2.8rem,6.4vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-ink"
                delay={0.12}
                stagger={0.035}
              />

              <Reveal delay={0.2}>
                <p className="mt-6 max-w-xl text-[17px] font-medium leading-relaxed text-ink/70 sm:text-lg">
                  {service.headline}
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <p className="mt-3 font-hand text-2xl text-ink/65">
                  {service.note}
                </p>
              </Reveal>

              <Reveal delay={0.28} className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                <Button to="/contact" icon="ArrowUpRight">
                  Start a project
                </Button>
                <Button
                  href={site.phoneHref}
                  variant="outline"
                  icon="Phone"
                >
                  {site.phone}
                </Button>
              </Reveal>

              <Reveal delay={0.32} className="mt-6 flex flex-wrap gap-2">
                {[
                  "Birmingham, UK",
                  "Free digital review",
                  "Part of e2e World",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-cream-50 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink/65"
                  >
                    <Icon name="Check" className="h-3 w-3 text-pink" />
                    {item}
                  </span>
                ))}
              </Reveal>
            </div>

            <Reveal delay={0.18} y={30}>
              <HeroArt
                service={service}
                tone={tone}
                reducedMotion={reducedMotion}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative border-y border-ink/[0.06] bg-cream-100 section-pad">
        <div className="container-x">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="What we do"
              title={service.offeringsTitle}
              description="The practical pieces that make up the service - scoped around your business, not pulled off a shelf."
            />
            <Reveal delay={0.1}>
              <span className="font-hand text-2xl text-ink/65">
                {String(service.offerings.length).padStart(2, "0")} pieces, one
                plan
              </span>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.offerings.map((offering, index) => {
              const content = (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-hand text-xl text-pink">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        index % 2 === 0 ? "bg-lilac text-ink" : "bg-sunshine/50 text-ink"
                      } transition-transform duration-500 group-hover:-rotate-6`}
                    >
                      <Icon
                        name={service.isGroup ? "ArrowUpRight" : service.icon}
                        className="h-4 w-4"
                      />
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold leading-tight tracking-tight">
                    {offering.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-ink/65">
                    {offering.text}
                  </p>
                </>
              );

              return (
                <Reveal
                  key={offering.title}
                  delay={(index % 3) * 0.05}
                  className="h-full"
                >
                  {offering.to ? (
                    <Link
                      to={offering.to}
                      className="group flex h-full flex-col rounded-[1.5rem] border border-ink/10 bg-cream-50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-pink/25 hover:shadow-soft"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className="group flex h-full flex-col rounded-[1.5rem] border border-ink/10 bg-cream-50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-pink/25 hover:shadow-soft">
                      {content}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink section-pad text-cream">
        <TornDivider
          className="absolute inset-x-0 -top-[29px] h-8 text-ink"
          variant={2}
        />
        <div
          className="pointer-events-none absolute inset-0 grid-lines-light opacity-25"
          aria-hidden="true"
        />
        <div className="container-x relative grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <Reveal y={16}>
              <Eyebrow tone="dark">What you get</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl leading-[1.02] tracking-[-0.045em] text-cream sm:text-5xl">
                The deliverables,{" "}
                <span className="text-pink-mid">in plain English.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-[14px] leading-relaxed text-cream/65">
                Exactly what sits inside the work. No mystery, no padding -
                just the things that need to happen to get you from here to
                there.
              </p>
            </Reveal>
            <Reveal delay={0.16} className="mt-7">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-cream/15 bg-cream/[0.04] px-4 py-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pink text-cream">
                  <Icon name="Fingerprint" className="h-3.5 w-3.5" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/70">
                  Scoped to your project
                </span>
              </div>
            </Reveal>
          </div>

          <DeliverableList items={service.deliverables} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Reveal y={16}>
              <Eyebrow tone="pink">{service.split.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.02] tracking-[-0.045em] sm:text-5xl">
                {service.split.title}
              </h2>
            </Reveal>

            <div className="prose-e2e mt-6 max-w-xl">
              {service.intro.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.06 + index * 0.035}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="mt-7">
              <ul className="space-y-3">
                {service.split.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-center gap-3 text-[13.5px] font-medium text-ink/70"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink/10 text-pink">
                      <Icon name="Check" className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16} className="mt-8">
              <Button to="/contact" icon="ArrowUpRight">
                Talk it through
              </Button>
            </Reveal>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.08} y={30}>
              <div className="relative overflow-hidden rounded-[2.1rem] border border-ink/10 bg-cream-50 p-3 shadow-soft">
                <div className="relative aspect-[4/4.4] overflow-hidden rounded-[1.6rem]">
                  <img
                    src={preview.src}
                    alt={preview.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                  <span
                    className={`absolute left-4 top-4 flex h-14 w-14 items-center justify-center rounded-2xl ${tone.panel}`}
                  >
                    <Icon
                      name={service.icon}
                      className="h-6 w-6"
                      strokeWidth={1.6}
                    />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                    <p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-cream/65">
                      e2e / {service.isGroup ? "group service" : "specialist service"}
                    </p>
                    <p className="mt-1.5 max-w-[22ch] font-display text-2xl font-semibold leading-tight tracking-tight">
                      {service.note}
                    </p>
                    <p className="mt-3 font-hand text-xl text-sunshine">
                      built in Birmingham, working everywhere
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 px-3 pb-2 pt-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/65">
                    {service.title}
                  </span>
                  <Link
                    to="/contact"
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-pink transition-colors hover:text-pink-dark"
                  >
                    Ask about it
                    <Icon name="ArrowUpRight" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-sunshine section-pad text-ink">
        <div className="container-x">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="How it runs"
              title={
                <>
                  A short, clear path to{" "}
                  <span className="text-pink">the work.</span>
                </>
              }
              description="Five stages, one team, no mystery. The exact shape changes with the project, but the thinking stays the same."
            />
            <Reveal delay={0.1}>
              <span className="font-hand text-2xl text-ink/65">
                no hand-offs, just momentum
              </span>
            </Reveal>
          </div>

          <div className="relative mt-12">
            <div
              className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-ink/15 lg:block"
              aria-hidden="true"
            />
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
              {service.process.map((step, index) => (
                <Reveal
                  key={step.number}
                  as="li"
                  delay={(index % 5) * 0.05}
                  className="relative h-full"
                >
                  <div className="relative flex h-full flex-col">
                    <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-sunshine font-hand text-lg text-ink">
                      {step.number}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-ink/70">
                      {step.tag}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="relative bg-cream-100 section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal y={16}>
              <Eyebrow tone="pink">Questions</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl leading-[1.02] tracking-[-0.045em] sm:text-5xl">
                The things people{" "}
                <span className="text-pink">usually ask.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-ink/65">
                Still curious? Call us on{" "}
                <a
                  href={site.phoneHref}
                  className="font-semibold text-ink transition-colors hover:text-pink"
                >
                  {site.phone}
                </a>{" "}
                or send a note. We answer like people, not a ticket system.
              </p>
            </Reveal>
            <Reveal delay={0.14} className="mt-6">
              <Button to="/contact" variant="outline" icon="Mail">
                Ask a question
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div className="rounded-[2rem] border border-ink/10 bg-cream-50 px-6 py-2 shadow-soft sm:px-8">
              {service.faqs.map((item, index) => (
                <FaqItem
                  key={item.q}
                  item={item}
                  index={index}
                  open={openFaq === index}
                  onToggle={() =>
                    setOpenFaq((current) =>
                      current === index ? -1 : index
                    )
                  }
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-cream section-pad">
        <div className="container-x">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Keep exploring"
              title="More from the team."
              description="Good work rarely lives in one discipline. Here are a few services that tend to sit alongside this one."
            />
            <Reveal delay={0.1}>
              <Button to="/services" variant="outline" icon="ArrowRight">
                All services
              </Button>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.related.map((item, index) => (
              <Reveal
                key={item.slug}
                delay={(index % 3) * 0.06}
                className="h-full"
              >
                <ServiceCard
                  service={item}
                  index={String(index + 1).padStart(2, "0")}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        eyebrow="Next step"
        title={
          <>
            {service.title}.{" "}
            <span className="text-sunshine">Done properly.</span>
          </>
        }
        text="Tell us what you're trying to achieve. We'll tell you how this service fits, what it involves and what it would take to get there."
      />
    </>
  );
}
