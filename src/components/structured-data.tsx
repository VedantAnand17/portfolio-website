import { DATA } from "@/data/resume";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    alumniOf: DATA.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.school,
      url: edu.href,
    })),
    description: DATA.description,
    email: DATA.contact.email,
    hasOccupation: {
      "@type": "Occupation",
      description:
        "Engineer specializing in agentic payments and the x402 protocol, Solidity smart contracts, and full-stack TypeScript applications",
      name: "Software Developer",
    },
    image: `${DATA.url}/vedantpfp.webp`,
    jobTitle: "Software Engineer - Agentic Payments & x402",
    knowsAbout: [
      "x402",
      "Agentic commerce",
      "Agentic payments",
      "Stablecoin payments",
      "USDC",
      ...DATA.skills,
    ],
    name: DATA.name,
    sameAs: [
      DATA.contact.social.X.url,
      DATA.contact.social.GitHub.url,
      DATA.contact.social.LinkedIn.url,
    ],
    url: DATA.url,
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
    creator: {
      "@type": "Person",
      name: DATA.name,
    },
    dateCreated: project.dates,
    description: project.description,
    keywords: project.technologies?.join(", "),
    name: project.title,
    url: project.href,
    ...(project.image && {
      image: project.image,
    }),
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
    author: {
      "@type": "Person",
      name: DATA.name,
    },
    description: DATA.description,
    name: `${DATA.name} - Portfolio`,
    url: DATA.url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
