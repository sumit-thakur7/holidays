
"use client";
import { useMemo } from "react";
import { MOCK_PACKAGES } from "@/data/mockData";
import { PackageList } from "@/components/packages/PackageList";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// export const metadata = { // Metadata should be defined in a server component or layout
//   title: "Exciting Camping Experiences in Bir Billing",
//   description: "Explore thrilling camping packages in Bir Billing. Enjoy nature, bonfires, and starry nights.",
// };

export default function CampingPage() {
  const campingPackages = useMemo(() => {
    return MOCK_PACKAGES.filter((pkg) => pkg.type === "camping");
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
            <BreadcrumbPage>Camping</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">
          Adventure Camping
        </h1>
        <p className="text-lg text-muted-foreground">
          Experience the outdoors with our curated camping packages.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <PackageList packages={campingPackages} />
        </div>
      </div>
    </div>
  );
}
