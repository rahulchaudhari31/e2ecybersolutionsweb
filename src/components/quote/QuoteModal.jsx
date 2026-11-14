import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import EnquiryForm from "../forms/EnquiryForm";
import Icon from "../ui/Icon";

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function QuoteModal({ open, onClose, source = "general" }) {
  const panelRef = useRef(null);
  const previousFocus = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;

    previousFocus.current = document.activeElement;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const lenis = window.__lenis;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    lenis?.stop?.();

    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current;
      const firstField = panel?.querySelector("input, select, textarea");
      const firstButton = panel?.querySelector("button");
      (firstField || firstButton || panel)?.focus();
    }, 80);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = [...panel.querySelectorAll(focusableSelector)].filter(
        (element) => element.offsetParent !== null
      );
      if (!focusable.length) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      lenis?.start?.();
      previousFocus.current?.focus?.();
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          className="fixed inset-0 z-[200] flex items-end justify-center bg-ink/75 p-0 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            tabIndex={-1}
            initial={reducedMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 22, scale: 0.985 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            data-lenis-prevent
            className="relative max-h-[100svh] w-full max-w-[35rem] overflow-y-auto rounded-t-[2rem] border border-ink/10 bg-cream-50 p-5 shadow-lift outline-none sm:max-h-[calc(100svh-3rem)] sm:rounded-[2rem] sm:p-7"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close quote form"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-cream text-ink/65 transition-colors hover:border-pink hover:bg-pink hover:text-cream sm:right-5 sm:top-5"
            >
              <Icon name="X" className="h-4 w-4" />
            </button>

            <div className="pr-10">
              <EnquiryForm
                compact
                source={source}
                headingId="quote-modal-title"
                onDone={onClose}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
