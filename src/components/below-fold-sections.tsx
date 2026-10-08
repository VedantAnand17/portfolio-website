import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import { XPosts } from "@/components/x-posts";
import { DATA } from "@/data/resume";

export function BelowFoldSections() {
  return (
    <>
      <section
        id="hackathons"
        aria-labelledby="hackathons-heading"
        className="space-y-5"
      >
        <BlurFade delay={0.52} className="space-y-4 py-12 text-center">
          <span className="bg-foreground text-background inline-block rounded-lg px-3 py-1 text-sm">
            Hackathons
          </span>
          <h2
            id="hackathons-heading"
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
          >
            I like building things
          </h2>
          <p className="text-muted-foreground text-base sm:text-xl">
            Projects and results from team events.
          </p>
        </BlurFade>
        <ul className="ml-4 divide-y divide-dashed border-l">
          {DATA.hackathons.map((project) => (
            <HackathonCard key={project.title} {...project} />
          ))}
        </ul>
      </section>
      <section id="posts" aria-labelledby="posts-heading" className="space-y-3">
        <BlurFade delay={0.6} className="space-y-4 py-12 text-center">
          <span className="bg-foreground text-background inline-block rounded-lg px-3 py-1 text-sm">
            Selected Thoughts
          </span>
          <h2
            id="posts-heading"
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
          >
            From my Twitter
          </h2>
          <p className="text-muted-foreground text-base sm:text-xl">
            Thoughts and development notes from June 2025.
          </p>
        </BlurFade>
        <XPosts
          name={DATA.name}
          avatar={DATA.avatarUrl}
          posts={DATA.tweets.map((tweet, index) => ({
            id: tweet.id,
            url: `${DATA.contact.social.X.url}/status/${tweet.id}`,
            date: new Date(
              Number(BigInt(tweet.id) / 4_194_304n + 1_288_834_974_657n)
            ).toISOString(),
            label: `Development notes ${index + 1}`,
          }))}
        />
      </section>
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="space-y-4 px-4 py-12 text-center"
      >
        <BlurFade delay={0.68} className="space-y-4">
          <span className="bg-foreground text-background inline-block rounded-lg px-3 py-1 text-sm">
            Contact
          </span>
          <h2
            id="contact-heading"
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
          >
            Get in Touch
          </h2>
        </BlurFade>
        <p className="text-muted-foreground">
          Have a project in mind? I welcome engineering, open source, and
          collaboration enquiries.
        </p>
        <a
          href={`mailto:${DATA.contact.email}`}
          className="text-link inline-flex min-h-11 max-w-full items-center text-base break-all underline underline-offset-4"
        >
          {DATA.contact.email}
        </a>
        <ul className="flex flex-wrap justify-center gap-4">
          {[
            DATA.contact.social.GitHub,
            DATA.contact.social.LinkedIn,
            DATA.contact.social.X,
          ].map((social) => (
            <li key={social.name}>
              <a
                className="text-link inline-flex min-h-11 items-center underline underline-offset-4"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
