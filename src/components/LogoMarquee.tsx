"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Company } from "../lib/types";
import logoMapping from "../data/logo-mapping.json";

interface LogoMarqueeProps {
  companies: Company[];
}

const getLogoPath = (website: string): string => {
  // Use the static logo mapping, fallback to a placeholder if not found
  const logoPath = logoMapping[website as keyof typeof logoMapping];
  return logoPath || "/logos/placeholder.svg";
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
  const [shuffledLogos, setShuffledLogos] = useState<{
    topRowLogos: Company[];
    bottomRowLogos: Company[];
  }>({
    topRowLogos: companies.slice(0, 20),
    bottomRowLogos: companies.slice(20, 40),
  });

  // Shuffle logos on client side only to prevent hydration mismatch
  useEffect(() => {
    const shuffledCompanies = shuffleArray(companies);
    setShuffledLogos({
      topRowLogos: shuffledCompanies.slice(0, 20),
      bottomRowLogos: shuffledCompanies.slice(20, 40),
    });
  }, [companies]);

  return (
    <div className="w-full overflow-hidden select-none pointer-events-none relative">
      {/* Top row - moves right */}
      <div className="flex whitespace-nowrap mb-4">
        <div className="flex animate-marquee-right">
          {[
            ...shuffledLogos.topRowLogos,
            ...shuffledLogos.topRowLogos,
            ...shuffledLogos.topRowLogos,
          ].map((company, index) => (
            <div
              key={`top-${index}`}
              className="flex-shrink-0 mx-4 w-16 h-16 flex items-center justify-center"
            >
              <Image
                src={getLogoPath(company.website)}
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
          ))}
        </div>
      </div>

      {/* Bottom row - moves left */}
      <div className="flex whitespace-nowrap">
        <div className="flex animate-marquee-left">
          {[
            ...shuffledLogos.bottomRowLogos,
            ...shuffledLogos.bottomRowLogos,
            ...shuffledLogos.bottomRowLogos,
          ].map((company, index) => (
            <div
              key={`bottom-${index}`}
              className="flex-shrink-0 mx-4 w-16 h-16 flex items-center justify-center"
            >
              <Image
                src={getLogoPath(company.website)}
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
          ))}
        </div>
      </div>
    </div>
  );
}
