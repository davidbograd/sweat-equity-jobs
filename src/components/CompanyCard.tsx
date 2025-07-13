"use client";

import Image from "next/image";
import { CalendarHeart, MapPin, Briefcase } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { CompanyCardProps } from "../lib/types";
import logoMapping from "../data/logo-mapping.json";

// Helper function to get logo path from static mapping
const getLogoPath = (website: string): string => {
  // Use the static logo mapping, fallback to a placeholder if not found
  const logoPath = logoMapping[website as keyof typeof logoMapping];
  return logoPath || "/logos/placeholder.svg";
};

// Helper function to capitalize first letter of work type
const capitalizeWorkType = (workType: string) => {
  return workType.charAt(0).toUpperCase() + workType.slice(1).toLowerCase();
};

export default function CompanyCard({
  name,
  website,
  description,
  year,
  location,
  workType,
  allLocations,
  allWorkTypes,
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

  // Create work type display logic
  const getWorkTypeDisplay = () => {
    if (!allWorkTypes || allWorkTypes.length <= 1) {
      return workType;
    }

    // If multiple work types, show primary + count
    return `${workType} + ${allWorkTypes.length - 1}`;
  };

  const workTypeDisplay = getWorkTypeDisplay();
  const allWorkTypesText =
    allWorkTypes && allWorkTypes.length > 1
      ? allWorkTypes.join(", ")
      : workType;
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 h-full flex flex-col drop-shadow-[0_0px_8px_rgba(226,216,216,0.8)]">
      {/* Company Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 flex items-center justify-center">
          <Image
            src={getLogoPath(website)}
            alt={`${name} logo`}
            width={48}
            height={48}
            className="w-12 h-12 object-contain rounded-lg"
            unoptimized={true}
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
        {allWorkTypes && allWorkTypes.length > 1 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 cursor-help">
                  <Briefcase className="w-4 h-4" />
                  <span>{capitalizeWorkType(workTypeDisplay)}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{allWorkTypesText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span>{capitalizeWorkType(workType)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
