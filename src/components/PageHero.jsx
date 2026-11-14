import { Link } from "react-router-dom";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./animations/Reveal";
import Icon from "./ui/Icon";

const glows = {
  pink: "bg-radial-pink",
  yellow: "bg-radial-yellow",
  lilac: "bg-[radial-gradient(circle_at_center,rgba(216,204,238,0.9),rgba(216,204,238,0)_70%)]",
  ink: "bg-[radial-gradient(circle_at_center,rgba(20,16,26,0.14),rgba(20,16,26,0)_70%)]",
  cream: "bg-radial-yellow",
};

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb = [],
  accent = "pink",
  meta = [],
  note,
  children,
}) {
  return (
    <section className="relative overflow-hidden bg-cream pt-[72px] sm:pt-20">
      <div
        className="pointer-events-none absolute inset-0 grid-lines opacity-70 mask-fade-b"
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute -right-24 -top-16 h-[28rem] w-[28rem] rounded-full ${glows[accent] || glows.pink}`}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-radial-yellow opacity-50"
        aria-hidden="true"
      />

      <div className="container-x relative pb-14 pt-12 sm:pt-16 lg:pb-20 lg:pt-24">
        {breadcrumb.length ? (
          <Reveal y={12}>
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-ink/65"
            >
              {breadcrumb.map((crumb, index) => {
                const last = index === breadcrumb.length - 1;
                return (
                  <span key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                    {index > 0 ? (
                      <span aria-hidden="true" className="text-ink/25">
                        /
                      </span>
                    ) : null}
                    {crumb.to && !last ? (
                      <Link
                        to={crumb.to}
                        className="transition-colors hover:text-pink"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className={last ? "text-ink/65" : ""}>
                        {crumb.label}
                      </span>
                    )}
                  </span>
                );
              })}
            </nav>
          </Reveal>
        ) : null}

        <div className="mt-7 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
          <div>
            {eyebrow ? (
              <Reveal y={16}>
                <Eyebrow tone="pink">{eyebrow}</Eyebrow>
              </Reveal>
            ) : null}

            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-[clamp(2.75rem,6.5vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink">
                {title}
              </h1>
            </Reveal>
          </div>

          <div>
            {description ? (
              <Reveal delay={0.1}>
                <p className="max-w-md text-[15px] leading-relaxed text-ink/65">
                  {description}
                </p>
              </Reveal>
            ) : null}

            {meta.length ? (
              <Reveal delay={0.14} className="mt-5 flex flex-wrap gap-2">
                {meta.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-cream-50 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink/65"
                  >
                    <Icon name="Check" className="h-3 w-3 text-pink" />
                    {item}
                  </span>
                ))}
              </Reveal>
            ) : null}

            {children ? (
              <Reveal delay={0.16} className="mt-6">
                {children}
              </Reveal>
            ) : null}
          </div>
        </div>

        {note ? (
          <Reveal delay={0.2}>
            <p className="mt-9 font-hand text-2xl text-ink/65">{note}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
