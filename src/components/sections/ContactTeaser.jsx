import { Link } from "react-router-dom";
import { site } from "../../data/site";
import { Reveal } from "../animations";
import Eyebrow from "../ui/Eyebrow";
import Icon from "../ui/Icon";
import TornDivider from "../ui/TornDivider";

const methods = [
  {
    label: "Call",
    value: site.phone,
    href: site.phoneHref,
    icon: "Phone",
    note: "Speak to the studio directly",
  },
  {
    label: "Write",
    value: site.email,
    href: site.emailHref,
    icon: "Mail",
    note: "Tell us what youâ€™re building",
  },
  {
    label: "Visit",
    value: site.addressLines.join(", "),
    icon: "MapPin",
    note: "Our Birmingham studio",
  },
];

export default function ContactTeaser() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-cream pb-20 pt-24 sm:pb-24 sm:pt-32"
    >
      <TornDivider className="-top-[29px] text-cream" />
      <div
        className="pointer-events-none absolute -right-44 bottom-0 h-[30rem] w-[30rem] rounded-full bg-radial-pink opacity-60"
        aria-hidden="true"
      />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal y={14}>
              <Eyebrow tone="pink">Come say hello</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-lg font-display text-[2.6rem] leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[4rem]">
                Call, write or{" "}
                <span className="text-pink">drop in.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-[14px] leading-relaxed text-ink/70">
                No forms that vanish into the void. Talk to the people who will
                actually do the work â€” from first idea to final launch.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-7">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[12px] font-semibold text-cream transition-colors duration-500 hover:bg-pink"
              >
                Start a conversation
                <Icon
                  name="ArrowUpRight"
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 font-hand text-2xl text-ink/60">
                proper humans, proper answers.
              </p>
            </Reveal>
          </div>

          <div className="border-t border-ink/10">
            {methods.map((method, index) => {
              const content = (
                <div className="grid grid-cols-[44px_1fr_auto] items-center gap-4 py-6 sm:gap-6 sm:py-7">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${
                      index === 0
                        ? "bg-sunshine text-ink"
                        : index === 1
                          ? "bg-lilac text-ink"
                          : "bg-pink text-cream"
                    }`}
                  >
                    <Icon
                      name={method.icon}
                      className="h-4 w-4"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span>
                    <span className="block text-[9px] font-bold uppercase tracking-[0.17em] text-ink/65">
                      {method.label}
                    </span>
                    <span className="mt-1 block break-words font-display text-[1.35rem] font-semibold leading-tight tracking-[-0.025em] text-ink transition-colors group-hover:text-pink sm:text-[1.6rem]">
                      {method.value}
                    </span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.08em] text-ink/65">
                      {method.note}
                    </span>
                  </span>
                  {method.href ? (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/50 transition-all duration-500 group-hover:border-pink group-hover:bg-pink group-hover:text-cream">
                      <Icon name="ArrowUpRight" className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-ink/65">
                      B28
                    </span>
                  )}
                </div>
              );

              return (
                <Reveal key={method.label} delay={0.06 * index}>
                  {method.href ? (
                    <a
                      href={method.href}
                      className="group block border-b border-ink/10"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="group block border-b border-ink/10">
                      {content}
                    </div>
                  )}
                </Reveal>
              );
            })}

            <Reveal delay={0.24}>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/65">
                  {site.parentBrand} Â· {site.location}
                </p>
                <a
                  href={site.emailHref}
                  className="text-[11px] font-bold text-pink underline decoration-pink/30 underline-offset-4 transition-colors hover:decoration-pink"
                >
                  {site.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
