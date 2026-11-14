import { motion } from "framer-motion";
import useMagnetic from "../../hooks/useMagnetic";

export default function Magnetic({
  children,
  as = "div",
  strength = 0.32,
  className = "",
  style,
  ...props
}) {
  const { ref, style: magneticStyle, onPointerMove, onPointerLeave } =
    useMagnetic(strength);
  const Tag = motion[as] || motion.div;

  return (
    <Tag
      ref={ref}
      style={{ ...magneticStyle, ...style }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  );
}
