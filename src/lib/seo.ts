import { PROFILE } from "@/data/profile";
import { DATA } from "@/data/resume";

export const personStructuredData = {
  "@type": "Person",
  "@id": PROFILE.personId,
  name: DATA.name,
  alternateName: PROFILE.alternateNames,
  url: PROFILE.aboutUrl,
  mainEntityOfPage: PROFILE.aboutUrl,
  description: PROFILE.description,
  image: `${DATA.url}${DATA.avatarUrl}`,
  email: DATA.contact.email,
  jobTitle: "x402 contributor and maintainer; Co-founder of Bags",
  homeLocation: { "@type": "Place", name: DATA.location },
  affiliation: DATA.education.map((education) => ({
    "@type": "EducationalOrganization",
    name: education.school,
    url: education.href,
  })),
  worksFor: {
    "@type": "Organization",
    "@id": `${DATA.url}/#bags`,
    name: "Bags",
    url: "https://www.getbags.app/",
    founder: { "@id": PROFILE.personId },
  },
  knowsAbout: [
    ...new Set([
      "Agentic commerce",
      "Agentic payments",
      "Google Summer of Code",
      "OWASP BLT",
      ...DATA.skills,
    ]),
  ],
  sameAs: PROFILE.socialProfiles.map((social) => social.url),
};

export const websiteStructuredData = {
  "@type": "WebSite",
  "@id": PROFILE.websiteId,
  name: DATA.name,
  alternateName: [
    "Vedant",
    "Vedant Anand Portfolio",
    "vedant-dev.com",
    "v3dant.com",
  ],
  url: `${DATA.url}/`,
  description: PROFILE.description,
  inLanguage: "en",
  author: { "@id": PROFILE.personId },
  publisher: { "@id": PROFILE.personId },
};

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replaceAll("<", "\\u003c");
}
