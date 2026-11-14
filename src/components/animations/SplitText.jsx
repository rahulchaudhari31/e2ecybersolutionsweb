import { motion, useReducedMotion } from "framer-motion";

const container = (delay, stagger) => ({
  hidden: {},
  show: {
    transition: { delayChildren: delay, staggerChildren: stagger },
  },
});

const word = {
  hidden: { y: "115%", rotate: 2 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SplitText({
  text,
  children,
  as = "h2",
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.045,
  once = true,
  amount = 0.35,
}) {
  const reducedMotion = useReducedMotion();
  const Tag = motion[as] || motion.h2;
  const content = text ?? (typeof children === "string" ? children : "");
  const words = content.split(/\s+/).filter(Boolean);

  return (
    <Tag
      aria-label={content}
      initial={reducedMotion ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once, amount }}
      variants={container(delay, stagger)}
      className={className}
    >
      {words.map((item, index) => (
        <span
          key={`${item}-${index}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            variants={reducedMotion ? undefined : word}
            className={`inline-block ${wordClassName}`}
          >
            {item}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
