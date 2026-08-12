import { ChevronRightIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="text-muted-foreground flex items-center space-x-2 text-sm">
        <li>
          <Link
            href="/"
            className="hover:text-foreground flex items-center transition-colors"
          >
            <HomeIcon className="mr-1 h-4 w-4" />
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRightIcon className="h-4 w-4" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function BlogBreadcrumb({ title }: { title: string }) {
  return (
    <Breadcrumb items={[{ href: "/blog", label: "Blog" }, { label: title }]} />
  );
}
