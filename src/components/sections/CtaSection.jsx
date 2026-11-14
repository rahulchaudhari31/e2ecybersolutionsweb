import { site } from "../../data/site";
import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import Icon from "../ui/Icon";
import Reveal from "../animations/Reveal";
import TornDivider from "../ui/TornDivider";
import star from "../../assets/starburst.svg";

export default function CtaSection({
  eyebrow = "Let's talk",
  title = (
    <>
      Let's make something people{" "}
      <span className="text-sunshine">can't scroll past.</span>
    </>
  ),
  text = "Tell us what you're building and we'll tell you how we can help. No hard sell, no jargon — just a straight answer.",
}) {
  return (
    <section className="relative overflow-hidden bg-pink section-pad text-cream">
      <TornDivider
        className="absolute inset-x-0 -top-[29px] h-8 text-pink"
        variant={3}
      />

      <img
        src={star}
        alt=""
        className="pointer-events-none absolute -right-24 top-10 w-72 animate-spin-slow opacity-20 sm:w-96"
      />

      <div className="container-x relative">
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal y={16}>
              <Eyebrow tone="light">{eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-[clamp(2.7rem,6.4vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.05em]">
                {title}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-cream">
                {text}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-7 font-hand text-2xl text-sunshine">
                {site.hero.note} — {site.hero.noteTwo}
              </p>
            </Reveal>

            <Reveal delay={0.18} className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <Button to="/contact" variant="cream" size="lg">
                Start a project
              </Button>
              <Button
                href={site.phoneHref}
                variant="outlineLight"
                size="lg"
                icon="Phone"
              >
                {site.phone}
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={34}>
            <div className="rounded-[2rem] bg-ink p-6 text-cream shadow-lift sm:p-7">
              <p className="font-hand text-2xl text-sunshine">let's talk</p>
              <p className="mt-2 font-display text-2xl font-semibold leading-tight">
                Prefer to go direct?
              </p>

              <div className="mt-6 space-y-4">
                <a
                  href={site.phoneHref}
                  className="group flex items-center gap-3.5 border-b border-cream/10 pb-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/[0.06] text-pink-mid">
                    <Icon name="Phone" className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-cream">
                      Call us
                    </span>
                    <span className="block text-[15px] font-medium transition-colors group-hover:text-pink-mid">
                      {site.phone}
                    </span>
                  </span>
                </a>

                <a
                  href={site.emailHref}
                  className="group flex items-center gap-3.5 border-b border-cream/10 pb-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/[0.06] text-pink-mid">
                    <Icon name="Mail" className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-cream">
                      Write to us
                    </span>
                    <span className="block text-[15px] font-medium transition-colors group-hover:text-pink-mid">
                      {site.email}
                    </span>
                  </span>
                </a>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream/[0.06] text-pink-mid">
                    <Icon name="MapPin" className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-cream">
                      Visit us
                    </span>
                    <span className="block text-[14px] leading-relaxed text-cream">
                      {site.address.line1}
                      <br />
                      {site.address.city}, {site.address.postcode}
                    </span>
                  </span>
                </div>
              </div>

              <Button
                to="/contact"
                variant="pink"
                className="mt-6 w-full"
                icon="ArrowUpRight"
              >
                Send a message
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/20 pt-6 text-[11.5px] text-cream sm:flex-row sm:items-center sm:justify-between">
          <span className="font-display text-sm font-semibold tracking-tight text-cream">
            {site.name}
          </span>
          <span>Birmingham, UK — working with brands everywhere.</span>
          <span className="font-hand text-lg text-cream">
            {site.subTagline}
          </span>
        </div>
      </div>
    </section>
  );
}
