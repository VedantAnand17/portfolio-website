import Image from "next/image";
import Markdown from "react-markdown";

import { BelowFoldSections } from "@/components/below-fold-sections";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";

export default function Page() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-[100dvh] flex-col gap-12"
    >
      <section id="hero" aria-labelledby="hero-heading" className="space-y-6">
        <div className="flex flex-col-reverse items-start gap-5 sm:flex-row sm:justify-between">
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm">
              Payment infrastructure · {DATA.location}
            </p>
            <h1
              id="hero-heading"
              className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
            >
              {DATA.name}
            </h1>
            <p className="max-w-lg text-lg leading-relaxed">
              {DATA.description}
            </p>
          </div>
          <Image
            src={DATA.avatarUrl}
            alt="Vedant Anand"
            width={112}
            height={112}
            priority
            className="size-20 shrink-0 rounded-full border sm:size-28"
          />
        </div>
        <p className="text-muted-foreground text-sm">
          Available for contract and part-time work.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${DATA.contact.email}`}
            className="bg-primary text-primary-foreground inline-flex min-h-11 items-center rounded-md px-4 text-sm font-medium"
          >
            Email me
          </a>
          <a
            href="#projects"
            className="inline-flex min-h-11 items-center rounded-md border px-4 text-sm font-medium"
          >
            View work
          </a>
        </div>
      </section>
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="space-y-5"
      >
        <h2 id="projects-heading" className="text-2xl font-bold">
          Selected projects
        </h2>
        <p className="text-muted-foreground">
          Payment APIs, protocol contributions, and applications. Each project
          includes my role and links to the work.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {DATA.projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              href={project.href}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              links={project.links}
            />
          ))}
        </div>
      </section>
      <section id="about" aria-labelledby="about-heading" className="space-y-3">
        <h2 id="about-heading" className="text-2xl font-bold">
          About
        </h2>
        <div className="prose text-muted-foreground dark:prose-invert max-w-full text-base">
          <Markdown>{DATA.summary}</Markdown>
        </div>
      </section>
      <section id="work" aria-labelledby="work-heading" className="space-y-5">
        <h2 id="work-heading" className="text-2xl font-bold">
          Work experience
        </h2>
        {DATA.work.map((work) => (
          <ResumeCard
            key={work.company}
            title={work.company}
            subtitle={work.title}
            logoUrl={work.logoUrl}
            altText={work.company}
            href={work.href}
            badges={work.badges}
            period={`${work.start} – ${work.end ?? "Present"}`}
            description={work.description}
          />
        ))}
      </section>
      <section
        id="education"
        aria-labelledby="education-heading"
        className="space-y-5"
      >
        <h2 id="education-heading" className="text-2xl font-bold">
          Education
        </h2>
        {DATA.education.map((education) => (
          <ResumeCard
            key={education.school}
            title={education.school}
            subtitle={education.degree}
            logoUrl={education.logoUrl}
            altText={education.school}
            href={education.href}
            period={`${education.start} – ${education.end}`}
          />
        ))}
      </section>
      <section
        id="skills"
        aria-labelledby="skills-heading"
        className="space-y-3"
      >
        <h2 id="skills-heading" className="text-2xl font-bold">
          Skills
        </h2>
        <ul className="flex list-none flex-wrap gap-2">
          {DATA.skills.map((skill) => (
            <li key={skill}>
              <Badge variant="secondary" className="px-2 py-1 text-sm">
                {skill}
              </Badge>
            </li>
          ))}
        </ul>
      </section>
      <BelowFoldSections />
    </main>
  );
}
