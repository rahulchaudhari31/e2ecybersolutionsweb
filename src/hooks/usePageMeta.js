import { useEffect } from "react";
import { site } from "../data/site";

export default function usePageMeta({ title, description }) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} — ${site.name}`
      : `${site.name} — ${site.tagline} | Web, Marketing & Creative Agency Birmingham`;

    document.title = fullTitle;

    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) {
      meta.setAttribute("content", description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", fullTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description) ogDesc.setAttribute("content", description);
  }, [title, description]);
}
