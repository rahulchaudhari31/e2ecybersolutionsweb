import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";

function scrollToTop() {
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { duration: 1 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > 700);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-24 right-5 z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-cream/90 text-ink shadow-soft backdrop-blur-md transition-colors hover:border-pink hover:bg-pink hover:text-cream sm:bottom-28 sm:right-7"
        >
          <Icon
            name="ArrowUpRight"
            className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
