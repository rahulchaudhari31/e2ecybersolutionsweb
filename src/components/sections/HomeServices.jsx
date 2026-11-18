import { Link } from "react-router-dom";
import { homeServices } from "../../data/home";
import { getService } from "../../data/services";
import { Reveal, SpotlightCard, TiltCard } from "../animations";
import Eyebrow from "../ui/Eyebrow";
import Icon from "../ui/Icon";
import TornDivider from "../ui/TornDivider";

const accentStyles = {
  sunshine: {
    icon: "bg-sunshine text-ink",
    dot: "bg-sunshine",
    glow: "bg-sunshine/20",
    hover: "group-hover:border-sunshine/40",
    arrow: "group-hover:bg-sunshine group-hover:text-ink",
  },
  pink: {
    icon: "bg-pink text-cream",
    dot: "bg-pink",
    glow: "bg-pink/25",
    hover: "group-hover:border-pink/50",
    arrow: "group-hover:bg-pink group-hover:text-cream",
  },
  lilac: {
    icon: "bg-lilac text-ink",
    dot: "bg-lilac-deep",
    glow: "bg-lilac/20",
    hover: "group-hover:border-lilac/40",
    arrow: "group-hover:bg-lilac group-hover:text-ink",
  },
};

export default function HomeServices() {
  const services = homeServices
    .map((item) => ({ ...item, service: getService(item.slug) }))
    .filter((item) => item.service);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-ink pb-20 pt-24 text-cream sm:pb-28 sm:pt-32"
    >
      <TornDivider className="-top-[29px] text-ink" />
      <div
        className="pointer-events-none absolute inset-0 grid-lines-light opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 top-20 h-[34rem] w-[34rem] rounded-full bg-pink/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_0.3fr] lg:items-end">
          <div>
            <Reveal y={14}>
              <Eyebrow tone="light">What we do</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-3xl font-display text-[2.5rem] leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[4.2rem]">
                Six ways we make{" "}
                <span className="text-pink-mid">noise.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="hidden justify-end lg:flex">
            <div className="relative pb-7 pr-2">
              <svg
                viewBox="0 0 220 92"
                className="absolute -left-40 -top-2 w-48 text-sunshine"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 72c35-44 71-58 111-44 20 7 33 18 45 32"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M151 48l14 14 17-10"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="rotate-[-4deg] font-hand text-3xl leading-none text-sunshine">
                everything under
                <br />
                one roof
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {services.map(({ label, accent, service }, index) => {
            const tone = accentStyles[accent] || accentStyles.sunshine;

            return (
              <Reveal
                key={service.slug}
                delay={Math.min(index * 0.04, 0.2)}
                y={18}
                className="h-full"
              >
                <TiltCard
                  className="h-full"
                  innerClassName="h-full"
                  max={5}
                >
                  <SpotlightCard
                    className="h-full"
                    overlayClassName="rounded-[1.75rem]"
                    color="rgba(255,255,255,0.22)"
                  >
                    <Link
                      to={service.path}
                      className={`group relative flex h-full min-h-[290px] flex-col overflow-hidden rounded-[1.75rem] border border-cream/10 bg-cream p-6 text-ink transition-colors duration-500 ${tone.hover} sm:min-h-[320px] sm:p-7`}
                    >
                      <span
                        className={`pointer-events-none absolute -right-14 -top-16 h-40 w-40 rounded-full blur-3xl ${tone.glow}`}
                        aria-hidden="true"
                      />

                      <div className="relative flex items-start justify-between gap-4">
                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone.icon} shadow-sm`}
                        >
                          <Icon
                            name={service.icon}
                            className="h-5 w-5"
                            strokeWidth={1.7}
                          />
                        </span>
                        <span className="font-display text-[11px] font-semibold tracking-[0.16em] text-ink/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="relative mt-8 max-w-[14ch] font-display text-[1.8rem] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-[2rem]">
                        {label}
                      </h3>
                      <p className="relative mt-3 line-clamp-3 max-w-[30ch] text-[13px] leading-relaxed text-ink/70">
                        {service.blurb}
                      </p>

                      <div className="relative mt-auto flex items-end justify-between gap-4 pt-7">
                        <div className="flex flex-wrap gap-1.5">
                          {(service.offerings || []).slice(0, 2).map((item) => (
                            <span
                              key={item.title}
                              className="rounded-full border border-ink/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.09em] text-ink/70"
                            >
                              {item.title}
                            </span>
                          ))}
                        </div>
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 ${tone.arrow}`}
                        >
                          <Icon
                            name="ArrowUpRight"
                            className="h-4 w-4"
                            strokeWidth={2}
                          />
                        </span>
                      </div>
                    </Link>
                  </SpotlightCard>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-cream/10 pt-7">
          <p className="max-w-lg text-[13px] leading-relaxed text-cream/55">
            Need something more specific? We also build mobile apps, ecommerce
            stores, CMS platforms and full brand systems.
          </p>
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-cream transition-colors hover:text-sunshine"
          >
            All services
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/20 transition-all duration-500 group-hover:border-sunshine group-hover:bg-sunshine group-hover:text-ink">
              <Icon name="ArrowRight" className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
