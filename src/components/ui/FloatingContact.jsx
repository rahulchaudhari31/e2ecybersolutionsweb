import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "../../data/site";
import Icon from "./Icon";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    const handlePointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return createPortal(
    <div
      ref={wrapRef}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setOpen(false);
      }}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      className="fixed bottom-5 right-5 z-[76] flex flex-col items-end gap-2.5 sm:bottom-7 sm:right-7"
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            id="floating-contact-actions"
            initial={reducedMotion ? false : { opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-end gap-2"
          >
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 rounded-full border border-ink/10 bg-cream py-1 pl-4 pr-1 shadow-soft transition-colors hover:border-pink/30"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/70">
                WhatsApp
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sunshine text-ink transition-transform group-hover:scale-105">
                <Icon name="MessageCircle" className="h-4 w-4" strokeWidth={2} />
              </span>
            </a>

            <a
              href={site.phoneHref}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 rounded-full border border-ink/10 bg-cream py-1 pl-4 pr-1 shadow-soft transition-colors hover:border-pink/30"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/70">
                Call us
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lilac text-ink transition-transform group-hover:scale-105">
                <Icon name="Phone" className="h-4 w-4" strokeWidth={2} />
              </span>
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="floating-contact-actions"
        aria-label={
          open ? "Close contact options" : "Let's talk — open contact options"
        }
        className="group flex h-14 items-center gap-2 rounded-full bg-pink px-4 text-cream shadow-pink transition-all hover:bg-pink-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunshine focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
      >
        <Icon
          name={open ? "X" : "MessageCircle"}
          className="h-5 w-5 transition-transform group-hover:rotate-6"
          strokeWidth={2.2}
        />
        <span className="hidden text-[10px] font-bold uppercase tracking-[0.16em] sm:inline">
          {open ? "Close" : "Let's talk"}
        </span>
      </button>
    </div>,
    document.body
  );
}
