import Image from "next/image";
import Link from "next/link";
import { MOCK_ATTRACTIONS } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";

export function RecommendedAttractions() {
  const recommended = MOCK_ATTRACTIONS.slice(0, 3);

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">Explore Around Bir</h2>
          <p className="text-lg text-muted-foreground mt-2">Discover breathtaking sights and cultural hotspots.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommended.map((attr) => (
            <Card key={attr.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col rounded-lg">
              <CardHeader className="p-0 relative">
                <Image
                  src={attr.image}
                  alt={attr.name}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint={attr.dataAiHint || "attraction landscape"}
                />
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg font-semibold mb-2">{attr.name}</CardTitle>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{attr.description}</p>
                {attr.location && (
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    {attr.location}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 shadow-md hover:shadow-lg transition-shadow">
            <Link href="/attractions">
              See All Attractions <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
