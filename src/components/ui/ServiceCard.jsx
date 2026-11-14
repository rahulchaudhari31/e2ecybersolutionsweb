import { Link } from "react-router-dom";
import Icon from "./Icon";

const accents = {
  pink: "bg-pink/10 text-pink",
  lilac: "bg-lilac text-ink",
  yellow: "bg-sunshine/40 text-ink",
  sunshine: "bg-sunshine/40 text-ink",
  cream: "bg-cream-200 text-ink",
  ink: "bg-ink/10 text-ink",
};

export default function ServiceCard({
  service,
  index = "01",
  className = "",
  tone = "cream",
}) {
  const accent = accents[service.theme] || accents.cream;

  return (
    <Link
      to={service.path}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/10 bg-cream-50 p-6 transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-lift sm:p-7 ${className}`}
    >
      <div
        className={`absolute -right-16 -bottom-20 h-44 w-44 rounded-full ${accent} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60`}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="font-hand text-2xl text-pink">{index}</span>
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${accent} transition-transform duration-500 ease-smooth group-hover:-rotate-6 group-hover:scale-110`}
        >
          <Icon name={service.icon} className="h-5 w-5" strokeWidth={1.8} />
        </span>
      </div>

      <div className="relative mt-8 flex flex-1 flex-col">
        <h3 className="max-w-[15ch] font-display text-[1.45rem] leading-[1.08] tracking-tight text-ink">
          {service.title}
        </h3>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink/65">
          {service.blurb}
        </p>

        <span className="mt-auto flex items-center gap-2 pt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/65 transition-colors duration-300 group-hover:text-pink">
          Explore
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 transition-all duration-500 group-hover:border-pink group-hover:bg-pink group-hover:text-cream">
            <Icon name="ArrowUpRight" className="h-3.5 w-3.5" />
          </span>
        </span>
      </div>
    </Link>
  );
}
