import { Link } from "react-router-dom";
import { site } from "../../data/site";
import Reveal from "../animations/Reveal";
import Eyebrow from "../ui/Eyebrow";
import Icon from "../ui/Icon";
import arrow from "../../assets/scribble-arrow.svg";

export default function Intro() {
  return (
    <section className="relative overflow-hidden bg-cream section-pad">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal y={16}>
              <Eyebrow tone="pink">{site.intro.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-[2.35rem] leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-[3.6rem]">
                The missing link between your{" "}
                <span className="text-pink">business</span> and its{" "}
                <span className="relative inline-block">
                  audience.
                  <svg
                    viewBox="0 0 220 14"
                    className="absolute -bottom-1 left-0 h-3 w-full text-sunshine"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 10c40-7 82-9 128-6 28 2 55 1 86-3"
                      stroke="currentColor"
                      strokeWidth="5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="mt-7 hidden items-center gap-2 lg:flex">
              <img src={arrow} alt="" className="h-9 w-16" />
              <span className="font-hand text-2xl text-ink/65">
                {site.intro.note}
              </span>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.08}>
              <p className="font-display text-[1.4rem] font-medium leading-snug tracking-tight text-ink sm:text-[1.65rem]">
                {site.intro.lead}
              </p>
            </Reveal>

            <div className="prose-e2e mt-6 max-w-xl">
              {site.intro.body.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.1 + index * 0.06}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <Link
                to={site.intro.link.to}
                className="group mt-8 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-pink"
              >
                {site.intro.link.label}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink text-cream transition-transform duration-500 group-hover:translate-x-1">
                  <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>

            <Reveal delay={0.24} className="mt-10">
              <div className="rounded-[1.75rem] border border-ink/10 bg-cream-50 p-5 shadow-soft sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-xl bg-ink px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-cream">
                    Your business
                  </span>

                  <div className="relative mx-2 flex h-10 flex-1 items-center justify-center">
                    <span className="absolute inset-x-0 top-1/2 border-t border-dashed border-ink/25" />
                    <span className="relative z-10 rounded-full bg-pink px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-cream shadow-pink">
                      e2e
                    </span>
                  </div>

                  <span className="rounded-xl bg-sunshine px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
                    Your audience
                  </span>
                </div>
                <p className="mt-4 text-center font-hand text-xl text-ink/65">
                  we close the gap
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
