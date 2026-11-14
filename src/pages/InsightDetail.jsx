import { Link, useParams } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";
import {
  getInsight,
  getRelatedInsights,
} from "../data/insights";
import { Reveal, SplitText } from "../components/animations";
import Eyebrow from "../components/ui/Eyebrow";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import InsightCard from "../components/insights/InsightCard";
import CtaSection from "../components/sections/CtaSection";
import NotFound from "./NotFound";

const chips = {
  pink: "bg-pink text-cream",
  lilac: "bg-lilac text-ink",
  sunshine: "bg-sunshine text-ink",
  cream: "bg-cream-200 text-ink",
  ink: "bg-ink text-cream",
};

function headingId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ArticleBlock({ block }) {
  if (block.type === "heading") {
    return (
      <h2
        id={headingId(block.text)}
        className="mt-11 scroll-mt-28 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.04em] text-ink sm:text-[2.35rem]"
      >
        {block.text}
      </h2>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="my-6 space-y-3">
        {block.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/75"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink/10 text-pink">
              <Icon name="Check" className="h-3 w-3" strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote className="my-9 rounded-[1.5rem] bg-lilac p-6 text-ink sm:p-8">
        <Icon name="Quote" className="h-7 w-7 text-pink" strokeWidth={1.7} />
        <p className="mt-4 font-display text-[1.55rem] font-medium leading-[1.28] tracking-[-0.025em] sm:text-[1.8rem]">
          {block.text}
        </p>
      </blockquote>
    );
  }

  if (block.type === "callout") {
    return (
      <aside className="my-8 rounded-[1.5rem] border border-ink/10 bg-sunshine/45 p-6">
        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/65">
          <Icon name="Sparkles" className="h-3.5 w-3.5 text-pink" />
          {block.title}
        </p>
        <p className="mt-2.5 text-[14.5px] font-medium leading-relaxed text-ink/75">
          {block.text}
        </p>
      </aside>
    );
  }

  return (
    <p className="mt-5 text-[15.5px] leading-[1.85] text-ink/75 sm:text-[16px]">
      {block.text}
    </p>
  );
}

export default function InsightDetail() {
  const { slug } = useParams();
  const article = getInsight(slug);

  usePageMeta({
    title: article ? article.title : "Insight not found",
    description: article
      ? article.excerpt
      : "That insight could not be found. Browse the latest thinking from e2e Cyber Solutions.",
  });

  if (!article) return <NotFound />;

  const sections = article.blocks.filter((block) => block.type === "heading");
  const related = getRelatedInsights(article.related).slice(0, 2);
  const initials = article.author
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <>
      <section className="relative overflow-hidden bg-cream pt-[92px] sm:pt-[104px]">
        <div
          className="pointer-events-none absolute inset-0 grid-lines opacity-70 mask-fade-b"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-28 top-10 h-[30rem] w-[30rem] rounded-full bg-radial-pink"
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
            <Link to="/insights" className="transition-colors hover:text-pink">
              Insights
            </Link>
            <span aria-hidden="true" className="text-ink/25">
              /
            </span>
            <span>{article.category}</span>
          </nav>

          <div className="mt-7 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <Reveal y={16}>
                <Eyebrow tone="pink">{article.category}</Eyebrow>
              </Reveal>

              <SplitText
                as="h1"
                text={article.title}
                className="mt-5 font-display text-[clamp(2.8rem,6.4vw,5.4rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-ink"
                delay={0.1}
                stagger={0.03}
              />

              <Reveal delay={0.18}>
                <p className="mt-6 max-w-xl text-[16px] font-medium leading-relaxed text-ink/70 sm:text-lg">
                  {article.excerpt}
                </p>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/65">
                  <time dateTime={article.dateTime}>{article.published}</time>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-pink" />
                  <span>{article.readTime}</span>
                </div>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="mt-7 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lilac font-display text-sm font-bold text-ink">
                    {initials}
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-ink">
                      {article.author}
                    </span>
                    <span className="block text-[11px] text-ink/65">
                      {article.role}
                    </span>
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.16} y={30}>
              <div className="relative aspect-[4/3.3] overflow-hidden rounded-[2rem] border border-ink/10 bg-lilac shadow-lift">
                <img
                  src={article.cover.src}
                  alt={article.cover.alt}
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent"
                  aria-hidden="true"
                />
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] ${
                    chips[article.tone] || chips.cream
                  }`}
                >
                  {article.category}
                </span>
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-hand text-2xl text-sunshine">
                      e2e field notes
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-cream/65">
                      {article.readTime}
                    </p>
                  </div>
                  <Icon
                    name={article.icon}
                    className="h-9 w-9 text-cream/80"
                    strokeWidth={1.3}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative border-y border-ink/[0.06] bg-cream-100 section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:gap-16 xl:gap-24">
          <article className="min-w-0 max-w-[46rem]">
            {article.blocks.map((block, index) => (
              <ArticleBlock key={`${block.type}-${index}`} block={block} />
            ))}

            <div className="mt-10 flex flex-col gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/65">
                Filed under{" "}
                <span className="text-pink">{article.category}</span>
              </p>
              <Link
                to="/insights"
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:text-pink"
              >
                <Icon name="ArrowLeft" className="h-3.5 w-3.5" />
                All insights
              </Link>
            </div>
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-4">
              {sections.length ? (
                <div className="rounded-[1.5rem] border border-ink/10 bg-cream-50 p-5">
                  <p className="text-[9.5px] font-bold uppercase tracking-[0.17em] text-ink/65">
                    In this note
                  </p>
                  <nav className="mt-3" aria-label="Article contents">
                    <ol className="space-y-2">
                      {sections.map((section, index) => (
                        <li key={section.text}>
                          <a
                            href={`#${headingId(section.text)}`}
                            className="flex gap-2.5 text-[12px] leading-snug text-ink/65 transition-colors hover:text-pink"
                          >
                            <span className="font-hand text-base text-pink">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            {section.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>
              ) : null}

              <div className="rounded-[1.5rem] bg-ink p-5 text-cream">
                <p className="flex items-center gap-2 text-[9.5px] font-bold uppercase tracking-[0.17em] text-cream/65">
                  <Icon name="Star" className="h-3.5 w-3.5 text-sunshine" />
                  Key takeaways
                </p>
                <ul className="mt-3 space-y-3">
                  {article.takeaways.map((takeaway) => (
                    <li
                      key={takeaway}
                      className="flex items-start gap-2.5 text-[12px] leading-relaxed text-cream/75"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sunshine" />
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.5rem] border border-ink/10 bg-sunshine p-5">
                <p className="font-hand text-2xl text-ink">
                  want the short version?
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-ink/70">
                  Tell us what you are working on. We will give you a straight
                  answer, not a lecture.
                </p>
                <Button
                  to="/contact"
                  size="sm"
                  variant="ink"
                  className="mt-4 w-full"
                  icon="ArrowUpRight"
                >
                  Talk it through
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length ? (
        <section className="relative bg-cream section-pad">
          <div className="container-x">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Reveal y={14}>
                  <Eyebrow tone="pink">Keep reading</Eyebrow>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                    More field notes.
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={0.08}>
                <Button to="/insights" variant="outline" icon="ArrowRight">
                  All insights
                </Button>
              </Reveal>
            </div>

            <div className="mt-9 grid max-w-4xl gap-8 sm:grid-cols-2">
              {related.map((item, index) => (
                <Reveal
                  key={item.slug}
                  delay={index * 0.07}
                  className="h-full"
                >
                  <InsightCard article={item} index={`0${index + 1}`} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaSection
        eyebrow="Your turn"
        title={
          <>
            Enough reading.{" "}
            <span className="text-sunshine">Let's make something.</span>
          </>
        }
        text="Bring us the business problem, the half-formed idea or the website that has stopped pulling its weight. We will help you find the next useful move."
      />
    </>
  );
}
