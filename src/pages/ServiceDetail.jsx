import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";
import { site } from "../data/site";
import {
  getRelatedServices,
  serviceGroups,
} from "../data/services";
import PageHero from "../components/PageHero";
import Button from "../components/ui/Button";
import Reveal from "../components/animations/Reveal";
import Eyebrow from "../components/ui/Eyebrow";
import Icon from "../components/ui/Icon";
import SectionHeading from "../components/ui/SectionHeading";
import ServiceCard from "../components/ui/ServiceCard";
import CtaSection from "../components/sections/CtaSection";

const accents = {
  lilac: "bg-lilac text-ink",
  pink: "bg-pink/10 text-pink",
  yellow: "bg-sunshine text-ink",
  sunshine: "bg-sunshine text-ink",
  cream: "bg-cream-200 text-ink",
  ink: "bg-ink text-cream",
};

export default function ServiceDetail({ service }) {
  const group = serviceGroups.find((item) => item.id === service.category);
  const related = getRelatedServices(service, 3);
  const accent = accents[service.theme] || accents.cream;

  usePageMeta({
    title: service.title,
    description: service.meta,
  });

  return (
    <>
      <PageHero
        eyebrow={group?.label || "Services"}
        title={service.title}
        description={service.headline}
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: service.title },
        ]}
        accent={service.theme === "ink" ? "ink" : service.theme}
        note={service.note}
        meta={["Birmingham, UK", "Free digital review"]}
      >
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <Button to="/contact" icon="ArrowUpRight">
            Start a project
          </Button>
          <Button href={site.phoneHref} variant="outline" icon="Phone">
            {site.phone}
          </Button>
        </div>
      </PageHero>

      <section className="relative overflow-hidden bg-cream section-pad">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal y={16}>
                <Eyebrow tone="pink">The detail</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[2.3rem] leading-[1.02] tracking-[-0.04em] sm:text-4xl">
                  What this looks like in practice.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-ink/65">
                  No fluff, no black boxes. Here is the thinking and the work
                  that sits behind {service.title.toLowerCase()}.
                </p>
              </Reveal>

              <Reveal delay={0.15} className="mt-7">
                <div className="relative overflow-hidden rounded-[1.75rem] bg-ink p-6 text-cream">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`}
                  >
                    <Icon name={service.icon} className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-hand text-2xl text-sunshine">
                    talk to a human
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-cream/70">
                    Bring us the goal — not a fully-formed brief. We'll help you
                    work out the right route.
                  </p>
                  <div className="mt-5 space-y-2 text-[13px]">
                    <a
                      href={site.phoneHref}
                      className="flex items-center gap-2 text-cream/75 transition-colors hover:text-pink-mid"
                    >
                      <Icon name="Phone" className="h-3.5 w-3.5 text-pink-mid" />
                      {site.phone}
                    </a>
                    <a
                      href={site.emailHref}
                      className="flex items-center gap-2 break-all text-cream/75 transition-colors hover:text-pink-mid"
                    >
                      <Icon name="Mail" className="h-3.5 w-3.5 shrink-0 text-pink-mid" />
                      {site.email}
                    </a>
                  </div>
                  <Button
                    to="/contact"
                    variant="pink"
                    size="sm"
                    className="mt-5 w-full"
                  >
                    Start a project
                  </Button>
                </div>
              </Reveal>
            </aside>

            <div>
              <div className="prose-e2e max-w-2xl">
                {service.intro.map((paragraph, index) => (
                  <Reveal key={paragraph} delay={0.05 + index * 0.04}>
                    <p>{paragraph}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.2} className="mt-8">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/10 pt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/65">
                  <span className="flex items-center gap-2">
                    <Icon name="MapPin" className="h-3.5 w-3.5 text-pink" />
                    {site.address.city}
                  </span>
                  <span className="flex items-center gap-2">
                    <Icon name="Check" className="h-3.5 w-3.5 text-pink" />
                    Part of {site.parentBrand}
                  </span>
                  <Link
                    to={`/services#${group?.id}`}
                    className="flex items-center gap-1.5 text-pink transition-colors hover:text-pink-dark"
                  >
                    All {group?.label.toLowerCase()}
                    <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-ink/[0.06] bg-cream-100 section-pad">
        <div className="container-x">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="What you get"
              title={service.offeringsTitle}
              description="The practical pieces that make up the service — scoped around your business, not pulled off a shelf."
            />
            <Reveal delay={0.1}>
              <span className="font-hand text-2xl text-ink/65">
                {String(service.offerings.length).padStart(2, "0")} pieces, one
                plan
              </span>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.offerings.map((offering, index) => {
              const content = (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-hand text-xl text-pink">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 text-ink/65 transition-colors group-hover:border-pink/40 group-hover:text-pink">
                      <Icon name="ArrowUpRight" className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold leading-tight tracking-tight">
                    {offering.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-ink/65">
                    {offering.text}
                  </p>
                </>
              );

              return (
                <Reveal
                  key={offering.title}
                  delay={(index % 3) * 0.05}
                  className="h-full"
                >
                  {offering.to ? (
                    <Link
                      to={offering.to}
                      className="group flex h-full flex-col rounded-[1.5rem] border border-ink/10 bg-cream-50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-pink/25 hover:shadow-soft"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className="group flex h-full flex-col rounded-[1.5rem] border border-ink/10 bg-cream-50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-pink/25 hover:shadow-soft">
                      {content}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>

          {service.bullets?.length ? (
            <Reveal delay={0.1} className="mt-8">
              <div className="rounded-[2rem] bg-sunshine p-6 text-ink sm:p-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/65">
                      {service.bulletsTitle || "At a glance"}
                    </p>
                    <h3 className="mt-2 max-w-md font-display text-2xl font-semibold leading-tight tracking-tight">
                      The bits that make it work.
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.bullets.map((bullet) => (
                      <span
                        key={bullet}
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-cream/40 px-3 py-2 text-[11.5px] font-semibold text-ink/70"
                      >
                        <Icon name="Check" className="h-3 w-3" strokeWidth={3} />
                        {bullet}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="relative bg-cream section-pad">
        <div className="container-x">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Keep exploring"
              title="More from the team."
              description="Good work rarely lives in one discipline. Here are a few services that tend to sit alongside this one."
            />
            <Reveal delay={0.1}>
              <Button to="/services" variant="outline" icon="ArrowRight">
                All services
              </Button>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal
                key={item.slug}
                delay={(index % 3) * 0.06}
                className="h-full"
              >
                <ServiceCard
                  service={item}
                  index={String(index + 1).padStart(2, "0")}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        eyebrow="Next step"
        title={
          <>
            {service.title}.{" "}
            <span className="text-sunshine">Done properly.</span>
          </>
        }
        text="Tell us what you're trying to achieve. We'll tell you how this service fits, what it involves and what it would take to get there."
      />
    </>
  );
}
