import Image from "next/image";
import type { Attraction } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Tag } from "lucide-react";
import Link from "next/link";

interface AttractionCardProps {
  attraction: Attraction;
}

export function AttractionCard({ attraction }: AttractionCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg">
      <CardHeader className="p-0 relative">
        <Image
          src={attraction.image}
          alt={attraction.name}
          width={600}
          height={400}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={attraction.dataAiHint || "tourist attraction"}
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-semibold mb-2 leading-tight">{attraction.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-3">{attraction.description}</CardDescription>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
          {attraction.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-accent" /> {attraction.location}
            </span>
          )}
          {attraction.category && (
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-primary" /> {attraction.category}
            </span>
          )}
        </div>
      </CardContent>
      {attraction.relatedPackageIds && attraction.relatedPackageIds.length > 0 && (
        <CardFooter className="p-4 border-t mt-auto">
          <Button asChild variant="link" className="p-0 h-auto text-primary hover:underline">
            <Link href={`/packages?attraction=${attraction.id}`}>View Related Packages</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
