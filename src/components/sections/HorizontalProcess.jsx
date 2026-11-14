import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processImages } from "../../data/images";
import { processIntro, processSteps } from "../../data/process";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../animations/Reveal";

gsap.registerPlugin(ScrollTrigger);

const imageKeys = ["strategy", "design", "develop", "marketing", "creative"];

export default function HorizontalProcess() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const track = trackRef.current;
        if (!track) return undefined;

        const distance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth + 80);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.6}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { clearProps: "transform" });
          if (progressRef.current) {
            progressRef.current.style.transform = "scaleX(0)";
          }
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cream text-ink"
      aria-labelledby="process-timeline-title"
    >
      <div
        ref={pinRef}
        className="relative flex flex-col justify-center py-16 lg:min-h-[100svh] lg:py-0"
      >
        <div className="container-x">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal y={16}>
                <Eyebrow tone="pink">How we work</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2
                  id="process-timeline-title"
                  className="mt-5 max-w-2xl font-display text-4xl leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[4rem]"
                >
                  Five steps from{" "}
                  <span className="text-pink">idea to impact.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[14px] leading-relaxed text-ink/65">
                {processIntro.intro}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-10 w-full lg:mt-12">
          <div
            ref={trackRef}
            tabIndex={0}
            role="region"
            aria-label="Our five-step process timeline"
            className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 lg:snap-none lg:overflow-visible lg:px-10 lg:pb-0"
          >
            {processSteps.map((step, index) => {
              const image = processImages[imageKeys[index]];
              return (
                <article
                  key={step.number}
                  className="w-[86vw] shrink-0 snap-center rounded-[2rem] border border-ink/10 bg-cream-50 p-4 sm:w-[72vw] lg:w-[min(72vw,880px)] lg:p-5"
                >
                  <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr] sm:items-stretch">
                    <div className="relative aspect-[16/11] overflow-hidden rounded-[1.4rem] bg-ink/5 sm:aspect-auto sm:min-h-[260px]">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute left-4 top-4 rounded-full border border-cream/20 bg-ink/60 px-3 py-1.5 font-hand text-xl text-sunshine backdrop-blur-sm">
                        step {step.number}
                      </span>
                    </div>

                    <div className="flex flex-col justify-between p-2 sm:p-4">
                      <div>
                        <span className="font-hand text-2xl text-pink">
                          {step.number} / 05
                        </span>
                        <h3 className="mt-2 font-display text-3xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-4xl">
                          {step.title}
                        </h3>
                        <p className="mt-4 max-w-md text-[14px] leading-relaxed text-ink/65">
                          {step.text}
                        </p>
                      </div>
                      <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.17em] text-ink/65">
                        {step.tag}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="container-x mt-8 hidden lg:block">
          <div className="relative h-px w-full bg-ink/10">
            <div
              ref={progressRef}
              className="absolute inset-0 origin-left bg-pink"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-[9.5px] font-semibold uppercase tracking-[0.16em] text-ink/65">
            <span>Scroll to move the timeline</span>
            <span>Strategy to creative</span>
          </div>
        </div>

        <div className="container-x mt-5 flex items-center justify-between text-[9.5px] font-semibold uppercase tracking-[0.16em] text-ink/65 lg:hidden">
          <span>Swipe the timeline</span>
          <span>01 - 05</span>
        </div>
      </div>
    </section>
  );
}
