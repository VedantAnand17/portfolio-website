"use client";

import {
  BriefcaseBusinessIcon,
  HomeIcon,
  NotebookIcon,
  SendIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";

const items = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Work", href: "/#projects", icon: BriefcaseBusinessIcon },
  { label: "Blog", href: "/blog", icon: NotebookIcon },
  { label: "Contact", href: "/#contact", icon: SendIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, [pathname]);
  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-3 bottom-4 z-30 mx-auto w-fit max-w-[calc(100%-1.5rem)]"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <Dock className="bg-background/90 shadow-lg backdrop-blur-lg">
        {items.map((item) => {
          const active =
            item.href === "/blog"
              ? pathname === "/blog" || pathname.startsWith("/blog/")
              : pathname === "/" && item.href === `/${hash}`;
          let current: "location" | "page" | undefined;
          if (active) {
            current = item.href.includes("#") ? "location" : "page";
          }
          return (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    aria-label={item.label}
                    href={item.href}
                    onClick={() =>
                      setHash(
                        item.href.split("#")[1]
                          ? `#${item.href.split("#")[1]}`
                          : ""
                      )
                    }
                    aria-current={current}
                    className={`inline-flex size-full min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full ${active ? "bg-muted" : "hover:bg-muted"}`}
                  >
                    <item.icon className="size-4" aria-hidden="true" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>{item.label}</TooltipContent>
              </Tooltip>
            </DockIcon>
          );
        })}
        <span className="bg-border mx-1 hidden h-7 w-px sm:block" />
        {[
          DATA.contact.social.GitHub,
          DATA.contact.social.LinkedIn,
          DATA.contact.social.X,
        ].map((social) => (
          <DockIcon key={social.name} className="hidden sm:flex">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={social.url}
                  aria-label={`Visit ${social.name} profile`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-muted flex size-full min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full"
                >
                  <social.icon className="size-4" aria-hidden="true" />
                </a>
              </TooltipTrigger>
              <TooltipContent>{social.name}</TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <span className="bg-border mx-1 h-7 w-px" />
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle className="size-full min-h-11 min-w-11 cursor-pointer rounded-full" />
            </TooltipTrigger>
            <TooltipContent>Theme</TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </nav>
  );
}
