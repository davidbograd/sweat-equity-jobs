import CompanyCard from "./CompanyCard";

interface Company {
  id: string;
  name: string;
  website: string;
  description: string;
  year: string;
  location: string;
  workType: string;
  logo?: string;
}

interface CompaniesGridProps {
  companies: Company[];
}

export default function CompaniesGrid({ companies }: CompaniesGridProps) {
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
          logo={company.logo}
        />
      ))}
    </div>
  );
}
