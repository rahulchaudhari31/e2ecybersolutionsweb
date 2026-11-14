import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useMagnetic from "../../hooks/useMagnetic";
import Icon from "./Icon";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-500 ease-smooth hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  pink: "bg-pink text-cream hover:bg-ink hover:text-cream shadow-pink",
  ink: "bg-ink text-cream hover:bg-pink hover:text-cream shadow-soft",
  cream: "bg-cream text-ink hover:bg-ink hover:text-cream",
  yellow: "bg-sunshine text-ink hover:bg-ink hover:text-cream",
  outline:
    "border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-cream",
  outlineLight:
    "border border-cream/30 bg-transparent text-cream hover:border-cream hover:bg-cream hover:text-ink",
};

const sizes = {
  sm: "px-4 py-2.5 text-[13px]",
  md: "px-6 py-3.5 text-[14px]",
  lg: "px-7 py-4 text-[15px] sm:px-8",
};

export default function Button({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "pink",
  size = "md",
  icon = "ArrowUpRight",
  className = "",
  magnetic = true,
  ...props
}) {
  const { ref, style, onPointerMove, onPointerLeave } = useMagnetic(
    magnetic ? 0.22 : 0
  );

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const inner = (
    <motion.span
      style={style}
      className="relative z-10 inline-flex items-center justify-center gap-2"
    >
      <span>{children}</span>
      {icon ? (
        <Icon
          name={icon}
          className="h-[1.05em] w-[1.05em] transition-transform duration-500 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      ) : null}
    </motion.span>
  );

  const handlers = {
    ref,
    style: undefined,
    onPointerMove,
    onPointerLeave,
  };

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...handlers} {...props}>
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...handlers} {...props}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      {...handlers}
      {...props}
    >
      {inner}
    </button>
  );
}
