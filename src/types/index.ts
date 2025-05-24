export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string; // e.g., "3 Nights / 4 Days" or numeric for nights
  images: string[]; // URLs to images
  type: "paragliding" | "hotel" | "travel" | "trekking" | "camping" | "bus" | "combo";
  theme?: "Adventure" | "Honeymoon" | "Family" | "Spiritual" | "Wildlife";
  combinedWith?: string[]; // e.g., ["Dharamshala", "Mcleodganj"]
  startingFrom?: string; // e.g., "Delhi", "Bir Billing"
  rating?: number; // 1-5
  reviewsCount?: number;
  includes?: string[];
  exclusions?: string[];
  itinerary?: { day: number; title: string; description: string }[];
  tags?: string[]; // e.g., "Trending Now", "Best Seller"
  dataAiHint?: string;
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  relatedPackageIds?: string[];
  location?: string;
  category?: string; // e.g., "Waterfall", "Monastery", "Viewpoint"
  dataAiHint?: string;
}

export interface Agent {
  id: string;
  name: string;
  image: string;
  reviewsCount: number;
  rating: number; // 1-5
  description: string;
  specializations: string[]; // e.g., ["Paragliding", "Luxury Stays", "Group Tours"]
  memberSince?: string; // e.g., "2020"
  dataAiHint?: string;
}

export interface PriceRangeFilter {
  label: string;
  min: number;
  max: number;
}

export interface DurationFilter {
  label: string;
  minNights: number;
  maxNights: number;
}
