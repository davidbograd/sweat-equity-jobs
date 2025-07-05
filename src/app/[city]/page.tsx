import { notFound } from "next/navigation";
import CompaniesStats from "../../components/CompaniesStats";
import CompaniesGrid from "../../components/CompaniesGrid";
import CityNavigation from "../../components/CityNavigation";
import companies from "../../data/companies.json";

interface CityPageProps {
  params: {
    city: string;
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
function filterCompaniesByCity(city: string) {
  const normalizedCity = capitalizeCityName(city);
  return companies.filter(
    (company) =>
      company.location.toLowerCase() === city.toLowerCase() ||
      (company.allLocations &&
        company.allLocations.some(
          (loc) => loc.toLowerCase() === city.toLowerCase()
        ))
  );
}

// Helper function to get unique cities count
function getUniqueCitiesCount(filteredCompanies: any[]) {
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
function getUniqueWorkArrangementsCount(filteredCompanies: any[]) {
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

export default function CityPage({ params }: CityPageProps) {
  const { city } = params;

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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="text-center pt-12 pb-8">
        <a href="/" className="text-lg text-black hover:text-gray-800">
          🖤 sweat equity jobs
        </a>
      </header>

      {/* Main Content */}
      <main className="max-w-[1462px] mx-auto px-6">
        <h1 className="text-5xl text-black mb-6">
          {capitalizeCityName(city)} companies offering equity
        </h1>

        <CompaniesStats
          companiesCount={filteredCompanies.length}
          citiesCount={citiesCount}
          workArrangementsCount={workArrangementsCount}
        />

        <CompaniesGrid companies={filteredCompanies} currentCity={city} />

        <CityNavigation currentCity={city} />
      </main>
    </div>
  );
}

// Generate static params for the valid cities
export async function generateStaticParams() {
  return validCities.map((city) => ({
    city: city,
  }));
}
