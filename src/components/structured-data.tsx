import { PROFILE } from "@/data/profile";
import { DATA } from "@/data/resume";
import {
  personStructuredData,
  serializeJsonLd,
  websiteStructuredData,
} from "@/lib/seo";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

export function StructuredData() {
  return (
    <JsonLd
      data={{ "@context": "https://schema.org", ...personStructuredData }}
    />
  );
}

export function WebsiteStructuredData() {
  return (
    <JsonLd
      data={{ "@context": "https://schema.org", ...websiteStructuredData }}
    />
  );
}

export function ProfileStructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${PROFILE.aboutUrl}#profile`,
        url: PROFILE.aboutUrl,
        name: `About ${DATA.name}`,
        description: PROFILE.description,
        dateModified: PROFILE.updatedAt,
        isPartOf: { "@id": PROFILE.websiteId },
        mainEntity: personStructuredData,
      }}
    />
  );
}
