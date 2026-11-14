import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export default function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  amount = 34,
  scale = 1.3,
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-amount, amount]),
    { stiffness: 110, damping: 28, mass: 0.4 }
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={
          reducedMotion
            ? { scale }
            : { y: imageY, scale, willChange: "transform" }
        }
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
