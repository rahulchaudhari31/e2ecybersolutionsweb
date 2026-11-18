import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../../data/site";
import {
  primaryNav,
  serviceMegaMenu,
  socialLinks,
} from "../../data/nav";
import Icon from "../ui/Icon";
import Button from "../ui/Button";
import { useQuoteModal } from "../quote/QuoteModalProvider";

const megaItem = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
};

function Wordmark({ light = false, onClick }) {
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-2.5">
      <span
        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pink text-cream shadow-pink"
        aria-hidden="true"
      >
        <span className="font-display text-[13px] font-extrabold tracking-tighter">
          e2e
        </span>
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-sunshine ring-2 ring-cream transition-transform duration-500 group-hover:scale-125" />
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-[15px] font-extrabold tracking-tight transition-colors duration-300 sm:text-[17px] ${
            light ? "text-cream" : "text-ink"
          }`}
        >
          {site.name}
        </span>
        <span
          className={`mt-1 block text-[8.5px] font-semibold uppercase tracking-[0.24em] transition-colors duration-300 ${
            light ? "text-cream/70" : "text-ink/65"
          }`}
        >
          Creative Chaos
        </span>
      </span>
    </Link>
  );
}

function isDarkBackground(node) {
  let element = node;
  while (element && element !== document.documentElement) {
    const background = window.getComputedStyle(element).backgroundColor;
    const match = background.match(
      /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?\s*\)/
    );

    if (match) {
      const [, r, g, b, alpha = "1"] = match;
      if (Number(alpha) > 0.55) {
        const luminance =
          (0.2126 * Number(r) + 0.7152 * Number(g) + 0.0722 * Number(b)) / 255;
        return luminance < 0.4;
      }
    }

    element = element.parentElement;
  }

  return false;
}

export default function Header() {
  const { pathname } = useLocation();
  const { openQuote } = useQuoteModal();
  const headerRef = useRef(null);
  const lastScroll = useRef(0);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [adaptiveDark, setAdaptiveDark] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleHomeClick = () => {
    setMegaOpen(false);
    setMobileOpen(false);
    if (pathname === "/") scrollTop();
  };

  const handleNavClick = (to) => {
    if (pathname === to) scrollTop();
  };

  const toggleMobile = () => {
    setMegaOpen(false);
    setHidden(false);
    setMobileOpen((open) => !open);
  };

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 20);

      if (y < 90 || y < lastScroll.current - 8) {
        setHidden(false);
      } else if (y > lastScroll.current + 8 && !megaOpen && !mobileOpen) {
        setHidden(true);
      }

      lastScroll.current = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [megaOpen, mobileOpen]);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!megaOpen) return undefined;
    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) setMegaOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [megaOpen]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const lenis = window.__lenis;
    const html = document.documentElement;
    const body = document.body;

    if (mobileOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      lenis?.stop?.();
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
      lenis?.start?.();
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      lenis?.start?.();
    };
  }, [mobileOpen]);

  useEffect(() => {
    let ticking = false;

    const sample = () => {
      ticking = false;
      if (mobileOpen) {
        setAdaptiveDark(true);
        return;
      }

      const bar = headerRef.current;
      if (!bar) return;

      const rect = bar.getBoundingClientRect();
      const x = Math.min(
        window.innerWidth - 20,
        Math.max(20, rect.left + rect.width / 2)
      );
      const y = Math.max(14, rect.top + 20);
      const nodes = document.elementsFromPoint(x, y);
      const target = nodes.find(
        (node) =>
          !bar.contains(node) &&
          node !== document.body &&
          node !== document.documentElement
      );

      setAdaptiveDark(target ? isDarkBackground(target) : false);
    };

    const schedule = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(sample);
    };

    sample();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [mobileOpen, pathname]);

  const serviceRouteActive =
    pathname === "/services" ||
    serviceMegaMenu.some((group) =>
      group.services.some((service) => service.path === pathname)
    );

  const darkBar = mobileOpen || adaptiveDark;
  const linkTone = darkBar
    ? "text-cream/75 hover:bg-cream/10 hover:text-cream"
    : "text-ink/70 hover:bg-ink/[0.06] hover:text-ink";
  const activeTone = darkBar
    ? "bg-cream text-ink"
    : "bg-ink text-cream";
  const activeText = darkBar ? "text-ink" : "text-cream";
  const navBase =
    "relative rounded-full px-4 py-2.5 text-[13px] font-semibold tracking-tight transition-colors duration-300";
  const activePill = `absolute inset-0 rounded-full ${activeTone}`;
  const pillTransition = {
    type: "spring",
    stiffness: 420,
    damping: 34,
    mass: 0.6,
  };

  return (
    <motion.header
      ref={headerRef}
      initial={false}
      animate={{
        y: hidden && !megaOpen && !mobileOpen ? "-125%" : "0%",
      }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      onFocusCapture={() => setHidden(false)}
      onMouseLeave={() => {
        if (megaOpen) setMegaOpen(false);
      }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <div
        className={`pointer-events-auto relative z-50 mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 rounded-full border px-3.5 pl-4 transition-[background-color,border-color,box-shadow] duration-300 ${
          darkBar
            ? "border-cream/15 bg-ink/85 text-cream shadow-[0_18px_50px_-18px_rgba(0,0,0,0.65)]"
            : "border-ink/10 bg-cream/80 text-ink shadow-[0_18px_45px_-22px_rgba(20,16,26,0.35)]"
        } ${scrolled ? "backdrop-blur-2xl" : "backdrop-blur-md"}`}
      >
        <Wordmark
          light={darkBar}
          onClick={handleHomeClick}
        />

        <nav
          className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border p-1 lg:flex ${
            darkBar
              ? "border-cream/10 bg-cream/[0.06]"
              : "border-ink/10 bg-cream-50/60"
          }`}
          aria-label="Primary"
        >
          {primaryNav.map((item) =>
            item.mega ? (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                  aria-controls="services-mega-menu"
                  onClick={() => setMegaOpen((open) => !open)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      setMegaOpen(true);
                    }
                  }}
                  className={`flex items-center gap-1.5 ${navBase} ${
                    serviceRouteActive ? "" : linkTone
                  }`}
                >
                  {serviceRouteActive ? (
                    <motion.span
                      layoutId="nav-active-pill"
                      className={activePill}
                      transition={pillTransition}
                    />
                  ) : null}
                  <span
                    className={`relative z-10 ${
                      serviceRouteActive ? activeText : ""
                    }`}
                  >
                    {item.label}
                  </span>
                  <Icon
                    name="ChevronDown"
                    className={`relative z-10 h-3.5 w-3.5 transition-transform duration-300 ${
                      megaOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/"}
                onClick={() => handleNavClick(item.to)}
                className={({ isActive }) =>
                  `${navBase} ${isActive ? "" : linkTone}`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        className={activePill}
                        transition={pillTransition}
                      />
                    ) : null}
                    <span
                      className={`relative z-10 ${
                        isActive ? activeText : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            )
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.phoneHref}
            className={`hidden items-center gap-2 text-[13px] font-semibold tracking-tight transition-colors xl:flex ${
              darkBar
                ? "text-cream/70 hover:text-cream"
                : "text-ink/65 hover:text-pink"
            }`}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                darkBar ? "border-cream/20" : "border-ink/15"
              }`}
            >
              <Icon name="Phone" className="h-3.5 w-3.5" />
            </span>
            {site.phone}
          </a>

          <Button
            size="sm"
            className="hidden md:inline-flex"
            icon="ArrowUpRight"
            onClick={() => {
              setMegaOpen(false);
              setMobileOpen(false);
              openQuote("header");
            }}
          >
            Get Started
          </Button>

          <button
            type="button"
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
              darkBar
                ? "border-cream/20 text-cream hover:bg-cream hover:text-ink"
                : "border-ink/15 text-ink hover:bg-ink hover:text-cream"
            }`}
          >
            <Icon
              name={mobileOpen ? "X" : "Menu"}
              className="h-5 w-5"
              strokeWidth={1.8}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {megaOpen && !mobileOpen ? (
          <motion.div
            id="services-mega-menu"
            initial={{ opacity: 0, y: -12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto absolute inset-x-3 top-full mx-auto mt-2 hidden max-w-6xl lg:block sm:inset-x-5"
          >
            <div className="overflow-hidden rounded-[1.8rem] border border-ink/10 bg-cream shadow-lift">
              <motion.div
                className="grid grid-cols-[1fr_1fr_1fr_0.95fr] gap-8 p-7"
                initial="hidden"
                animate="show"
                variants={{
                  show: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
                  },
                }}
              >
                {serviceMegaMenu.map((group) => (
                  <motion.div key={group.id} variants={megaItem}>
                    <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/65">
                      <Icon name={group.icon} className="h-3.5 w-3.5 text-pink" />
                      {group.label}
                    </p>
                    <ul className="mt-4 space-y-1">
                      {group.services.map((service) => (
                        <li key={service.slug}>
                          <Link
                            to={service.path}
                            onClick={() => setMegaOpen(false)}
                            className="group -mx-2 flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[13px] font-medium text-ink/70 transition-colors hover:bg-pink/[0.06] hover:text-pink"
                          >
                            {service.navLabel}
                            <Icon
                              name="ArrowUpRight"
                              className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}

                <motion.div
                  variants={megaItem}
                  className="relative overflow-hidden rounded-[1.5rem] bg-ink p-6 text-cream"
                >
                  <div
                    className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-pink/40 blur-2xl"
                    aria-hidden="true"
                  />
                  <p className="relative font-hand text-2xl text-sunshine">
                    {site.hero.note}
                  </p>
                  <p className="relative mt-2 font-display text-xl leading-tight">
                    Not sure where to start?
                  </p>
                  <p className="relative mt-2 text-[12.5px] leading-relaxed text-cream/70">
                    Tell us what you're building. We'll recommend the right mix
                    of build, growth and creative.
                  </p>
                  <Button
                    to="/contact"
                    variant="cream"
                    size="sm"
                    onClick={() => setMegaOpen(false)}
                    className="relative mt-5 w-full"
                  >
                    Book a chat
                  </Button>
                  <Link
                    to="/services"
                    onClick={() => setMegaOpen(false)}
                    className="relative mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-cream/70 transition-colors hover:text-cream"
                  >
                    All services
                    <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {createPortal(
        <AnimatePresence>
          {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-auto fixed inset-0 z-[45] overflow-y-auto bg-ink px-5 pb-12 pt-28 text-cream lg:hidden"
            data-mobile-menu
            data-lenis-prevent
          >
            <div className="mx-auto max-w-2xl">
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {primaryNav.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.05 * index + 0.06,
                      duration: 0.38,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-baseline justify-between border-b border-cream/10 py-4"
                    >
                      <span className="font-display text-3xl font-semibold tracking-tight">
                        {item.label}
                      </span>
                      <span className="font-hand text-lg text-cream/65">
                        0{index + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 grid gap-7 sm:grid-cols-2">
                {serviceMegaMenu.map((group, groupIndex) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + groupIndex * 0.06, duration: 0.38 }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/65">
                      {group.label}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {group.services.map((service) => (
                        <li key={service.slug}>
                          <Link
                            to={service.path}
                            onClick={() => setMobileOpen(false)}
                            className="text-[13px] text-cream/65 transition-colors hover:text-pink-mid"
                          >
                            {service.navLabel}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-2.5">
                <Button
                  to="/contact"
                  variant="pink"
                  onClick={() => setMobileOpen(false)}
                  className="w-full"
                  icon="ArrowUpRight"
                >
                  Book a chat
                </Button>
                <Button
                  href={site.phoneHref}
                  variant="outlineLight"
                  className="w-full"
                  icon="Phone"
                >
                  {site.phone}
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-6">
                <div className="space-y-2 text-[12.5px] text-cream/65">
                  <a
                    href={site.emailHref}
                    className="block transition-colors hover:text-cream"
                  >
                    {site.email}
                  </a>
                  <p>
                    {site.address.line1}, {site.address.city},{" "}
                    {site.address.postcode}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-cream hover:text-cream"
                    >
                      <Icon name={social.icon} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body
      )}
    </motion.header>
  );
}
