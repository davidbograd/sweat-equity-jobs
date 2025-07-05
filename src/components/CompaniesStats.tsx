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
    <div className="flex flex-wrap gap-8 text-black opacity-65 mb-8 text-2xl">
      <div className="flex items-center gap-2">
        <span>{companiesCount} companies</span>
      </div>
      <div className="flex items-center gap-2">
        <span>{citiesCount} cities</span>
      </div>
      <div className="flex items-center gap-2">
        <span>{workArrangementsCount} work arrangements</span>
      </div>
    </div>
  );
}
