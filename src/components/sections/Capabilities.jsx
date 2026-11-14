import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Reveal from "../animations/Reveal";
import SectionHeading from "../ui/SectionHeading";
import Icon from "../ui/Icon";
import star from "../../assets/starburst.svg";

function BuildVisual() {
  return (
    <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-lilac p-5 sm:p-7">
      <div className="dot-grid absolute inset-0 opacity-25" aria-hidden="true" />
      <span className="absolute right-5 top-5 z-10 rounded-full bg-pink px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-cream">
        Live
      </span>

      <div className="absolute left-[7%] top-[17%] w-[72%] -rotate-3 rounded-2xl border border-ink/10 bg-white p-3 shadow-soft sm:p-4">
        <div className="flex items-center gap-1.5 border-b border-ink/[0.06] pb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-pink" />
          <span className="h-1.5 w-1.5 rounded-full bg-sunshine" />
          <span className="h-1.5 w-1.5 rounded-full bg-lilac-deep" />
          <span className="ml-2 h-2 w-16 rounded-full bg-ink/[0.06]" />
        </div>
        <div className="mt-3 flex gap-3">
          <div className="h-16 w-[38%] rounded-lg bg-pink/20" />
          <div className="flex-1 space-y-1.5 py-1">
            <span className="block h-1.5 w-4/5 rounded-full bg-ink/15" />
            <span className="block h-1.5 w-full rounded-full bg-ink/10" />
            <span className="block h-1.5 w-2/3 rounded-full bg-ink/10" />
            <span className="mt-3 block h-4 w-14 rounded-full bg-ink" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          <span className="h-6 rounded-md bg-lilac" />
          <span className="h-6 rounded-md bg-sunshine/40" />
          <span className="h-6 rounded-md bg-pink/10" />
        </div>
      </div>

      <div className="absolute bottom-[9%] right-[6%] w-[60%] rotate-3 rounded-2xl bg-ink p-4 text-cream shadow-lift">
        <p className="text-[7.5px] font-semibold uppercase tracking-[0.2em] text-pink-mid">
          Creative Chaos
        </p>
        <p className="mt-1.5 font-display text-lg font-semibold leading-none sm:text-xl">
          Design that behaves.
        </p>
        <div className="mt-2.5 h-1 w-14 rounded-full bg-cream/20" />
      </div>

      <span className="absolute bottom-[28%] left-[4%] -rotate-6 rounded-full bg-sunshine px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.14em] text-ink">
        Responsive
      </span>
    </div>
  );
}

function GrowthVisual() {
  const bars = [26, 38, 32, 50, 58, 74, 66, 88, 100];

  return (
    <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-ink p-5 text-cream sm:p-7">
      <span
        className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-pink/30 blur-[70px]"
        aria-hidden="true"
      />
      <div className="relative flex items-center justify-between gap-3">
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-cream/65">
          Growth, over time
        </p>
        <span className="rounded-full border border-cream/15 px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-cream/70">
          One plan
        </span>
      </div>

      <div className="relative mt-6 flex h-[42%] items-end gap-1.5 sm:gap-2">
        {bars.map((height, index) => (
          <motion.div
            key={height + index}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.7,
              delay: index * 0.055,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ height: `${height}%` }}
            className={`flex-1 origin-bottom rounded-t-md ${
              index > 5 ? "bg-pink" : "bg-cream/15"
            }`}
          />
        ))}
      </div>

      <div className="relative mt-3 flex justify-between text-[7.5px] font-semibold uppercase tracking-[0.14em] text-cream/65">
        <span>SEO</span>
        <span>PPC</span>
        <span>Social</span>
        <span>Email</span>
      </div>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {["Traffic", "Conversions", "Reporting"].map((label) => (
          <span
            key={label}
            className="rounded-full bg-cream/[0.06] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-cream/70"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function CreativeVisual() {
  return (
    <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-pink p-5 text-cream sm:p-7">
      <img
        src={star}
        alt=""
        className="absolute -right-10 -top-10 w-44 animate-spin-slow opacity-95"
      />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center justify-between gap-3">
          <span className="font-hand text-2xl leading-none">@yourbrand</span>
          <span className="rounded-full border border-cream/30 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-cream">
            Creative
          </span>
        </div>

        <div className="rounded-2xl bg-cream p-3 text-ink shadow-lift sm:p-4">
          <div className="relative overflow-hidden rounded-xl bg-ink px-4 py-7 text-center">
            <span
              className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-pink/50 blur-xl"
              aria-hidden="true"
            />
            <p className="relative font-display text-2xl font-semibold leading-[0.92] tracking-tight text-cream sm:text-3xl">
              Make
              <br />
              <span className="text-pink-mid">some noise.</span>
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[9.5px] font-semibold text-ink/65">
              <Icon name="Heart" className="h-3.5 w-3.5 text-pink" />
              Campaign concept
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink text-cream">
              <Icon name="ArrowUpRight" className="h-3 w-3" />
            </span>
          </div>
        </div>

        <p className="text-center font-hand text-xl leading-none text-cream">
          content with a point of view
        </p>
      </div>
    </div>
  );
}

const rows = [
  {
    kicker: "Build",
    title: "Websites that feel like your brand.",
    text: "From the first wireframe to the final deploy, we design and build digital products that are fast, secure and genuinely easy to use. Responsive by default, SEO-friendly from the start and built to grow with you.",
    points: [
      "Custom design, not a template",
      "Fast, secure, SEO-ready builds",
      "Mobile-first and accessible",
    ],
    to: "/services#design-development",
    label: "Explore design & development",
    Visual: BuildVisual,
  },
  {
    kicker: "Grow",
    title: "Marketing that learns as it goes.",
    text: "We join up SEO, paid, social, email and analytics into one plan — then measure what happens, refine the message and put the budget where it earns its keep.",
    points: [
      "One strategy across every channel",
      "Clear reporting, no vanity metrics",
      "Built around your business goals",
    ],
    to: "/services#digital-marketing",
    label: "Explore digital marketing",
    Visual: GrowthVisual,
  },
  {
    kicker: "Create",
    title: "Creative with a job to do.",
    text: "Branding, content, design and video that give your business a personality people remember. Not noise for the sake of it — ideas that move the business forward.",
    points: [
      "Brand identity and guidelines",
      "Content for every platform",
      "Campaigns with a point of view",
    ],
    to: "/services#creative",
    label: "Explore creative",
    Visual: CreativeVisual,
  },
];

export default function Capabilities() {
  return (
    <section className="relative overflow-hidden bg-cream section-pad">
      <div className="container-x">
        <SectionHeading
          eyebrow="Built end to end"
          title={
            <>
              From first sketch to{" "}
              <span className="relative inline-block">
                final click.
                <span className="absolute -bottom-2 left-0 h-[6px] w-full rounded-full bg-sunshine" />
              </span>
            </>
          }
          description="Design, development, marketing and creative working as one joined-up team. Here is what that looks like in practice."
          className="max-w-3xl"
        />

        <div className="mt-16 space-y-16 sm:space-y-24">
          {rows.map((row, index) => {
            const Visual = row.Visual;
            const reversed = index % 2 === 1;

            return (
              <div
                key={row.kicker}
                className="grid items-center gap-9 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal
                  y={34}
                  className={reversed ? "lg:order-2" : "lg:order-1"}
                >
                  <Visual />
                </Reveal>

                <div
                  className={`${reversed ? "lg:order-1" : "lg:order-2"}`}
                >
                  <Reveal y={16}>
                    <span className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-pink">
                      <span className="font-hand text-2xl normal-case tracking-normal text-ink/65">
                        0{index + 1}
                      </span>
                      {row.kicker}
                    </span>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <h3 className="mt-4 font-display text-3xl font-semibold leading-[1.03] tracking-[-0.04em] sm:text-4xl">
                      {row.title}
                    </h3>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/65">
                      {row.text}
                    </p>
                  </Reveal>

                  <ul className="mt-6 space-y-2.5">
                    {row.points.map((point, pointIndex) => (
                      <Reveal
                        key={point}
                        delay={0.14 + pointIndex * 0.04}
                        as="li"
                        className="flex items-center gap-2.5 text-[13.5px] font-medium text-ink/70"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink/10 text-pink">
                          <Icon name="Check" className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {point}
                      </Reveal>
                    ))}
                  </ul>

                  <Reveal delay={0.24}>
                    <Link
                      to={row.to}
                      className="group mt-7 inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-pink"
                    >
                      {row.label}
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-pink/25 transition-all duration-500 group-hover:bg-pink group-hover:text-cream">
                        <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
