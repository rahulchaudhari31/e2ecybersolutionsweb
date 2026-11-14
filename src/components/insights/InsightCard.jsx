import { Link } from "react-router-dom";
import Icon from "../ui/Icon";

const chips = {
  pink: "bg-pink text-cream",
  lilac: "bg-lilac text-ink",
  sunshine: "bg-sunshine text-ink",
  cream: "bg-cream-200 text-ink",
  ink: "bg-ink text-cream",
};

export default function InsightCard({ article, index = "01" }) {
  return (
    <article className="h-full">
      <Link
        to={`/insights/${article.slug}`}
        className="group flex h-full flex-col"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-lilac">
          <img
            src={article.cover.src}
            alt={article.cover.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent"
            aria-hidden="true"
          />
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] ${
              chips[article.tone] || chips.cream
            }`}
          >
            {article.category}
          </span>
          <span className="absolute bottom-3 right-3 font-hand text-lg text-cream">
            {index} / notes
          </span>
        </div>

        <div className="flex flex-1 flex-col pt-4">
          <div className="flex items-center gap-2 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink/65">
            <span>{article.published}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-pink" />
            <span>{article.readTime}</span>
          </div>
          <h3 className="mt-2.5 font-display text-[1.45rem] font-semibold leading-[1.12] tracking-[-0.035em] transition-colors group-hover:text-pink">
            {article.title}
          </h3>
          <p className="mt-2.5 text-[13px] leading-relaxed text-ink/65">
            {article.excerpt}
          </p>
          <span className="mt-auto flex items-center gap-2 pt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-pink">
            Read article
            <Icon
              name="ArrowUpRight"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
