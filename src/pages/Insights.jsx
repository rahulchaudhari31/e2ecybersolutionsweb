import { useState } from "react";
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";
import { insights, insightCategories } from "../data/insights";
import { Reveal, SplitText } from "../components/animations";
import Eyebrow from "../components/ui/Eyebrow";
import Icon from "../components/ui/Icon";
import InsightCard from "../components/insights/InsightCard";
import CtaSection from "../components/sections/CtaSection";

function FeaturedInsight({ article, filtered }) {
  return (
    <Link
      to={`/insights/${article.slug}`}
      className="group grid overflow-hidden rounded-[2rem] border border-ink/10 bg-cream-50 shadow-soft transition-all duration-500 hover:border-pink/25 hover:shadow-lift lg:grid-cols-[1.08fr_0.92fr]"
    >
      <div className="relative min-h-[280px] overflow-hidden bg-lilac lg:min-h-[430px]">
        <img
          src={article.cover.src}
          alt={article.cover.alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.035]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3 sm:inset-x-5 sm:top-5">
          <span className="rounded-full bg-cream/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-ink">
            {filtered ? "Selected note" : "Latest note"}
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 bg-ink/35 text-cream backdrop-blur-sm">
            <Icon name={article.icon} className="h-4 w-4" />
          </span>
        </div>
        <p className="absolute bottom-4 left-4 right-4 font-hand text-2xl text-cream sm:bottom-5 sm:left-5">
          {article.category.toLowerCase()} / field notes
        </p>
      </div>

      <div className="flex flex-col p-6 sm:p-8 lg:p-9">
        <div className="flex flex-wrap items-center gap-2 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink/65">
          <span className="text-pink">{article.category}</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ink/25" />
          <span>{article.published}</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ink/25" />
          <span>{article.readTime}</span>
        </div>

        <h2 className="mt-4 font-display text-[clamp(2rem,4.3vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] transition-colors group-hover:text-pink">
          {article.title}
        </h2>
        <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-ink/65 sm:text-[15px]">
          {article.excerpt}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lilac font-display text-sm font-bold text-ink">
            {article.author
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </span>
          <span>
            <span className="block text-[12.5px] font-semibold text-ink">
              {article.author}
            </span>
            <span className="block text-[10.5px] text-ink/65">
              {article.role}
            </span>
          </span>
        </div>

        <span className="mt-auto flex items-center gap-2 pt-7 text-[10px] font-bold uppercase tracking-[0.16em] text-pink">
          Read the full note
          <Icon
            name="ArrowUpRight"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

export default function Insights() {
  const [category, setCategory] = useState("All");
  const filteredArticles =
    category === "All"
      ? insights
      : insights.filter((article) => article.category === category);
  const featured = filteredArticles[0];
  const rest = filteredArticles.slice(1);

  usePageMeta({
    title: "Insights",
    description:
      "Practical notes on websites, search, brand, content and growth from the e2e Cyber Solutions team in Birmingham.",
  });

  return (
    <>
      <section className="relative overflow-hidden bg-cream pt-[92px] sm:pt-[104px]">
        <div
          className="pointer-events-none absolute inset-0 grid-lines opacity-70 mask-fade-b"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-28 top-8 h-[30rem] w-[30rem] rounded-full bg-radial-yellow"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-28 bottom-0 h-[25rem] w-[25rem] rounded-full bg-radial-pink opacity-70"
          aria-hidden="true"
        />

        <div className="container-x relative pb-14 pt-8 sm:pt-10 lg:pb-20 lg:pt-14">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-ink/65"
          >
            <Link to="/" className="transition-colors hover:text-pink">
              Home
            </Link>
            <span aria-hidden="true" className="text-ink/25">
              /
            </span>
            <span>Insights</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
            <div>
              <Reveal y={16}>
                <Eyebrow tone="pink">Insights</Eyebrow>
              </Reveal>
              <SplitText
                as="h1"
                text="Ideas, opinions and useful things."
                className="mt-5 max-w-4xl font-display text-[clamp(2.9rem,7vw,6rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-ink"
                delay={0.1}
                stagger={0.028}
              />
            </div>

            <Reveal delay={0.18}>
              <p className="max-w-md text-[15px] leading-relaxed text-ink/65">
                Field notes from the team on websites, search, brand, content
                and the small decisions that make digital work harder. No hot
                takes for the sake of it.
              </p>
              <p className="mt-4 flex items-center gap-2 font-hand text-2xl text-ink/65">
                <Icon name="Sparkles" className="h-4 w-4 text-pink" />
                read slowly, steal usefully
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative border-y border-ink/[0.06] bg-cream-100 section-pad">
        <div className="container-x">
          <div className="flex flex-col gap-6 border-b border-ink/10 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal y={14}>
                <Eyebrow tone="pink">The archive</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                  Latest thinking.
                </h2>
              </Reveal>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              <div
                className="flex flex-wrap gap-1.5"
                role="group"
                aria-label="Filter insights by topic"
              >
                {insightCategories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    aria-pressed={category === item}
                    className={`rounded-full border px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-all ${
                      category === item
                        ? "border-ink bg-ink text-cream"
                        : "border-ink/10 bg-cream-50 text-ink/65 hover:border-pink/30 hover:text-pink"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/65">
                {String(filteredArticles.length).padStart(2, "0")}{" "}
                {filteredArticles.length === 1 ? "note" : "notes"}
              </p>
            </div>
          </div>

          {featured ? (
            <Reveal delay={0.08} className="mt-8">
              <FeaturedInsight
                article={featured}
                filtered={category !== "All"}
              />
            </Reveal>
          ) : null}

          {rest.length ? (
            <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article, index) => (
                <Reveal
                  key={article.slug}
                  delay={(index % 3) * 0.06}
                  className="h-full"
                >
                  <InsightCard
                    article={article}
                    index={String(index + 2).padStart(2, "0")}
                  />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <CtaSection
        eyebrow="Put it to use"
        title={
          <>
            Got a problem worth{" "}
            <span className="text-sunshine">thinking about?</span>
          </>
        }
        text="Bring us the messy version. We will help you work out what needs to change, what needs to stay and what the next useful step looks like."
      />
    </>
  );
}
