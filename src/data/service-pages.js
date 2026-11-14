import {
  getRelatedServices,
  serviceGroups,
  services,
} from "./services";
import { processSteps } from "./process";

const groupDetail = {
  "design-and-development": {
    headline:
      "Websites, apps, commerce and content systems that are robust, secure and genuinely useful.",
    blurb:
      "From the first wireframe to the final deployment, we design and build digital products that work as hard as your business.",
    note: "build it properly",
    intro: [
      "A good digital product is more than a good-looking website. It has to load quickly, make sense on a phone, be easy to update and hold up when real people start using it.",
      "Our design and development team works as one unit. Strategy shapes the structure, design shapes the experience, and development makes sure the whole thing is fast, secure and straightforward to run.",
      "Whether you need a brochure site, a complex platform, an app or an online store, we scope the right approach for your audience, budget and roadmap - then build it properly.",
    ],
    offeringsTitle: "Seven ways we build",
    meta:
      "Design and development in Birmingham - websites, apps, ecommerce and CMS builds made to perform.",
    faqs: [
      {
        q: "How long does a typical build take?",
        a: "Most projects run between six and twelve weeks, depending on scope. We map the stages, milestones and dependencies before we start, so you always know what is happening and when.",
      },
      {
        q: "Can you work with our existing brand and tech stack?",
        a: "Yes. We can build around existing brand guidelines, integrate with the tools you already use, or recommend a cleaner route if the current setup is holding you back.",
      },
      {
        q: "Will we be able to update the site ourselves?",
        a: "That is the plan. We build with a sensible content management system and give your team a practical handover, so routine updates do not need a developer.",
      },
      {
        q: "What happens after launch?",
        a: "We stay involved. Our website management plans cover updates, security, backups, monitoring and ongoing improvements, so the build keeps earning its keep.",
      },
    ],
  },
  "digital-marketing": {
    theme: "sunshine",
    headline:
      "Strategy, search, paid, social and email - marketing that is measured and refined.",
    blurb:
      "Proven strategic marketing tactics, joined up across every channel and built around the numbers that matter.",
    note: "all channels, one plan",
    intro: [
      "Marketing works best when the channels are not fighting each other. We start with the commercial goal, then build a plan that connects search, paid media, social, email and content around the same audience and the same story.",
      "We are an expert media and digital marketing agency offering comprehensive creative marketing strategies and services. All of our design, development, creative and strategic services are geared towards helping your business stand out in a crowded digital market.",
      "You can choose any of our digital marketing services, in any combination, at any stage of your business. Simply share your requirement and we will put together the right mix.",
    ],
    offeringsTitle: "Choose your mix",
    meta:
      "Digital marketing agency in Birmingham - strategy, SEO, PPC, social, email, analytics and content.",
    faqs: [
      {
        q: "How quickly will we see results?",
        a: "Paid media can generate traffic and enquiries quickly. SEO and content build more slowly, but the returns compound. We set expectations by channel and report against them honestly.",
      },
      {
        q: "How do you measure success?",
        a: "We agree the commercial measures first - enquiries, sales, qualified leads, revenue - then put the tracking and reporting in place to show what is working.",
      },
      {
        q: "Do we need a big budget to start?",
        a: "No. We would rather start with a focused test, prove the channel and scale what works than spread a small budget across everything at once.",
      },
      {
        q: "Can you work alongside our in-house team?",
        a: "Yes. We can lead the strategy and delivery, plug into an existing team, or provide the specialist channel support your team does not have in-house.",
      },
    ],
  },
  creative: {
    headline:
      "Creative ideas, strategically executed, to help your brand reach, engage and retain your audience.",
    blurb:
      "Inventive, creative, compelling content that helps your brand connect - and keeps it recognisable.",
    note: "ideas with intent",
    intro: [
      "Creative is not decoration. It is how your brand gets noticed, remembered and chosen. We start with a clear strategic idea, then build the identity, content and campaign assets that bring it to life.",
      "We start with a creative brand strategy that can turn your brand's social media presence into a community. As we shape your brand's online presence, we make sure the content speaks to the right audience, establishes relatability and aspiration, adds value to your product or service and generates loyalty.",
      "Our consumer-focused creative content - across all formats and platforms - is designed to turn curious visitors into engaged customers, and random followers into loyal fans.",
    ],
    offeringsTitle: "Creative services",
    meta:
      "Creative agency in Birmingham - brand campaigns, content, graphic design and video with strategic intent.",
    faqs: [
      {
        q: "How do you make sure the creative is on-brand?",
        a: "We start with your positioning, audience and existing guidelines, then build a clear creative route. Everything is checked against the strategy before it goes into production.",
      },
      {
        q: "Can you handle production as well as ideas?",
        a: "Yes. We can take a creative idea through copy, design, artwork, motion and delivery, or work with your existing production partners.",
      },
      {
        q: "How many rounds of changes are included?",
        a: "Most projects include two structured rounds of amends at each stage. We agree the scope up front, so there are no surprises and the work keeps moving.",
      },
      {
        q: "Do you work with our existing brand guidelines?",
        a: "Absolutely. We can work within your current system, refresh it, or build a new one when the brand has outgrown what it has.",
      },
    ],
  },
};

const categoryDeliverables = {
  "design-development": [
    "Discovery and technical scoping",
    "UX, wireframes and user journeys",
    "Visual design and responsive layouts",
    "Build, integration and CMS setup",
    "Accessibility and performance checks",
    "Launch, handover and aftercare",
  ],
  "digital-marketing": [
    "Audit, goals and measurement plan",
    "Audience and channel strategy",
    "Campaign and content production",
    "Tracking, dashboards and reporting",
    "Testing and optimisation sprints",
    "Monthly review and next steps",
  ],
  creative: [
    "Creative brief and strategic route",
    "Concept development and art direction",
    "Copy, design and asset production",
    "Brand guidelines and templates",
    "Rollout across digital and print",
    "Launch support and asset library",
  ],
};

const categoryFaqs = {
  "design-development": [
    {
      q: "How long does a typical project take?",
      a: "Most design and development projects run between six and twelve weeks, depending on scope. We agree the stages and milestones before we start, so everyone knows what happens next.",
    },
    {
      q: "Can you work with our existing brand and tech stack?",
      a: "Yes. We can build around existing brand guidelines and integrate with the tools you already use, or recommend a cleaner route where the current setup is holding you back.",
    },
    {
      q: "Will we be able to update the site ourselves?",
      a: "That is the plan. We build with a sensible content management system and give your team a practical handover, so routine updates do not need a developer.",
    },
    {
      q: "What happens after launch?",
      a: "We stay involved. Our care plans cover updates, security, backups, monitoring and ongoing improvements, so the build keeps working hard after go-live.",
    },
  ],
  "digital-marketing": [
    {
      q: "How quickly will we see results?",
      a: "Paid media can generate traffic and enquiries quickly. SEO and content build more slowly, but the returns compound. We set expectations by channel and report against them honestly.",
    },
    {
      q: "How do you measure success?",
      a: "We agree the commercial measures first - enquiries, sales, qualified leads, revenue - then put the tracking and reporting in place to show what is working.",
    },
    {
      q: "Do we need a big budget to start?",
      a: "No. We would rather start with a focused test, prove the channel and scale what works than spread a small budget across everything at once.",
    },
    {
      q: "Can you work alongside our in-house team?",
      a: "Yes. We can lead the strategy and delivery, plug into an existing team, or provide the specialist channel support your team does not have in-house.",
    },
  ],
  creative: [
    {
      q: "How do you make sure the creative is on-brand?",
      a: "We start with your positioning, audience and existing guidelines, then build a clear creative route. Everything is checked against the strategy before it goes into production.",
    },
    {
      q: "Can you handle production as well as ideas?",
      a: "Yes. We can take a creative idea through copy, design, artwork, motion and delivery, or work with your existing production partners.",
    },
    {
      q: "How many rounds of changes are included?",
      a: "Most projects include two structured rounds of amends at each stage. We agree the scope up front, so there are no surprises and the work keeps moving.",
    },
    {
      q: "Do you work with our existing brand guidelines?",
      a: "Absolutely. We can work within your current system, refresh it, or build a new one when the brand has outgrown what it has.",
    },
  ],
};

const groupServiceOrder = {
  "design-and-development": [
    "development",
    "web-design",
    "mobile-app-design-and-development",
    "ecommerce-websites",
    "cms",
    "wordpress-websites",
    "website-management",
  ],
  "digital-marketing": [
    "digital-strategy",
    "seo",
    "analytics-or-growth-marketing",
    "ppc-management",
    "social-media",
    "email-marketing",
    "content-writing",
    "videos",
  ],
  creative: ["branding", "content-writing", "graphic-design", "videos"],
};

function groupOfferings(groupId) {
  return (groupServiceOrder[groupId] || [])
    .map((slug) => services.find((service) => service.slug === slug))
    .filter(Boolean)
    .map((service) => ({
      title: service.navLabel,
      text: service.blurb,
      to: service.path,
    }));
}

function buildGroupPage(groupId) {
  const category = groupId === "design-and-development" ? "design-development" : groupId;
  const group = serviceGroups.find((item) => item.id === category);
  const base = services.find((service) => service.slug === groupId);
  const detail = groupDetail[groupId];
  const fallback = {
    slug: groupId,
    path: `/${groupId}`,
    title: group?.label || groupId,
    navLabel: group?.label || groupId,
    category,
    icon: group?.icon || "Sparkles",
    theme: group?.accent || "lilac",
  };
  const merged = { ...fallback, ...(base || {}), ...detail };

  return {
    ...merged,
    isGroup: true,
    groupId,
    eyebrow: "Services",
    offerings: groupOfferings(groupId),
    offeringsTitle: detail.offeringsTitle || "What we do",
    bullets: categoryDeliverables[groupId],
    deliverables: categoryDeliverables[groupId],
    faqs: detail.faqs || categoryFaqs[groupId],
    related: (groupServiceOrder[groupId] || [])
      .slice(0, 3)
      .map((slug) => services.find((service) => service.slug === slug))
      .filter(Boolean),
  };
}

export const groupPages = [
  buildGroupPage("design-and-development"),
  buildGroupPage("digital-marketing"),
  buildGroupPage("creative"),
];

export const groupPageSlugs = groupPages.map((page) => page.slug);

export const individualServices = services.filter(
  (service) => !groupPageSlugs.includes(service.slug)
);

export function getServicePageData(service) {
  const category = service.category;
  const categoryGroup = serviceGroups.find((item) => item.id === category);

  return {
    ...service,
    eyebrow: service.eyebrow || categoryGroup?.label || "Services",
    deliverables:
      service.deliverables || categoryDeliverables[category] || categoryDeliverables["design-development"],
    faqs: service.faqs || categoryFaqs[category] || categoryFaqs["design-development"],
    split: {
      eyebrow: "The working relationship",
      title: service.isGroup
        ? "One team from first idea to final click."
        : `${service.title} that pulls its weight.`,
      text: service.intro.slice(0, 2),
      bullets: service.offerings.slice(0, 3).map((offering) => offering.title),
    },
    related: service.related || getRelatedServices(service, 3),
    process: processSteps,
  };
}

export function getGroupPage(slug) {
  return groupPages.find((page) => page.slug === slug);
}

export default groupPages;
