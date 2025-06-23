import Image from "next/image";
import Link from "next/link";
import type { Package } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, IndianRupee, Mountain, Star, Users, Tag } from "lucide-react";

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg">
      <CardHeader className="p-0 relative">
        <Link href={`/packages/${pkg.id}`} className="block">
          <Image
            src={pkg.images[0]}
            alt={pkg.name}
            width={600}
            height={400}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint={pkg.dataAiHint || "travel package"}
          />
        </Link>
        {pkg.tags && pkg.tags[0] && (
          <Badge variant="destructive" className="absolute top-2 right-2 bg-primary text-primary-foreground">
            {pkg.tags[0]}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/packages/${pkg.id}`} className="block">
          <CardTitle className="text-lg font-semibold mb-2 leading-tight hover:text-primary transition-colors">
            {pkg.name}
          </CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{pkg.description}</p>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
          {pkg.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-primary" /> {pkg.duration}
            </span>
          )}
          {pkg.theme && (
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-accent" /> {pkg.theme}
            </span>
          )}
           {pkg.type && (
            <span className="flex items-center gap-1 capitalize">
              <Tag className="w-3.5 h-3.5 text-secondary-foreground" /> {pkg.type}
            </span>
          )}
        </div>
        {pkg.rating && (
          <div className="flex items-center gap-1 text-sm text-amber-500 mb-2">
            <Star className="w-4 h-4 fill-amber-500" />
            <span>{pkg.rating.toFixed(1)}</span>
            {pkg.reviewsCount && <span className="text-xs text-muted-foreground">({pkg.reviewsCount} reviews)</span>}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t mt-auto">
        <div className="text-lg font-bold text-primary flex items-center">
          <IndianRupee className="w-5 h-5" />
          {pkg.price.toLocaleString()}
          <span className="text-xs text-muted-foreground ml-1">/ person</span>
        </div>
        <Button asChild size="sm" className="shadow-md hover:shadow-lg transition-shadow">
          <Link href={`/packages/${pkg.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );