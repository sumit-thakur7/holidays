
"use client";
import { useMemo } from "react";
import { MOCK_PACKAGES } from "@/data/mockData";
import { PackageList } from "@/components/packages/PackageList";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// export const metadata = { // Metadata should be defined in a server component or layout
//   title: "Mountain Biking Adventures in Bir Billing",
//   description: "Explore thrilling mountain biking trails and packages in Bir Billing.",
// };

export default function MountainBikingPage() {
  const mountainBikingPackages = useMemo(() => {
    return MOCK_PACKAGES.filter((pkg) => pkg.type === "mountain-biking");
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
            <BreadcrumbPage>Mountain Biking</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">
          Mountain Biking Trails
        </h1>
        <p className="text-lg text-muted-foreground">
          Conquer the trails and enjoy the scenic beauty on two wheels.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <PackageList packages={mountainBikingPackages} />
        </div>
      </div>
    </div>
  );
}
