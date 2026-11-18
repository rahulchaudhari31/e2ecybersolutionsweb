import { site } from "../../data/site";
import Marquee from "../ui/Marquee";
import TornDivider from "../ui/TornDivider";

export default function KeywordMarquees() {
  return (
    <section className="relative overflow-hidden bg-sunshine py-12 sm:py-16">
      <TornDivider className="-top-[29px] text-sunshine" />
      <div className="container-x mb-6 flex items-center justify-between gap-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
          The full toolkit
        </p>
        <p className="font-hand text-xl text-ink">pick a lane. or all of them.</p>
      </div>

      <Marquee
        items={site.marquee}
        ariaLabel="Our digital, design and marketing services"
        separator="✳"
        className="border-y border-ink/10 py-3"
        itemClassName="px-1 font-display text-[2.7rem] font-semibold leading-none tracking-[-0.05em] text-ink sm:text-6xl lg:text-7xl"
      />

      <Marquee
        items={site.marquee}
        ariaLabel="Our creative and technical capabilities"
        separator="✳"
        reverse
        className="border-b border-ink/10 py-3"
        itemClassName="px-1 font-display text-[2.7rem] font-semibold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_#14101A] sm:text-6xl lg:text-7xl"
      />
    </section>
  );
}
