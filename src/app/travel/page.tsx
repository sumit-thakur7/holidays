
"use client";
import { useMemo } from "react";
import { MOCK_PACKAGES } from "@/data/mockData";
import { PackageList } from "@/components/packages/PackageList";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// export const metadata = { // Metadata should be defined in a server component or layout
//   title: "Travel Packages for Bir Billing",
//   description: "Find comprehensive travel deals and combo packages for your Bir Billing trip.",
// };

export default function TravelPage() {
  const travelPackages = useMemo(() => {
    return MOCK_PACKAGES.filter((pkg) => pkg.type === "travel" || pkg.type === "combo");
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Travel Deals</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">
          Curated Travel Deals
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore comprehensive travel and combo packages for Bir Billing and beyond.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <PackageList packages={travelPackages} />
        </div>
      </div>
    </div>
  );
}
