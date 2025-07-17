import { notFound } from "next/navigation";
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
import type { Company, CityPageProps } from "../../lib/types";

// Generate metadata for the city page
export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);

  return {
    title: `${capitalizedCity} companies offering equity - Sweat Equity Jobs`,
    description: `Find Australian startups in ${capitalizedCity} that offer equity as part of your compensation package.`,
    metadataBase: new URL("https://equityjobs.com.au"),
    openGraph: {
      title: `${capitalizedCity} companies offering equity - Sweat Equity Jobs`,
      description: `Find Australian startups in ${capitalizedCity} that offer equity as part of your compensation package.`,
      url: `https://equityjobs.com.au/${city.toLowerCase()}`,
      siteName: "Sweat Equity Jobs",
      images: [
        {
          url: "/images/open-graph-equity.png",
          width: 1200,
          height: 630,
          alt: `${capitalizedCity} companies offering equity - Sweat Equity Jobs`,
        },
      ],
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${capitalizedCity} companies offering equity - Sweat Equity Jobs`,
      description: `Find Australian startups in ${capitalizedCity} that offer equity as part of your compensation package.`,
      images: ["/images/open-graph-equity.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Define the valid cities
const validCities = [
  "sydney",
  "melbourne",
  "perth",
  "brisbane",
  "canberra",
  "adelaide",
];

// Helper function to capitalize city name
function capitalizeCityName(city: string): string {
  return city.charAt(0).toUpperCase() + city.slice(1);
}

// Helper function to filter companies by city
function filterCompaniesByCity(city: string): Company[] {
  return (companies as Company[]).filter(
    (company) =>
      company.location.toLowerCase() === city.toLowerCase() ||
      (company.allLocations &&
        company.allLocations.some(
          (loc) => loc.toLowerCase() === city.toLowerCase()
        ))
  );
}

// Helper function to get unique work arrangements count
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

// Generate structured data for city pages
function generateCityStructuredData(
  city: string,
  filteredCompanies: Company[]
) {
  const capitalizedCity = capitalizeCityName(city);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://equityjobs.com.au" },
    {
      name: `${capitalizedCity} Companies`,
      url: `https://equityjobs.com.au/${city.toLowerCase()}`,
    },
  ]);

  const itemListSchema = generateItemListSchema(
    filteredCompanies,
    `${capitalizedCity} Companies Offering Equity`,
    `Australian startups in ${capitalizedCity} offering equity compensation`
  );

  return [breadcrumbSchema, itemListSchema];
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;

  // Check if city is valid
  if (!validCities.includes(city.toLowerCase())) {
    notFound();
  }

  // Filter companies for this city
  const filteredCompanies = filterCompaniesByCity(city);

  // Get stats for filtered companies
  const citiesCount = 1; // Always show 1 city for city-specific pages
  const workArrangementsCount =
    getUniqueWorkArrangementsCount(filteredCompanies);

  // Generate structured data
  const structuredData = generateCityStructuredData(city, filteredCompanies);

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
        <StickyLocationNav currentLocation={city} shouldAnimate={false} />

        {/* Main Content */}
        <main className="max-w-[1600px] mx-auto px-6 pt-40">
          <div className="pl-4 md:pl-6">
            <h1 className="text-4xl md:text-5xl text-black mb-4 md:mb-6">
              {capitalizeCityName(city)} companies offering equity
            </h1>

            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between md:gap-4 mb-6">
              <CompaniesStats
                companiesCount={filteredCompanies.length}
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
            companies={filteredCompanies}
            currentCity={city}
            expandedByDefault={true}
          />

          {/* Location Navigation */}
          <div className="mt-12 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 justify-center justify-items-start mx-auto w-fit">
              {city.toLowerCase() !== "sydney" && (
                <Link
                  href="/sydney"
                  className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
                >
                  Sydney →
                </Link>
              )}
              {city.toLowerCase() !== "melbourne" && (
                <Link
                  href="/melbourne"
                  className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
                >
                  Melbourne →
                </Link>
              )}
              {city.toLowerCase() !== "brisbane" && (
                <Link
                  href="/brisbane"
                  className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
                >
                  Brisbane →
                </Link>
              )}
              {city.toLowerCase() !== "perth" && (
                <Link
                  href="/perth"
                  className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
                >
                  Perth →
                </Link>
              )}
              {city.toLowerCase() !== "adelaide" && (
                <Link
                  href="/adelaide"
                  className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
                >
                  Adelaide →
                </Link>
              )}
              {city.toLowerCase() !== "canberra" && (
                <Link
                  href="/canberra"
                  className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
                >
                  Canberra →
                </Link>
              )}
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
          </div>
        </main>
      </div>
    </>
  );
}

// Generate static params for the valid cities
export async function generateStaticParams() {
  return validCities.map((city) => ({
    city: city,
  }));
}
