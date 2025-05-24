import Link from "next/link";
import { MOCK_PACKAGES } from "@/data/mockData";
import { PackageCard } from "@/components/shared/PackageCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturedPackages() {
  const featured = MOCK_PACKAGES.filter(p => p.tags?.includes("Trending Now")).slice(0, 3);
  if (featured.length === 0) { // Fallback if no "Trending Now"
    featured.push(...MOCK_PACKAGES.slice(0,3-featured.length));
  }


  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">Featured Packages</h2>
          <p className="text-lg text-muted-foreground mt-2">Handpicked adventures just for you.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 shadow-md hover:shadow-lg transition-shadow">
            <Link href="/packages">
              View All Packages <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
