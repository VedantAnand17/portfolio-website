import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="space-y-6">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p>This page is missing or the address has changed.</p>
      <div className="flex flex-wrap gap-4">
        <Link
          className="text-link inline-flex min-h-11 items-center underline"
          href="/"
        >
          Go home
        </Link>
        <Link
          className="text-link inline-flex min-h-11 items-center underline"
          href="/blog"
        >
          Read the blog
        </Link>
      </div>
    </main>
  );
}
