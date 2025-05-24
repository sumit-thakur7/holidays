"use client";
import { useState, useCallback } from "react";
import { MOCK_PACKAGES } from "@/data/mockData";
import type { Package } from "@/types";
import { PackageFilters, Filters } from "@/components/packages/PackageFilters";
import { PackageList } from "@/components/packages/PackageList";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SITE_NAME } from "@/lib/constants";

export default function PackagesPage() {
  const [filteredPackages, setFilteredPackages] = useState<Package[]>(MOCK_PACKAGES);

  const handleFilterChange = useCallback((filters: Filters) => {
    let packagesToFilter = [...MOCK_PACKAGES];

    if (filters.priceRange) {
      packagesToFilter = packagesToFilter.filter(
        (pkg) => pkg.price >= filters.priceRange!.min && pkg.price <= filters.priceRange!.max
      );
    }
    
    if (filters.duration) {
      // This is a naive duration filter. Assumes duration is like "X Nights" or "X Days".
      // More robust parsing would be needed for varied duration strings.
      const getNumericDuration = (durationStr: string) => {
        const match = durationStr.match(/(\d+)\s*(Night|Day|Hour)/i);
        if (!match) return 0;
        let value = parseInt(match[1], 10);
        if (match[2].toLowerCase() === 'hour') value = value / 24; // Convert hours to days approx.
        return value;
      };
      packagesToFilter = packagesToFilter.filter(pkg => {
        const pkgDuration = getNumericDuration(pkg.duration);
        // For "0-3 Nights", if pkg.duration is "1 Hour Flight", it should be included.
        // minNights can be 0, maxNights can be Infinity.
        if (filters.duration!.minNights === 0 && pkgDuration < 1 && filters.duration!.maxNights >= 0) return true; // for hourly things like paragliding
        return pkgDuration >= filters.duration!.minNights && pkgDuration <= filters.duration!.maxNights;
      });
    }

    if (filters.combinedWith.length > 0) {
      packagesToFilter = packagesToFilter.filter(pkg => 
        filters.combinedWith.some(loc => pkg.combinedWith?.includes(loc))
      );
    }

    if (filters.startingFrom.length > 0) {
      packagesToFilter = packagesToFilter.filter(pkg => 
        filters.startingFrom.includes(pkg.startingFrom || "")
      );
    }

    if (filters.themes.length > 0) {
      packagesToFilter = packagesToFilter.filter(pkg => 
        filters.themes.includes(pkg.theme || "")
      );
    }

    if (filters.labels.length > 0) {
      packagesToFilter = packagesToFilter.filter(pkg => 
        pkg.tags && filters.labels.some(label => pkg.tags?.includes(label))
      );
    }

    setFilteredPackages(packagesToFilter);
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
            <BreadcrumbPage>Packages</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">
          Bir Billing Tour Packages
        </h1>
        <p className="text-lg text-muted-foreground">
          Find the perfect adventure tailored to your desires.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <PackageFilters onFilterChange={handleFilterChange} />
        <div className="flex-1">
          <PackageList packages={filteredPackages} />
        </div>
      </div>
    </div>
  );
}
