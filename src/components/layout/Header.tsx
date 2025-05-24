
"use client";
import React from "react"; // Added React import
import Link from "next/link";
import { MountainSnow, Menu, X, Phone, Mail, MapPin } from "lucide-react"; // Added MapPin
import { NAV_LINKS, SITE_NAME, CONTACT_PHONE, CONTACT_EMAIL, CONTACT_ADDRESS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Navbar } from './Navbar';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const scheduleCallButton = (
    <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md whitespace-nowrap">
      <Link href="/contact">Schedule a Call</Link>
    </Button>
  );

  // For top bar and mobile menu footer
  const contactInfoElements = (
    <>
      <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-1.5 hover:text-primary-foreground/80 transition-colors text-sm">
        <Phone className="h-4 w-4" />
        {CONTACT_PHONE}
      </a>
      <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-1.5 hover:text-primary-foreground/80 transition-colors text-sm">
        <Mail className="h-4 w-4" />
        {CONTACT_EMAIL}
      </a>
    </>
  );
  
  // Specific for desktop top bar, includes address
    const topBarContactDetails = (
    <>
      <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-1.5 transition-colors hover:opacity-80">
        <Phone className="h-4 w-4" />
        {CONTACT_PHONE}
      </a>
      <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-1.5 transition-colors hover:opacity-80">
        <Mail className="h-4 w-4" />
        {CONTACT_EMAIL}
      </a>
      {/* The address might be too long, but included as per design inspiration. Consider shortening CONTACT_ADDRESS or selective display */}
      <span className="hidden md:flex items-center gap-1.5">
        <MapPin className="h-4 w-4" />
        {CONTACT_ADDRESS}
      </span>
    </>
  );


  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto flex h-12 items-center justify-between px-4 text-sm max-w-screen-2xl">
          <div className="flex items-center gap-x-3 sm:gap-x-4 gap-y-1 flex-wrap">
            {/* Using specific topBarContactDetails for desktop view including address */}
            <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-1.5 transition-colors hover:opacity-80 text-xs sm:text-sm">
              <Phone className="h-4 w-4" />
              {CONTACT_PHONE}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-1.5 transition-colors hover:opacity-80 text-xs sm:text-sm">
              <Mail className="h-4 w-4" />
              {CONTACT_EMAIL}
            </a>
            {/* Address - shown on medium screens and up to prevent clutter */}
            <span className="hidden md:flex items-center gap-1.5 text-xs sm:text-sm">
              <MapPin className="h-4 w-4" />
              {CONTACT_ADDRESS}
            </span>
          </div>
          <div className="hidden sm:block"> {/* "Schedule a Call" button visible on sm screens and up */}
            {scheduleCallButton}
          </div>
        </div>
      </div>

      {/* Main Header Bar (Logo, Nav, Mobile Trigger) */}
      <div className="bg-background border-b border-border/40">
        <div className="container flex h-16 sm:h-20 items-center justify-between max-w-screen-2xl px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <MountainSnow className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            <span className="text-xl sm:text-2xl font-bold text-primary">{SITE_NAME}</span>
          </Link>

          {/* Desktop: Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            <Navbar /> {/* This will render desktop nav links */}
             {/* Second button as in example if needed:
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/contact">Appointment</Link>
            </Button>
            */}
          </div>

          {/* Mobile: Menu Trigger */}
          <div className="lg:hidden flex items-center">
             {/* "Schedule a Call" button for mobile, if top bar one is hidden */}
            <div className="sm:hidden mr-2">
              {scheduleCallButton}
            </div>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background p-6 flex flex-col">
                <SheetHeader className="mb-6 text-left sm:text-left">
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
                  <div className="flex flex-col gap-3 text-sm"> {/* Increased gap for readability */}
                    {/* Using the simpler contactInfoElements for mobile sheet */}
                    <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-1.5 hover:text-primary transition-colors text-foreground/80 text-sm">
                        <Phone className="h-4 w-4 text-primary" />
                        {CONTACT_PHONE}
                    </a>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-1.5 hover:text-primary transition-colors text-foreground/80 text-sm">
                        <Mail className="h-4 w-4 text-primary" />
                        {CONTACT_EMAIL}
                    </a>
                    <span className="flex items-start gap-1.5 text-foreground/80 text-sm"> {/* Address in mobile */}
                        <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {CONTACT_ADDRESS}
                    </span>
                  </div>
                   {/* "Schedule a Call" button is already in the top bar for sm+ screens.
                       It is shown specifically for mobile menu here or can be the one from main mobile header part.
                       For simplicity, the scheduleCallButton variable is reused here.
                    */}
                  <SheetClose asChild>
                   {React.cloneElement(scheduleCallButton, { className: cn(scheduleCallButton.props.className, "w-full") })}
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
