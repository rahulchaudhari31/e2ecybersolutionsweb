import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps, processIntro } from "../../data/process";
import Reveal from "../animations/Reveal";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import TornDivider from "../ui/TornDivider";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-track",
            start: "top 68%",
            end: "bottom 78%",
            scrub: 0.6,
          },
        }
      );

      gsap.utils.toArray(".process-step").forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.35 },
          {
            opacity: 1,
            duration: 0.4,
            scrollTrigger: {
              trigger: step,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink section-pad pt-24 text-cream sm:pt-28 lg:pt-32"
    >
      <TornDivider
        className="absolute inset-x-0 -top-[29px] h-8 text-ink"
        variant={1}
      />
      <div
        className="pointer-events-none absolute inset-0 grid-lines-light opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-20 h-[28rem] w-[28rem] rounded-full bg-pink/20 blur-[100px]"
        aria-hidden="true"
      />

      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal y={16}>
              <Eyebrow tone="dark">{processIntro.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-[2.6rem] leading-[1.0] tracking-[-0.045em] text-cream sm:text-5xl lg:text-[3.8rem]">
                Five steps from{" "}
                <span className="text-pink-mid">idea</span> to{" "}
                <span className="relative inline-block">
                  impact.
                  <svg
                    viewBox="0 0 160 14"
                    className="absolute -bottom-1 left-0 h-3 w-full text-sunshine"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 10c32-6 66-8 100-5 18 2 35 1 54-2"
                      stroke="currentColor"
                      strokeWidth="5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/70">
                {processIntro.intro}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-8 font-hand text-2xl text-sunshine/85">
                {processIntro.note}
              </p>
            </Reveal>
            <Reveal delay={0.18} className="mt-8">
              <Button to="/contact" variant="pink" icon="ArrowUpRight">
                Start a project
              </Button>
            </Reveal>
          </div>

          <div className="process-track relative">
            <div className="absolute bottom-2 left-[7px] top-2 w-px bg-cream/10">
              <div className="process-line-fill h-full w-full origin-top bg-pink" />
            </div>

            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <Reveal
                  key={step.number}
                  delay={index * 0.04}
                  className="process-step relative pl-12"
                >
                  <span className="absolute left-0 top-2 flex h-[15px] w-[15px] items-center justify-center">
                    <span className="h-[15px] w-[15px] rounded-full border-2 border-pink bg-ink" />
                    <span className="absolute h-1.5 w-1.5 rounded-full bg-pink" />
                  </span>

                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-hand text-2xl leading-none text-pink-mid">
                      {step.number}
                    </span>
                    <h3 className="font-display text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
                      {step.title}
                    </h3>
                  </div>

                  <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-cream/70">
                    {step.text}
                  </p>
                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/65">
                    {step.tag}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
