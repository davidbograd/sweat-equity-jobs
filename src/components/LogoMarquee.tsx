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

// Companies to always include in the marquee (add website URLs here)
const whitelistedCompanies: string[] = [
  "eucalyptus.health",
  "canva.com",
  "deputy.com",
  "linktr.ee",
];

// Companies to exclude from the marquee (add website URLs here)
const excludedCompanies: string[] = [
  "airshr.com",
  "black.ai",
  "cxnpl.com",
  "dataweavers.com",
  "gomarloo.com",
  "sherlok.com.au",
  "vexev.com",
  "inventia.life",
];

export default function LogoMarquee({ companies }: LogoMarqueeProps) {
  const [shuffledLogos, setShuffledLogos] = useState<{
    topRowLogos: Company[];
    bottomRowLogos: Company[];
  }>({
    topRowLogos: [],
    bottomRowLogos: [],
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // Shuffle logos on client side only to prevent hydration mismatch
  useEffect(() => {
    // Filter companies: include whitelisted OR exclude blacklisted
    const filteredCompanies = companies.filter(
      (company) =>
        whitelistedCompanies.includes(company.website) ||
        !excludedCompanies.includes(company.website)
    );

    // Separate whitelisted and other companies
    const whitelistedResults = filteredCompanies.filter((company) =>
      whitelistedCompanies.includes(company.website)
    );
    const otherCompanies = filteredCompanies.filter(
      (company) => !whitelistedCompanies.includes(company.website)
    );

    // Shuffle other companies
    const shuffledOtherCompanies = shuffleArray(otherCompanies);

    // Top row: whitelisted companies + remaining spots filled with other companies
    const topRowCount = 20;
    const topRowLogos = [
      ...whitelistedResults,
      ...shuffledOtherCompanies.slice(
        0,
        Math.max(0, topRowCount - whitelistedResults.length)
      ),
    ];

    // Bottom row: remaining other companies
    const bottomRowLogos = shuffledOtherCompanies.slice(
      Math.max(0, topRowCount - whitelistedResults.length),
      Math.max(0, topRowCount - whitelistedResults.length) + 20
    );

    setShuffledLogos({
      topRowLogos,
      bottomRowLogos,
    });
    setIsLoaded(true);
  }, [companies]);

  // Simple logo renderer
  const renderLogo = (company: Company, key: string) => (
    <div
      key={key}
      className="flex-shrink-0 mx-4 w-16 h-16 flex items-center justify-center"
    >
      <Image
        src={getLogoPath(company.website)}
        alt={`${company.name} logo`}
        width={60}
        height={60}
        className="w-12 h-12 object-contain rounded-lg"
        unoptimized={true}
      />
    </div>
  );

  // Don't render anything until logos are loaded to prevent layout shift
  if (!isLoaded) {
    return <div className="w-full h-32" />; // Maintain height while loading
  }

  return (
    <div className="w-full overflow-hidden select-none pointer-events-none relative">
      {/* Top row - moves right */}
      <div className="flex whitespace-nowrap mb-4">
        <div className="flex animate-marquee-right">
          {/* Create continuous loop with 2 copies */}
          {shuffledLogos.topRowLogos.map((company, index) =>
            renderLogo(company, `top-${index}`)
          )}
          {shuffledLogos.topRowLogos.map((company, index) =>
            renderLogo(company, `top-dup-${index}`)
          )}
        </div>
      </div>

      {/* Bottom row - moves left */}
      <div className="flex whitespace-nowrap">
        <div className="flex animate-marquee-left">
          {/* Create continuous loop with 2 copies */}
          {shuffledLogos.bottomRowLogos.map((company, index) =>
            renderLogo(company, `bottom-${index}`)
          )}
          {shuffledLogos.bottomRowLogos.map((company, index) =>
            renderLogo(company, `bottom-dup-${index}`)
          )}
        </div>
      </div>
    </div>
  );
}
