import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "../../data/home";
import { Magnetic, Reveal } from "../animations";
import Eyebrow from "../ui/Eyebrow";
import Icon from "../ui/Icon";
import TornDivider from "../ui/TornDivider";

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  const go = (direction) => {
    setIndex((value) => {
      const next = value + direction;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  return (
    <section className="relative overflow-hidden bg-pink pb-20 pt-24 text-cream sm:pb-28 sm:pt-32">
      <TornDivider className="-top-[29px] text-pink" />
      <div
        className="pointer-events-none absolute -left-40 top-10 h-[32rem] w-[32rem] rounded-full bg-cream/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]"
        aria-hidden="true"
      />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:items-center lg:gap-16">
          <div>
            <Reveal y={14}>
              <Eyebrow tone="light">Kind words, samples only</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-xl font-display text-[2.5rem] leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[4rem]">
                We like to let the{" "}
                <span className="text-sunshine">work talk.</span>
              </h2>
            </Reveal>

            <div className="relative mt-8 rounded-[1.75rem] border border-cream/20 bg-pink-dark/35 p-6 backdrop-blur-sm sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <Icon
                  name="Quote"
                  className="h-8 w-8 text-sunshine/80"
                  strokeWidth={1.5}
                />
                <span className="rounded-full border border-cream/20 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-cream">
                  Placeholder testimonial
                </span>
              </div>

              <div className="relative mt-5 min-h-[210px] sm:min-h-[190px]">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={index}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="max-w-2xl font-display text-[1.35rem] font-medium leading-snug tracking-[-0.02em] text-cream sm:text-[1.65rem]">
                      “{current.quote}”
                    </p>
                    <footer className="mt-6 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sunshine font-display text-[11px] font-bold text-ink">
                        {current.initials}
                      </span>
                      <span>
                        <span className="block text-[12px] font-semibold text-cream">
                          {current.name}
                        </span>
                        <span className="mt-0.5 block text-[10px] uppercase tracking-[0.1em] text-cream">
                          {current.role}
                        </span>
                      </span>
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 border-t border-cream/15 pt-4">
                <div className="flex items-center gap-1.5" role="group" aria-label="Choose a sample testimonial">
                  {testimonials.map((item, dotIndex) => (
                    <button
                      key={item.name}
                      type="button"
                      aria-pressed={dotIndex === index}
                      aria-label={`Show sample testimonial ${dotIndex + 1}`}
                      onClick={() => setIndex(dotIndex)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        dotIndex === index
                          ? "w-7 bg-sunshine"
                          : "w-2 bg-cream/30 hover:bg-cream/60"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous sample testimonial"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-sunshine hover:bg-sunshine hover:text-ink"
                  >
                    <Icon name="ArrowLeft" className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next sample testimonial"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-sunshine hover:bg-sunshine hover:text-ink"
                  >
                    <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Reveal delay={0.1} className="lg:justify-self-end">
            <div className="relative flex flex-col items-center text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream">
                Let's get you started
              </p>
              <Magnetic strength={0.3}>
                <Link
                  to="/contact"
                  className="group mt-5 flex h-52 w-52 flex-col items-center justify-center rounded-full border border-cream/30 bg-cream text-ink shadow-lift transition-colors duration-500 hover:bg-sunshine sm:h-64 sm:w-64"
                >
                  <span className="font-display text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                    Let's talk!
                  </span>
                  <span className="mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-cream transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <Icon name="ArrowUpRight" className="h-4 w-4" />
                  </span>
                </Link>
              </Magnetic>
              <p className="mt-6 max-w-[24ch] font-hand text-2xl leading-tight text-sunshine">
                tell us the messy version. we'll find the shape.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
