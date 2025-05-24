
import { MOCK_PACKAGES } from "@/data/mockData";
import type { Package } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, IndianRupee, MapPin, Users, Check, X, Info, Star, Tag, Plane, Hotel, Footprints, Tent, Bus, Bike, Wind } from "lucide-react";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { CONTACT_PHONE, REDBUS_LINK } from "@/lib/constants";

export async function generateStaticParams() {
  return MOCK_PACKAGES.map((pkg) => ({
    id: pkg.id,
  }));
}

const getPackageTypeIcon = (type: Package["type"]) => {
  switch (type) {
    case "paragliding": return <Plane className="w-5 h-5 mr-2 text-primary" />;
    case "hotel": return <Hotel className="w-5 h-5 mr-2 text-primary" />;
    case "trekking": return <Footprints className="w-5 h-5 mr-2 text-primary" />;
    case "camping": return <Tent className="w-5 h-5 mr-2 text-primary" />;
    case "bus": return <Bus className="w-5 h-5 mr-2 text-primary" />;
    case "mountain-biking": return <Bike className="w-5 h-5 mr-2 text-primary" />;
    case "hang-gliding": return <Wind className="w-5 h-5 mr-2 text-primary" />;
    case "travel":
    case "combo":
    default: return <Tag className="w-5 h-5 mr-2 text-primary" />;
  }
}


export default function PackageDetailPage({ params }: { params: { id: string } }) {
  const pkg = MOCK_PACKAGES.find((p) => p.id === params.id);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/packages">Packages</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{pkg.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div>
          <Image
            src={pkg.images[0]} // Main image
            alt={pkg.name}
            width={800}
            height={600}
            className="rounded-lg shadow-xl w-full object-cover aspect-[4/3]"
            data-ai-hint={pkg.dataAiHint || "travel location"}
          />
          {/* Optional: Thumbnail gallery if multiple images */}
          {pkg.images.length > 1 && (
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2">
              {pkg.images.slice(0,4).map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`${pkg.name} thumbnail ${idx + 1}`}
                  width={200}
                  height={150}
                  className="rounded-md object-cover aspect-[4/3] cursor-pointer hover:opacity-80 transition-opacity"
                  data-ai-hint={pkg.dataAiHint || "travel thumbnail"}
                />
              ))}
            </div>
          )}
        </div>

        {/* Package Details */}
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-primary">{pkg.name}</h1>
          
          <div className="flex flex-wrap gap-2">
            {pkg.tags?.map(tag => <Badge key={tag} variant={tag === "Trending Now" ? "destructive" : "secondary"}>{tag}</Badge>)}
          </div>

          <p className="text-lg text-muted-foreground">{pkg.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center"><Clock className="w-5 h-5 mr-2 text-accent" /> Duration: {pkg.duration}</div>
            <div className="flex items-center"><Users className="w-5 h-5 mr-2 text-accent" /> Theme: {pkg.theme || "General"}</div>
            {pkg.startingFrom && <div className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-accent" /> Starts From: {pkg.startingFrom}</div>}
            <div className="flex items-center capitalize">{getPackageTypeIcon(pkg.type)}Type: {pkg.type.replace('-', ' ')}</div>
          </div>

          {pkg.rating && (
            <div className="flex items-center text-amber-500">
              <Star className="w-5 h-5 fill-amber-500 mr-1" />
              <span>{pkg.rating.toFixed(1)}</span>
              {pkg.reviewsCount && <span className="ml-2 text-sm text-muted-foreground">({pkg.reviewsCount} reviews)</span>}
            </div>
          )}
          
          <div className="text-3xl font-bold text-primary flex items-center">
            <IndianRupee className="w-7 h-7" />
            {pkg.price.toLocaleString()}
            <span className="text-base text-muted-foreground ml-1">/ person</span>
          </div>

          {pkg.type === "bus" ? (
             <Button size="lg" asChild className="w-full shadow-md hover:shadow-lg transition-shadow">
              <Link href={REDBUS_LINK} target="_blank" rel="noopener noreferrer">Book on Redbus.in</Link>
            </Button>
          ) : (
            <Button size="lg" asChild className="w-full shadow-md hover:shadow-lg transition-shadow">
              <Link href={`tel:${CONTACT_PHONE}`}>Book Now (Call Us)</Link>
            </Button>
          )}
           <Button size="lg" variant="outline" asChild className="w-full">
              <Link href="/agents">Find an Agent</Link>
            </Button>
        </div>
      </div>

      {/* Tabs for Itinerary, Inclusions/Exclusions */}
      <Tabs defaultValue="overview" className="mt-12">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {pkg.itinerary && <TabsTrigger value="itinerary">Itinerary</TabsTrigger>}
          { (pkg.includes || pkg.exclusions) && <TabsTrigger value="inclusions">Inclusions/Exclusions</TabsTrigger>}
          <TabsTrigger value="info">Important Info</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="prose max-w-none dark:prose-invert p-6 bg-card rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Package Overview</h3>
          <p>{pkg.description}</p>
          {pkg.combinedWith && pkg.combinedWith.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold">Destinations Covered:</h4>
              <ul className="list-disc list-inside">
                {pkg.combinedWith.map(dest => <li key={dest}>{dest}</li>)}
              </ul>
            </div>
          )}
        </TabsContent>

        {pkg.itinerary && (
          <TabsContent value="itinerary" className="p-6 bg-card rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Day-wise Itinerary</h3>
            <Accordion type="single" collapsible className="w-full">
              {pkg.itinerary.map((dayInfo) => (
                <AccordionItem value={`day-${dayInfo.day}`} key={dayInfo.day}>
                  <AccordionTrigger className="text-base font-medium">Day {dayInfo.day}: {dayInfo.title}</AccordionTrigger>
                  <AccordionContent className="prose dark:prose-invert text-sm">
                    {dayInfo.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        )}
        
        {(pkg.includes || pkg.exclusions) && (
          <TabsContent value="inclusions" className="p-6 bg-card rounded-lg shadow">
            <div className="grid md:grid-cols-2 gap-6">
              {pkg.includes && pkg.includes.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">What's Included</h3>
                  <ul className="space-y-2">
                    {pkg.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-5 h-5 mr-2 mt-0.5 text-green-500 shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {pkg.exclusions && pkg.exclusions.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">What's Not Included</h3>
                  <ul className="space-y-2">
                    {pkg.exclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <X className="w-5 h-5 mr-2 mt-0.5 text-red-500 shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>
        )}

        <TabsContent value="info" className="prose max-w-none dark:prose-invert p-6 bg-card rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Important Information</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Prices are per person and subject to change based on availability and season.</li>
            <li>Standard check-in/check-out times apply for hotels.</li>
            <li>Carry valid ID proof for all travelers.</li>
            <li>Follow instructions from guides/pilots for safety during adventure activities.</li>
            <li>Weather conditions in mountains can change rapidly; be prepared.</li>
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
}
