
import Image from "next/image";
import type { Agent } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Briefcase, CalendarDays, Facebook, Instagram, Twitter } from "lucide-react"; // Added social icons
import Link from "next/link";
import { CONTACT_PHONE } from "@/lib/constants";

interface AgentCardProps {
  agent: Agent;
}

// Helper component to map string icon names to actual Lucide components for social links
const SocialIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "Facebook":
      return <Facebook className={className} />;
    case "Instagram":
      return <Instagram className={className} />;
    case "Twitter":
      return <Twitter className={className} />;
    default:
      return null; // Or a default icon
  }
};

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg">
      <CardHeader className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-secondary/50">
        <Image
          src={agent.image}
          alt={agent.name}
          width={100}
          height={100}
          className="rounded-full object-cover border-4 border-background shadow-md"
          data-ai-hint={agent.dataAiHint || "travel agent portrait"}
        />
        <div className="text-center sm:text-left">
          <CardTitle className="text-xl font-semibold text-primary">{agent.name}</CardTitle>
          {agent.memberSince && (
            <p className="text-xs text-muted-foreground">Member Since: {agent.memberSince}</p>
          )}
          <div className="flex items-center justify-center sm:justify-start gap-1 mt-1 text-amber-500">
            <Star className="w-4 h-4 fill-amber-500" />
            <span>{agent.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({agent.reviewsCount} reviews)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-3">{agent.description}</CardDescription>
        <div className="mb-3">
          <h4 className="text-sm font-semibold mb-1 text-foreground">Specializations:</h4>
          <div className="flex flex-wrap gap-1">
            {agent.specializations.map((spec) => (
              <Badge key={spec} variant="outline" className="text-xs bg-accent/20 border-accent/50 text-accent-foreground">
                <Briefcase className="w-3 h-3 mr-1" /> {spec}
              </Badge>
            ))}
          </div>
        </div>
        {agent.socialLinks && agent.socialLinks.length > 0 && (
          <div className="mt-4 pt-3 border-t">
            <h4 className="text-sm font-semibold mb-2 text-foreground">Connect:</h4>
            <div className="flex space-x-3">
              {agent.socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <SocialIcon name={link.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t mt-auto">
        <Button asChild className="w-full shadow-md hover:shadow-lg transition-shadow">
          <Link href={`tel:${CONTACT_PHONE}?subject=Quote request for ${agent.name}`}>Get a Quote</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
