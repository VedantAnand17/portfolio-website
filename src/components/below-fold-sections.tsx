"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { HackathonCard } from "@/components/hackathon-card";
import { TweetEmbed } from "@/components/magicui/tweet-embed";
import { DATA } from "@/data/resume";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export function BelowFoldSections() {
  return (
    <>
      <section id="hackathons" aria-labelledby="hackathons-heading">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Hackathons
                </div>
                <h2 id="hackathons-heading" className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  I like building things
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  During my time at university, I have attended several hackathons where people from across the country come together to build incredible things in just 2-3 days. It is eye-opening to witness the endless possibilities brought to life by groups of motivated and passionate individuals.
                </p>
              </div>
            </div>
          </BlurFade>
          {DATA.hackathons.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-muted-foreground mb-4">No hackathons listed yet. See my other work below!</p>
              <a href="#projects" className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">View Projects</a>
            </div>
          ) : (
            <BlurFade delay={BLUR_FADE_DELAY * 14}>
              <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                {DATA.hackathons.map((project, id) => (
                  <BlurFade
                    key={project.title + project.dates}
                    delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                  >
                    <HackathonCard
                      title={project.title}
                      description={project.description}
                      location={project.location}
                      dates={project.dates}
                      image={project.image}
                      links={project.links}
                    />
                  </BlurFade>
                ))}
              </ul>
            </BlurFade>
          )}
        </div>
      </section>
      <section id="tweets" aria-labelledby="tweets-heading">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Latest Thoughts
                </div>
                <h2 id="tweets-heading" className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  From my Twitter
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Some thoughts, updates, and insights I&apos;ve shared on Twitter about my journey in tech and development.
                </p>
              </div>
            </div>
          </BlurFade>
          {DATA.tweets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-muted-foreground mb-4">No tweets to show. Follow me for updates!</p>
              <a href={DATA.contact.social.X.url} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Follow on Twitter</a>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
              {DATA.tweets.map((tweet, id) => (
                <BlurFade
                  key={tweet.id}
                  delay={BLUR_FADE_DELAY * 16 + id * 0.05}
                >
                  <TweetEmbed
                    tweetId={tweet.id}
                    className="mx-auto"
                  />
                </BlurFade>
              ))}
            </div>
          )}
        </div>
      </section>
      <section id="contact" aria-labelledby="contact-heading">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 17}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 id="contact-heading" className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat or discuss freelance software development opportunities? Just shoot me a DM{" "}
                <Link
                  href={DATA.contact.social.X.url}
                  className="text-blue-500 hover:underline"
                >
                  with a direct question on Twitter
                </Link>{" "}
                and I&apos;ll respond whenever I can. I will ignore all
                soliciting.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </>
  );
}
