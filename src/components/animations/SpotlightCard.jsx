import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export default function SpotlightCard({
  children,
  className = "",
  overlayClassName = "",
  color = "rgba(255,255,255,0.2)",
  radius = 420,
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(-1000);
  const pointerY = useMotionValue(-1000);
  const x = useSpring(pointerX, { stiffness: 180, damping: 26, mass: 0.4 });
  const y = useSpring(pointerY, { stiffness: 180, damping: 26, mass: 0.4 });
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${x}px ${y}px, ${color}, transparent 70%)`;

  const onPointerMove = (event) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
  };

  const reset = () => {
    pointerX.set(-1000);
    pointerY.set(-1000);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={`group/spotlight relative ${className}`}
    >
      {children}
      {!reducedMotion ? (
        <motion.span
          aria-hidden="true"
          style={{ background }}
          className={`pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100 ${overlayClassName}`}
        />
      ) : null}
    </div>
  );
}
