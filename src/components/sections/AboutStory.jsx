import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { site } from "../../data/site";
import { homeStats } from "../../data/home";
import { CountUp, Reveal } from "../animations";
import Eyebrow from "../ui/Eyebrow";
import Icon from "../ui/Icon";

gsap.registerPlugin(ScrollTrigger);

export default function AboutStory() {
  const textRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const words = site.description.split(/\s+/).filter(Boolean);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.to(".scrub-word", {
        color: "#14101A",
        stagger: 0.07,
        ease: "none",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 82%",
          end: "bottom 52%",
          scrub: 0.4,
        },
      });
    }, textRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="relative overflow-hidden bg-cream pb-16 pt-10 sm:pb-24 sm:pt-14">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal y={14}>
              <Eyebrow tone="pink">Who we are</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-[2rem] leading-[1.02] tracking-[-0.04em] sm:text-4xl">
                Strategy, build and growth.{" "}
                <span className="text-pink">One team.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                to="/about"
                className="group mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink/75 transition-colors hover:text-pink"
              >
                More about us
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 transition-all duration-500 group-hover:border-pink group-hover:bg-pink group-hover:text-cream">
                  <Icon name="ArrowRight" className="h-3 w-3" />
                </span>
              </Link>
            </Reveal>
            <Reveal delay={0.14} className="mt-8 hidden lg:block">
              <p className="font-hand text-2xl leading-tight text-ink/60">
                one joined-up team,
                <br />
                every digital channel.
              </p>
            </Reveal>
          </div>

          <div>
            <p
              ref={textRef}
              className={`font-display text-[clamp(1.75rem,3.7vw,3.1rem)] font-medium leading-[1.18] tracking-[-0.035em] ${
                reducedMotion ? "text-ink" : ""
              }`}
            >
              {words.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={
                    reducedMotion
                      ? "inline"
                      : "scrub-word inline text-ink/50 transition-none"
                  }
                >
                  {word}
                  {index < words.length - 1 ? " " : ""}
                </span>
              ))}
            </p>

            <div className="mt-10 border-t border-ink/10 pt-8">
              <div className="grid grid-cols-3 gap-4 sm:gap-8">
                {homeStats.map((stat, index) => (
                  <Reveal key={stat.label} delay={index * 0.06}>
                    <p className="font-display text-[2.25rem] font-semibold leading-none tracking-[-0.05em] text-ink sm:text-5xl">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 text-[10px] font-bold uppercase leading-tight tracking-[0.13em] text-ink/75 sm:text-[11px]">
                      {stat.label}
                    </p>
                    <p className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.1em] text-ink/65">
                      {stat.note}
                    </p>
                  </Reveal>
                ))}
              </div>
              <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.12em] text-ink/65">
                Editable figures — update them in{" "}
                <span className="normal-case tracking-normal">
                  src/data/home.js
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
