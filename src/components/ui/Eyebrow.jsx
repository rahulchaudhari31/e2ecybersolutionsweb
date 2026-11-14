const tones = {
  default: "border-ink/15 text-ink/70",
  pink: "border-pink-dark/30 bg-pink/[0.06] text-pink-dark",
  dark: "border-cream/20 text-cream/70",
  light: "border-cream/25 bg-cream/5 text-cream",
  ink: "border-ink/20 bg-ink/[0.04] text-ink",
};

const dotTones = {
  default: "bg-pink",
  pink: "bg-pink",
  dark: "bg-sunshine",
  light: "bg-sunshine",
  ink: "bg-pink",
};

export default function Eyebrow({
  children,
  tone = "default",
  dot = true,
  className = "",
}) {
  return (
    <span className={`eyebrow ${tones[tone]} ${className}`}>
      {dot ? (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotTones[tone]}`}
          aria-hidden="true"
        />
      ) : null}
      {children}
    </span>
  );
}
