import { useState } from "react";
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";
import { site } from "../data/site";
import { aboutTeam, teamImageMap } from "../data/about";
import { aboutImages } from "../data/images";
import {
  CountUp,
  ParallaxImage,
  Reveal,
  SplitText,
  TiltCard,
} from "../components/animations";
import Eyebrow from "../components/ui/Eyebrow";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Marquee from "../components/ui/Marquee";
import TornDivider from "../components/ui/TornDivider";
import HorizontalProcess from "../components/sections/HorizontalProcess";
import CtaSection from "../components/sections/CtaSection";
import star from "../assets/starburst.svg";
import squiggle from "../assets/squiggle.svg";

const valueTones = {
  pink: {
    card: "bg-pink text-cream",
    index: "text-sunshine",
    body: "text-cream",
    icon: "text-cream/80",
  },
  yellow: {
    card: "bg-sunshine text-ink",
    index: "text-ink/65",
    body: "text-ink",
    icon: "text-ink/60",
  },
  lilac: {
    card: "bg-lilac text-ink",
    index: "text-ink/65",
    body: "text-ink",
    icon: "text-ink/60",
  },
  ink: {
    card: "bg-ink text-cream",
    index: "text-sunshine",
    body: "text-cream/85",
    icon: "text-cream/75",
  },
};

function TeamCard({ person, index }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const image = teamImageMap[person.image];
  const showBack = flipped || hovered;

  return (
    <Reveal delay={(index % 4) * 0.06} className="h-full">
      <button
        type="button"
        onClick={() => setFlipped((current) => !current)}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setHovered(false);
        }}
        aria-pressed={flipped}
        aria-label={`${person.name}, ${person.role}. Read their profile.`}
        className="h-[430px] w-full text-left outline-none [perspective:1200px] focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-4 focus-visible:ring-offset-ink sm:h-[450px]"
      >
        <div
          className={`relative h-full w-full transition-transform duration-700 ease-smooth [transform-style:preserve-3d] ${
            showBack ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[1.8rem] bg-ink [backface-visibility:hidden]">
            <img
              src={image?.src}
              alt={image?.alt || person.name}
              loading="lazy"
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
              <p className="font-hand text-xl text-sunshine">{person.role}</p>
              <h3 className="mt-1 font-display text-2xl font-semibold leading-tight tracking-tight">
                {person.name}
              </h3>
              <p className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/65">
                <Icon name="RefreshCw" className="h-3 w-3" />
                Hover or tap to flip
              </p>
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[1.8rem] border border-ink/10 bg-pink p-6 text-cream [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-7">
            <span
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sunshine/30 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-sm font-extrabold text-pink">
                  {person.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span className="font-hand text-xl text-sunshine">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold leading-tight">
                {person.name}
              </h3>
              <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-cream/75">
                {person.role}
              </p>
              <p className="mt-4 text-[13px] leading-relaxed text-cream">
                {person.bio}
              </p>
            </div>
            <div className="relative mt-5 border-t border-cream/20 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cream/75">
                Off the clock
              </p>
              <p className="mt-1.5 font-hand text-lg leading-tight text-cream">
                {person.fact}
              </p>
            </div>
          </div>
        </div>
      </button>
    </Reveal>
  );
}

export default function About() {
  usePageMeta({
    title: "About us",
    description:
      "As the digital wing of the e2e World, e2e Cyber Solutions is an integrated web development, marketing and creative agency with digital at its core.",
  });

  return (
    <>
      <section className="relative overflow-hidden bg-cream pt-[72px] sm:pt-20">
        <div
          className="pointer-events-none absolute inset-0 grid-lines opacity-70 mask-fade-b"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 -top-16 h-[32rem] w-[32rem] rounded-full bg-radial-pink"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-radial-yellow opacity-60"
          aria-hidden="true"
        />
        <img
          src={star}
          alt=""
          className="pointer-events-none absolute right-[7%] top-28 w-16 animate-spin-slow opacity-70 sm:w-24"
        />

        <div className="container-x relative pb-16 pt-12 sm:pt-16 lg:pb-24 lg:pt-24">
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
              <span>About</span>
            </nav>
          </Reveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
            <div>
              <Reveal y={16}>
                <Eyebrow tone="pink">About us</Eyebrow>
              </Reveal>
              <SplitText
                as="h1"
                text="The missing link between your business and its audience."
                className="mt-6 max-w-4xl font-display text-[clamp(2.9rem,7vw,6.2rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-ink"
                delay={0.15}
                stagger={0.035}
              />
              <Reveal delay={0.35}>
                <p className="mt-7 max-w-lg font-hand text-2xl text-ink/65 sm:text-3xl">
                  digital at the core - creative by instinct
                </p>
              </Reveal>
            </div>

            <div>
              <Reveal delay={0.2}>
                <p className="max-w-md text-[15px] leading-relaxed text-ink/65">
                  {site.about.intro}
                </p>
              </Reveal>
              <Reveal delay={0.26} className="mt-5 flex flex-wrap gap-2">
                {["Birmingham based", "One joined-up team", "1,000+ clients"].map(
                  (item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-cream-50 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink/65"
                    >
                      <Icon name="Check" className="h-3 w-3 text-pink" />
                      {item}
                    </span>
                  )
                )}
              </Reveal>
              <Reveal delay={0.32} className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <Button to="/contact" icon="ArrowUpRight">
                  Come say hello
                </Button>
                <Button to="/services" variant="outline" icon="ArrowRight">
                  See what we do
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-ink/10 bg-sunshine py-3 text-ink">
        <Marquee
          items={[
            "Creative",
            "Contemporary",
            "Credible",
            "Strategy",
            "Design",
            "Build",
            "Grow",
          ]}
          separator="✦"
          itemClassName="font-display text-[13px] font-semibold uppercase tracking-[0.12em]"
        />
      </section>

      <section className="relative overflow-hidden bg-cream section-pad">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal y={16}>
              <Eyebrow tone="pink">Our story</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-[2.4rem] leading-[1.02] tracking-[-0.045em] sm:text-5xl">
                Digital at the <span className="text-pink">core.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="prose-e2e mt-6 max-w-md">
                {site.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.16} className="mt-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-ink/10 bg-cream-50 px-4 py-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink text-cream">
                  <Icon name="Heart" className="h-3.5 w-3.5" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink/65">
                  Independent, integrated, invested
                </span>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <div className="grid gap-4 sm:grid-cols-2">
              <ParallaxImage
                src={aboutImages.storyOne.src}
                alt={aboutImages.storyOne.alt}
                className="aspect-[4/5] rounded-[2rem] sm:mt-16"
                amount={44}
                scale={1.18}
              />
              <ParallaxImage
                src={aboutImages.storyTwo.src}
                alt={aboutImages.storyTwo.alt}
                className="aspect-[4/5] rounded-[2rem]"
                amount={28}
                scale={1.14}
              />
            </div>

            <Reveal delay={0.12} className="relative z-10 mt-5 sm:-mt-10 sm:ml-auto sm:max-w-md">
              <div className="relative overflow-hidden rounded-[1.8rem] bg-ink p-6 text-cream shadow-lift sm:p-7">
                <span
                  className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-pink/35 blur-2xl"
                  aria-hidden="true"
                />
                <Icon
                  name="Quote"
                  className="relative h-7 w-7 text-pink-mid"
                  strokeWidth={1.5}
                />
                <p className="relative mt-3 font-display text-xl font-medium leading-tight tracking-tight sm:text-2xl">
                  Creative, contemporary and credible. With creativity as our
                  middle name, we stay on top of trends, have world-class ideas
                  and speak digital fluently.
                </p>
                <p className="relative mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream/65">
                  The e2e Cyber Solutions approach
                </p>
              </div>
            </Reveal>

            <img
              src={squiggle}
              alt=""
              className="pointer-events-none relative mt-6 w-40 opacity-60 sm:absolute sm:-bottom-10 sm:left-0 sm:mt-0"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="container-x">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal y={16}>
                <Eyebrow tone="pink">What we believe</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.03] tracking-[-0.04em] sm:text-5xl">
                  Four things we keep coming back to.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[14px] leading-relaxed text-ink/65">
                They shape how we plan, design, build and market - and they are
                the reason clients stay with us.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {site.about.values.map((value, index) => {
              const tone = valueTones[value.accent] || valueTones.ink;
              return (
                <Reveal
                  key={value.title}
                  delay={(index % 2) * 0.07}
                  className="h-full"
                >
                  <TiltCard className="h-full" max={5}>
                    <div
                      className={`group/value relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 transition-transform duration-500 ${tone.card}`}
                    >
                      <span
                        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cream/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover/value:opacity-100"
                        aria-hidden="true"
                      />
                      <div className="relative flex items-start justify-between gap-4">
                        <span className={`font-hand text-2xl ${tone.index}`}>
                          {value.index}
                        </span>
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-full border border-current/20 transition-transform duration-500 group-hover/value:-rotate-12 ${tone.icon}`}
                        >
                          <Icon name="Sparkles" className="h-4 w-4" />
                        </span>
                      </div>
                      <div className="relative">
                        <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-[1.7rem]">
                          {value.title}
                        </h3>
                        <p
                          className={`mt-2.5 max-w-sm text-[13.5px] leading-relaxed ${tone.body}`}
                        >
                          {value.text}
                        </p>
                        <span
                          className={`mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${tone.index}`}
                        >
                          <span className="h-px w-6 bg-current transition-all duration-500 group-hover/value:w-10" />
                          How we work
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <HorizontalProcess />

      <section className="relative overflow-hidden bg-ink section-pad text-cream">
        <TornDivider
          className="absolute inset-x-0 -top-[29px] h-8 text-ink"
          variant={4}
        />
        <div
          className="pointer-events-none absolute inset-0 grid-lines-light opacity-30"
          aria-hidden="true"
        />
        <div className="container-x relative">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal y={16}>
                <Eyebrow tone="dark">The people</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.03] tracking-[-0.04em] text-cream sm:text-5xl">
                  Small team.{" "}
                  <span className="text-pink-mid">Serious range.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[14px] leading-relaxed text-cream/65">
                Strategists, designers, developers and marketers in the same
                room. Hover a card to meet the person behind the discipline.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {aboutTeam.map((person, index) => (
              <TeamCard key={person.name} person={person} index={index} />
            ))}
          </div>

          <Reveal delay={0.1} className="mt-10">
            <div className="flex flex-col gap-4 rounded-[1.75rem] border border-cream/10 bg-cream/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-[14px] leading-relaxed text-cream/70">
                Want the full story, the chemistry or the bit where we explain
                why the website matters more than the logo? Start a
                conversation.
              </p>
              <Button to="/contact" variant="cream" icon="ArrowUpRight">
                Meet the team
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-sunshine section-pad text-ink">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-16">
            <div>
              <Reveal y={16}>
                <Eyebrow tone="ink">By the numbers</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-4xl leading-[1.02] tracking-[-0.045em] sm:text-5xl">
                  A decade of making digital{" "}
                  <span className="text-pink">do more.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-md text-[14px] leading-relaxed text-ink">
                  Real relationships, long-running retainers and a lot of work
                  that still earns its keep.
                </p>
              </Reveal>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {site.stats.map((stat, index) => (
                <Reveal
                  key={stat.label}
                  delay={(index % 2) * 0.06}
                  className="h-full"
                >
                  <div className="flex h-full min-h-[150px] flex-col justify-between rounded-[1.6rem] border border-ink/10 bg-cream/40 p-5">
                    <span className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                      <CountUp
                        value={stat.value}
                        suffix={stat.suffix}
                        className="font-display"
                      />
                    </span>
                    <div>
                      <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
                        {stat.label}
                      </p>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-ink/70">
                        {stat.note}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        eyebrow="Work with us"
        title={
          <>
            Got a project in mind?{" "}
            <span className="text-sunshine">Let's get into it.</span>
          </>
        }
        text="We're here to help you build a strong digital presence, whatever stage your business is at. Start with a conversation - no pressure, no jargon."
      />
    </>
  );
}
