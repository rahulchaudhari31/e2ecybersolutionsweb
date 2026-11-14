import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "../../data/site";

export const PRELOADER_KEY = "e2e:intro-played";

function markPlayed() {
  try {
    window.sessionStorage.setItem(PRELOADER_KEY, "1");
  } catch {
    // Session storage can be unavailable in private browsing.
  }
}

export default function Preloader({ onReveal, onDone }) {
  const reducedMotion = useReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      markPlayed();
      onReveal();
      onDone();
      return undefined;
    }

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      onReveal();
      setLeaving(true);
    }, 1050);

    return () => {
      window.clearTimeout(timer);
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [onDone, onReveal, reducedMotion]);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    markPlayed();
    onDone();
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: leaving ? "-100%" : 0 }}
      transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (leaving) finish();
      }}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-ink text-cream"
    >
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-pink/20 blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-sunshine/10 blur-[110px]"
        aria-hidden="true"
      />

      <p className="sr-only" role="status">
        Loading e2e Cyber Solutions
      </p>

      <div className="relative flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ scale: 0.55, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-24 w-24 items-center justify-center rounded-[1.9rem] bg-pink shadow-pink sm:h-28 sm:w-28"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 112 112"
            className="absolute inset-0 h-full w-full"
            fill="none"
          >
            <motion.rect
              x="2"
              y="2"
              width="108"
              height="108"
              rx="30"
              stroke="rgba(250,245,236,0.42)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.15, ease: "easeInOut" }}
            />
          </svg>
          <motion.span
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="font-display text-2xl font-extrabold tracking-tighter sm:text-3xl"
          >
            e2e
          </motion.span>
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.62 }}
            className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-sunshine ring-2 ring-ink"
          />
        </motion.div>

        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-7"
        >
          <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {site.name}
          </p>
          <p className="mt-2 font-hand text-2xl text-sunshine">
            {site.tagline}
          </p>
        </motion.div>

        <div
          className="mt-9 h-px w-40 overflow-hidden bg-cream/15 sm:w-52"
          aria-hidden="true"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="block h-full w-full origin-left bg-pink"
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="mt-3 text-[9px] font-semibold uppercase tracking-[0.26em] text-cream/65"
          aria-hidden="true"
        >
          Warming up the chaos
        </motion.p>
      </div>
    </motion.div>
  );
}
