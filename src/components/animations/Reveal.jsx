import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  blur = 0,
  duration = 0.75,
  once = true,
  amount = 0.25,
  as = "div",
}) {
  const reducedMotion = useReducedMotion();
  const Tag = motion[as] || motion.div;

  const hidden = {
    opacity: 0,
    y,
    x,
    scale,
    ...(blur ? { filter: `blur(${blur}px)` } : {}),
  };

  const shown = {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    ...(blur ? { filter: "blur(0px)" } : {}),
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  };

  return (
    <Tag
      initial={reducedMotion ? shown : hidden}
      whileInView={shown}
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </Tag>
  );
}
