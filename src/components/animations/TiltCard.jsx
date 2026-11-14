import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

const spring = { stiffness: 220, damping: 22, mass: 0.5 };

export default function TiltCard({
  children,
  className = "",
  innerClassName = "",
  max = 7,
  glare = true,
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [max, -max]),
    spring
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-max, max]),
    spring
  );
  const glareX = useTransform(pointerX, [-0.5, 0.5], ["12%", "88%"]);
  const glareY = useTransform(pointerY, [-0.5, 0.5], ["12%", "88%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.22), transparent 42%)`;

  const onPointerMove = (event) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={`group [perspective:1100px] ${className}`}
    >
      <motion.div
        style={
          reducedMotion
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        className={`relative h-full w-full ${innerClassName}`}
      >
        {children}
        {glare && !reducedMotion ? (
          <motion.span
            aria-hidden="true"
            style={{ background: glareBackground }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        ) : null}
      </motion.div>
    </div>
  );
}
