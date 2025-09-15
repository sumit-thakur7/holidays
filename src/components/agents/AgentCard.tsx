
"use client";

import Image from "next/image";
import type { Agent } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Briefcase, Facebook, Instagram, Twitter, ExternalLink, Award } from "lucide-react";
import Link from "next/link";
import { CONTACT_PHONE } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

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
      return null;
  }
};

export function AgentCard({ agent }: AgentCardProps) {
  const hasFullDetails = agent.fullDescription || agent.certificateImage;

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
      <CardFooter className="p-4 border-t mt-auto flex gap-2">
        <Button asChild className="w-full shadow-md hover:shadow-lg transition-shadow">
          <Link href={`tel:${CONTACT_PHONE}?subject=Quote request for ${agent.name}`}>Get a Quote</Link>
        </Button>
        {hasFullDetails && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                View Details <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle className="text-2xl text-primary">{agent.name}</DialogTitle>
                <DialogDescription>
                  Professional Mountaineering Guide
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {agent.fullDescription && (
                  <p className="text-sm text-muted-foreground">{agent.fullDescription}</p>
                )}
                {agent.certificateImage && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Award className="w-5 h-5 text-accent" />
                      Certification
                    </h3>
                    <div className="p-2 border rounded-md">
                        <Image
                            src={agent.certificateImage}
                            alt={`${agent.name}'s Certificate`}
                            width={800}
                            height={600}
                            className="rounded-md w-full object-contain"
                            data-ai-hint="certificate document"
                        />
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <DialogTrigger asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}
