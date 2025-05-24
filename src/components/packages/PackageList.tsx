
"use client";

import { useState, useMemo } from "react";
import type { Package } from "@/types";
import { PackageCard } from "@/components/shared/PackageCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PackageListProps {
  packages: Package[];
}

type SortOption = "relevance" | "priceLowToHigh" | "priceHighToLow" | "duration";

export function PackageList({ packages }: PackageListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("relevance");

  const sortedAndFilteredPackages = useMemo(() => {
    let filtered = packages.filter(pkg => 
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pkg.tags && pkg.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    switch (sortOption) {
      case "priceLowToHigh":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "duration": // Basic duration sort, might need refinement based on actual duration format
        filtered.sort((a, b) => {
          const getDurationValue = (durationStr: string) => {
            const match = durationStr.match(/(\d+)/);
            return match ? parseInt(match[1], 10) : 0;
          };
          return getDurationValue(a.duration) - getDurationValue(b.duration);
        });
        break;
      case "relevance":
      default:
        // Default order or implement relevance logic (e.g., based on rating, tags)
        break;
    }
    return filtered;
  }, [packages, searchTerm, sortOption]);

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-card rounded-lg shadow">
        <div className="relative w-full sm:max-w-xs">
          <Input 
            type="text"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort By:</span>
          <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue placeholder="Sort packages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
              <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedAndFilteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedAndFilteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No packages found matching your criteria.</p>
          <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search term.</p>
        </div>
      )}
      <p className="text-sm text-muted-foreground mt-8 text-center">
        { sortedAndFilteredPackages.length } Bir Billing Tour {sortedAndFilteredPackages.length === 1 ? 'Package' : 'Packages'} Found
      </p>
    </div>
  );
}
