import type { Metadata } from "next";
import CompaniesStats from "../../components/CompaniesStats";
import CompaniesGrid from "../../components/CompaniesGrid";
import CityNavigation from "../../components/CityNavigation";
import Header from "../../components/Header";
import companies from "../../data/companies.json";
import {
  generateBreadcrumbSchema,
  generateItemListSchema,
} from "../../lib/structuredData";
import type { Company } from "../../lib/types";

// Metadata for the remote page
export const metadata: Metadata = {
  title: "Remote companies offering equity - Sweat Equity Jobs",
  description:
    "Find Australian startups that offer remote work and equity as part of your compensation package.",
  metadataBase: new URL("https://equityjobs.com.au"),
  openGraph: {
    title: "Remote companies offering equity - Sweat Equity Jobs",
    description:
      "Find Australian startups that offer remote work and equity as part of your compensation package.",
    url: "https://equityjobs.com.au/remote",
    siteName: "Sweat Equity Jobs",
    images: [
      {
        url: "/images/open-graph-equity.png",
        width: 1200,
        height: 630,
        alt: "Remote companies offering equity - Sweat Equity Jobs",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remote companies offering equity - Sweat Equity Jobs",
    description:
      "Find Australian startups that offer remote work and equity as part of your compensation package.",
    images: ["/images/open-graph-equity.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Helper function to filter companies that offer remote work
function filterRemoteCompanies(): Company[] {
  return (companies as Company[]).filter(
    (company) =>
      company.workType.toLowerCase() === "remote" ||
      (company.allWorkTypes &&
        company.allWorkTypes.some((type) => type.toLowerCase() === "remote"))
  );
}

// Helper function to get unique cities count for remote companies
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

// Helper function to get unique work arrangements count for remote companies
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

// Generate structured data for remote page
function generateRemoteStructuredData(filteredCompanies: Company[]) {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://equityjobs.com.au" },
    { name: "Remote Companies", url: "https://equityjobs.com.au/remote" },
  ]);

  const itemListSchema = generateItemListSchema(
    filteredCompanies,
    "Remote Companies Offering Equity",
    "Australian startups offering remote work and equity compensation"
  );

  return [breadcrumbSchema, itemListSchema];
}

export default function RemotePage() {
  // Filter companies for remote work
  const remoteCompanies = filterRemoteCompanies();

  // Get stats for remote companies
  const citiesCount = getUniqueCitiesCount(remoteCompanies);
  const workArrangementsCount = getUniqueWorkArrangementsCount(remoteCompanies);

  // Generate structured data
  const structuredData = generateRemoteStructuredData(remoteCompanies);

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
        <Header />

        {/* Main Content */}
        <main className="max-w-[1462px] mx-auto px-6">
          <div className="pl-4 md:pl-6">
            <h1 className="text-4xl md:text-5xl text-black mb-4 md:mb-6">
              Remote companies offering equity
            </h1>

            <CompaniesStats
              companiesCount={remoteCompanies.length}
              citiesCount={citiesCount}
              workArrangementsCount={workArrangementsCount}
            />
          </div>

          <CompaniesGrid
            companies={remoteCompanies.map((company) => ({
              ...company,
              workType: "Remote",
              allWorkTypes: company.allWorkTypes
                ? [
                    "Remote",
                    ...company.allWorkTypes.filter((type) => type !== "Remote"),
                  ]
                : ["Remote"],
            }))}
          />

          <CityNavigation currentPage="remote" />
        </main>
      </div>
    </>
  );
}
