import { motion } from "framer-motion";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  once = true,
  amount = 0.25,
  as = "div",
}) {
  const Tag = motion[as] || motion.div;

  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}
