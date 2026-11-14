import Reveal from "../animations/Reveal";
import Eyebrow from "./Eyebrow";

const sizes = {
  sm: "text-3xl sm:text-4xl",
  md: "text-4xl sm:text-5xl lg:text-[3.4rem] lg:leading-[1.02]",
  lg: "text-5xl sm:text-6xl lg:text-[4.5rem] lg:leading-[0.98]",
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
  size = "md",
  className = "",
  titleClassName = "",
  action,
}) {
  const alignment =
    align === "center"
      ? "items-center text-center mx-auto"
      : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <Reveal y={16}>
          <Eyebrow tone={invert ? "dark" : "pink"}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}

      <Reveal delay={0.06}>
        <h2
          className={`mt-5 font-display ${sizes[size]} ${
            invert ? "text-cream" : "text-ink"
          } ${titleClassName}`}
        >
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p
            className={`mt-5 max-w-2xl text-[15px] leading-relaxed sm:text-base ${
              align === "center" ? "mx-auto" : ""
            } ${invert ? "text-cream/70" : "text-ink/65"}`}
          >
            {description}
          </p>
        </Reveal>
      ) : null}

      {action ? (
        <Reveal delay={0.16} className="mt-7">
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
