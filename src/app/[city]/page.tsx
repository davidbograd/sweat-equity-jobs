import { notFound } from "next/navigation";
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

// Helper function to get unique cities count
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
    { name: "Home", url: "https://sweatequityjobs.com" },
    {
      name: `${capitalizedCity} Companies`,
      url: `https://sweatequityjobs.com/${city.toLowerCase()}`,
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
  const citiesCount = getUniqueCitiesCount(filteredCompanies);
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
        <Header />

        {/* Main Content */}
        <main className="max-w-[1462px] mx-auto px-6">
          <div className="pl-6">
            <h1 className="text-5xl text-black mb-6">
              {capitalizeCityName(city)} companies offering equity
            </h1>

            <CompaniesStats
              companiesCount={filteredCompanies.length}
              citiesCount={citiesCount}
              workArrangementsCount={workArrangementsCount}
            />
          </div>

          <CompaniesGrid companies={filteredCompanies} currentCity={city} />

          <CityNavigation currentCity={city} currentPage="city" />
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
