import { Link } from "react-router-dom";
import { services, featuredServices } from "../../data/services";
import Reveal from "../animations/Reveal";
import SectionHeading from "../ui/SectionHeading";
import ServiceCard from "../ui/ServiceCard";
import Button from "../ui/Button";
import Icon from "../ui/Icon";

export default function ServicesShowcase() {
  return (
    <section className="relative overflow-hidden border-t border-ink/[0.06] bg-cream-100 section-pad">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                One agency. Every digital{" "}
                <span className="text-pink">moving part.</span>
              </>
            }
            description="Build, growth and creative under one roof — so your website, campaigns and content all speak the same language."
            className="max-w-2xl"
          />
          <Reveal delay={0.12} className="shrink-0">
            <Button to="/services" variant="outline" icon="ArrowRight">
              All {services.length} services
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, index) => (
            <Reveal
              key={service.slug}
              delay={(index % 3) * 0.06}
              className="h-full"
            >
              <ServiceCard
                service={service}
                index={String(index + 1).padStart(2, "0")}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-2">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink/65">
            Also in the mix
          </span>
          {["Mobile apps", "Ecommerce", "WordPress", "PPC", "Social", "Video"].map(
            (label) => (
              <Link
                key={label}
                to="/services"
                className="rounded-full border border-ink/10 bg-cream-50 px-3 py-1.5 text-[11px] font-medium text-ink/65 transition-colors hover:border-pink/30 hover:text-pink"
              >
                {label}
              </Link>
            )
          )}
          <span className="ml-1 flex items-center gap-1.5 text-[11px] font-semibold text-ink/65">
            <Icon name="Sparkles" className="h-3.5 w-3.5 text-pink" />
            plus {services.length - featuredServices.length} more
          </span>
        </Reveal>
      </div>
    </section>
  );
}
