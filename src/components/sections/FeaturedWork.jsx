import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { portfolio, workFilters } from "../../data/home";
import { portfolioImages } from "../../data/images";
import { ParallaxImage, Reveal } from "../animations";
import Eyebrow from "../ui/Eyebrow";
import Icon from "../ui/Icon";

export default function FeaturedWork() {
  const [filter, setFilter] = useState("all");
  const visible =
    filter === "all"
      ? portfolio
      : portfolio.filter((item) => item.category === filter);

  return (
    <section className="relative overflow-hidden bg-sunshine pb-20 pt-10 text-ink sm:pb-28 sm:pt-14">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal y={14}>
              <Eyebrow tone="ink">Selected work</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-2xl font-display text-[2.5rem] leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[4.2rem]">
                Work that earns{" "}
                <span className="text-pink">its keep.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-lg text-[13px] leading-relaxed text-ink">
                Dummy portfolio concepts for layout only. Swap the images and
                case-study copy in{" "}
                <span className="font-semibold text-ink">
                  src/data/home.js
                </span>{" "}
                and{" "}
                <span className="font-semibold text-ink">
                  src/data/images.js
                </span>
                .
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div
              className="flex flex-wrap gap-1.5 rounded-full border border-ink/10 bg-cream/55 p-1.5"
              role="group"
              aria-label="Filter portfolio"
            >
              {workFilters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  aria-pressed={filter === item.id}
                  className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.13em] transition-all duration-300 ${
                    filter === item.id
                      ? "bg-ink text-cream shadow-soft"
                      : "text-ink hover:bg-cream hover:text-ink"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div
          layout
          className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((item, index) => {
              const image = portfolioImages[item.image];

              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{
                    layout: {
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.35 },
                  }}
                  className={
                    index === 0
                      ? "sm:col-span-2"
                      : index === 1
                        ? "sm:row-span-1"
                        : ""
                  }
                >
                  <Link
                    to={item.to}
                    data-cursor="view"
                    className="group relative block overflow-hidden rounded-[1.6rem] border border-ink/10 bg-cream shadow-card"
                  >
                    <ParallaxImage
                      src={image.src}
                      alt={image.alt}
                      amount={22}
                      scale={1.16}
                      className={
                        index === 0
                          ? "aspect-[16/9] sm:aspect-[2/1]"
                          : "aspect-[4/3]"
                      }
                    />

                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100"
                      aria-hidden="true"
                    />

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                      <div className="translate-y-0 transition-transform duration-500 lg:translate-y-3 lg:group-hover:translate-y-0">
                        <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-sunshine">
                          {item.categoryLabel} Â· {item.year}
                        </p>
                        <h3 className="mt-1.5 font-display text-2xl font-semibold leading-none tracking-[-0.03em] text-cream sm:text-[1.9rem]">
                          {item.title}
                        </h3>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/25 bg-cream/10 text-cream backdrop-blur-sm transition-all duration-500 group-hover:bg-pink group-hover:text-cream">
                        <Icon
                          name="ArrowUpRight"
                          className="h-4 w-4"
                          strokeWidth={2}
                        />
                      </span>
                    </div>

                    <span className="absolute left-5 top-5 rounded-full border border-cream/30 bg-ink/20 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.16em] text-cream backdrop-blur-sm">
                      Dummy concept
                    </span>
                  </Link>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
