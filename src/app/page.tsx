"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CompaniesStats from "../components/CompaniesStats";
import CompaniesGrid from "../components/CompaniesGrid";
import StickyLocationNav from "../components/StickyLocationNav";
import FAQ from "../components/FAQ";
import CTAButton from "../components/CTAButton";
import LogoMarquee from "../components/LogoMarquee";
import {
  generateWebsiteSchema,
  generateItemListSchema,
} from "../lib/structuredData";
import companies from "../data/companies.json";

// Generate structured data for the front page
function generateStructuredData(companies: any[]) {
  const websiteSchema = generateWebsiteSchema();
  const itemListSchema = generateItemListSchema(
    companies,
    "Australian Companies Offering Equity",
    "Complete list of Australian startups offering equity compensation"
  );

  return [websiteSchema, itemListSchema];
}

function calculateStats(companies: any[]) {
  const allCities = new Set<string>();
  const allWorkTypes = new Set<string>();

  companies.forEach((company) => {
    // Add all locations for this company
    company.allLocations.forEach((location: string) => {
      if (location && location.trim()) {
        allCities.add(location);
      }
    });

    // Add all work types for this company
    company.allWorkTypes.forEach((workType: string) => {
      if (workType && workType.trim()) {
        allWorkTypes.add(workType);
      }
    });
  });

  return {
    citiesCount: allCities.size,
    workArrangementsCount: allWorkTypes.size,
  };
}

function HomeClient() {
  const [headerMode, setHeaderMode] = useState<"logo-only" | "full">(
    "logo-only"
  );
  const structuredData = generateStructuredData(companies);
  const { citiesCount, workArrangementsCount } = calculateStats(companies);

  useEffect(() => {
    const handleScroll = () => {
      const companiesSection = document.getElementById("companies");
      if (companiesSection) {
        const companiesSectionTop = companiesSection.offsetTop;
        const scrollPosition = window.scrollY + 300; // Increased offset for better UX

        if (scrollPosition >= companiesSectionTop) {
          setHeaderMode("full");
        } else {
          setHeaderMode("logo-only");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Structured Data */}
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="min-h-screen">
        {/* Sticky Navigation */}
        <StickyLocationNav mode={headerMode} isSticky={true} />

        {/* Hero Section */}
        <div className="relative w-full pb-8">
          {/* Background gradients */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Left gradient */}
            <div
              className="absolute bottom-0 left-0 w-full xl:w-1/2 h-full"
              style={{
                backgroundImage: "url(/images/gradient-left.png)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left bottom",
                backgroundSize: "cover",
              }}
            />
            {/* Right gradient (flipped) - hidden until xl breakpoint */}
            <div
              className="absolute bottom-0 right-0 w-1/2 h-full hidden xl:block"
              style={{
                backgroundImage: "url(/images/gradient-left.png)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right bottom",
                backgroundSize: "cover",
                transform: "scaleX(-1)",
              }}
            />
            {/* Linear gradient overlay */}
            <div
              className="absolute bottom-0 left-0 w-full"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, #F8F8F8 100%)",
                height: "128px",
              }}
            />
          </div>

          <main className="max-w-[1600px] mx-auto px-6 text-center relative z-10 mt-8 pt-28">
            <h1 className="text-3xl md:text-7xl mb-4 leading-tight">
              Find Australian startups offering equity
            </h1>

            <p className="text-xl text-black mb-8 mx-auto opacity-65">
              A curated list of Aussie startups where equity is part of your
              compensation.
            </p>

            {/* CTA Button */}
            <div className="mb-8">
              <CTAButton className="hover:underline hover:underline-offset-8 inline-block text-xl bg-transparent border-none cursor-pointer text-black">
                See the full list →
              </CTAButton>
            </div>

            {/* Location Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 mb-8 md:mb-16 justify-center justify-items-start mx-auto w-fit">
              <Link
                href="/sydney"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Sydney →
              </Link>
              <Link
                href="/melbourne"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Melbourne →
              </Link>
              <Link
                href="/brisbane"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Brisbane →
              </Link>
              <Link
                href="/perth"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Perth →
              </Link>
              <Link
                href="/adelaide"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Adelaide →
              </Link>
              <Link
                href="/canberra"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Canberra →
              </Link>
              <Link
                href="/other"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Other cities →
              </Link>
              <Link
                href="/remote"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Remote →
              </Link>
            </div>

            {/* Video Section */}
            <div className="flex justify-center mb-6 md:mb-12">
              <a
                href="https://www.youtube.com/watch?v=JirNXu48Xf0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-black bg-white rounded-2xl transition-colors"
              >
                <div className="p-2">
                  <Image
                    src="/images/video-thumbnail@2x.png"
                    alt="Video thumbnail showing why you should get a job with equity"
                    width={64}
                    height={40}
                    className="w-16 h-10 rounded-lg"
                    priority={false}
                  />
                </div>
                <span className="pr-6">
                  <span className="md:hidden">Why get a job with equity</span>
                  <span className="hidden md:inline">
                    Why you should get a job with equity
                  </span>
                </span>
              </a>
            </div>
          </main>
        </div>

        {/* Logo Marquee - Full Width */}
        <div className="w-full mb-12 md:mb-20">
          <LogoMarquee companies={companies} />
        </div>
        {/* Companies Section */}
        <section
          id="companies"
          className="text-left max-w-[1600px] mx-auto mt-12 lg:mt-20 px-5"
        >
          <div className="pl-4 md:pl-6">
            <h2 className="text-4xl md:text-5xl text-black mb-4 md:mb-6">
              All companies offering equity
            </h2>

            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between md:gap-4 mb-6">
              <CompaniesStats
                companiesCount={companies.length}
                citiesCount={citiesCount}
                workArrangementsCount={workArrangementsCount}
              />

              <Link
                href="https://tally.so/r/wzBdPa"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center text-lg text-black opacity-65 hover:opacity-100 hover:underline hover:underline-offset-4 transition-opacity whitespace-nowrap"
              >
                Submit another company
              </Link>
            </div>

            {/* Mobile link - shows below CompaniesStats */}
            <Link
              href="https://tally.so/r/wzBdPa"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden inline-flex items-center text-lg text-black opacity-65 hover:opacity-100 hover:underline hover:underline-offset-4 transition-opacity mb-6"
            >
              Submit another company
            </Link>
          </div>

          <CompaniesGrid companies={companies} />
        </section>

        {/* FAQ Section */}
        <FAQ />
      </div>
    </>
  );
}

// Default export as server component
export default function Home() {
  return <HomeClient />;
}
