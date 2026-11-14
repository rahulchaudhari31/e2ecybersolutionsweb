import { Suspense, lazy } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  getServicePageData,
  groupPages,
  individualServices,
} from "../../data/service-pages";

const Home = lazy(() => import("../../pages/Home"));
const About = lazy(() => import("../../pages/About"));
const Services = lazy(() => import("../../pages/Services"));
const ServicePage = lazy(() => import("../../components/service/ServicePage"));
const Insights = lazy(() => import("../../pages/Insights"));
const InsightDetail = lazy(() => import("../../pages/InsightDetail"));
const Contact = lazy(() => import("../../pages/Contact"));
const NotFound = lazy(() => import("../../pages/NotFound"));

function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-cream">
      <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-pink text-sm font-extrabold text-cream">
        e2e
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-pulse rounded-full bg-sunshine ring-2 ring-cream" />
      </span>
      <span className="sr-only">Loading page</span>
    </div>
  );
}

export default function PageTransition() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  return (
    <>
      {!reducedMotion ? (
        <motion.div
          key={`wipe-${location.pathname}`}
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
          className="pointer-events-none fixed inset-0 z-[90] overflow-hidden bg-pink"
          aria-hidden="true"
        >
          <div className="absolute inset-x-0 bottom-0 h-24 bg-ink" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-4xl font-extrabold tracking-tighter text-cream/90">
            e2e
          </span>
        </motion.div>
      ) : null}

      <Suspense fallback={<RouteFallback />}>
        <motion.div
          key={location.pathname}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: reducedMotion ? 0 : 0.14 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            {groupPages.map((group) => (
              <Route
                key={group.slug}
                path={group.path}
                element={<ServicePage service={getServicePageData(group)} />}
              />
            ))}
            {individualServices.map((service) => (
              <Route
                key={service.slug}
                path={service.path}
                element={<ServicePage service={getServicePageData(service)} />}
              />
            ))}
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </Suspense>
    </>
  );
}
