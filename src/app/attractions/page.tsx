import { MOCK_ATTRACTIONS } from "@/data/mockData";
import { AttractionCard } from "@/components/attractions/AttractionCard";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const metadata = {
  title: "Attractions in Bir Billing",
  description: "Discover the best places to visit in and around Bir Billing. Explore waterfalls, monasteries, viewpoints and more.",
};

export default function AttractionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Attractions</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">
          Explore Bir Billing's Attractions
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover captivating sights, serene monasteries, and breathtaking natural wonders.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_ATTRACTIONS.map((attraction) => (
          <AttractionCard key={attraction.id} attraction={attraction} />
        ))}
      </div>
    </div>
  );
}
