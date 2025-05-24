
"use client";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={cn(
            "transition-colors hover:text-primary",
            pathname === link.href ? "text-primary" : "text-foreground/70"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
