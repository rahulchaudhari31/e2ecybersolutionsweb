import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Icon from "./Icon";

const STORAGE_KEY = "e2e-cookie-consent";

function hasSavedChoice() {
  try {
    return Boolean(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (hasSavedChoice()) return undefined;

    const timer = window.setTimeout(() => setVisible(true), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  const choose = (choice) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ choice, savedAt: new Date().toISOString() })
      );
    } catch {
      setVisible(false);
      return;
    }
    setVisible(false);
  };

  return createPortal(
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="region"
          aria-label="Cookie consent"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: 14 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 left-4 right-4 z-[95] rounded-[1.5rem] border border-cream/15 bg-ink p-5 text-cream shadow-lift sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[25rem] sm:p-6"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sunshine text-ink">
              <Icon name="Cookie" className="h-5 w-5" strokeWidth={2} />
            </span>
            <div>
              <p className="font-display text-lg font-semibold leading-tight tracking-tight">
                A quick note about cookies.
              </p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-cream/65">
                We use essential cookies to keep the site working, and optional
                analytics to understand how it is used.
              </p>
            </div>
            <button
              type="button"
              onClick={() => choose("essential")}
              aria-label="Keep essential cookies only"
              className="-mr-1 -mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-cream/45 transition-colors hover:bg-cream/10 hover:text-cream"
            >
              <Icon name="X" className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => choose("all")}
              className="rounded-full bg-sunshine px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-cream"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={() => choose("essential")}
              className="rounded-full border border-cream/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-cream/75 transition-colors hover:border-cream/40 hover:text-cream"
            >
              Essential only
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
