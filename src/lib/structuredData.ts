// Reusable structured data generators
import type { Company, BreadcrumbItem } from "./types";

// Generate Organization schema for a single company
export function generateOrganizationSchema(company: Company) {
  return {
    "@type": "Organization",
    name: company.name,
    url: `https://${company.website}`,
    description: company.description,
    foundingDate: company.year,
    address: {
      "@type": "PostalAddress",
      addressLocality: company.location,
      addressCountry: "AU",
    },
    workArrangement: company.allWorkTypes || [company.workType],
  };
}

// Generate ItemList schema for company lists
export function generateItemListSchema(
  companies: Company[],
  name: string,
  description: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: name,
    description: description,
    numberOfItems: companies.length,
    itemListElement: companies.map((company, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: generateOrganizationSchema(company),
    })),
  };
}

// Generate BreadcrumbList schema
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Generate WebSite schema (only used on homepage)
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sweat Equity Jobs",
    url: "https://sweatequityjobs.com",
    description:
      "Find Australian startups that give equity as part of your compensation package",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://sweatequityjobs.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}
