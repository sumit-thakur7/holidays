
"use client";
import Link from "next/link";
import { MountainSnow, Menu, X, Phone, Mail } from "lucide-react";
import { NAV_LINKS, SITE_NAME, CONTACT_PHONE, CONTACT_EMAIL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet"; // Added SheetHeader
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const scheduleCallButton = (
    <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
      <Link href="/contact">Schedule a Call</Link>
    </Button>
  );

  const contactInfo = (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm">
      <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-1.5 hover:text-primary transition-colors text-foreground/80">
        <Phone className="h-4 w-4" />
        {CONTACT_PHONE}
      </a>
      <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-1.5 hover:text-primary transition-colors text-foreground/80">
        <Mail className="h-4 w-4" />
        {CONTACT_EMAIL}
      </a>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between max-w-screen-2xl">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <MountainSnow className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">{SITE_NAME}</span>
        </Link>

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

        <div className="hidden md:flex items-center gap-4">
          {contactInfo}
          {scheduleCallButton}
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6 flex flex-col">
              <SheetHeader className="mb-6 text-left sm:text-left"> {/* Use SheetHeader and adjust spacing/alignment */}
                <SheetTitle className="sr-only">{SITE_NAME} Menu</SheetTitle>
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <MountainSnow className="h-7 w-7 text-primary" />
                    <span className="text-xl font-bold text-primary">{SITE_NAME}</span>
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </div>
              </SheetHeader>
              
              <nav className="flex flex-col space-y-4 mb-6">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary py-1",
                        pathname === link.href ? "text-primary" : "text-foreground/80"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto space-y-4 pt-6 border-t border-border/40">
                {contactInfo}
                <SheetClose asChild>
                 {scheduleCallButton}
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
