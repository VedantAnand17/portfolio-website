import { getBlogPosts, postPath } from "@/data/blog";
import { PROFILE } from "@/data/profile";
import { DATA } from "@/data/resume";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getBlogPosts();
  const projects = DATA.projects
    .map((project) => {
      const links = project.links
        .map((link) => `  - [${link.type}](${link.href})`)
        .join("\n");
      return `- [${project.title}](${project.href}): ${project.description}\n${links}`;
    })
    .join("\n");
  const articles = posts
    .map(
      (post) =>
        `- [${post.metadata.title}](${DATA.url}${postPath(post.slug)}): ${post.metadata.summary}`
    )
    .join("\n");
  const profiles = PROFILE.socialProfiles
    .map((social) => `- [${social.name}](${social.url})`)
    .join("\n");
  const references = PROFILE.communityReferences
    .map(
      (reference) =>
        `- [${reference.name}](${reference.url}): ${reference.description}`
    )
    .join("\n");
  return new Response(
    `# ${DATA.name}\n\n> ${PROFILE.description}\n\nAlso known as Vedant, VedantAnand17 on GitHub, and @vedantsx on X. Based in ${DATA.location}. v3dant.com and www.v3dant.com are alternate addresses for this portfolio and redirect to ${DATA.url}.\n\n## Biography\n\n${DATA.summary}\n\n## Key pages\n\n- [Portfolio](${DATA.url}/): Projects and experience\n- [About Vedant Anand](${PROFILE.aboutUrl}): Biography, x402 work, Bags, and mentorship\n- [Blog](${DATA.url}/blog): Technical articles by Vedant Anand\n\n## Projects and contribution evidence\n\n${projects}\n\n## Articles\n\n${articles}\n\n## Community references\n\n${references}\n\n## Official profiles\n\n${profiles}\n\n## Contact\n\nEmail: ${DATA.contact.email}\n`,
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    }
  );
}
