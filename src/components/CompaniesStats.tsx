interface CompaniesStatsProps {
  companiesCount: number;
  citiesCount: number;
  workArrangementsCount: number;
}

export default function CompaniesStats({
  companiesCount,
  citiesCount,
  workArrangementsCount,
}: CompaniesStatsProps) {
  return (
    <div className="flex flex-wrap gap-4 md:gap-8 text-black opacity-65 mb-6 md:mb-8 text-lg md:text-2xl">
      <div className="flex items-center gap-2">
        <span>
          {companiesCount} {companiesCount === 1 ? "company" : "companies"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span>
          {citiesCount} {citiesCount === 1 ? "city" : "cities"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span>
          {workArrangementsCount}{" "}
          <span className="md:hidden">
            work {workArrangementsCount === 1 ? "type" : "types"}
          </span>
          <span className="hidden md:inline">
            work {workArrangementsCount === 1 ? "arrangement" : "arrangements"}
          </span>
        </span>
      </div>
    </div>
  );
}
