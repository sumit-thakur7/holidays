"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PRICE_RANGE_FILTERS, DURATION_FILTERS, COMBINED_WITH_FILTERS, STARTING_FROM_FILTERS, THEME_FILTERS, LABEL_FILTERS } from "@/data/mockData";
import type { PriceRangeFilter, DurationFilter } from "@/types";
import { FilterX } from "lucide-react";

export interface Filters {
  priceRange: PriceRangeFilter | null;
  duration: DurationFilter | null;
  combinedWith: string[];
  startingFrom: string[];
  themes: string[];
  labels: string[];
}

interface PackageFiltersProps {
  onFilterChange: (filters: Filters) => void;
  initialFilters?: Filters;
}

const defaultFilters: Filters = {
  priceRange: null,
  duration: null,
  combinedWith: [],
  startingFrom: [],
  themes: [],
  labels: [],
};

export function PackageFilters({ onFilterChange, initialFilters = defaultFilters }: PackageFiltersProps) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [currentPrice, setCurrentPrice] = useState<[number]>(initialFilters?.priceRange ? [initialFilters.priceRange.max] : [50000]);

  const handlePriceRangeChange = (value: string) => {
    const selectedRange = PRICE_RANGE_FILTERS.find(r => `${r.min}-${r.max}` === value) || null;
    const newFilters = { ...filters, priceRange: selectedRange };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleSliderPriceChange = (value: [number]) => {
    setCurrentPrice(value);
    // Find appropriate range or set custom logic
    const selectedRange = PRICE_RANGE_FILTERS.find(r => value[0] >= r.min && value[0] <= r.max) || { label: `Up to ₹${value[0]}`, min: 0, max: value[0] };
    const newFilters = { ...filters, priceRange: selectedRange };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };


  const handleDurationChange = (value: string) => {
    const selectedDuration = DURATION_FILTERS.find(d => `${d.minNights}-${d.maxNights}` === value) || null;
    const newFilters = { ...filters, duration: selectedDuration };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCheckboxChange = (category: keyof Filters, value: string, checked: boolean) => {
    const currentValues = filters[category] as string[];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    const newFilters = { ...filters, [category]: newValues };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setCurrentPrice([50000]);
    onFilterChange(defaultFilters);
  };

  return (
    <aside className="w-full md:w-72 lg:w-80 p-6 bg-card rounded-lg shadow-lg sticky top-20 h-fit">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-primary">Filter By</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground hover:text-primary">
          <FilterX className="w-4 h-4 mr-2" />
          Reset All
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={['price', 'duration']} className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">Price Range (per person)</AccordionTrigger>
          <AccordionContent className="pt-4 space-y-3">
            <Slider
              defaultValue={currentPrice}
              max={200000}
              step={1000}
              onValueChange={handleSliderPriceChange}
              className="mb-2"
            />
            <p className="text-sm text-muted-foreground text-center">Selected: ₹0 - ₹{currentPrice[0].toLocaleString()}</p>
            <RadioGroup onValueChange={handlePriceRangeChange} value={filters.priceRange ? `${filters.priceRange.min}-${filters.priceRange.max}` : ""}>
              {PRICE_RANGE_FILTERS.map((range) => (
                <div key={range.label} className="flex items-center space-x-2">
                  <RadioGroupItem value={`${range.min}-${range.max}`} id={`price-${range.label}`} />
                  <Label htmlFor={`price-${range.label}`} className="font-normal text-sm">{range.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="duration">
          <AccordionTrigger className="text-base font-medium">Duration</AccordionTrigger>
          <AccordionContent className="pt-4 space-y-2">
             <RadioGroup onValueChange={handleDurationChange} value={filters.duration ? `${filters.duration.minNights}-${filters.duration.maxNights}` : ""}>
              {DURATION_FILTERS.map((duration) => (
                <div key={duration.label} className="flex items-center space-x-2">
                   <RadioGroupItem value={`${duration.minNights}-${duration.maxNights}`} id={`duration-${duration.label}`} />
                  <Label htmlFor={`duration-${duration.label}`} className="font-normal text-sm">{duration.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="combinedWith">
          <AccordionTrigger className="text-base font-medium">Combined With</AccordionTrigger>
          <AccordionContent className="pt-4 space-y-2">
            {COMBINED_WITH_FILTERS.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox 
                  id={`combined-${item}`} 
                  checked={filters.combinedWith.includes(item)}
                  onCheckedChange={(checked) => handleCheckboxChange("combinedWith", item, !!checked)}
                />
                <Label htmlFor={`combined-${item}`} className="font-normal text-sm">{item}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="startingFrom">
          <AccordionTrigger className="text-base font-medium">Starting From</AccordionTrigger>
          <AccordionContent className="pt-4 space-y-2">
            {STARTING_FROM_FILTERS.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox 
                  id={`starting-${item}`} 
                  checked={filters.startingFrom.includes(item)}
                  onCheckedChange={(checked) => handleCheckboxChange("startingFrom", item, !!checked)}
                />
                <Label htmlFor={`starting-${item}`} className="font-normal text-sm">{item}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="themes">
          <AccordionTrigger className="text-base font-medium">Themes</AccordionTrigger>
          <AccordionContent className="pt-4 space-y-2">
            {THEME_FILTERS.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox 
                  id={`theme-${item}`} 
                  checked={filters.themes.includes(item)}
                  onCheckedChange={(checked) => handleCheckboxChange("themes", item, !!checked)}
                />
                <Label htmlFor={`theme-${item}`} className="font-normal text-sm">{item}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="labels">
          <AccordionTrigger className="text-base font-medium">Labels</AccordionTrigger>
          <AccordionContent className="pt-4 space-y-2">
            {LABEL_FILTERS.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox 
                  id={`label-${item}`} 
                  checked={filters.labels.includes(item)}
                  onCheckedChange={(checked) => handleCheckboxChange("labels", item, !!checked)}
                />
                <Label htmlFor={`label-${item}`} className="font-normal text-sm">{item}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
