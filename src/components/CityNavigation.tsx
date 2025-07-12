import Link from "next/link";

interface CityNavigationProps {
  currentCity?: string;
  currentPage?: "remote" | "city" | "other";
}

export default function CityNavigation({
  currentCity,
  currentPage,
}: CityNavigationProps) {
  const cities = [
    { name: "Sydney", path: "/sydney" },
    { name: "Melbourne", path: "/melbourne" },
    { name: "Brisbane", path: "/brisbane" },
    { name: "Perth", path: "/perth" },
    { name: "Adelaide", path: "/adelaide" },
    { name: "Canberra", path: "/canberra" },
  ];

  // Filter out the current city if provided
  const filteredCities = currentCity
    ? cities.filter(
        (city) => city.name.toLowerCase() !== currentCity.toLowerCase()
      )
    : cities;

  const showRemoteLink = currentPage !== "remote";
  const showOtherLink = currentPage !== "other";

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h3 className="text-2xl text-black mb-6">
        {currentPage === "remote"
          ? "Browse by city"
          : currentPage === "other"
          ? "Browse by location"
          : "Other locations"}
      </h3>
      <div className="flex flex-wrap gap-4 max-w-2xl mb-4">
        <Link
          href="/"
          className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65 font-medium"
        >
          ← Back to all companies
        </Link>
      </div>
      <div className="flex flex-wrap gap-4 max-w-2xl">
        {showRemoteLink && (
          <Link
            href="/remote"
            className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
          >
            Remote companies →
          </Link>
        )}
        {showOtherLink && (
          <Link
            href="/other"
            className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
          >
            Other cities companies →
          </Link>
        )}
        {filteredCities.map((city) => (
          <Link
            key={city.name}
            href={city.path}
            className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
          >
            {city.name} companies →
          </Link>
        ))}
      </div>
    </div>
  );
}
