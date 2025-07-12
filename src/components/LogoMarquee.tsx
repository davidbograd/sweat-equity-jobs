"use client";

import Image from "next/image";
import { useMemo } from "react";
import type { Company } from "../lib/types";

interface LogoMarqueeProps {
  companies: Company[];
}

const generateLogoUrl = (website: string) => {
  const cleanDomain = website
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

  const apiKey = process.env.NEXT_PUBLIC_LOGO_DEV_API_KEY;
  if (!apiKey) {
    return "";
  }

  return `https://img.logo.dev/${cleanDomain}?token=${apiKey}&size=60&retina=true`;
};

// Helper function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function LogoMarquee({ companies }: LogoMarqueeProps) {
  // Generate random logos for both rows
  const { topRowLogos, bottomRowLogos } = useMemo(() => {
    const shuffledCompanies = shuffleArray(companies);
    const topRowLogos = shuffledCompanies.slice(0, 12);
    const bottomRowLogos = shuffledCompanies.slice(12, 24);
    return { topRowLogos, bottomRowLogos };
  }, [companies]);

  return (
    <div className="w-full overflow-hidden select-none pointer-events-none relative">
      {/* Top row - moves right */}
      <div className="flex whitespace-nowrap mb-4">
        <div className="flex animate-marquee-right">
          {[...topRowLogos, ...topRowLogos, ...topRowLogos].map(
            (company, index) => (
              <div
                key={`top-${index}`}
                className="flex-shrink-0 mx-4 w-16 h-16 flex items-center justify-center"
              >
                <Image
                  src={generateLogoUrl(company.website)}
                  alt={`${company.name} logo`}
                  width={60}
                  height={60}
                  className="w-12 h-12 object-contain rounded-lg"
                  unoptimized={true}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Bottom row - moves left */}
      <div className="flex whitespace-nowrap">
        <div className="flex animate-marquee-left">
          {[...bottomRowLogos, ...bottomRowLogos, ...bottomRowLogos].map(
            (company, index) => (
              <div
                key={`bottom-${index}`}
                className="flex-shrink-0 mx-4 w-16 h-16 flex items-center justify-center"
              >
                <Image
                  src={generateLogoUrl(company.website)}
                  alt={`${company.name} logo`}
                  width={60}
                  height={60}
                  className="w-12 h-12 object-contain rounded-lg"
                  unoptimized={true}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
