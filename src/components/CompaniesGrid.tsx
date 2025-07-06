import CompanyCard from "./CompanyCard";
import type { Company } from "../lib/types";

interface CompaniesGridProps {
  companies: Company[];
  currentCity?: string;
}

export default function CompaniesGrid({
  companies,
  currentCity,
}: CompaniesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          name={company.name}
          website={company.website}
          description={company.description}
          year={company.year}
          location={company.location}
          workType={company.workType}
          allLocations={company.allLocations}
          currentCity={currentCity}
        />
      ))}
    </div>
  );
}
