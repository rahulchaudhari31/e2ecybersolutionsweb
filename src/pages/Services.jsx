import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import usePageMeta from "../hooks/usePageMeta";
import { site } from "../data/site";
import { serviceGroups, services } from "../data/services";
import { groupPages } from "../data/service-pages";
import { servicePreviews } from "../data/images";
import PageHero from "../components/PageHero";
import Button from "../components/ui/Button";
import Eyebrow from "../components/ui/Eyebrow";
import Icon from "../components/ui/Icon";
import TornDivider from "../components/ui/TornDivider";
import { Reveal } from "../components/animations";
import CtaSection from "../components/sections/CtaSection";

const groupPageMap = Object.fromEntries(
  groupPages.map((page) => [page.slug, page])
);

const sectionTheme = {
  light: {
    section: "bg-cream text-ink",
    line: "border-ink/10",
    muted: "text-ink/65",
    index: "text-ink/65",
    rowHover: "hover:bg-cream-50",
    arrow: "border-ink/15 text-ink/65 group-hover:border-pink group-hover:bg-pink group-hover:text-cream",
    titleHover: "group-hover:text-pink",
    previewLabel: "bg-cream text-ink",
    card: "bg-cream-50 border-ink/10",
  },
  dark: {
    section: "bg-ink text-cream",
    line: "border-cream/10",
    muted: "text-cream/65",
    index: "text-cream/55",
    rowHover: "hover:bg-cream/[0.045]",
    arrow: "border-cream/15 text-cream/65 group-hover:border-pink-mid group-hover:bg-pink-mid group-hover:text-ink",
    titleHover: "group-hover:text-pink-mid",
    previewLabel: "bg-cream text-ink",
    card: "bg-cream/[0.05] border-cream/10",
  },
  sunshine: {
    section: "bg-sunshine text-ink",
    line: "border-ink/15",
    muted: "text-ink/70",
    index: "text-ink/65",
    rowHover: "hover:bg-cream/30",
    arrow: "border-ink/20 text-ink/65 group-hover:border-ink group-hover:bg-ink group-hover:text-cream",
    titleHover: "group-hover:text-pink",
    previewLabel: "bg-ink text-cream",
    card: "bg-cream/40 border-ink/10",
  },
};

const groupTone = {
  "design-development": "light",
  "digital-marketing": "dark",
  creative: "sunshine",
};

function FloatingPreview({ active, services: groupServices, tone, motionX, motionY }) {
  const service = active !== null ? groupServices[active] : null;
  const globalIndex = service
    ? services.findIndex((item) => item.slug === service.slug)
    : 0;
  const preview = servicePreviews[Math.abs(globalIndex) % servicePreviews.length];

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: motionX, y: motionY }}
      className="pointer-events-none absolute left-0 top-0 z-30 hidden lg:block"
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <AnimatePresence mode="wait">
          {service ? (
            <motion.div
              key={service.slug}
              data-service-preview={service.slug}
              initial={{ opacity: 0, scale: 0.88, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`w-[260px] overflow-hidden rounded-[1.35rem] border p-2.5 shadow-lift ${tone.card}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1rem] bg-ink/10">
                <img
                  src={preview.src}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <span
                  className={`absolute bottom-2.5 left-2.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] ${tone.previewLabel}`}
                >
                  {service.navLabel}
                </span>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ServiceRows({ group, tone, groupIndex }) {
  const listRef = useRef(null);
  const [active, setActive] = useState(null);
  const reducedMotion = useReducedMotion();
  const pointerX = useSpring(0, { stiffness: 260, damping: 30, mass: 0.35 });
  const pointerY = useSpring(0, { stiffness: 260, damping: 30, mass: 0.35 });

  const onPointerMove = (event) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
  };

  return (
    <div
      ref={listRef}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setActive(null)}
      className="relative"
    >
      <FloatingPreview
        active={active}
        services={group.services}
        tone={tone}
        motionX={pointerX}
        motionY={pointerY}
      />

      <div className={`border-t ${tone.line}`}>
        {group.services.map((service, index) => (
          <Link
            key={service.slug}
            to={service.path}
            onPointerEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            className={`group grid grid-cols-[2.2rem_1fr_auto] items-center gap-3 border-b py-5 transition-colors duration-300 sm:grid-cols-[3rem_1fr_auto] sm:gap-5 sm:py-6 ${tone.line} ${tone.rowHover}`}
          >
            <span
              className={`font-hand text-xl transition-colors duration-300 ${tone.index} group-hover:text-pink`}
            >
              {String(groupIndex * 10 + index + 1).padStart(2, "0")}
            </span>

            <span className="min-w-0">
              <span
                className={`inline-block font-display text-xl font-semibold leading-tight tracking-tight transition-all duration-300 group-hover:translate-x-1 sm:text-2xl ${tone.titleHover}`}
              >
                {service.navLabel}
              </span>
              <span
                className={`mt-1.5 block max-w-xl text-[12.5px] leading-relaxed ${tone.muted}`}
              >
                {service.blurb}
              </span>
            </span>

            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 sm:h-10 sm:w-10 ${tone.arrow}`}
            >
              <Icon name="ArrowUpRight" className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  usePageMeta({
    title: "Services",
    description:
      "Design and development, digital marketing and creative services from e2e Cyber Solutions in Birmingham.",
  });

  const scrollToGroup = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(element, { offset: -140, duration: 1.1 });
    } else {
      const top = element.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Everything you need to go from{" "}
            <span className="text-pink">idea to impact.</span>
          </>
        }
        description="Web development, digital marketing and creative, built to work together. Pick one service or the whole joined-up mix - we'll help you work out what you actually need."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Services" }]}
        note="design / build / grow / create"
        meta={["17 specialist services", "3 disciplines", "One team"]}
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

      <div className="sticky top-[72px] z-30 border-y border-ink/10 bg-cream/90 backdrop-blur-md sm:top-20">
        <div className="container-x flex items-center gap-2 overflow-x-auto py-3 hide-scrollbar">
          <span className="mr-1 hidden shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/65 sm:block">
            Jump to
          </span>
          {serviceGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() => scrollToGroup(group.id)}
              className="flex shrink-0 items-center gap-2 rounded-full border border-ink/10 bg-cream-50 px-3.5 py-2 text-[11.5px] font-semibold text-ink/65 transition-colors hover:border-pink/30 hover:text-pink"
            >
              <Icon name={group.icon} className="h-3.5 w-3.5 text-pink" />
              {group.label}
              <span className="text-[9px] text-ink/65">
                {String(group.services.length).padStart(2, "0")}
              </span>
            </button>
          ))}
          <span className="ml-auto hidden shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/65 md:block">
            17 services
          </span>
        </div>
      </div>

      {serviceGroups.map((group, groupIndex) => {
        const toneKey = groupTone[group.id] || "light";
        const tone = sectionTheme[toneKey];
        const page = groupPageMap[group.id];

        return (
          <section
            key={group.id}
            id={group.id}
            className={`relative scroll-mt-40 overflow-hidden ${tone.section}`}
          >
            {groupIndex > 0 ? (
              <TornDivider
                className={`absolute inset-x-0 -top-[29px] h-8 ${
                  toneKey === "dark"
                    ? "text-ink"
                    : toneKey === "sunshine"
                      ? "text-sunshine"
                      : "text-cream"
                }`}
                variant={groupIndex + 1}
              />
            ) : null}

            <div
              className={`pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full ${
                toneKey === "dark" ? "bg-pink/20" : "bg-pink/[0.07]"
              } blur-3xl`}
              aria-hidden="true"
            />

            <div className="container-x section-pad relative">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end lg:gap-16">
                <div>
                  <Reveal y={16}>
                    <div className="flex flex-wrap items-center gap-3">
                      <Eyebrow
                        tone={
                          toneKey === "dark"
                            ? "dark"
                            : toneKey === "sunshine"
                              ? "ink"
                              : "pink"
                        }
                      >
                        0{groupIndex + 1} / {group.shortLabel}
                      </Eyebrow>
                      <span className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${tone.muted}`}>
                        {group.services.length} services
                      </span>
                    </div>
                  </Reveal>

                  <Reveal delay={0.05}>
                    <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.8rem,6.1vw,5.5rem)] font-semibold leading-[0.93] tracking-[-0.055em]">
                      {group.label}
                    </h2>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <p className={`mt-5 max-w-xl text-[15px] leading-relaxed sm:text-base ${tone.muted}`}>
                      {group.blurb}
                    </p>
                  </Reveal>
                </div>

                <Reveal delay={0.12} className="lg:justify-self-end">
                  <div className={`rounded-[1.75rem] border p-5 sm:p-6 ${tone.card}`}>
                    <p className={`font-hand text-2xl ${toneKey === "dark" ? "text-sunshine" : "text-pink"}`}>
                      {page?.note || "one team, one plan"}
                    </p>
                    <p className={`mt-2 max-w-xs text-[12.5px] leading-relaxed ${tone.muted}`}>
                      {page?.blurb || group.blurb}
                    </p>
                    <Button
                      to={page?.path || `/services#${group.id}`}
                      variant={toneKey === "dark" ? "cream" : "ink"}
                      size="sm"
                      className="mt-5 w-full"
                      icon="ArrowUpRight"
                    >
                      Explore the group
                    </Button>
                  </div>
                </Reveal>
              </div>

              <div className="mt-12">
                <ServiceRows
                  group={group}
                  tone={tone}
                  groupIndex={groupIndex}
                />
              </div>
            </div>
          </section>
        );
      })}

      <CtaSection
        eyebrow="Still deciding?"
        title={
          <>
            Tell us the goal.{" "}
            <span className="text-sunshine">We'll build the mix.</span>
          </>
        }
        text="You don't need to arrive with a brief. A quick conversation about the business is usually enough to find the right starting point."
      />
    </>
  );
}
