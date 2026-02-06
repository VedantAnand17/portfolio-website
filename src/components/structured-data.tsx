import { DATA } from "@/data/resume";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: DATA.name,
    url: DATA.url,
    image: `${DATA.url}/vedantpfp.webp`,
    description: DATA.description,
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance"
    },
    knowsAbout: DATA.skills,
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
      description: "Full-stack developer specializing in web applications, blockchain development, and custom software solutions"
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
