import { site } from "../../data/site";
import CountUp from "../animations/CountUp";
import Reveal from "../animations/Reveal";
import TornDivider from "../ui/TornDivider";

export default function StatsSection() {
  return (
    <section className="relative bg-sunshine py-16 sm:py-20">
      <TornDivider
        className="absolute inset-x-0 -top-[29px] h-8 text-sunshine"
        variant={3}
      />

      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal y={16}>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/65">
                By the numbers
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-4xl lg:text-5xl">
                A decade of digital. Still counting.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[13.5px] leading-relaxed text-ink/65">
              We have built and managed websites for start-ups and popular local
              brands across the Midlands — and we are still on the tools.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {site.stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.06}
              className="border-t border-ink/20 pt-5"
            >
              <p className="font-display text-5xl font-semibold tracking-[-0.04em] text-ink sm:text-6xl lg:text-7xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-[13px] font-semibold text-ink/80">
                {stat.label}
              </p>
              <p className="mt-1.5 max-w-[22ch] text-[11.5px] leading-relaxed text-ink/65">
                {stat.note}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
