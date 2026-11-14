import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps, processIntro } from "../../data/process";
import { processImages } from "../../data/images";
import Reveal from "../animations/Reveal";
import Eyebrow from "../ui/Eyebrow";
import Icon from "../ui/Icon";

gsap.registerPlugin(ScrollTrigger);

const imageKeys = ["strategy", "design", "develop", "marketing", "creative"];

function StepDetail({ step, index, active, onSelect }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(index)}
        aria-current={active ? "step" : undefined}
        className="group grid w-full grid-cols-[36px_1fr] gap-3 border-t border-cream/10 py-2 text-left"
      >
        <span
          className={`font-hand text-[1.35rem] leading-none transition-colors ${
            active ? "text-pink-mid" : "text-cream/65"
          }`}
        >
          {step.number}
        </span>
        <span>
          <span className="flex items-center justify-between gap-3">
            <span
              className={`font-display text-[1.45rem] font-semibold leading-none tracking-[-0.03em] transition-colors ${
                active ? "text-cream" : "text-cream/75 group-hover:text-cream"
              }`}
            >
              {step.title}
            </span>
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                active
                  ? "border-pink bg-pink text-cream"
                  : "border-cream/25 text-cream/65 group-hover:border-cream/50"
              }`}
            >
              <Icon name="ArrowRight" className="h-2.5 w-2.5" />
            </span>
          </span>
          <span
            className={`mt-1 block max-w-[48ch] text-[11.5px] leading-relaxed line-clamp-2 transition-colors ${
              active ? "text-cream/70" : "text-cream/55"
            }`}
          >
            {step.text}
          </span>
        </span>
      </button>
    </li>
  );
}

function ProcessHeader() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.78fr_0.22fr] lg:items-end">
      <div>
        <Reveal y={14}>
          <Eyebrow tone="dark">{processIntro.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-2xl font-display text-[2.5rem] leading-[0.98] tracking-[-0.045em] text-cream sm:text-5xl lg:text-[3.5rem] xl:text-[3.75rem]">
            Five steps from{" "}
            <span className="text-pink-mid">idea</span> to impact.
          </h2>
        </Reveal>
      </div>
      <Reveal delay={0.1} className="lg:pb-2">
        <p className="max-w-sm text-[13px] leading-relaxed text-cream/60">
          {processIntro.intro}
        </p>
        <p className="mt-3 font-hand text-2xl text-sunshine">
          {processIntro.note}
        </p>
      </Reveal>
    </div>
  );
}

export default function PinnedProcess() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const progressRef = useRef(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  const selectStep = (index) => {
    activeRef.current = index;
    setActive(index);
  };

  useEffect(() => {
    const mm = gsap.matchMedia();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const trigger = ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 3.6}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleY(${self.progress})`;
            }
            const next = Math.min(
              processSteps.length - 1,
              Math.floor(self.progress * processSteps.length)
            );
            if (next !== activeRef.current) {
              activeRef.current = next;
              setActive(next);
            }
          },
        });

        return () => {
          trigger.kill();
          if (progressRef.current) {
            progressRef.current.style.transform = "scaleY(0)";
          }
          activeRef.current = 0;
          setActive(0);
        };
      },
      sectionRef
    );

    if (reduce) {
      activeRef.current = 0;
      setActive(0);
    }

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative overflow-hidden bg-ink text-cream"
    >
      <div className="lg:hidden">
        <div className="container-x pb-16 pt-10 sm:pb-20">
          <ProcessHeader />
          <div className="mt-10">
            {processSteps.map((step, index) => {
              const image = processImages[imageKeys[index]];
              return (
                <article
                  key={step.number}
                  className="border-t border-cream/10 py-7"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-hand text-2xl text-pink-mid">
                      {step.number}
                    </span>
                    <h3 className="font-display text-3xl font-semibold tracking-[-0.03em]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-cream/65">
                    {step.text}
                  </p>
                  <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-2xl border border-cream/10">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div
        ref={pinRef}
        className="relative hidden min-h-[100svh] flex-col justify-center bg-ink py-5 [@media(max-height:740px)]:py-2 lg:flex"
      >
        <div
          className="pointer-events-none absolute inset-0 grid-lines-light opacity-30"
          aria-hidden="true"
        />
        <div className="container-x relative w-full">
          <ProcessHeader />

          <div className="mt-6 grid grid-cols-[0.82fr_1.18fr] items-stretch gap-12">
            <div className="relative">
              <div className="absolute bottom-3 left-[19px] top-3 w-px bg-cream/10">
                <div
                  ref={progressRef}
                  className="h-full w-full origin-top bg-pink"
                  style={{ transform: "scaleY(0)" }}
                />
              </div>
              <ol className="relative space-y-0">
                {processSteps.map((step, index) => (
                  <StepDetail
                    key={step.number}
                    step={step}
                    index={index}
                    active={active === index}
                    onSelect={selectStep}
                  />
                ))}
              </ol>
            </div>

            <div className="relative h-[54vh] max-h-[600px] min-h-[400px] overflow-hidden rounded-[2rem] border border-cream/10 bg-ink-soft">
              {processSteps.map((step, index) => {
                const image = processImages[imageKeys[index]];
                const isActive = active === index;

                return (
                  <div
                    key={step.number}
                    className="absolute inset-0 transition-[clip-path] duration-700 ease-smooth"
                    style={{
                      clipPath: isActive
                        ? "inset(0% 0% 0% 0%)"
                        : "inset(0% 0% 0% 100%)",
                    }}
                    aria-hidden={!isActive}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="eager"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/5 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7">
                      <div>
                        <p className="font-hand text-2xl text-sunshine">
                          step {step.number}
                        </p>
                        <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.03em] text-cream">
                          {step.title}
                        </p>
                      </div>
                      <span className="rounded-full border border-cream/20 bg-ink/30 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-cream/70 backdrop-blur-sm">
                        {String(index + 1).padStart(2, "0")} / 05
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 rounded-full border border-cream/20 bg-ink/35 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-cream/75 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-pink-mid motion-reduce:animate-none" />
                Process in motion
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
