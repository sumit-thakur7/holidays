import Link from "next/link";
import { MountainSnow, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { SITE_NAME, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

// A helper component to map string icon names to actual Lucide components
const SocialIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "Facebook":
      return <Facebook className={className} />;
    case "Instagram":
      return <Instagram className={className} />;
    case "Twitter":
      return <Twitter className={className} />;
    default:
      return null;
  }
};


export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border/40">
      <div className="container mx-auto max-w-screen-2xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand and About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <MountainSnow className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-secondary-foreground/80">
              Your ultimate guide to adventure and tranquility in Bir Billing. Explore paragliding, trekking, camping, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors text-secondary-foreground/80">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary-foreground">Contact Us</h3>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                <span>{CONTACT_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <a href={`tel:${CONTACT_PHONE}`} className="hover:text-primary transition-colors">
                  {CONTACT_PHONE}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary-foreground">Follow Us</h3>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  <SocialIcon name={social.icon} className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-secondary-foreground/70">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
