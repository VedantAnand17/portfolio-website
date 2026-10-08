"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ModeToggle } from "@/components/mode-toggle";

const items = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
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
      className="bg-background/95 fixed inset-x-3 bottom-3 z-30 mx-auto flex w-fit max-w-[calc(100%-1.5rem)] items-center gap-1 rounded-xl border p-1 shadow-md backdrop-blur-sm"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      {items.map((item) => {
        const active =
          item.href === "/blog"
            ? pathname.startsWith("/blog")
            : pathname === "/" && item.href === `/${hash}`;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() =>
              setHash(
                item.href.split("#")[1] ? `#${item.href.split("#")[1]}` : ""
              )
            }
            aria-current={
              active ? (item.href.includes("#") ? "location" : "page") : undefined
            }
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-2 text-sm font-medium ${active ? "bg-muted" : "hover:bg-muted"}`}
          >
            {item.label}
          </Link>
        );
      })}
      <ModeToggle className="size-11 shrink-0" />
    </nav>
  );
}
