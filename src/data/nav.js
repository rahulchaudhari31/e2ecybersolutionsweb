import { serviceGroups } from "./services";

export const primaryNav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services", mega: true },
  { label: "Insights", to: "/insights" },
  { label: "Contact Us", to: "/contact" },
];

export const serviceMegaMenu = serviceGroups;

export const footerNav = {
  services: serviceGroups,
  company: [
    { label: "Home", to: "/" },
    { label: "About us", to: "/about" },
    { label: "All services", to: "/services" },
    { label: "Insights", to: "/insights" },
    { label: "Contact Us", to: "/contact" },
  ],
  popular: [
    { label: "Web development", to: "/development" },
    { label: "Web design", to: "/web-design" },
    { label: "SEO", to: "/seo" },
    { label: "Digital marketing", to: "/digital-marketing" },
    { label: "Branding", to: "/branding" },
  ],
};

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "Linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "Instagram" },
  { label: "Facebook", href: "https://www.facebook.com/", icon: "Facebook" },
  { label: "YouTube", href: "https://www.youtube.com/", icon: "Youtube" },
];

export default primaryNav;
