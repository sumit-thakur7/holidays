
"use client";
import { useMemo } from "react";
import { MOCK_PACKAGES } from "@/data/mockData";
import { PackageList } from "@/components/packages/PackageList";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// export const metadata = { // Metadata should be defined in a server component or layout
//   title: "Scenic Trekking Trails in Bir Billing",
//   description: "Discover breathtaking trekking routes and packages in and around Bir Billing.",
// };

export default function TrekkingPage() {
  const trekkingPackages = useMemo(() => {
    return MOCK_PACKAGES.filter((pkg) => pkg.type === "trekking");
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
            <BreadcrumbPage>Trekking</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">
          Explore by Foot
        </h1>
        <p className="text-lg text-muted-foreground">
          Embark on unforgettable trekking adventures in the Himalayas.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <PackageList packages={trekkingPackages} />
        </div>
      </div>
    </div>
  );
}
