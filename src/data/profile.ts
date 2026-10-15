import { DATA } from "@/data/resume";

export const PROFILE = {
  title: "Vedant Anand | x402 Maintainer & Agentic Commerce Builder",
  description:
    "Vedant Anand is an x402 contributor and maintainer, co-founder of Bags, an agentic commerce builder, and a Google Summer of Code 2026 mentor for OWASP BLT.",
  updatedAt: "2026-10-15",
  personId: `${DATA.url}/#person`,
  websiteId: `${DATA.url}/#website`,
  aboutUrl: `${DATA.url}/about`,
  socialImageUrl: `${DATA.url}/opengraph-image.png`,
  alternateNames: ["Vedant", "VedantAnand17", "vedantsx"],
  communityReferences: [
    {
      name: "OWASP BLT mentor directory",
      url: "https://gsoc.owaspblt.org/",
      description:
        "Lists Vedant Anand in the Interested Mentors section with a Full Stack and Web3 background.",
    },
    {
      name: "OWASP TIET team",
      url: "https://www.owasptiet.com/team",
      description:
        "Lists Vedant Anand as Joint Secretary of the OWASP student chapter at Thapar.",
    },
  ],
  socialProfiles: [
    DATA.contact.social.GitHub,
    DATA.contact.social.LinkedIn,
    DATA.contact.social.X,
  ],
};
