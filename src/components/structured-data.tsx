import { DATA } from "@/data/resume";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: DATA.name,
    url: DATA.url,
    image: `${DATA.url}/vedantpfp.webp`,
    description: DATA.description,
    email: DATA.contact.email,
    jobTitle: "Software Engineer — Agentic Payments & x402",
    worksFor: {
      "@type": "Organization",
      name: "Independent contractor"
    },
    knowsAbout: [
      "x402",
      "Agentic commerce",
      "Agentic payments",
      "Stablecoin payments",
      "USDC",
      ...DATA.skills,
    ],
    makesOffer: DATA.hire.services.map(service => ({
      "@type": "Offer",
      name: service.title,
      description: service.description,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        description: service.price
      },
      availability: "https://schema.org/InStock",
      url: `${DATA.url}/hire`
    })),
    alumniOf: DATA.education.map(edu => ({
      "@type": "EducationalOrganization",
      name: edu.school,
      url: edu.href
    })),
    sameAs: [
      DATA.contact.social.X.url,
      DATA.contact.social.GitHub.url,
      DATA.contact.social.LinkedIn.url,
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN"
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Developer",
      description: "Engineer specializing in agentic payments and the x402 protocol, Solidity smart contracts, and full-stack TypeScript applications"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function ProjectStructuredData({ project }: { project: any }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: project.href,
    creator: {
      "@type": "Person",
      name: DATA.name
    },
    dateCreated: project.dates,
    keywords: project.technologies?.join(", "),
    ...(project.image && {
      image: project.image
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${DATA.name} - Portfolio`,
    url: DATA.url,
    description: DATA.description,
    author: {
      "@type": "Person",
      name: DATA.name
    },

  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
