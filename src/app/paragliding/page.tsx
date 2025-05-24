
"use client";
import { useState, useMemo } from "react";
import { MOCK_PACKAGES } from "@/data/mockData";
import type { Package } from "@/types";
import { PackageList } from "@/components/packages/PackageList";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// export const metadata = { // Metadata should be defined in a server component or layout
//   title: "Paragliding Adventures in Bir Billing",
//   description: "Find the best paragliding packages and experience the thrill of flying in Bir Billing.",
// };

export default function ParaglidingPage() {
  const paraglidingPackages = useMemo(() => {
    return MOCK_PACKAGES.filter((pkg) => pkg.type === "paragliding");
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
            <BreadcrumbPage>Paragliding</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">
          Paragliding Adventures
        </h1>
        <p className="text-lg text-muted-foreground">
          Soar through the skies and witness breathtaking views of Bir Billing.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Add filters here if needed in the future, similar to main packages page */}
        <div className="flex-1">
          <PackageList packages={paraglidingPackages} />
        </div>
      </div>
    </div>
  );
}
