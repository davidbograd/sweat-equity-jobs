// Company type based on the JSON structure
export type Company = {
  id: string;
  name: string;
  website: string;
  description: string;
  year: string;
  location: string;
  workType: string;
  allLocations: string[];
  allWorkTypes: string[];
};

// Page props types (Next.js 15+ async params)
export interface CityPageProps {
  params: Promise<{
    city: string;
  }>;
}

// Breadcrumb item type
export interface BreadcrumbItem {
  name: string;
  url: string;
}

// Company card props type (subset of Company fields needed for display)
export interface CompanyCardProps {
  name: string;
  website: string;
  description: string;
  year: string;
  location: string;
  workType: string;
  allLocations?: string[];
  allWorkTypes?: string[];
  currentCity?: string;
}
