import { HackathonCard } from "@/components/hackathon-card";
import { DATA } from "@/data/resume";

export function BelowFoldSections() {
  return (
    <>
      <section
        id="hackathons"
        aria-labelledby="hackathons-heading"
        className="space-y-5"
      >
        <h2 id="hackathons-heading" className="text-2xl font-bold">
          Hackathons
        </h2>
        <p className="text-muted-foreground">
          Projects and results from team events.
        </p>
        <ul className="ml-4 divide-y divide-dashed border-l">
          {DATA.hackathons.map((project) => (
            <HackathonCard key={project.title} {...project} />
          ))}
        </ul>
      </section>
      <section id="posts" aria-labelledby="posts-heading" className="space-y-3">
        <h2 id="posts-heading" className="text-2xl font-bold">
          Selected posts on X
        </h2>
        <p className="text-muted-foreground">
          Notes from June 2025. Read the posts on X.
        </p>
        <ul className="divide-y">
          {DATA.tweets.map((tweet, index) => (
            <li key={tweet.id}>
              <a
                className="text-link flex min-h-11 items-center py-3 underline underline-offset-4"
                href={`${DATA.contact.social.X.url}/status/${tweet.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Development notes {index + 1}{" "}
                <span className="sr-only">on X</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="space-y-4 border-t pt-8"
      >
        <h2 id="contact-heading" className="text-2xl font-bold">
          Contact
        </h2>
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
        <ul className="flex flex-wrap gap-4">
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
