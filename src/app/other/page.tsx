import Link from "next/link";
import type { Metadata } from "next";
import CompaniesStats from "../../components/CompaniesStats";
import CompaniesGrid from "../../components/CompaniesGrid";
import StickyLocationNav from "../../components/StickyLocationNav";
import companies from "../../data/companies.json";
import {
  generateBreadcrumbSchema,
  generateItemListSchema,
} from "../../lib/structuredData";
import { sortCompaniesByName } from "../../lib/utils";
import type { Company } from "../../lib/types";

// Define the major cities to exclude
const majorCities = [
  "sydney",
  "melbourne",
  "brisbane",
  "perth",
  "adelaide",
  "canberra",
];

// Calculate other cities companies count for metadata
const otherCitiesCompaniesForMeta = sortCompaniesByName(
  (companies as Company[]).filter((company) => {
    // Check if company's primary location is not in major cities
    const isPrimaryLocationMajor = majorCities.includes(
      company.location.toLowerCase()
    );

    // Check if any of the company's locations are in major cities
    const hasAnyMajorLocation = company.allLocations
      ? company.allLocations.some((loc) =>
          majorCities.includes(loc.toLowerCase())
        )
      : false;

    // Include company if it's not primarily in a major city and doesn't have any major city locations
    return !isPrimaryLocationMajor && !hasAnyMajorLocation;
  })
);

// Metadata for the other cities page
export const metadata: Metadata = {
  title: `${otherCitiesCompaniesForMeta.length} companies offering equity outside of Australian capital cities`,
  description:
    "Find Australian startups in other cities that offer equity as part of your compensation package.",
  metadataBase: new URL("https://equityjobs.com.au"),
  openGraph: {
    title: "200+ Other cities companies offering equity - Sweat Equity Jobs",
    description:
      "Find Australian startups in other cities that offer equity as part of your compensation package.",
    url: "https://equityjobs.com.au/other",
    siteName: "Sweat Equity Jobs",
    images: [
      {
        url: "/images/open-graph-equity.png",
        width: 1200,
        height: 630,
        alt: "Other cities companies offering equity - Sweat Equity Jobs",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "200+ Other cities companies offering equity - Sweat Equity Jobs",
    description:
      "Find Australian startups in other cities that offer equity as part of your compensation package.",
    images: ["/images/open-graph-equity.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Helper function to filter companies that are NOT in major cities
function filterOtherCitiesCompanies(): Company[] {
  return (companies as Company[]).filter((company) => {
    // Check if company's primary location is not in major cities
    const isPrimaryLocationMajor = majorCities.includes(
      company.location.toLowerCase()
    );

    // Check if any of the company's locations are in major cities
    const hasAnyMajorLocation = company.allLocations
      ? company.allLocations.some((loc) =>
          majorCities.includes(loc.toLowerCase())
        )
      : false;

    // Include company if it's not primarily in a major city and doesn't have any major city locations
    return !isPrimaryLocationMajor && !hasAnyMajorLocation;
  });
}

// Helper function to get unique cities count for other cities companies
function getUniqueCitiesCount(filteredCompanies: Company[]): number {
  const cities = new Set<string>();
  filteredCompanies.forEach((company) => {
    cities.add(company.location);
    if (company.allLocations) {
      company.allLocations.forEach((loc: string) => cities.add(loc));
    }
  });
  return cities.size;
}

// Helper function to get unique work arrangements count for other cities companies
function getUniqueWorkArrangementsCount(filteredCompanies: Company[]): number {
  const workTypes = new Set<string>();
  filteredCompanies.forEach((company) => {
    if (company.allWorkTypes) {
      company.allWorkTypes.forEach((type: string) => workTypes.add(type));
    } else {
      workTypes.add(company.workType);
    }
  });
  return workTypes.size;
}

// Generate structured data for other cities page
function generateOtherCitiesStructuredData(filteredCompanies: Company[]) {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://equityjobs.com.au" },
    { name: "Other Cities Companies", url: "https://equityjobs.com.au/other" },
  ]);

  const itemListSchema = generateItemListSchema(
    filteredCompanies,
    "Other Cities Companies Offering Equity",
    "Australian startups in other cities offering equity compensation"
  );

  return [breadcrumbSchema, itemListSchema];
}

export default function OtherCitiesPage() {
  // Filter companies for other cities and sort alphabetically
  const otherCitiesCompanies = sortCompaniesByName(
    filterOtherCitiesCompanies()
  );

  // Get stats for other cities companies
  const citiesCount = getUniqueCitiesCount(otherCitiesCompanies);
  const workArrangementsCount =
    getUniqueWorkArrangementsCount(otherCitiesCompanies);

  // Generate structured data
  const structuredData =
    generateOtherCitiesStructuredData(otherCitiesCompanies);

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
        <StickyLocationNav currentLocation="other" shouldAnimate={false} />

        {/* Main Content */}
        <main className="max-w-[1600px] mx-auto px-6 pt-40">
          <div className="pl-4 md:pl-6">
            <h1 className="text-4xl md:text-5xl text-black mb-4 md:mb-6">
              Other cities companies offering equity
            </h1>

            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between md:gap-4 mb-6">
              <CompaniesStats
                companiesCount={otherCitiesCompanies.length}
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

          <CompaniesGrid
            companies={otherCitiesCompanies}
            expandedByDefault={true}
          />

          {/* Location Navigation */}
          <div className="mt-12 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 justify-center justify-items-start mx-auto w-fit">
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
                href="/remote"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Remote →
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
