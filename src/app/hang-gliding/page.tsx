
"use client";
import { useMemo } from "react";
import { MOCK_PACKAGES } from "@/data/mockData";
import { PackageList } from "@/components/packages/PackageList";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// export const metadata = { // Metadata should be defined in a server component or layout
//   title: "Hang Gliding in Bir Billing",
//   description: "Experience the freedom of hang gliding in the skies of Bir Billing.",
// };

export default function HangGlidingPage() {
  const hangGlidingPackages = useMemo(() => {
    return MOCK_PACKAGES.filter((pkg) => pkg.type === "hang-gliding");
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
            <BreadcrumbPage>Hang Gliding</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">
          Hang Gliding Experiences
        </h1>
        <p className="text-lg text-muted-foreground">
          Glide like a bird and witness the Himalayas from a unique perspective.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <PackageList packages={hangGlidingPackages} />
        </div>
      </div>
    </div>
  );
}
