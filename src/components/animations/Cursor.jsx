import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useMediaQuery from "../../hooks/useMediaQuery";

const interactiveSelector =
  "a, button, [role='button'], input, textarea, select, label, [data-cursor]";

export default function Cursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 360, damping: 30, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 360, damping: 30, mass: 0.35 });
  const ringX = useSpring(x, { stiffness: 160, damping: 24, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 160, damping: 24, mass: 0.5 });

  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("default");
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!finePointer) return undefined;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const onOver = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        setMode("default");
        return;
      }

      const explicitView = target.closest("[data-cursor='view']");
      const contentImage =
        target.tagName === "IMG" &&
        target.getAttribute("alt")?.trim() &&
        !target.closest("[data-cursor='none']");
      const interactive = target.closest(interactiveSelector);

      if (explicitView || contentImage) {
        setMode("view");
      } else if (interactive) {
        setMode("link");
      } else {
        setMode("default");
      }
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [finePointer, x, y]);

  if (!finePointer) return null;

  const isView = mode === "view";
  const ringScale = isView ? 1 : mode === "link" ? 0.62 : 0.42;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: ringScale * (pressed ? 0.9 : 1),
          opacity: visible ? 1 : 0,
          backgroundColor: isView
            ? "rgba(204,0,102,1)"
            : "rgba(204,0,102,0)",
          borderColor: isView
            ? "rgba(204,0,102,1)"
            : "rgba(250,245,236,0.9)",
        }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-none fixed -ml-10 -mt-10 z-[100] flex h-20 w-20 items-center justify-center rounded-full border ${
          isView ? "" : "mix-blend-difference"
        }`}
      >
        <motion.span
          animate={{
            opacity: isView ? 1 : 0,
            scale: isView ? 1 : 0.7,
          }}
          transition={{ duration: 0.18 }}
          className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
            isView ? "text-cream" : "text-ink"
          }`}
        >
          View
        </motion.span>
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ x: springX, y: springY }}
        animate={{
          opacity: visible && !isView ? 1 : 0,
          scale: pressed ? 0.7 : 1,
        }}
        transition={{ duration: 0.18 }}
        className="pointer-events-none fixed -ml-[3px] -mt-[3px] z-[100] h-1.5 w-1.5 rounded-full bg-pink"
      />
    </>
  );
}
