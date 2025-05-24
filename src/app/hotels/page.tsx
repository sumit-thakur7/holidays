
"use client";
import { useMemo } from "react";
import { MOCK_PACKAGES } from "@/data/mockData";
import { PackageList } from "@/components/packages/PackageList";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// export const metadata = { // Metadata should be defined in a server component or layout
//   title: "Comfortable Hotels in Bir Billing",
//   description: "Discover a range of hotels and stays in Bir Billing, from cozy guesthouses to luxury resorts.",
// };

export default function HotelsPage() {
  const hotelPackages = useMemo(() => {
    return MOCK_PACKAGES.filter((pkg) => pkg.type === "hotel");
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
            <BreadcrumbPage>Hotels</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">
          Find Your Perfect Stay
        </h1>
        <p className="text-lg text-muted-foreground">
          Comfortable and scenic hotels for your Bir Billing visit.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <PackageList packages={hotelPackages} />
        </div>
      </div>
    </div>
  );
}
