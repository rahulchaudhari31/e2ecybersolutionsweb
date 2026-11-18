import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "../../data/site";
import { heroVideo } from "../../data/images";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Magnetic from "../animations/Magnetic";
import { useQuoteModal } from "../quote/QuoteModalProvider";
import star from "../../assets/starburst.svg";
import arrow from "../../assets/scribble-arrow.svg";

gsap.registerPlugin(ScrollTrigger);

const wordVariants = {
  hidden: { y: "112%", rotate: 2 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
  },
};

const sublineContainer = {
  hidden: {},
  show: { transition: { delayChildren: 0.95, staggerChildren: 0.055 } },
};

function BrowserMock() {
  return (
    <div
      className="overflow-hidden rounded-[1.15rem] border border-ink/10 bg-white"
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 border-b border-ink/[0.06] px-3.5 py-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-pink" />
        <span className="h-1.5 w-1.5 rounded-full bg-sunshine" />
        <span className="h-1.5 w-1.5 rounded-full bg-lilac-deep" />
        <span className="ml-2 flex-1 truncate rounded-full bg-ink/[0.04] px-2.5 py-1 text-[8px] font-medium text-ink/65">
          e2ecybersolutions.com
        </span>
      </div>

      <div className="p-3 sm:p-3.5">
        <div className="relative overflow-hidden rounded-xl bg-ink p-4 text-cream">
          <span
            className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-pink/40 blur-2xl"
            aria-hidden="true"
          />
          <p className="relative text-[8px] font-semibold uppercase tracking-[0.22em] text-cream/65">
            Creative Chaos
          </p>
          <p className="relative mt-2 font-display text-[1.65rem] font-semibold leading-[0.92] tracking-tight sm:text-3xl">
            Big ideas.
            <br />
            <span className="text-pink-mid">Proper</span> execution.
          </p>
          <div className="relative mt-3 flex flex-wrap gap-1.5">
            {["Web", "Brand", "Growth"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-cream/15 px-2 py-1 text-[7.5px] font-semibold uppercase tracking-[0.14em] text-cream/65"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {[
            { label: "Design", tone: "bg-pink/10", bar: "bg-pink/50" },
            { label: "Build", tone: "bg-lilac", bar: "bg-ink/30" },
            { label: "Grow", tone: "bg-sunshine/40", bar: "bg-sunshine" },
          ].map((card) => (
            <div
              key={card.label}
              className={`rounded-lg ${card.tone} p-2.5`}
            >
              <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-ink/65">
                {card.label}
              </span>
              <span className={`mt-2 block h-1 w-8 rounded-full ${card.bar}`} />
              <span className="mt-1 block h-1 w-5 rounded-full bg-ink/10" />
            </div>
          ))}
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-2 rounded-lg bg-cream-200 px-3 py-2">
          <span className="truncate text-[8px] font-semibold uppercase tracking-[0.08em] text-ink/65">
            Strategy → Design → Develop → Market
          </span>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-cream">
            <Icon name="ArrowUpRight" className="h-2.5 w-2.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

function ChaosCluster({ x, y }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[540px]"
    >
      <motion.div
        style={{ x, y }}
        className="relative aspect-[5/5.1] will-change-transform"
      >
        <div
          className="absolute inset-[3%] -rotate-[5deg] rounded-[3rem] bg-gradient-to-br from-lilac via-cream-100 to-pink/15 shadow-lift"
          aria-hidden="true"
        />
        <div
          className="absolute inset-[8%] rotate-[3deg] rounded-[2.8rem] border border-ink/10 bg-cream-50/90 backdrop-blur-sm"
          aria-hidden="true"
        />

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-2 top-[14%] z-20 h-20 w-20 rounded-full bg-[radial-gradient(circle_at_30%_24%,#ffd9ec,#f45ba8_38%,#cc0066_66%,#7a003d)] shadow-[inset_-12px_-16px_24px_rgba(0,0,0,0.26),0_26px_36px_-18px_rgba(204,0,102,0.62)] motion-reduce:animate-none sm:h-24 sm:w-24"
          aria-hidden="true"
        />

        <motion.div
          animate={{ y: [0, 13, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-3 top-[8%] z-20 h-24 w-24 motion-reduce:animate-none sm:h-28 sm:w-28"
          aria-hidden="true"
        >
          <span className="block h-full w-full rounded-full border-[15px] border-sunshine shadow-[inset_0_8px_10px_rgba(0,0,0,0.18),0_24px_30px_-20px_rgba(20,16,26,0.5)] [transform:rotateX(58deg)_rotateZ(-22deg)]" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -9, 0], rotate: [6, 12, 6] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[18%] right-[2%] z-20 h-[4.5rem] w-[4.5rem] rounded-2xl bg-gradient-to-br from-lilac-deep to-ink shadow-lift motion-reduce:animate-none sm:h-20 sm:w-20"
          aria-hidden="true"
        >
          <span className="absolute left-2 top-2 h-1/2 w-1/2 rounded-xl bg-cream/20" />
        </motion.div>

        <img
          src={star}
          alt=""
          className="absolute -left-7 bottom-[8%] z-20 w-24 animate-spin-slow opacity-90 motion-reduce:animate-none sm:w-32"
        />

        <svg
          viewBox="0 0 180 80"
          className="absolute -right-2 bottom-[4%] z-20 w-24 text-pink sm:w-32"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            d="M5 58c22-30 43-42 70-38 20 3 34 15 47 32"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.65, ease: "easeInOut" }}
          />
          <motion.path
            d="M111 35l13 19 20-10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, delay: 1.6 }}
          />
        </svg>

        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-3, -1, -3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[8%] right-[7%] top-[13%] z-10 rounded-[1.5rem] border border-ink/10 bg-cream-50 p-2.5 shadow-lift motion-reduce:animate-none sm:p-3"
        >
          <BrowserMock />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16, rotate: -9 }}
          animate={{ opacity: 1, y: 0, rotate: -7 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute -left-4 bottom-[25%] z-30 rounded-2xl bg-pink px-4 py-3.5 text-cream shadow-pink sm:-left-6 sm:px-5 sm:py-4"
        >
          <p className="font-hand text-2xl leading-none text-sunshine sm:text-3xl">
            Creative Chaos
          </p>
          <p className="mt-1.5 max-w-[16ch] text-[8px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-cream">
            Disruptive ideas & strategic execution
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 7 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute -top-5 right-[12%] z-30 rounded-full border border-ink/10 bg-sunshine px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-ink shadow-soft"
        >
          Birmingham, UK
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.05 }}
          className="absolute bottom-0 left-[22%] z-30 rotate-3 rounded-xl border border-ink/10 bg-cream px-3.5 py-2 shadow-soft"
        >
          <p className="font-hand text-xl leading-none text-ink sm:text-2xl">
            built in Brum
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { openQuote } = useQuoteModal();
  const [videoOn, setVideoOn] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 80, damping: 22, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 80, damping: 22, mass: 0.6 });
  const clusterX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const clusterY = useTransform(springY, [-0.5, 0.5], [-14, 14]);
  const glowX = useTransform(springX, [-0.5, 0.5], [24, -24]);
  const glowY = useTransform(springY, [-0.5, 0.5], [18, -18]);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.to(".hero-parallax", {
        yPercent: 9,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-glow", {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handlePointerMove = (event) => {
    if (reducedMotion) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const copy = videoOn ? "text-cream" : "text-ink";
  const muted = videoOn ? "text-cream/75" : "text-ink/65";
  const chaos = videoOn ? "text-pink-mid" : "text-pink";

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative overflow-hidden bg-cream pt-[72px] sm:pt-20"
    >
      <AnimatePresence>
        {videoOn ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0 overflow-hidden"
            aria-hidden="true"
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${heroVideo.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${heroVideo.youtubeId}&controls=0&modestbranding=1&rel=0&playsinline=1`}
              title={heroVideo.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              tabIndex={-1}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
            />
            <div className="absolute inset-0 bg-ink/80" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div
        className={`pointer-events-none absolute inset-0 grid-lines opacity-70 mask-fade-b ${
          videoOn ? "hidden" : ""
        }`}
        aria-hidden="true"
      />
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="hero-glow pointer-events-none absolute -right-40 top-8 h-[32rem] w-[32rem] rounded-full bg-radial-pink"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-10 h-[26rem] w-[26rem] rounded-full bg-radial-yellow opacity-60"
        aria-hidden="true"
      />

      <div className="container-x relative z-10 pb-14 pt-7 sm:pt-9 lg:pb-24 lg:pt-10">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setVideoOn((on) => !on)}
            aria-pressed={videoOn}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors ${
              videoOn
                ? "border-cream/25 text-cream hover:bg-cream hover:text-ink"
                : "border-ink/15 text-ink/65 hover:border-pink hover:text-pink"
            }`}
          >
            <Icon
              name={videoOn ? "X" : "Video"}
              className="h-3.5 w-3.5"
              strokeWidth={1.8}
            />
            {videoOn ? "Hide reel" : "Play reel"}
          </button>
        </div>

        <div className="mt-8 grid items-center gap-14 lg:mt-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <span
                className={`inline-flex items-center gap-2.5 rounded-full border py-1.5 pl-2 pr-4 text-[10.5px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm ${
                  videoOn
                    ? "border-cream/20 bg-ink/25 text-cream/80"
                    : "border-ink/15 bg-cream-50/80 text-ink/65"
                }`}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink text-cream">
                  <span className="h-1.5 w-1.5 animate-blink rounded-full bg-cream motion-reduce:animate-none" />
                </span>
                {site.hero.badge}
              </span>
            </motion.div>

            <h1
              aria-label="Creative Chaos"
              className={`mt-7 font-display text-[clamp(3.6rem,9vw,7.4rem)] font-semibold leading-[0.87] tracking-[-0.055em] ${copy}`}
            >
              <span className="block overflow-hidden pb-[0.12em] -mb-[0.06em]">
                <motion.span
                  variants={wordVariants}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.5 }}
                  className="block"
                >
                  Creative
                </motion.span>
              </span>
              <span className="relative block overflow-visible">
                <span className="block overflow-hidden pb-[0.12em] -mb-[0.06em]">
                  <motion.span
                    variants={wordVariants}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.62 }}
                    className={`block ${chaos}`}
                  >
                    Chaos
                  </motion.span>
                </span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 1.15 }}
                  className="absolute -right-4 -top-6 font-display text-4xl font-light text-sunshine sm:-right-8 sm:text-5xl"
                  aria-hidden="true"
                >
                  ✳
                </motion.span>
              </span>
            </h1>

            <motion.p
              variants={sublineContainer}
              initial="hidden"
              animate="show"
              className={`mt-6 max-w-md font-display text-[1.35rem] font-medium leading-tight tracking-tight sm:text-2xl ${copy}`}
            >
              {site.hero.subline.split(" ").map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="inline-block overflow-hidden pb-[0.08em] align-bottom"
                >
                  <motion.span variants={wordVariants} className="inline-block">
                    {item}
                    {index < site.hero.subline.split(" ").length - 1
                      ? "\u00A0"
                      : ""}
                  </motion.span>
                </span>
              ))}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05 }}
              className={`mt-4 max-w-lg text-[14.5px] leading-relaxed sm:text-[15.5px] ${muted}`}
            >
              {site.hero.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.25 }}
              className="relative mt-8 flex flex-col gap-2.5 sm:flex-row sm:items-center"
            >
              <span
                className="pointer-events-none absolute -top-10 left-24 hidden items-end gap-1.5 sm:flex"
                aria-hidden="true"
              >
                <img
                  src={arrow}
                  alt=""
                  className="h-7 w-14 rotate-[18deg] opacity-80"
                />
                <span className="mb-1 font-hand text-lg text-pink">start here</span>
              </span>

              <Magnetic strength={0.22}>
                <Button
                  size="lg"
                  onClick={() => openQuote("hero")}
                >
                  Get Started
                </Button>
              </Magnetic>
              <Button
                to={site.hero.secondaryCta.to}
                variant={videoOn ? "outlineLight" : "outline"}
                size="lg"
                icon="ArrowDownRight"
              >
                Explore services
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.45 }}
              className={`mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] font-medium ${muted}`}
            >
              <span className="flex items-center gap-2">
                <Icon name="MapPin" className="h-3.5 w-3.5 text-pink" />
                Birmingham, UK
              </span>
              <a
                href={site.phoneHref}
                className={`flex items-center gap-2 transition-colors ${
                  videoOn ? "hover:text-cream" : "hover:text-pink"
                }`}
              >
                <Icon name="Phone" className="h-3.5 w-3.5 text-pink" />
                {site.phone}
              </a>
              <a
                href={site.emailHref}
                className={`hidden items-center gap-2 transition-colors sm:flex ${
                  videoOn ? "hover:text-cream" : "hover:text-pink"
                }`}
              >
                <Icon name="Mail" className="h-3.5 w-3.5 text-pink" />
                {site.email}
              </a>
            </motion.div>
          </div>

          <div className="hero-parallax">
            <ChaosCluster x={clusterX} y={clusterY} />
          </div>
        </div>
      </div>
    </section>
  );
}
