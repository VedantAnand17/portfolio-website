import { ArrowDownIcon, ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Markdown from "react-markdown";

import { BelowFoldSections } from "@/components/below-fold-sections";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="portfolio-home flex min-h-[100dvh] flex-col gap-12 sm:gap-14"
    >
      <section id="hero" aria-labelledby="hero-heading">
        <div className="mx-auto w-full max-w-2xl space-y-6 border-b pb-10 sm:pb-12">
          <div className="flex items-start justify-between gap-5">
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <p className="text-muted-foreground text-xs font-medium tracking-wide">
                Payments, protocols & products
              </p>
              <h1 id="hero-heading">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="font-display text-3xl leading-tight font-semibold tracking-tight sm:text-5xl"
                  yOffset={8}
                  text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
                />
              </h1>
              <BlurFadeText
                className="text-muted-foreground max-w-md text-base leading-relaxed"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="shrink-0">
              <Image
                src={DATA.avatarUrl}
                alt="Vedant Anand"
                width={112}
                height={112}
                priority
                className="size-16 rounded-full border object-cover sm:size-24"
              />
            </BlurFade>
          </div>
          <BlurFade
            delay={BLUR_FADE_DELAY * 2}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className={buttonVariants({ className: "min-h-11 gap-2 px-4" })}
            >
              View work
              <ArrowDownIcon className="size-4" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${DATA.contact.email}`}
              className={buttonVariants({
                variant: "outline",
                className: "min-h-11 gap-2 px-4",
              })}
            >
              Email me
              <ArrowUpRightIcon className="size-4" aria-hidden="true" />
            </a>
          </BlurFade>
        </div>
      </section>
      <section id="about" aria-labelledby="about-heading">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 id="about-heading" className="text-xl font-bold">
            About
          </h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose text-muted-foreground dark:prose-invert max-w-full font-sans text-sm text-pretty">
            <Markdown>{DATA.summary}</Markdown>
          </div>
        </BlurFade>
      </section>
      <section id="work" aria-labelledby="work-heading">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 id="work-heading" className="text-xl font-bold">
              Experience
            </h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} – ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education" aria-labelledby="education-heading">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 id="education-heading" className="text-xl font-bold">
              Education
            </h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} – ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills" aria-labelledby="skills-heading">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 id="skills-heading" className="text-xl font-bold">
              Toolkit
            </h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-2.5 py-1 text-xs"
                >
                  {skill}
                </Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects" aria-labelledby="projects-heading">
        <div className="w-full space-y-6 border-t pt-10">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-start space-y-4">
              <div className="space-y-3">
                <div className="text-muted-foreground text-xs font-medium tracking-wide">
                  Selected work
                </div>
                <h2
                  id="projects-heading"
                  className="font-display text-2xl leading-tight font-semibold tracking-tight sm:text-3xl"
                >
                  Agentic payments, x402 and DeFi work
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Most of what I build is payment infrastructure: charging AI
                  agents per API call over x402, settling in USDC across chains,
                  and the Solidity underneath it. Here is the work worth reading
                  about, including what I shipped into the protocol itself and
                  what I shut down.
                </p>
              </div>
            </div>
          </BlurFade>
          {DATA.projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-muted-foreground mb-4">
                No projects yet. Want to collaborate?
              </p>
              <a
                href={DATA.contact.social.X.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-md px-4 py-2 transition-colors"
              >
                Contact Me
              </a>
            </div>
          ) : (
            <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-4 sm:grid-cols-2">
              {DATA.projects.map((project, id) => (
                <BlurFade
                  key={project.title}
                  delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                >
                  <ProjectCard
                    href={project.href}
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    tags={project.technologies}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </div>
          )}
        </div>
      </section>
      <BelowFoldSections />
    </main>
  );
}
