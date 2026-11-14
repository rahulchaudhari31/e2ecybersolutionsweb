export default function Marquee({
  items = [],
  className = "",
  itemClassName = "",
  separator = "✳",
  ariaLabel,
  reverse = false,
}) {
  const loop = [...items, ...items];

  const Half = ({ hidden = false }) => (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={hidden ? "true" : undefined}
    >
      {loop.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className={`flex items-center whitespace-nowrap ${itemClassName}`}
        >
          <span>{item}</span>
          <span
            className="mx-5 text-[0.7em] opacity-50 sm:mx-7"
            aria-hidden="true"
          >
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee-group relative flex overflow-hidden ${className}`}
      role="marquee"
      aria-label={ariaLabel}
    >
      <div
        className={`marquee-track flex w-max animate-marquee will-change-transform motion-reduce:animate-none ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        <Half />
        <Half hidden />
      </div>
    </div>
  );
}
