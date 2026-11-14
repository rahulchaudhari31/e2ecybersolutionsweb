import { useMemo } from "react";

function makeTornPath(seed = 1) {
  const baseline = 30;
  let d = `M0,60 L0,${baseline}`;
  for (let x = 0; x <= 1440; x += 18) {
    const y =
      baseline +
      Math.sin((x + seed) * 0.09) * 4 +
      Math.cos((x + seed * 2.3) * 0.21) * 2.8 +
      Math.sin((x + seed) * 0.67) * 1.6;
    d += ` L${x},${y.toFixed(1)}`;
  }
  d += " L1440,60 Z";
  return d;
}

export default function TornDivider({
  variant = 1,
  flip = false,
  className = "",
  color,
}) {
  const path = useMemo(() => makeTornPath(variant * 29 + 7), [variant]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none w-full overflow-hidden leading-[0] ${className}`}
      style={color ? { color } : undefined}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className={`h-full w-full ${flip ? "rotate-180" : ""}`}
      >
        <path d={path} fill="currentColor" />
      </svg>
    </div>
  );
}
