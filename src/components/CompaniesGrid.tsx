"use client";

import { useState } from "react";
import CompanyCard from "./CompanyCard";
import type { Company } from "../lib/types";

interface CompaniesGridProps {
  companies: Company[];
  currentCity?: string;
  expandedByDefault?: boolean;
}

export default function CompaniesGrid({
  companies,
  currentCity,
  expandedByDefault = false,
}: CompaniesGridProps) {
  const [isExpanded, setIsExpanded] = useState(expandedByDefault);

  // Use a consistent initial limit for both server and client to avoid hydration mismatch
  // This represents 2 rows on desktop (8 companies = 4 cols x 2 rows)
  const initialLimit = 8;

  // Don't show progressive disclosure if expanded by default or fewer companies than limit
  const shouldShowProgressiveDisclosure =
    !expandedByDefault && companies.length > initialLimit;

  return (
    <div className="relative">
      {/* Companies Grid */}
      <div
        id="companies-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500 ease-in-out"
      >
        {companies.map((company, index) => (
          <div
            key={company.id}
            className={`transition-all duration-500 ease-in-out ${
              shouldShowProgressiveDisclosure &&
              !isExpanded &&
              index >= initialLimit
                ? "opacity-0 scale-95 translate-y-4"
                : "opacity-100 scale-100 translate-y-0"
            }`}
            style={{
              // For SEO: Keep content in DOM but visually hidden when needed
              display:
                shouldShowProgressiveDisclosure &&
                !isExpanded &&
                index >= initialLimit
                  ? "none"
                  : "block",
            }}
          >
            <CompanyCard
              name={company.name}
              website={company.website}
              description={company.description}
              year={company.year}
              location={company.location}
              workType={company.workType}
              allLocations={company.allLocations}
              allWorkTypes={company.allWorkTypes}
              currentCity={currentCity}
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay and Expand Button */}
      {shouldShowProgressiveDisclosure && !isExpanded && (
        <div className="relative -mt-32 pt-32 transition-all duration-500 ease-in-out">
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none transition-opacity duration-500"
            aria-hidden="true"
          />

          {/* Expand Button */}
          <div className="relative z-10 text-center pt-8">
            <button
              onClick={() => setIsExpanded(true)}
              className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 text-lg font-medium"
              aria-expanded={isExpanded}
              aria-controls="companies-grid"
            >
              Show all {companies.length} companies
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
