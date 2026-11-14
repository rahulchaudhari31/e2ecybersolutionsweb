import usePageMeta from "../hooks/usePageMeta";
import Button from "../components/ui/Button";
import Eyebrow from "../components/ui/Eyebrow";
import Reveal from "../components/animations/Reveal";

export default function NotFound() {
  usePageMeta({
    title: "Page not found",
    description: "That page doesn't exist. Head back to e2e Cyber Solutions.",
  });

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-cream pt-24">
      <div
        className="pointer-events-none absolute inset-0 grid-lines opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-radial-pink"
        aria-hidden="true"
      />

      <div className="container-x relative py-20">
        <Reveal y={16}>
          <Eyebrow tone="pink">404</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 max-w-2xl font-display text-[clamp(3.5rem,10vw,8rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
            This page took a{" "}
            <span className="text-pink">wrong turn.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/65">
            The link might be old, or the page might have moved. Let's get you
            back to something useful.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-8 flex flex-col gap-2.5 sm:flex-row">
          <Button to="/" icon="ArrowLeft">
            Back home
          </Button>
          <Button to="/services" variant="outline" icon="ArrowRight">
            Explore services
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
