export const homeStats = [
  {
    value: 10,
    suffix: "+",
    label: "Years in digital",
    note: "Placeholder number",
  },
  {
    value: 250,
    suffix: "+",
    label: "Projects delivered",
    note: "Placeholder number",
  },
  {
    value: 1000,
    suffix: "+",
    label: "Clients to our credit",
    note: "Placeholder number",
  },
];

export const homeServices = [
  {
    slug: "digital-marketing",
    label: "Marketing",
    accent: "sunshine",
  },
  {
    slug: "development",
    label: "Development",
    accent: "lilac",
  },
  {
    slug: "web-design",
    label: "Web Design",
    accent: "pink",
  },
  {
    slug: "seo",
    label: "SEO Optimization",
    accent: "sunshine",
  },
  {
    slug: "content-writing",
    label: "Content",
    accent: "lilac",
  },
  {
    slug: "branding",
    label: "Branding",
    accent: "pink",
  },
];

export const workFilters = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "marketing", label: "Marketing" },
  { id: "branding", label: "Branding" },
];

export const portfolio = [
  {
    id: "harborne-house",
    title: "Harborne House",
    category: "web",
    categoryLabel: "Web",
    image: "harborneHouse",
    to: "/web-design",
    year: "Concept 01",
  },
  {
    id: "midtown-cycle",
    title: "Midtown Cycle",
    category: "web",
    categoryLabel: "Web",
    image: "midtownCycle",
    to: "/ecommerce-websites",
    year: "Concept 02",
  },
  {
    id: "bloom-social",
    title: "Bloom Social",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "bloomSocial",
    to: "/social-media",
    year: "Concept 03",
  },
  {
    id: "northline-studio",
    title: "Northline Studio",
    category: "branding",
    categoryLabel: "Branding",
    image: "northlineStudio",
    to: "/branding",
    year: "Concept 04",
  },
  {
    id: "digbeth-coffee",
    title: "Digbeth Coffee Co.",
    category: "branding",
    categoryLabel: "Branding",
    image: "digbethCoffee",
    to: "/branding",
    year: "Concept 05",
  },
  {
    id: "solihull-clinic",
    title: "Solihull Clinic",
    category: "web",
    categoryLabel: "Web",
    image: "solihullClinic",
    to: "/web-design",
    year: "Concept 06",
  },
];

export const testimonials = [
  {
    quote:
      "Placeholder testimonial. This is where a real client quote will sit once the case study has been approved.",
    name: "Sample client 01",
    role: "Placeholder — web development",
    initials: "S1",
  },
  {
    quote:
      "Placeholder testimonial. Use this space for a specific result, a before-and-after, or a sentence about what working together felt like.",
    name: "Sample client 02",
    role: "Placeholder — digital marketing",
    initials: "S2",
  },
  {
    quote:
      "Placeholder testimonial. Keep it short, keep it useful, and swap in the real words when they are ready.",
    name: "Sample client 03",
    role: "Placeholder — branding",
    initials: "S3",
  },
];

export default {
  homeStats,
  homeServices,
  workFilters,
  portfolio,
  testimonials,
};
