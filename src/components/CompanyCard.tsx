"use client";

import { CalendarHeart, MapPin, Briefcase } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Helper function to generate logo.dev URL
const generateLogoUrl = (website: string) => {
  // Clean the website URL to get just the domain
  const cleanDomain = website
    .replace(/^https?:\/\//, "") // Remove protocol
    .replace(/^www\./, "") // Remove www
    .replace(/\/$/, ""); // Remove trailing slash

  return `https://img.logo.dev/${cleanDomain}?token=pk_YiqSJOVUStasZ4yEls7iTw&size=48&retina=true`;
};

interface CompanyCardProps {
  name: string;
  website: string;
  description: string;
  year: string;
  location: string;
  workType: string;
  allLocations?: string[];
  currentCity?: string;
}

export default function CompanyCard({
  name,
  website,
  description,
  year,
  location,
  workType,
  allLocations,
  currentCity,
}: CompanyCardProps) {
  // Create location display logic
  const getLocationDisplay = () => {
    if (!allLocations || allLocations.length <= 1) {
      return location;
    }

    // If currentCity is provided and exists in allLocations, prioritize it
    if (currentCity) {
      const normalizedCurrentCity = currentCity.toLowerCase();
      const matchingLocation = allLocations.find(
        (loc) => loc.toLowerCase() === normalizedCurrentCity
      );

      if (matchingLocation) {
        return `${matchingLocation} + ${allLocations.length - 1}`;
      }
    }

    // Fallback to first location
    return `${allLocations[0]} + ${allLocations.length - 1}`;
  };

  const locationDisplay = getLocationDisplay();

  const allLocationsText =
    allLocations && allLocations.length > 1
      ? allLocations.join(", ")
      : location;
  return (
    <div className="bg-white rounded-xl p-6 h-full flex flex-col drop-shadow-[0_0px_8px_rgba(226,216,216,0.8)]">
      {/* Company Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 flex items-center justify-center">
          <img
            src={generateLogoUrl(website)}
            alt={`${name} logo`}
            className="w-12 h-12 object-contain rounded-lg"
            onError={(e) => {
              // Fallback to orange bar if logo fails to load
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
          <div className="w-6 h-1 bg-orange-400 rounded-full hidden"></div>
        </div>
        <div>
          <h3 className="text-black">{name}</h3>
          <a
            href={`https://${website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black opacity-65 hover:underline hover:underline-offset-4"
          >
            {website}
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="text-black opacity-65 mb-6 leading-relaxed flex-grow">
        {description}
      </p>

      {/* Meta Information - Always at bottom */}
      <div className="flex items-center gap-6 text-sm text-black opacity-65 mt-auto">
        <div className="flex items-center gap-2">
          <CalendarHeart className="w-4 h-4" />
          <span>{year}</span>
        </div>
        {allLocations && allLocations.length > 1 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 cursor-help">
                  <MapPin className="w-4 h-4" />
                  <span>{locationDisplay}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{allLocationsText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{locationDisplay}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          <span>{workType}</span>
        </div>
      </div>
    </div>
  );
}
