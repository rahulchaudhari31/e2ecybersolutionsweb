import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useLenis from "../../hooks/useLenis";
import ScrollProgress from "../animations/ScrollProgress";
import Cursor from "../animations/Cursor";
import PageTransition from "../animations/PageTransition";
import BackToTop from "../ui/BackToTop";
import FloatingContact from "../ui/FloatingContact";
import CookieConsent from "../ui/CookieConsent";
import Header from "./Header";
import Footer from "./Footer";
import Preloader, { PRELOADER_KEY } from "./Preloader";
import { QuoteModalProvider } from "../quote/QuoteModalProvider";

function hasPlayedIntro() {
  try {
    return window.sessionStorage.getItem(PRELOADER_KEY) === "1";
  } catch {
    return false;
  }
}

export default function Layout() {
  const [introPlayed, setIntroPlayed] = useState(hasPlayedIntro);
  const [showPreloader, setShowPreloader] = useState(() => !hasPlayedIntro());
  const introDone = introPlayed;

  useLenis({ paused: !introDone });
  const { pathname, hash } = useLocation();

  const revealPage = useCallback(() => setIntroPlayed(true), []);
  const finishPreloader = useCallback(() => setShowPreloader(false), []);

  useEffect(() => {
    if (!introDone) return undefined;

    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          if (window.__lenis) {
            window.__lenis.scrollTo(element, { offset: -132, duration: 1 });
          } else {
            const top =
              element.getBoundingClientRect().top + window.scrollY - 132;
            window.scrollTo({ top, behavior: "smooth" });
          }
          return;
        }
      }

      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 240);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(refresh);
    };
  }, [pathname, hash, introDone]);

  return (
    <>
      {showPreloader ? (
        <Preloader onReveal={revealPage} onDone={finishPreloader} />
      ) : null}

      <QuoteModalProvider>
        <div className="relative min-h-screen overflow-clip bg-cream">
          {introDone ? (
            <>
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[220] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
              >
                Skip to content
              </a>

              <ScrollProgress />
              <Cursor />
              <div className="grain" aria-hidden="true" />

              <Header />
              <main id="main">
                <PageTransition />
              </main>
              <Footer />
              <BackToTop />
              <FloatingContact />
              <CookieConsent />
            </>
          ) : null}
        </div>
      </QuoteModalProvider>
    </>
  );
}
